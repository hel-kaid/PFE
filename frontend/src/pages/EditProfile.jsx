import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
    ArrowLeft,
    Eye,
    EyeOff,
    Loader,
} from "lucide-react";

export default function EditProfile() {
    const { profile, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        current_password: "",
        password: "",
        password_confirmation: "",
        avatar: "",
    });

    const [avatarPreview, setAvatarPreview] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const loadProfileData = async () => {
            try {
                setIsLoading(true);

                const userData = await profile();

                if (userData) {
                    setFormData({
                        username: userData.username || "",
                        email: userData.email || "",
                        current_password: "",
                        password: "",
                        password_confirmation: "",
                        avatar: userData.avatar || "",
                    });

                    setAvatarPreview(
                        userData.avatar ||
                            `https://ui-avatars.com/api/?name=${userData.username}&size=150`
                    );
                }
            } catch (err) {
                console.error("Error loading profile:", err);
                setError("Erreur lors du chargement du profil");
            } finally {
                setIsLoading(false);
            }
        };

        loadProfileData();
    }, [navigate, profile]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // Vérification taille max 5MB
        if (file.size > 5 * 1024 * 1024) {
            setError("L'image ne doit pas dépasser 5MB");
            return;
        }

        // Vérification type
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError("Format invalide. Utilisez JPG, PNG ou WebP");
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            setAvatarPreview(event.target.result);

            setFormData((prev) => ({
                ...prev,
                avatar: event.target.result,
            }));
        };

        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSaving(true);
        setError("");
        setSuccess("");

        try {
            // Validation username
            if (!formData.username.trim()) {
                throw new Error(
                    "Le nom d'utilisateur est requis"
                );
            }

            // Validation email
            if (!formData.email.trim()) {
                throw new Error("L'email est requis");
            }

            const emailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(formData.email)) {
                throw new Error("Format d'email invalide");
            }

            // Validation mot de passe
            if (formData.password) {
                if (!formData.current_password) {
                    throw new Error(
                        "Le mot de passe actuel est requis"
                    );
                }

                if (formData.password.length < 8) {
                    throw new Error(
                        "Le mot de passe doit contenir au moins 8 caractères"
                    );
                }

                if (
                    formData.password !==
                    formData.password_confirmation
                ) {
                    throw new Error(
                        "Les mots de passe ne correspondent pas"
                    );
                }
            }

            // Données à envoyer
            const dataToSend = {
                username: formData.username,
                email: formData.email,
                avatar: formData.avatar,
            };

            // Ajouter mot de passe seulement si rempli
            if (formData.password) {
                dataToSend.current_password =
                    formData.current_password;

                dataToSend.password =
                    formData.password;

                dataToSend.password_confirmation =
                    formData.password_confirmation;
            }

            // Requête update
            await updateProfile(dataToSend);

            setSuccess(
                "Profil mis à jour avec succès !"
            );

            // Redirection
            setTimeout(() => {
                navigate("/profile");
            }, 2000);

        } catch (err) {
            console.error(
                "Error updating profile:",
                err.response?.data || err
            );

            const backendErrors =
                err.response?.data?.errors;

            if (backendErrors) {
                const firstError =
                    Object.values(backendErrors)[0];

                const errorMessage = Array.isArray(firstError)
                    ? firstError[0]
                    : firstError;

                setError(
                    errorMessage ||
                        err.response?.data?.message ||
                        "Une erreur est survenue"
                );

            } else {
                setError(
                    err.response?.data?.message ||
                        err.message ||
                        "Une erreur est survenue"
                );
            }

        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-4 border-orange-500 border-t-transparent animate-spin mx-auto mb-4"></div>

                    <p className="text-slate-500 font-semibold">
                        Chargement du profil...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
            <div className="mx-auto max-w-2xl">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <button
                        onClick={() => navigate("/profile")}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition font-semibold"
                    >
                        <ArrowLeft className="w-5 h-5" />

                        Retour au Profil
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 bg-white"
                >

                    {/* Top */}
                    <div className="bg-gradient-to-br from-purple-700 via-pink-600 to-orange-500 px-8 py-12 text-white">
                        <h1 className="text-4xl font-black tracking-tight">
                            Modifier Mon Profil
                        </h1>

                        <p className="mt-2 text-white/80">
                            Mettez à jour vos informations personnelles
                        </p>
                    </div>

                    <div className="p-8">

                        {/* Error */}
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                                <p className="text-red-700 font-semibold">
                                    {error}
                                </p>
                            </div>
                        )}

                        {/* Success */}
                        {success && (
                            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200">
                                <p className="text-green-700 font-semibold">
                                    {success}
                                </p>
                            </div>
                        )}

                        {/* Avatar */}
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-slate-900 mb-4">
                                Photo de Profil
                            </label>

                            <div className="flex items-center gap-6">

                                <img
                                    src={avatarPreview}
                                    alt="Avatar Preview"
                                    className="w-32 h-32 rounded-full border-4 border-slate-200 object-cover"
                                />

                                <div className="flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="block w-full text-sm text-slate-500"
                                    />

                                    <p className="text-xs text-slate-500 mt-2">
                                        JPG, PNG, WebP — Max 5MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Username */}
                        <div className="mb-6">
                            <label
                                htmlFor="username"
                                className="block text-sm font-bold text-slate-900 mb-2"
                            >
                                Nom d'utilisateur
                            </label>

                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Votre nom d'utilisateur"
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-6">
                            <label
                                htmlFor="email"
                                className="block text-sm font-bold text-slate-900 mb-2"
                            >
                                Adresse Email
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="votre@email.com"
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                            />
                        </div>

                        <div className="my-8 border-t border-slate-200"></div>

                        {/* Password section */}
                        <h3 className="text-lg font-bold text-slate-900 mb-4">
                            Changer le Mot de Passe
                        </h3>

                        {/* Current password */}
                        <div className="mb-6">
                            <label
                                htmlFor="current_password"
                                className="block text-sm font-bold text-slate-900 mb-2"
                            >
                                Mot de passe actuel
                            </label>

                            <div className="relative">
                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    id="current_password"
                                    name="current_password"
                                    value={
                                        formData.current_password
                                    }
                                    onChange={handleInputChange}
                                    placeholder="Entrez votre mot de passe actuel"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition pr-12"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New password */}
                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-sm font-bold text-slate-900 mb-2"
                            >
                                Nouveau mot de passe
                            </label>

                            <div className="relative">
                                <input
                                    type={
                                        showNewPassword
                                            ? "text"
                                            : "password"
                                    }
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Entrez un nouveau mot de passe"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition pr-12"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowNewPassword(
                                            !showNewPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm password */}
                        {formData.password && (
                            <div className="mb-8">
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-sm font-bold text-slate-900 mb-2"
                                >
                                    Confirmer le mot de passe
                                </label>

                                <input
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    value={
                                        formData.password_confirmation
                                    }
                                    onChange={handleInputChange}
                                    placeholder="Confirmez le mot de passe"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition"
                                />

                                {formData.password_confirmation &&
                                    formData.password !==
                                        formData.password_confirmation && (
                                        <p className="mt-2 text-xs text-red-600">
                                            Les mots de passe ne correspondent pas
                                        </p>
                                    )}
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4 border-t border-slate-200">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/profile")
                                }
                                className="flex-1 px-6 py-3 rounded-xl border-2 border-slate-300 text-slate-900 font-bold hover:bg-slate-50 transition"
                            >
                                Annuler
                            </button>

                            <button
                                type="submit"
                                disabled={isSaving}
                                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader className="w-5 h-5 animate-spin" />
                                        Sauvegarde...
                                    </>
                                ) : (
                                    "Sauvegarder"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}