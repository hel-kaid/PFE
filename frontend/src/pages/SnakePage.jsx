import { useState } from "react";
import useSnakeGameStages from "../hooks/useSnakeGameStages";
import StageCard from "../components/Snake/StageCard";
import SnakeGame from "../components/Snake/SnakeGame";
import "../css/PythonGame.css";
export default function SnakePage() {
  const gameId = 1;

  const {
    stages,
    currentStage,
    fetchStage,
    completeStage,
    loading,
  } = useSnakeGameStages(gameId);

  const [selectedStageId, setSelectedStageId] = useState(null);

  async function handleSelect(stageId) {
    setSelectedStageId(stageId);
    await fetchStage(stageId);
  }

  if (loading) return <h2 className="html-loading">Loading...</h2>;

  if (selectedStageId && currentStage) {
    return (
      <SnakeGame
        stage={currentStage}
        stages={stages}
        onBack={() => setSelectedStageId(null)}
        onSelectStage={handleSelect}
        completeStage={completeStage}
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-88px)] bg-gradient-to-br from-slate-50 via-white to-sky-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900">
            🐍 Snake Control
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Choisis un niveau et programme le dragon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {stages.map((stage) => (
            <StageCard
              key={stage.id}
              stage={stage}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}