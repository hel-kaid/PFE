import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useRobozzleStages from "../hooks/useRobozzleStages";
import Game from "../components/robozzle/Game";
import "../css/GameStyles.css";

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

  if (loading && !currentStage) {
    return (
      <div className="robozzle-loading">
        <div className="loading-spinner" />
        <div className="loading-text">
          <span className="blink">█</span> CHARGEMENT DU NIVEAU...
        </div>
        <div className="loading-sub">Initialisation du système</div>
      </div>
    );
  }

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

  if (!currentStage) {
    return (
      <div className="robozzle-notfound">
        <div className="notfound-icon">🔍</div>
        <div className="notfound-title">NIVEAU INTROUVABLE</div>
        <div className="notfound-message">
          Le niveau #{stageId} n'existe pas dans la matrice
        </div>

        <button className="notfound-button" onClick={goBack}>
          ⟲ RETOUR À LA LISTE
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