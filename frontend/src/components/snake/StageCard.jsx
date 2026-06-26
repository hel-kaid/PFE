import { motion } from "framer-motion";
import {
  Lock,
  Play,
  RotateCcw,
  CheckCircle2,
  Trophy,
} from "lucide-react";

export default function StageCard({ stage, onSelect }) {
  const isLocked = stage.locked;
  const isDone = stage.completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!isLocked ? { y: -6, scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
      className="rounded-3xl overflow-hidden bg-white shadow-xl border border-slate-200"
      style={{
        opacity: isLocked ? 0.7 : 1,
        cursor: isLocked ? "not-allowed" : "pointer",
      }}
    >
      {/* Top Bar */}
      <div
        className="h-1"
        style={{
          background: isDone
            ? "#22c55e"
            : isLocked
            ? "#cbd5e1"
            : "linear-gradient(90deg,#f97316,#ec4899)",
        }}
      />

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <span
            className={`text-xs px-3 py-1 rounded-xl font-bold tracking-wider ${
              isDone
                ? "bg-green-50 text-green-700"
                : isLocked
                ? "bg-slate-100 text-slate-400"
                : "bg-orange-50 text-orange-600"
            }`}
          >
            LEVEL {stage.id}
          </span>

          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDone
                ? "bg-green-50"
                : isLocked
                ? "bg-slate-100"
                : "bg-orange-50"
            }`}
          >
            {isLocked ? (
              <Lock size={18} className="text-slate-400" />
            ) : (
              <Trophy
                size={18}
                className={
                  isDone
                    ? "text-green-500"
                    : "text-orange-500"
                }
              />
            )}
          </div>
        </div>

        <h3
          className={`font-bold text-base mb-2 ${
            isLocked
              ? "text-slate-400"
              : "text-slate-800"
          }`}
        >
          {stage.name}
        </h3>

        <p className="text-sm text-slate-500 leading-relaxed">
          {stage.description}
        </p>

        {isDone && (
          <div className="flex items-center gap-2 mt-4 px-3 py-2 rounded-xl bg-green-50 border border-green-200">
            <CheckCircle2
              size={14}
              className="text-green-500"
            />
            <span className="text-xs font-semibold text-green-700">
              Complété
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
        <span className="text-xs text-slate-400">
          {stage.config?.gridSize}×{stage.config?.gridSize}
        </span>

        {isLocked ? (
          <button
            disabled
            className="flex items-center gap-2 text-xs px-4 py-2 rounded-xl bg-slate-100 text-slate-400"
          >
            <Lock size={12} />
            Verrouillé
          </button>
        ) : isDone ? (
          <button
            onClick={() => onSelect(stage.id)}
            className="flex items-center gap-2 text-xs px-4 py-2 rounded-xl bg-green-50 border border-green-200 text-green-700 font-semibold"
          >
            <RotateCcw size={12} />
            Rejouer
          </button>
        ) : (
          <button
            onClick={() => onSelect(stage.id)}
            className="flex items-center gap-2 text-xs px-4 py-2 rounded-xl text-white font-semibold shadow-md hover:scale-105 transition"
            style={{
              background:
                "linear-gradient(135deg,#f97316,#ec4899)",
            }}
          >
            <Play size={12} />
            Jouer
          </button>
        )}
      </div>
    </motion.div>
  );
}