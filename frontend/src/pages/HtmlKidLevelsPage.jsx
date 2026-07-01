import { useState } from "react";
import useHtmlKidStages from "../hooks/useHtmlKidStages";
import HtmlKidStageCard from "../components/htmlKid/HtmlKidStageCard";
import HtmlKidGame from "../components/htmlKid/HtmlKidGame";
import "../css/HtmlKidGame.css";
export default function HtmlKidLevelsPage() {
    const gameId = 4;

    const { stages, loading, error, fetchStages } =
        useHtmlKidStages(gameId);

    const [selectedStageId, setSelectedStageId] = useState(null);

    if (selectedStageId) {
        return (
            <HtmlKidGame
                gameId={gameId}
                stageId={selectedStageId}
                stages={stages}
                onSelectStage={setSelectedStageId}
                onBack={() => {
                    setSelectedStageId(null);
                    fetchStages();
                }}
            />
        );
    }
    if (loading) return <h2 className="html-loading">Loading...</h2>;


    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900">
                        HTML Kid Game
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Choisis un niveau et construis des pages HTML.
                    </p>
                </div>

                {loading && (
                    <p className="font-bold text-slate-500">
                    </p>
                )}

                {error && (
                    <p className="rounded-xl bg-red-50 p-4 font-bold text-red-600">
                        {error}
                    </p>
                )}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {stages.map((stage) => (
                        <HtmlKidStageCard
                            key={stage.id}
                            stage={stage}
                            onPlay={setSelectedStageId}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}