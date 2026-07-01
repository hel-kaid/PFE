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
    const Badges = [
        {
            id: 1,
            name: "First Python Game",
            icon: "🐍",
            description: "Completed your first Python game",
        },
        {
            id: 2,
            name: "HTML Badge",
            icon: "</>",
            description: "Completed your first HTML lesson",
        },
        {
            id: 3,
            name: "Robozzle master",
            icon: "🤖",
            description: "Completed all the robozzle levels",
        }
    ];
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
            streakDays: user?.streak_days || 4,
            totalGamesCompleted: user?.games_completed || 3,
        };

    }, [user]);

    if (isLoading) {

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">

                <div className="text-center">

                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

                    <p className="text-slate-500 font-semibold">
                        Loading profile...
                    </p>

                </div>

            </div>
        );
    }

    if (!user) {

        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500">
                    User not found
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

                        Back to Dashboard

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
                                            Active Member
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
                                    Edit Profile

                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg hover:shadow-xl transition"
                                >

                                    <LogOut className="w-5 h-5" />

                                    Logout

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
                                title="Level"
                                value={stats.currentLevel}
                                subtitle="Fast Progress"
                            />

                            <StatCard
                                icon={<Zap className="w-6 h-6 text-orange-500" />}
                                title="Total XP"
                                value={stats.totalXP.toLocaleString()}
                                subtitle="Experience Points"
                            />

                            <StatCard
                                icon={<Award className="w-6 h-6 text-blue-500" />}
                                title="Games"
                                value={stats.totalGamesCompleted}
                                subtitle="Completed"
                            />

                            <StatCard
                                icon={<Flame className="w-6 h-6 text-red-500" />}
                                title="Streak"
                                value={stats.streakDays}
                                subtitle="Consecutive Days"
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
                                Progress
                            </h2>
                        </div>

                        {/* Fake Statistics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-orange-50 rounded-2xl p-5 text-center">
                                <p className="text-3xl font-black text-orange-600">87%</p>
                                <p className="text-sm text-slate-500 mt-1">Completion</p>
                            </div>

                            <div className="bg-green-50 rounded-2xl p-5 text-center">
                                <p className="text-3xl font-black text-green-600">24</p>
                                <p className="text-sm text-slate-500 mt-1">Sessions</p>
                            </div>

                            <div className="bg-blue-50 rounded-2xl p-5 text-center">
                                <p className="text-3xl font-black text-blue-600">142h</p>
                                <p className="text-sm text-slate-500 mt-1">Study Time</p>
                            </div>

                            <div className="bg-purple-50 rounded-2xl p-5 text-center">
                                <p className="text-3xl font-black text-purple-600">+18%</p>
                                <p className="text-sm text-slate-500 mt-1">Improvement</p>
                            </div>
                        </div>

                        {/* Fake Progress Bars */}
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium text-slate-700">python</span>
                                    <span className="font-semibold text-orange-600">90%</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-3">
                                    <div className="bg-orange-500 h-3 rounded-full w-[90%]"></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium text-slate-700">html</span>
                                    <span className="font-semibold text-blue-600">72%</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-3">
                                    <div className="bg-blue-500 h-3 rounded-full w-[72%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Badges */}
                <div className="rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 bg-white">

                    <div className="p-8">

                        <div className="flex items-center gap-3 mb-8">

                            <Trophy className="w-8 h-8 text-yellow-500" />

                            <h2 className="text-3xl font-black text-slate-900">
                                Unlocked Badges
                            </h2>

                        </div>

                        {Badges?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {Badges.map((badge) => (
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
                                    Complete challenges to unlock badges.
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