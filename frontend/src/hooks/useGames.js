import { useState } from "react";
import { api } from "../services/api";

export function useGames() {
    const [games, setGames] = useState([]);
    const [game, setGame] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getGames() {
        try {
            setLoading(true);
            const res = await api.get("/games");
            setGames(res.data);
            return res.data;
        } catch (err) {
            setError(err.response?.data);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function getGame(id) {
        try {
            setLoading(true);
            const res = await api.get(`/games/${id}`);
            setGame(res.data);
            return res.data;
        } catch (err) {
            setError(err.response?.data);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function createGame(data) {
        try {
            setLoading(true);
            const res = await api.post("/games", data);
            setGames((prev) => [...prev, res.data.data]);
            return res.data;
        } catch (err) {
            setError(err.response?.data);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function updateGame(id, data) {
        try {
            setLoading(true);
            const res = await api.put(`/games/${id}`, data);
            setGames((prev) =>
                prev.map((item) =>
                    item.id === id ? res.data.data : item
                )
            );
            return res.data;
        } catch (err) {
            setError(err.response?.data);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function deleteGame(id) {
        try {
            setLoading(true);
            const res = await api.delete(`/games/${id}`);
            setGames((prev) => prev.filter((item) => item.id !== id));
            return res.data;
        } catch (err) {
            setError(err.response?.data);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return {
        games,
        game,
        error,
        loading,
        getGames,
        getGame,
        createGame,
        updateGame,
        deleteGame,
    };
}
