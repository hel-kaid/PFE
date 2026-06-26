import { useState, useEffect } from "react";
import usePythonRpgStages from "../hooks/usePythonRpgStages";
import PythonRpgStages from "../components/rpg/PythonRpgStages";
import PythonRpgGame from "../components/rpg/PythonRpgGame";

export default function PythonRpgPage() {

    const gameId = 2;
    const {
        stages,
        currentStage,
        fetchStage,
        completeStage,
    } = usePythonRpgStages(gameId);

    const [selectedStageId,
        setSelectedStageId] = useState(null);

    async function handleSelect(
        stageId
    ) {

        setSelectedStageId(stageId);

        await fetchStage(stageId);
    }

    useEffect(() => {
    }, [currentStage?.id]);
    return (

        <div className="mx-auto mt-6">
            {!selectedStageId && (

                <PythonRpgStages
                    stages={stages}
                    onSelect={handleSelect}
                />

            )}

            {selectedStageId &&
                currentStage && (

                    <PythonRpgGame
                        stage={currentStage}
                        stages={stages}
                        onBack={() =>
                            setSelectedStageId(null)
                        }
                        onSelectStage={handleSelect}
                        completeStage={completeStage}
                    />

                )}

        </div>

    );
}