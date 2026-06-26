import PythonRpgStageCard
from "./PythonRpgStageCard";

export default function PythonRpgStages({
    stages,
    onSelect,
}) {

    return (

        <div
            className="
                grid
                md:grid-cols-2
                lg:grid-cols-3
                gap-4
            "
        >

            {stages.map((stage) => (

                <PythonRpgStageCard
                    key={stage.id}
                    stage={stage}
                    onClick={onSelect}
                />

            ))}

        </div>

    );
}