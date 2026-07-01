import { useState, useEffect } from "react";
import usePythonRpgStages from "../hooks/usePythonRpgStages";
import PythonRpgStages from "../components/rpg/PythonRpgStages";
import PythonRpgGame from "../components/rpg/PythonRpgGame";
import "../css/PythonGame.css";
export default function PythonRpgPage() {

    const gameId = 2;
    const {
        stages,
        currentStage,
        loading,
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
    if (loading) return <h2 className="html-loading">Loading...</h2>;

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