import { useEffect, useState, useCallback } from "react";
import { api } from "../services/api";

export default function useHtmlKidStages(gameId) {
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
                `/html-kid/${gameId}/stages`
            );

            setStages(response.data);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to load HTML Kid stages"
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
                `/html-kid/stages/${stageId}`
            );

            setCurrentStage(response.data);

            return response.data;
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Failed to load HTML Kid stage"
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
        async (stageId, elapsedSeconds = 1, answers = []) => {
            try {
                const response = await api.post(
                    "/html-kid/stages/complete",
                    {
                        game_id: gameId,
                        stage_id: stageId,
                        elapsed_seconds: elapsedSeconds,
                        answers: answers,
                    }
                );

                setStages((prev) =>
                    prev.map((stage) =>
                        stage.id === stageId
                            ? { ...stage, completed: true }
                            : stage
                    )
                );

                return response.data;
            } catch (err) {
                console.error(
                    "Complete HTML Kid stage error:",
                    err.response?.data || err.message
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