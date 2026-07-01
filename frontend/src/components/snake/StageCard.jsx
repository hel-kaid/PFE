import {
  Clock3,
  Star,
  Lock,
  Play,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

export default function StageCard({ stage, onSelect }) {
  const isLocked = Boolean(stage.locked);
  const isDone = Boolean(stage.completed);

  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="h-2 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500" />

      <div className="p-6">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
            Level {stage.id}
          </span>

          {isDone && <CheckCircle2 size={26} className="text-green-500" />}

          {!isDone && isLocked && (
            <Lock size={22} className="text-slate-400" />
          )}
        </div>

        <h2 className="mt-5 line-clamp-1 text-xl font-black text-slate-800">
          {stage.name}
        </h2>

        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">
          {stage.description}
        </p>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-2 text-slate-500">
            <Clock3 size={18} />
            <span className="font-bold">
              {stage.timer_seconds ?? stage.timerSeconds ?? 0}s
            </span>
          </div>

          <div className="flex items-center gap-2 text-yellow-500">
            <Star size={18} />
            <span className="font-bold">{stage.xp_reward ?? 0} XP</span>
          </div>
        </div>

        <button
          disabled={isLocked}
          onClick={() => !isLocked && onSelect(stage.id)}
          className={`
            mt-6 flex w-full items-center justify-center gap-2 rounded-2xl py-3 font-black transition-all duration-300
            ${
              isLocked
                ? "cursor-not-allowed bg-slate-200 text-slate-500"
                : isDone
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:scale-105 hover:shadow-lg"
            }
          `}
        >
          {isLocked ? (
            <>
              <Lock size={18} />
              Locked
            </>
          ) : isDone ? (
            <>
              <RotateCcw size={18} />
              Play Again
            </>
          ) : (
            <>
              <Play size={18} />
              Play
            </>
          )}
        </button>
      </div>
    </div>
  );
}