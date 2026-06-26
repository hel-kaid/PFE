import { motion } from "framer-motion";
import { Sparkles, AlertTriangle } from "lucide-react";
import { useMemo } from "react";

export default function GameGrid({
  currentStage,
  snakeTrail,
  explosion,
  message,
}) {
  const gridSize = currentStage.config.gridSize;

  const snakeSet = useMemo(
    () => new Set(snakeTrail.map((s) => `${s.x},${s.y}`)),
    [snakeTrail]
  );

  const obstacleSet = useMemo(
    () =>
      new Set(
        currentStage.config.obstacles?.map((o) => `${o.x},${o.y}`) || []
      ),
    [currentStage]
  );

  const treasureKey = `${currentStage.config.treasure.x},${currentStage.config.treasure.y}`;

  const cells = useMemo(
    () =>
      Array.from({ length: gridSize * gridSize }, (_, i) => ({
        x: i % gridSize,
        y: Math.floor(i / gridSize),
        key: `${i % gridSize},${Math.floor(i / gridSize)}`,
      })),
    [gridSize]
  );

  return (
    <div className="h-full min-h-0 flex flex-col rounded-[32px] bg-white border border-slate-200 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="shrink-0 px-5 py-3 bg-slate-900 text-white">
        <h2 className="font-black text-lg">🐉 Terrain du dragon</h2>
        <p className="text-xs text-slate-300">
          Guide le dragon jusqu’à l’étoile.
        </p>
      </div>

      {/* Grid Area */}
      <div className="flex-1 min-h-0 flex items-center justify-center p-4 bg-gradient-to-br from-sky-50 to-violet-50 overflow-hidden">
        <div
          className="grid gap-2 p-4 rounded-[28px] bg-white shadow-inner border border-slate-200 h-full aspect-square max-h-full max-w-full"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          }}
        >
          {cells.map(({ x, y, key }) => {
            const isSnake = snakeSet.has(key);
            const isTreasure = treasureKey === key;
            const isObstacle = obstacleSet.has(key);
            const isExplosion = explosion?.x === x && explosion?.y === y;

            return (
              <motion.div
                key={key}
                whileHover={{ scale: 1.04 }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 18,
                }}
                className="w-full aspect-square rounded-2xl flex items-center justify-center relative shadow-sm border overflow-hidden"
                style={{
                  background: isSnake
                    ? "#dcfce7"
                    : isObstacle
                    ? "#fee2e2"
                    : isTreasure
                    ? "#fef3c7"
                    : "#f8fafc",
                  borderColor: isSnake
                    ? "#22c55e"
                    : isObstacle
                    ? "#ef4444"
                    : isTreasure
                    ? "#f59e0b"
                    : "#e2e8f0",
                }}
              >
                {isExplosion && (
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 rounded-full bg-orange-400"
                  />
                )}

                {isSnake && (
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.4,
                    }}
                    className="text-2xl relative z-10"
                  >
                    🐉
                  </motion.span>
                )}

                {!isSnake && isTreasure && (
                  <motion.span
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.8,
                    }}
                    className="text-2xl relative z-10"
                  >
                    ⭐
                  </motion.span>
                )}

                {!isSnake && !isTreasure && isObstacle && (
                  <span className="text-2xl relative z-10">🪨</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 px-4 py-3 bg-white border-t border-slate-200 flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-2xl flex items-center justify-center ${
            message ? "bg-red-100" : "bg-green-100"
          }`}
        >
          {message ? (
            <AlertTriangle size={17} className="text-red-500" />
          ) : (
            <Sparkles size={17} className="text-green-500" />
          )}
        </div>

        <p className="text-sm font-semibold text-slate-700 truncate">
          {message || "Écris ton code puis lance le programme."}
        </p>
      </div>
    </div>
  );
}