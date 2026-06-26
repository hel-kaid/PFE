import { useState, useCallback, useRef } from "react";
import { api } from "../services/api"


export function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const register = useCallback(async (data) => {
    try {
      const res = await api.post("/register", data);
      return res.data;
    } catch (err) {
      setError(err.response?.data);
      throw err;
    }
  }, []);

  const login = useCallback(async (data) => {
    try {
      setLoading(true);
      const res = await api.post("/login", data);
      localStorage.setItem("token", res.data.token);

      // Charger le profil immédiatement après la connexion
      // en appelant l'API directement pour éviter les cycles de dépendances
      try {
        const profileRes = await api.get("/profile");
        setUser(profileRes.data.user);
      } catch (profileErr) {
        console.error("Erreur lors du chargement du profil:", profileErr);
        // Garder le user même si le profil échoue
        if (res.data.user) {
          setUser(res.data.user);
        }
      }

      return res.data;
    } catch (err) {
      setError(err.response?.data);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const profile = useCallback(async () => {
    // Éviter les appels multiples en même temps
    if (isLoadingRef.current) {
      return;
    }

    try {
      isLoadingRef.current = true;
      setLoading(true);

      const res = await api.get("/profile");
      setUser(res.data.user);
      setError(null);

      return res.data.user;
    } catch (err) {
      setError(err.response?.data);
      setUser(null);
    } finally {
      setLoading(false);
      isLoadingRef.current = false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("token");
      setUser(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data);
    }
  }, []);

  const updateProfile = useCallback(async (data) => {
    try {
      setLoading(true);
      const res = await api.put("/profile/update", data);
      setUser(res.data.user);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    error,
    loading,
    register,
    login,
    profile,
    logout,
    updateProfile,
  };
}