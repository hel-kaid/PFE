import { useEffect, useRef, useState, useCallback } from "react";
import { simulate } from "../../utils/robozzle/engine";
import Board from "./Board";
import Toolbar from "./Toolbar";
import FunctionEditor from "./FunctionEditor";
import ResultBanner from "./ResultBanner";
import "../../css/Game.css";

const FN_META = [
  { label: "F1", color: "#7c6cf8" },
  { label: "F2", color: "#06b6d4" },
  { label: "F3", color: "#f97316" },
];

const DEFAULT_SPEED = 300;

const ERROR_MESSAGES = {
  infinite_loop: "Infinite loop detected",
  fell_off: "Robot fell off the board",
  invalid_config: "Invalid level configuration",
  invalid_command: "Invalid command",
  invalid_color: "Invalid color",
  invalid_function: "Invalid function",
};

function buildStarsSet(stars = []) {
  return new Set(stars.map((s) => `${s.x},${s.y}`));
}

function buildEmptyFunctions(config) {
  return (config.functions ?? []).map((fn, i) => ({
    id: i,
    label: FN_META[i]?.label ?? `F${i + 1}`,
    color: FN_META[i]?.color ?? "#ffffff",
    slots: Array.from({ length: fn.slots ?? 0 }, () => ({
      cmd: null,
      color: null,
    })),
  }));
}

function patchSlot(functions, fnIdx, slotIdx, patch) {
  return functions.map((fn, i) => {
    if (i !== fnIdx) return fn;

    return {
      ...fn,
      slots: fn.slots.map((slot, j) =>
        j === slotIdx ? { ...slot, ...patch } : slot
      ),
    };
  });
}

export default function Game({ stage, onBack, onComplete, onNext }) {
  const config = stage?.config;

  const speedRef = useRef(DEFAULT_SPEED);
  const animRef = useRef(null);

  const [functions, setFunctions] = useState(() =>
    buildEmptyFunctions(config ?? {})
  );

  const [selected, setSelected] = useState({
    cmd: "F",
    color: null,
  });

  const [robotState, setRobotState] = useState(config?.robot ?? null);
  const [starsLeft, setStarsLeft] = useState(() =>
    buildStarsSet(config?.stars)
  );

  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentInstruction, setCurrentInstruction] = useState(null);

  const stopAnimation = useCallback(() => {
    if (animRef.current) {
      clearTimeout(animRef.current);
      animRef.current = null;
    }
  }, []);

  const resetBoard = useCallback(() => {
    if (!config) return;

    setRobotState(config.robot);
    setStarsLeft(buildStarsSet(config.stars));
    setRunning(false);
    setResult(null);
    setErrorMsg(null);
    setCurrentInstruction(null);
  }, [config]);

  const resetState = useCallback(() => {
    stopAnimation();
    resetBoard();
  }, [stopAnimation, resetBoard]);

  useEffect(() => {
    stopAnimation();

    if (!config) return;

    setFunctions(buildEmptyFunctions(config));
    resetBoard();

    return () => stopAnimation();
  }, [stage?.id, config, resetBoard, stopAnimation]);

  const placeCommand = useCallback(
    (fnIdx, slotIdx) => {
      if (running) return;

      setFunctions((prev) =>
        patchSlot(prev, fnIdx, slotIdx, {
          cmd: selected.cmd,
          color: selected.color,
        })
      );
    },
    [running, selected]
  );

  const clearSlot = useCallback(
    (fnIdx, slotIdx) => {
      if (running) return;

      setFunctions((prev) =>
        patchSlot(prev, fnIdx, slotIdx, {
          cmd: null,
          color: null,
        })
      );
    },
    [running]
  );

  const finishAnimation = useCallback(
    (won, forcedError = null) => {
      setRunning(false);
      setCurrentInstruction(null);

      if (won) {
        setResult("win");
        setErrorMsg(null);
        onComplete?.(stage);
        return;
      }

      setResult("lose");
      setErrorMsg(forcedError ?? "Collect all stars");
    },
    [onComplete, stage]
  );

  const animateSteps = useCallback(
    (steps = [], won = false, finalErrorMsg = null) => {
      stopAnimation();

      if (!steps.length) {
        finishAnimation(won, finalErrorMsg);
        return;
      }

      setRunning(true);
      setResult(null);
      setErrorMsg(null);

      let index = 0;

      const tick = () => {
        const step = steps[index];

        if (!step) {
          finishAnimation(won, finalErrorMsg);
          return;
        }

        setRobotState({
          x: step.x,
          y: step.y,
          direction: step.direction,
        });

        setStarsLeft(new Set(step.starsLeft ?? []));

        if (
          step.action &&
          step.action.fnIndex !== undefined &&
          step.action.slotIndex !== undefined
        ) {
          setCurrentInstruction({
            fnIndex: step.action.fnIndex,
            slotIndex: step.action.slotIndex,
            actionType: step.action.type,
            targetFnIndex: step.action.targetFnIndex,
          });
        } else {
          setCurrentInstruction(null);
        }

        index += 1;
        animRef.current = setTimeout(tick, speedRef.current);
      };

      tick();
    },
    [finishAnimation, stopAnimation]
  );

  const handleRun = useCallback(() => {
    if (!config || running) return;

    stopAnimation();
    resetBoard();

    const { steps, won, error } = simulate(config, functions, {
      maxSteps: 1000,
      maxDepth: 100,
    });

    const message = ERROR_MESSAGES[error] ?? "Something went wrong";

    if (error && !won) {
      animateSteps(steps, false, message);
      return;
    }

    animateSteps(steps, won);
  }, [
    config,
    running,
    functions,
    stopAnimation,
    resetBoard,
    animateSteps,
  ]);

  const handleStop = useCallback(() => {
    stopAnimation();
    resetBoard();
  }, [stopAnimation, resetBoard]);

  if (!stage || !config) return null;

  return (
    <div className="robozzle-game">
      <div className="top-bar">
        <button type="button" onClick={onBack} disabled={running}>
          ← Back
        </button>

        <div>
          <h2>{stage.name}</h2>
          <p>{stage.description}</p>
        </div>
      </div>

      <div className="game-layout">
        <Board board={config.board} robot={robotState} starsLeft={starsLeft} />

        <aside className="right-panel">
          <Toolbar
            selected={selected}
            setSelected={setSelected}
            fnCount={config.functions.length}
            disabled={running}
          />

          <FunctionEditor
            functions={functions}
            placeCommand={placeCommand}
            clearSlot={clearSlot}
            running={running}
            currentInstruction={currentInstruction}
          />

          <div className="game-controls">
            {running ? (
              <button type="button" onClick={handleStop}>
                ■ Stop
              </button>
            ) : (
              <button type="button" onClick={handleRun}>
                ▶ Run
              </button>
            )}

            <button type="button" onClick={resetState} disabled={running}>
              ↺ Reset
            </button>
          </div>

          <div className="speed-control">
            <label>Speed</label>
            <input
              type="range"
              min="50"
              max="800"
              defaultValue={DEFAULT_SPEED}
              onChange={(e) => {
                speedRef.current = Number(e.target.value);
              }}
            />
          </div>

          <ResultBanner
            result={result}
            errorMsg={errorMsg}
            onRetry={resetState}
            onNext={onNext}
          />
        </aside>
      </div>
    </div>
  );
}