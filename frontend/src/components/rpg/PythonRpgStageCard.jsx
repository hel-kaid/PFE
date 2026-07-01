export default function PythonRpgStageCard({ stages, onStageClick }) {
  const getStatus = (stage) => {
    if (stage.completed) return "completed";
    if (stage.locked) return "locked";
    return "ready";
  };

  const getNodeStyle = (status) => {
    if (status === "completed") {
      return "bg-gradient-to-br from-green-400 to-emerald-500 text-white border-green-300 shadow-green-200";
    }

    if (status === "locked") {
      return "bg-slate-200 text-slate-400 border-slate-300 shadow-slate-100 cursor-not-allowed";
    }

    return "bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 text-white border-orange-300 shadow-orange-200 animate-pulse";
  };

  const getIcon = (status, index, total) => {
    if (index === total - 1) return "🏆";
    if (status === "completed") return "★";
    if (status === "locked") return "🔒";
    return "▶";
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-50 via-purple-50 to-orange-50 px-4 py-12">
      <div className="absolute left-10 top-20 h-24 w-24 rounded-full bg-orange-200/40 blur-2xl" />
      <div className="absolute right-10 top-40 h-32 w-32 rounded-full bg-pink-200/40 blur-2xl" />
      <div className="absolute left-1/2 bottom-20 h-40 w-40 rounded-full bg-purple-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-md">
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-500 shadow-sm">
            Python RPG Journey
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
            Choose Your Stage
          </h2>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Complete each mission to unlock the next one.
          </p>
        </div>

        <div className="relative flex flex-col items-center gap-10">
          <div className="absolute top-8 bottom-8 left-1/2 w-2 -translate-x-1/2 rounded-full bg-white shadow-inner" />

          {stages.map((stage, index) => {
            const status = getStatus(stage);
            const isLeft = index % 2 === 0;

            return (
              <div
                key={stage.id}
                className={`relative z-10 flex w-full ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                <button
                  type="button"
                  disabled={stage.locked}
                  onClick={() => !stage.locked && onStageClick(stage.id)}
                  className={`
                    group relative flex h-24 w-24 items-center justify-center
                    rounded-full border-4 text-3xl font-black
                    shadow-xl transition-all duration-300
                    hover:-translate-y-1 hover:scale-105
                    disabled:hover:translate-y-0 disabled:hover:scale-100
                    ${getNodeStyle(status)}
                  `}
                >
                  {getIcon(status, index, stages.length)}

                  <span className="absolute -bottom-8 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">
                    Stage {stage.order}
                  </span>

                  {!stage.locked && (
                    <div className="absolute left-1/2 top-full mt-10 hidden w-56 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-xl group-hover:block">
                      <h3 className="text-sm font-black text-slate-900">
                        {stage.name}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">
                        {stage.description}
                      </p>

                      <p className="mt-3 text-xs font-bold text-orange-500">
                        Click to start
                      </p>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}