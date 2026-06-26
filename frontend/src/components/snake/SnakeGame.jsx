import { useState, useEffect } from "react";
import CodeEditor from "../CodeEditor";
import GameGrid from "./GameGrid";
import VictoryModal from "../VictoryModal";

import { parseCode } from "../../utils/snake_rpg/parser";
import { COMMANDS } from "../../utils/snake_rpg/constants";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function SnakeGame({
  stage,
  stages,
  onBack,
  onSelectStage,
  completeStage,
}) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [explosion, setExplosion] = useState(null);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [snakeTrail, setSnakeTrail] = useState([]);

  useEffect(() => {
    if (!stage?.config) return;

    setCode(stage.config.defaultCode || "");
    setSnakeTrail(stage.config.snakeStart ? [stage.config.snakeStart] : []);
    setExplosion(null);
    setMessage("");
  }, [stage]);

  function resetGame() {
    if (!stage?.config) return;

    setSnakeTrail(stage.config.snakeStart ? [stage.config.snakeStart] : []);
    setExplosion(null);
    setMessage("");
  }

  function playAgain() {
    setShowVictoryModal(false);
    resetGame();
  }

  function nextStage() {
    const currentIndex = stages.findIndex((s) => s.id === stage.id);
    const next = stages[currentIndex + 1];

    setShowVictoryModal(false);

    if (!next) {
      onBack();
      return;
    }

    onSelectStage(next.id);
  }

  async function runCode() {
    if (isRunning || !stage?.config) return;

    resetGame();
    setIsRunning(true);

    let x = stage.config.snakeStart.x;
    let y = stage.config.snakeStart.y;

    try {
      const actions = parseCode(code);

      for (const action of actions) {
        if (action === COMMANDS.RIGHT) x++;
        if (action === COMMANDS.LEFT) x--;
        if (action === COMMANDS.UP) y--;
        if (action === COMMANDS.DOWN) y++;

        const size = stage.config.gridSize;

        if (x < 0 || y < 0 || x >= size || y >= size) {
          setMessage("Hors limites ❌");
          return;
        }

        const obstacle = stage.config.obstacles?.some(
          (o) => o.x === x && o.y === y
        );

        if (obstacle) {
          setExplosion({ x, y });
          setMessage("Tu as touché un mur ❌");
          return;
        }

        setSnakeTrail((prev) => [...prev, { x, y }]);
        await sleep(250);
      }

      const treasure = stage.config.treasure;

      if (x !== treasure.x || y !== treasure.y) {
        setMessage("Trésor non atteint ❌");
        return;
      }

      if (stage.config.requiresLoop && !code.includes("for")) {
        setMessage("Utilise une boucle ❌");
        return;
      }

      await completeStage(stage.id);

      setMessage("Niveau terminé 🎉");
      setShowVictoryModal(true);
    } catch (err) {
      setMessage(err.message || "Erreur");
    } finally {
      setIsRunning(false);
    }
  }

  if (!stage?.config) {
    return <p className="p-10 text-slate-600">Chargement...</p>;
  }

  return (
  <div className=" overflow-hidden bg-gradient-to-br from-sky-100 via-white to-violet-100 p-4">
    <div className="h-full max-w-[1500px] mx-auto flex flex-col gap-4 overflow-hidden">

      {/* Header */}
      <div className="shrink-0 bg-white rounded-[28px] border border-slate-200 shadow-lg px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-5 py-3 rounded-2xl bg-slate-900 text-white font-bold"
          >
            ← Retour
          </button>

          <div className="px-4 py-2 rounded-2xl bg-amber-100 text-amber-700 font-black">
            ⭐ Niveau {stage.id}
          </div>
        </div>

        <div className="text-sm font-bold text-slate-500">
          Snake Control
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 grid grid-cols-[1fr_520px] gap-4 overflow-hidden">

        {/* Left */}
        <div className="min-h-0 flex flex-col gap-4 overflow-hidden">
          <div className="flex-1 min-h-0">
            <GameGrid
              currentStage={stage}
              snakeTrail={snakeTrail}
              explosion={explosion}
              message={message}
            />
          </div>

          <div className="shrink-0 bg-white rounded-[24px] border border-slate-200 shadow-lg p-4">
            <h3 className="font-black text-slate-800 mb-3">
              📖 Commandes disponibles
            </h3>

            <div className="grid grid-cols-4 gap-3">
              <div className="rounded-2xl bg-blue-50 p-3 font-bold">➡️ move_right()</div>
              <div className="rounded-2xl bg-green-50 p-3 font-bold">⬅️ move_left()</div>
              <div className="rounded-2xl bg-purple-50 p-3 font-bold">⬆️ move_up()</div>
              <div className="rounded-2xl bg-orange-50 p-3 font-bold">⬇️ move_down()</div>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="min-h-0 overflow-hidden">
          <CodeEditor
            code={code}
            setCode={setCode}
            runCode={runCode}
            resetGame={resetGame}
            isRunning={isRunning}
          />
        </div>
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