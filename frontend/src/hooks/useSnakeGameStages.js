import { useEffect, useState, useCallback } from "react";
import { api } from "../services/api";

export default function useSnakeGameStages(gameId) {

    const [stages, setStages] = useState([]);
    const [currentStage, setCurrentStage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (gameId) {
            fetchStages();
        }

    }, [gameId]);

    async function fetchStages() {

        try {

            setLoading(true);

            const response = await api.get(
                `/snake/${gameId}/stages`
            );

            setStages(response.data);

        } catch (err) {

            console.error(err);

            setError("Failed to load stages");

        } finally {

            setLoading(false);
        }
    }

    const fetchStage = useCallback(async (stageId) => {

        try {

            setLoading(true);
            setError(null);

            const res = await api.get(
                `snake/stages/${stageId}`
            );

            setCurrentStage(res.data);

            return res.data;

        } catch (err) {

            console.error("Error fetching stage:", err);
            setError(err.response?.data?.message || err.message);
            throw err;

        } finally {

            setLoading(false);
        }

    }, []);

    const completeStage = useCallback(
        async (stageId) => {
            try {
                const response = await api.post("/snake/complete", {
                    game_id: parseInt(gameId),
                    stage_id: parseInt(stageId),
                });
                console.log(
                    `+${response.data.xp_gained} XP`
                );

                console.log(
                    `Level ${response.data.level}`
                );

                // Refresh stages after completion
                setStages((prev) =>
                    prev.map((s) =>
                        s.id === stageId
                            ? { ...s, completed: true }
                            : s
                    )
                );

                return response.data;
            } catch (err) {
                console.error("❌ Complete stage error:", err.response?.data || err.message);
                throw err;
            }
        },
        [gameId]
    );

    return {
        stages,
        currentStage,
        setCurrentStage,
        loading,
        error,
        refetch: fetchStages,
        fetchStage,
        completeStage,
    };
}