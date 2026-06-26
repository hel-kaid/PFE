import { useState } from "react";
import { api } from "../services/api";

export function useBadges() {
    const [badges, setBadges] = useState([]);
    const [badge, setBadge] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function getBadges() {
        try {
            setLoading(true);
            const res = await api.get("/badges");
            setBadges(res.data);
            return res.data;
        } catch (err) {
            setError(err.response?.data);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function getBadge(id) {
        try {
            setLoading(true);
            const res = await api.get(`/badges/${id}`);
            setBadge(res.data);
            return res.data;
        } catch (err) {
            setError(err.response?.data);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function createBadge(data) {
        try {
            setLoading(true);
            const res = await api.post("/badges", data);
            setBadges((prev) => [...prev, res.data.data]);
            return res.data;
        } catch (err) {
            setError(err.response?.data);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    async function updateBadge(id, data) {
        try {
            setLoading(true);
            const res = await api.put(`/badges/${id}`, data);
            setBadges((prev) =>
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

    async function deleteBadge(id) {
        try {
            setLoading(true);
            const res = await api.delete(`/badges/${id}`);
            setBadges((prev) => prev.filter((item) => item.id !== id));
            return res.data;
        } catch (err) {
            setError(err.response?.data);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return {
        badges,
        badge,
        error,
        loading,
        getBadges,
        getBadge,
        createBadge,
        updateBadge,
        deleteBadge,
    };
}
