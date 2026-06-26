import { useState, useCallback, useEffect, useRef } from "react";
import { Trophy } from "lucide-react";
import CodeEditor from "../CodeEditor";
import PythonRpgBoard from "./PythonRpgBoard";
import VictoryModal from "../VictoryModal";
import { parseCode } from "../../utils/snake_rpg/parser";
import { COMMANDS } from "../../utils/snake_rpg/constants";

const STEP_DELAY_MS = 300;
const ATTACK_DELAY_MS = 350;
const HIT_DELAY_MS = 250;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildInitialGameState(config) {
  return {
    player: {
      hp: 3,
      maxHp: 3,
      attack: 1,
      direction: "right",
      ...structuredClone(config.player),
      state: "idle",
    },

    enemies: (config.enemies || []).map((enemy) => ({
      maxHp: enemy.hp ?? 1,
      attack: enemy.attack ?? 1,
      ...structuredClone(enemy),
      state: "idle",
    })),

    items: structuredClone(config.items || []),
    objects: structuredClone(config.objects || []),
    hazards: structuredClone(config.hazards || []),
    inventory: [],
    map: structuredClone(config.map),
    guide: structuredClone(config.guide || null),
    effects: [],
  };
}

function getTile(map, x, y) {
  return map.tiles?.[y]?.[x] ?? "floor";
}

function isBlocked(tile) {
  return tile === "wall" || tile === "void";
}
function isSameTile(a, b) {
  return a.x === b.x && a.y === b.y;
}

function isAdjacent(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) === 1;
}
export default function PythonRpgGame({
  stage,
  stages,
  onBack,
  onSelectStage,
  completeStage,
}) {
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [gameState, setGameState] = useState(null);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [message, setMessage] = useState("");
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const completedRef = useRef(false);

  const resetGame = useCallback(() => {
    setCode(stage.config.defaultCode ?? "");
    setGameState(buildInitialGameState(stage.config));
    setMessage("");
    setLevelCompleted(false);
    setHasPlayed(false);
    completedRef.current = false;
  }, [stage]);

  useEffect(() => {
    resetGame();
  }, [stage.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!gameState || !hasPlayed || levelCompleted || completedRef.current) return;

    const { goal } = stage.config;
    let completed = false;

    if (goal === "reach_flag") {
      const flag = gameState.objects.find((obj) => obj.type === "flag");
      completed =
        flag &&
        gameState.player.x === flag.x &&
        gameState.player.y === flag.y;
    }

    if (goal === "kill_all" || goal === "kill_boss") {
      completed = gameState.enemies.length === 0;
    }

    if (goal === "collect_coins") {
      completed = gameState.items.filter((item) => item.type === "coin").length === 0;
    }

    if (completed) {
      completedRef.current = true;

      completeStage(stage.id)
        .then(() => {
          setLevelCompleted(true);
          setMessage("Stage completed 🎉");
          setShowVictoryModal(true);
        })
        .catch(() => {
          completedRef.current = false;
        });
    }
  }, [gameState, hasPlayed, levelCompleted, stage, completeStage]);
  function moveEnemyTowardPlayer(enemy, player, map, mapWidth, mapHeight, enemies) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;

    const candidates =
      Math.abs(dx) > Math.abs(dy)
        ? [
          { x: enemy.x + Math.sign(dx), y: enemy.y },
          { x: enemy.x, y: enemy.y + Math.sign(dy) },
        ]
        : [
          { x: enemy.x, y: enemy.y + Math.sign(dy) },
          { x: enemy.x + Math.sign(dx), y: enemy.y },
        ];

    for (const next of candidates) {
      if (
        next.x < 0 ||
        next.y < 0 ||
        next.x >= mapWidth ||
        next.y >= mapHeight
      ) {
        continue;
      }

      const tile = getTile(map, next.x, next.y);

      const occupiedByEnemy = enemies.some(
        (e) => e.id !== enemy.id && e.x === next.x && e.y === next.y
      );
      if (!isBlocked(tile) && !occupiedByEnemy) {
        return {
          ...enemy,
          x: next.x,
          y: next.y,
          state: "walking",
        };
      }
    }

    return enemy;
  }

  async function enemiesTurn(playerRef, enemiesRef, itemsRef, inventoryRef) {
    let player = playerRef;
    let enemies = enemiesRef;

    const { width: mapWidth, height: mapHeight } = stage.config.map;

    for (const enemy of enemies) {
      let updatedEnemy = enemy;

      if (!isAdjacent(updatedEnemy, player)) {
        updatedEnemy = moveEnemyTowardPlayer(
          updatedEnemy,
          player,
          stage.config.map,
          mapWidth,
          mapHeight,
          enemies
        );

        enemies = enemies.map((e) =>
          e.id === updatedEnemy.id ? updatedEnemy : e
        );

        setGameState((prev) => ({
          ...prev,
          player: { ...player },
          enemies: [...enemies],
          items: [...itemsRef],
          inventory: [...inventoryRef],
        }));

        await sleep(250);
      }

      if (isSameTile(updatedEnemy, player)) {
        enemies = enemies.map((e) =>
          e.id === updatedEnemy.id ? { ...e, state: "attack" } : e
        );

        setGameState((prev) => ({
          ...prev,
          player: { ...player },
          enemies: [...enemies],
          items: [...itemsRef],
          inventory: [...inventoryRef],
          effects: [
            {
              id: Date.now(),
              type: "enemySlash",
              x: player.x,
              y: player.y,
            },
          ],
        }));

        await sleep(350);

        player.hp = 0;
        player.state = "dying";

        enemies = enemies.map((e) => ({
          ...e,
          state: "idle",
        }));

        setGameState((prev) => ({
          ...prev,
          player: { ...player },
          enemies: [...enemies],
          items: [...itemsRef],
          inventory: [...inventoryRef],
          effects: [],
        }));

        await sleep(250);

        if (player.hp <= 0) {
          setMessage("Game Over 💀 Restarting...");
          await sleep(1000);
          resetGame();
          return { player, enemies, gameOver: true };
        }
        player.state = "idle";
      }
    }

    return { player, enemies, gameOver: false };
  }
  async function runCode() {
    if (isRunning || !gameState) return;

    setIsRunning(true);
    setHasPlayed(true);
    setMessage("");

    const { width: mapWidth, height: mapHeight } = stage.config.map;

    let player = { ...gameState.player };
    let enemies = gameState.enemies.map((e) => ({ ...e }));
    let items = gameState.items.map((i) => ({ ...i }));
    let inventory = [...gameState.inventory];

    const getCtx = () => ({ player, enemies, items, inventory });

    try {
      const actions = parseCode(code, getCtx);

      for (const action of actions) {
        if (
          action === COMMANDS.RIGHT ||
          action === COMMANDS.LEFT ||
          action === COMMANDS.UP ||
          action === COMMANDS.DOWN
        ) {
          const oldPlayer = { ...player };

          player.state = "walking";

          if (action === COMMANDS.RIGHT) {
            player.x++;
            player.direction = "right";
            const enemyResult = await enemiesTurn(player, enemies, items, inventory);
            player = enemyResult.player;
            enemies = enemyResult.enemies;

            if (enemyResult.gameOver) return;
          }

          if (action === COMMANDS.LEFT) {
            player.x--;
            player.direction = "left";
            const enemyResult = await enemiesTurn(player, enemies, items, inventory);
            player = enemyResult.player;
            enemies = enemyResult.enemies;

            if (enemyResult.gameOver) return;
          }

          if (action === COMMANDS.UP) {
            player.y--;
            player.direction = "up";
            const enemyResult = await enemiesTurn(player, enemies, items, inventory);
            player = enemyResult.player;
            enemies = enemyResult.enemies;

            if (enemyResult.gameOver) return;
          }

          if (action === COMMANDS.DOWN) {
            player.y++;
            player.direction = "down";
            const enemyResult = await enemiesTurn(player, enemies, items, inventory);
            player = enemyResult.player;
            enemies = enemyResult.enemies;

            if (enemyResult.gameOver) return;
          }

          if (
            player.x < 0 ||
            player.y < 0 ||
            player.x >= mapWidth ||
            player.y >= mapHeight
          ) {
            player = oldPlayer;
            setMessage("Out of bounds ❌");
            return;
          }

          const tile = getTile(stage.config.map, player.x, player.y);

          if (isBlocked(tile)) {
            player = oldPlayer;
            player.state = "idle";

            setGameState((prev) => ({
              ...prev,
              player: { ...player },
              enemies: [...enemies],
              items: [...items],
              inventory: [...inventory],
              effects: [
                {
                  id: Date.now(),
                  type: "blocked",
                  x: oldPlayer.x,
                  y: oldPlayer.y,
                },
              ],
            }));

            setMessage("Wall blocked ❌");
            await sleep(300);
            return;
          }

          setGameState((prev) => ({
            ...prev,
            player: { ...player },
            enemies: [...enemies],
            items: [...items],
            inventory: [...inventory],
            effects: [],
          }));

          await sleep(STEP_DELAY_MS);

          if (tile === "spike") {
            player.hp -= 1;
            player.state = player.hp <= 0 ? "dying" : "hurt";

            setGameState((prev) => ({
              ...prev,
              player: { ...player },
              enemies: [...enemies],
              items: [...items],
              inventory: [...inventory],
              effects: [
                {
                  id: Date.now(),
                  type: "spike",
                  x: player.x,
                  y: player.y,
                },
              ],
            }));

            await sleep(500);

            if (player.hp <= 0) {
              setMessage("Game Over 💀");
              return;
            }
          }

          const collectedItem = items.find(
            (item) => item.x === player.x && item.y === player.y
          );

          if (collectedItem) {
            inventory.push(collectedItem);
            items = items.filter((item) => item !== collectedItem);
          }

          player.state = "idle";

          setGameState((prev) => ({
            ...prev,
            player: { ...player },
            enemies: [...enemies],
            items: [...items],
            inventory: [...inventory],
            effects: [],
          }));

          const attackingEnemy = enemies.find((enemy) =>
            isSameTile(enemy, player)
          );

          if (attackingEnemy) {
            enemies = enemies.map((enemy) =>
              enemy.id === attackingEnemy.id
                ? { ...enemy, state: "attack" }
                : enemy
            );

            setGameState((prev) => ({
              ...prev,
              player: { ...player },
              enemies: [...enemies],
              items: [...items],
              inventory: [...inventory],
              effects: [
                {
                  id: Date.now(),
                  type: "enemySlash",
                  x: player.x,
                  y: player.y,
                },
              ],
            }));

            await sleep(ATTACK_DELAY_MS);

            player.hp -= attackingEnemy.attack ?? 1;
            player.state = player.hp <= 0 ? "dying" : "hurt";

            enemies = enemies.map((enemy) => ({
              ...enemy,
              state: "idle",
            }));

            setGameState((prev) => ({
              ...prev,
              player: { ...player },
              enemies: [...enemies],
              items: [...items],
              inventory: [...inventory],
              effects: [],
            }));

            await sleep(HIT_DELAY_MS);

            if (player.hp <= 0) {
              setMessage("Game Over 💀");
              return;
            }

            player.state = "idle";
          }

          continue;
        }

        if (action === COMMANDS.ATTACK) {
          player.state = "attack";

          const target = enemies.find(
            (enemy) => isSameTile(enemy, player) || isAdjacent(enemy, player)
          );

          setGameState((prev) => ({
            ...prev,
            player: { ...player },
            enemies: enemies.map((enemy) =>
              target && enemy.id === target.id
                ? { ...enemy, state: "hurt" }
                : enemy
            ),
            items: [...items],
            inventory: [...inventory],
            effects: target
              ? [
                {
                  id: Date.now(),
                  type: "slash",
                  x: target.x,
                  y: target.y,
                },
              ]
              : [
                {
                  id: Date.now(),
                  type: "miss",
                  x: player.x,
                  y: player.y,
                },
              ],
          }));

          await sleep(ATTACK_DELAY_MS);
          if (target) {
            enemies = enemies.map((enemy) => {
              if (enemy.id !== target.id) return enemy;

              const damage = player.attack ?? 1;
              const newHp = enemy.hp - damage;

              return {
                ...enemy,
                hp: newHp,
                state: newHp <= 0 ? "dying" : "hurt",
              };
            });

            setGameState((prev) => ({
              ...prev,
              player: { ...player },
              enemies: [...enemies],
              items: [...items],
              inventory: [...inventory],
              effects: [
                {
                  id: Date.now(),
                  type: "slash",
                  x: target.x,
                  y: target.y,
                },
              ],
            }));

            await sleep(500);

            enemies = enemies
              .map((enemy) =>
                enemy.hp > 0 ? { ...enemy, state: "idle" } : enemy
              )
              .filter((enemy) => enemy.hp > 0);
          }
          player.state = "idle";

          setGameState((prev) => ({
            ...prev,
            player: { ...player },
            enemies: [...enemies],
            items: [...items],
            inventory: [...inventory],
            effects: [],
          }));

          await sleep(STEP_DELAY_MS);
          continue;
        }
      }

      player.state = "idle";

      setGameState((prev) => ({
        ...prev,
        player: { ...player },
        enemies: [...enemies],
        items: [...items],
        inventory: [...inventory],
        effects: [],
      }));
    } catch (err) {
      console.error(err);
      setMessage("⚠️ " + err.message);
    } finally {
      setIsRunning(false);
    }
  }

  function playAgain() {
    setShowVictoryModal(false);
    resetGame();
  }

  function nextStage() {
    setShowVictoryModal(false);
    const currentIndex = stages.findIndex((s) => s.id === stage.id);
    const next = stages[currentIndex + 1];
    next ? onSelectStage(next.id) : onBack();
  }

  if (!gameState) {
    return <p className="text-center py-10 text-white">Loading stage…</p>;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden rounded-3xl">
      <div className="sticky top-0 z-50 h-20 border-b border-slate-200 bg-white/80 backdrop-blur-2xl shadow-sm flex items-center justify-between px-6">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-2xl border border-slate-300 bg-white hover:border-orange-400 hover:text-orange-500 transition-all duration-300 font-semibold shadow-sm"
        >
          ← Back
        </button>

        <div>
          <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            {stage.name}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {stage.description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-white hover:text-purple-500 transition-all duration-300 font-semibold border border-slate-200">
            HINTS
          </button>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold shadow-xl shadow-orange-200">
            <Trophy className="w-4 h-4" />
            STAGE {stage.order ?? stage.id}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] h-[calc(100vh-80px)]">
        <div className="relative flex flex-col items-center justify-center bg-slate-100 overflow-auto">
          <PythonRpgBoard gameState={gameState} />

        </div>

        <div className="bg-white border-l border-slate-200 p-4 overflow-auto shadow-inner">
          <CodeEditor
            code={code}
            setCode={setCode}
            runCode={runCode}
            resetGame={resetGame}
            isRunning={isRunning}
          />
        </div>
      </div>

      <VictoryModal
        show={showVictoryModal}
        onClose={() => setShowVictoryModal(false)}
        playAgain={playAgain}
        nextStage={nextStage}
      />
    </div>
  );
}