import { useEffect, useState, useCallback } from "react";
import { api } from "../services/api";

export default function useRobozzleStages(gameId) {
  const [stages, setStages] = useState([]);
  const [currentStage, setCurrentStage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // =========================
  // LOAD ALL STAGES
  // =========================

  const fetchStages = useCallback(async () => {
    if (!gameId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await api.get(
        `/robozzle/${gameId}/stages`
      );

      setStages(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to load stages"
      );
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchStages();
  }, [fetchStages]);

  // =========================
  // LOAD SINGLE STAGE
  // =========================

  const fetchStage = useCallback(async (stageId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(
        `/robozzle/stages/${stageId}`
      );

      setCurrentStage(response.data);

      return response.data;
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to load stage"
      );

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================
  // COMPLETE STAGE
  // =========================

  const completeStage = useCallback(
    async (stageId) => {
      try {
        const response = await api.post(
          "/robozzle/complete",
          {
            game_id: gameId,
            stage_id: stageId,
          }
        );

        setStages((prev) =>
          prev.map((s) =>
            s.id === stageId
              ? { ...s, completed: true }
              : s
          )
        );

        return response.data;
      } catch (err) {
        console.error(
          err.response?.data ||
          err.message
        );

        throw err;
      }
    },
    [gameId]
  );

  return {
    stages,
    currentStage,
    loading,
    error,
    fetchStages,
    fetchStage,
    completeStage,
    setCurrentStage,
  };
}