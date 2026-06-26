import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useBadges } from "../hooks/useBadges";

import {
    Mail,
    Award,
    TrendingUp,
    Flame,
    Zap,
    Trophy,
    Edit,
    ArrowLeft,
    LogOut,
} from "lucide-react";

import BadgeCard from "../components/badge/Badge";

export default function Profile() {

    const { user, profile, logout } = useAuth();
    const { badges, getBadges } = useBadges();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const loadProfileData = async () => {

            try {

                setIsLoading(true);

                await Promise.all([
                    profile(),
                    getBadges(),
                ]);

            } catch (err) {

                console.error(
                    "Error loading profile:",
                    err
                );

            } finally {

                setIsLoading(false);
            }
        };

        loadProfileData();

    }, [navigate]);

    const handleLogout = async () => {

        try {

            await logout();

            localStorage.removeItem("token");

            navigate("/login");

        } catch (err) {

            console.error("Logout error:", err);
        }
    };

    // Optimisation calculs
    const stats = useMemo(() => {

    
        return { 
            totalXP: user?.xp || 0,
            currentLevel: user?.level || 1,
            streakDays: user?.streak_days || 0,
        };

    }, [ user]);

    // Loading
    if (isLoading) {

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">

                <div className="text-center">

                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

                    <p className="text-slate-500 font-semibold">
                        Chargement du profil...
                    </p>

                </div>

            </div>
        );
    }

    // Protection
    if (!user) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500">
                    Utilisateur introuvable
                </p>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">

            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">

                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition font-semibold"
                    >

                        <ArrowLeft className="w-5 h-5" />

                        Retour au Dashboard

                    </button>

                </div>

                {/* PROFILE */}
                <div className="rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 bg-white mb-8">

                    {/* Top */}
                    <div className="bg-gradient-to-br from-purple-700 via-pink-600 to-orange-500 px-8 py-12 text-white">

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                            {/* Left */}
                            <div className="flex flex-col sm:flex-row items-center gap-6">

                                <img
                                    src={
                                        user.avatar ||
                                        `https://ui-avatars.com/api/?name=${user.username}&size=150`
                                    }
                                    alt={user.username}
                                    loading="lazy"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-2xl object-cover"
                                />

                                <div>

                                    <h1 className="text-4xl font-black tracking-tight">
                                        {user.username}
                                    </h1>

                                    <p className="mt-2 text-white/80 text-lg flex items-center gap-2">

                                        <Mail className="w-5 h-5" />

                                        {user.email}

                                    </p>

                                    <div className="mt-4">

                                        <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white font-semibold">
                                            Membre actif
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3">

                                <button
                                    onClick={() =>
                                        navigate("/profile/edit")
                                    }
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-purple-700 font-semibold shadow-lg hover:shadow-xl transition"
                                >

                                    <Edit className="w-5 h-5" />

                                    Modifier Profil

                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg hover:shadow-xl transition"
                                >

                                    <LogOut className="w-5 h-5" />

                                    Déconnexion

                                </button>

                            </div>

                        </div>

                    </div>

                    {/* Stats */}
                    <div className="p-8 bg-gradient-to-b from-white to-slate-50">

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                            {/* LEVEL */}
                            <StatCard
                                icon={<Trophy className="w-6 h-6 text-yellow-500" />}
                                title="Niveau"
                                value={stats.currentLevel}
                                subtitle="Progression rapide"
                            />

                            {/* XP */}
                            <StatCard
                                icon={<Zap className="w-6 h-6 text-orange-500" />}
                                title="XP Total"
                                value={stats.totalXP.toLocaleString()}
                                subtitle="Points d'expérience"
                            />

                            {/* GAMES */}
                            <StatCard
                                icon={<Award className="w-6 h-6 text-blue-500" />}
                                title="Jeux"
                                value={stats.totalGamesCompleted}
                                subtitle="Complétés"
                            />

                            {/* STREAK */}
                            <StatCard
                                icon={<Flame className="w-6 h-6 text-red-500" />}
                                title="Streak"
                                value={stats.streakDays}
                                subtitle="Jours consécutifs"
                            />

                        </div>

                    </div>

                </div>

                {/* Progress */}
                <div className="rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 bg-white mb-8">

                    <div className="p-8">

                        <div className="flex items-center gap-3 mb-8">

                            <TrendingUp className="w-8 h-8 text-orange-500" />

                            <h2 className="text-3xl font-black text-slate-900">
                                Progression
                            </h2>

                        </div>

                        

                            <div className="text-center py-12">

                                <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />

                                <p className="text-slate-500">
                                    Pas de progression enregistrée
                                </p>

                            </div>
                    </div>

                </div>

                {/* Badges */}
                <div className="rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 bg-white">

                    <div className="p-8">

                        <div className="flex items-center gap-3 mb-8">

                            <Trophy className="w-8 h-8 text-yellow-500" />

                            <h2 className="text-3xl font-black text-slate-900">
                                Badges Débloqués
                            </h2>

                        </div>

                        {badges?.length > 0 ? (

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                                {badges.map((badge) => (

                                    <BadgeCard
                                        key={badge.id}
                                        name={badge.name}
                                        icon={badge.icon}
                                        description={badge.description}
                                    />
                                ))}

                            </div>

                        ) : (

                            <div className="text-center py-12">

                                <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-4" />

                                <p className="text-slate-500">
                                    Complète des défis pour débloquer des badges
                                </p>

                            </div>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

/* COMPONENT */
function StatCard({ icon, title, value, subtitle }) {

    return (

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-md hover:shadow-lg transition">

            <div className="flex items-center justify-between mb-4">

                {icon}

                <span className="text-xs text-slate-500 font-bold uppercase">
                    {title}
                </span>

            </div>

            <h3 className="text-4xl font-black text-slate-900">
                {value}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
                {subtitle}
            </p>

        </div>
    );
}