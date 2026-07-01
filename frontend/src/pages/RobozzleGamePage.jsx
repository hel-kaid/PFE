import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRobozzleStages from "../hooks/useRobozzleStages";
import Game from "../components/robozzle/Game";
import "../css/GameStyles.css";
import "../css/PythonGame.css";
export default function RobozzleGamePage() {
  const { stageId } = useParams();
  const navigate = useNavigate();

  const [completionData, setCompletionData] = useState(null);
  const [completionLoading, setCompletionLoading] = useState(false);
  const [completionError, setCompletionError] = useState(null);

  const {
    currentStage,
    fetchStage,
    completeStage,
    loading,
    error,
  } = useRobozzleStages(3);

  useEffect(() => {
    if (!stageId) return;

    setCompletionData(null);
    setCompletionError(null);
    fetchStage(stageId);
  }, [stageId, fetchStage]);

  const goBack = useCallback(() => {
    navigate("/robozzle");
  }, [navigate]);

  const handleComplete = useCallback(async () => {
    if (!stageId || completionLoading || completionData) return;

    try {
      setCompletionLoading(true);
      setCompletionError(null);

      const response = await completeStage(stageId);

      setCompletionData({
        xpGained: response?.xp_gained ?? 0,
        level: response?.level ?? null,
      });
    } catch (err) {
      console.error(err);
      setCompletionError("Impossible de sauvegarder la progression.");
    } finally {
      setCompletionLoading(false);
    }
  }, [
    stageId,
    completeStage,
    completionLoading,
    completionData,
  ]);

   if (loading) return <h2 className="html-loading">Loading...</h2>;

  if (error) {
    return (
      <div className="robozzle-error">
        <div className="error-icon">⛔</div>
        <div className="error-title">ERREUR SYSTÈME</div>
        <div className="error-message">{error}</div>

        <button className="error-button" onClick={goBack}>
          ⟲ RETOUR
        </button>
      </div>
    );
  }

  

  return (
    <div className="robozzle-game-wrapper">
      {completionError && (
        <div className="completion-error">
          {completionError}
        </div>
      )}

      <div className="game-container">
        <Game
          stage={currentStage}
          onBack={goBack}
          onComplete={handleComplete}
          xpGained={completionData?.xpGained}
          level={completionData?.level}
        />
      </div>
    </div>
  );
}