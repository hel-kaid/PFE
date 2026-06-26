export default function PythonRpgStageCard({
    stage,
    onClick,
}) {
    const status = stage.completed
        ? "completed"
        : stage.locked
        ? "locked"
        : "ready";

    const statusStyles = {
        completed: {
            label: "Completed",
            dot: "bg-green-500",
            badge: "bg-green-50 text-green-700 border-green-200",
            card: "border-green-200",
        },
        locked: {
            label: "Locked",
            dot: "bg-gray-400",
            badge: "bg-gray-100 text-gray-600 border-gray-200",
            card: "border-gray-200 opacity-60 cursor-not-allowed",
        },
        ready: {
            label: "Ready",
            dot: "bg-blue-500",
            badge: "bg-blue-50 text-blue-700 border-blue-200",
            card: "border-blue-200 hover:border-blue-400",
        },
    };

    return (
        <div
            onClick={() => {
                if (!stage.locked) onClick(stage.id);
            }}
            className={`
                bg-white
                border
                rounded-xl
                p-5
                shadow-sm
                transition-all
                duration-200
                hover:shadow-md
                ${statusStyles[status].card}
            `}
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Stage {stage.order}
                    </p>

                    <h3 className="mt-1 text-base font-semibold text-gray-900">
                        {stage.name}
                    </h3>
                </div>

                <span
                    className={`
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${statusStyles[status].badge}
                    `}
                >
                    <span
                        className={`
                            h-2
                            w-2
                            rounded-full
                            ${statusStyles[status].dot}
                        `}
                    />
                    {statusStyles[status].label}
                </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-600">
                {stage.description}
            </p>
        </div>
    );
}