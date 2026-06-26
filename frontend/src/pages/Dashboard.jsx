
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Layers, Gamepad2, Trophy, List, Plus, X, Edit2, Trash2 } from "lucide-react";
// import { useWorlds } from "../hooks/useWorlds";
// import { useGames } from "../hooks/useGames";
// import { useBadges } from "../hooks/useBadges";

// import BadgeCard from "../components/Badge";

// const tabs = [
//     { key: "worlds", label: "Worlds", icon: Layers },
//     { key: "games", label: "Games", icon: Gamepad2 },
//     { key: "badges", label: "Badges", icon: Trophy },
//     { key: "progress", label: "Progress", icon: List },
// ];

export default function Dashboard() {
    // const [activeTab, setActiveTab] = useState("worlds");
    // const [modalOpen, setModalOpen] = useState(false);
    // const [editingItem, setEditingItem] = useState(null);

    // const [worldForm, setWorldForm] = useState({
    //     title: "",
    //     description: "",
    //     language: "",
    //     position: "",
    //     thumbnail: "",
    //     background: "",
    //     is_locked: false,
    // });

    // const [gameForm, setGameForm] = useState({
    //     world_id: "",
    //     title: "",
    //     description: "",
    //     difficulty: "",
    //     xp_reward: "",
    //     language: "",
    //     position: "",
    //     starter_code: "",
    //     solution_code: "",
    //     is_active: true,
    // });

    // const [badgeForm, setBadgeForm] = useState({
    //     name: "",
    //     description: "",
    //     icon: "",
    // });

    // const {
    //     worlds,
    //     loading: worldsLoading,
    //     getWorlds,
    //     createWorld,
    //     updateWorld,
    //     deleteWorld,
    // } = useWorlds();

    // const {
    //     games,
    //     loading: gamesLoading,
    //     getGames,
    //     createGame,
    //     updateGame,
    //     deleteGame,
    // } = useGames();

    // const {
    //     badges,
    //     loading: badgesLoading,
    //     getBadges,
    //     createBadge,
    //     updateBadge,
    //     deleteBadge,
    // } = useBadges();


    // useEffect(() => {
    //     getWorlds();
    //     getGames();
    //     getBadges();
    // }, []);

    // function parseCodeInput(value) {
    //     if (!value) {
    //         return [];
    //     }

    //     try {
    //         const parsed = JSON.parse(value);
    //         return Array.isArray(parsed) ? parsed : [parsed];
    //     } catch {
    //         return value
    //             .split(/\r?\n/)
    //             .map((line) => line.trim())
    //             .filter(Boolean);
    //     }
    // }

    // function resetForms() {
    //     setWorldForm({
    //         title: "",
    //         description: "",
    //         language: "",
    //         position: "",
    //         thumbnail: "",
    //         background: "",
    //         is_locked: false,
    //     });
    //     setGameForm({
    //         world_id: "",
    //         title: "",
    //         description: "",
    //         difficulty: "",
    //         xp_reward: "",
    //         language: "",
    //         position: "",
    //         starter_code: "",
    //         solution_code: "",
    //         is_active: true,
    //     });
    //     setBadgeForm({
    //         name: "",
    //         description: "",
    //         icon: "",
    //     });
    // }

    // function handleEdit(item) {
    //     setEditingItem(item);
    //     setModalOpen(true);

    //     if (activeTab === "worlds") {
    //         setWorldForm({
    //             title: item.title || "",
    //             description: item.description || "",
    //             language: item.language || "",
    //             position: item.position || "",
    //             thumbnail: item.thumbnail || "",
    //             background: item.background || "",
    //             is_locked: item.is_locked || false,
    //         });
    //     }

    //     if (activeTab === "games") {
    //         setGameForm({
    //             world_id: item.world_id || "",
    //             title: item.title || "",
    //             description: item.description || "",
    //             difficulty: item.difficulty || "",
    //             xp_reward: item.xp_reward || "",
    //             language: item.language || "",
    //             position: item.position || "",
    //             starter_code: JSON.stringify(item.starter_code || [], null, 2),
    //             solution_code: JSON.stringify(item.solution_code || [], null, 2),
    //             is_active: item.is_active ?? true,
    //         });
    //     }

    //     if (activeTab === "badges") {
    //         setBadgeForm({
    //             name: item.name || "",
    //             description: item.description || "",
    //             icon: item.icon || "",
    //         });
    //     }
    // }

    // async function handleSubmit() {
    //     try {
    //         if (activeTab === "worlds") {
    //             if (editingItem) {
    //                 await updateWorld(editingItem.id, worldForm);
    //             } else {
    //                 await createWorld(worldForm);
    //             }
    //         }

    //         if (activeTab === "games") {
    //             const payload = {
    //                 ...gameForm,
    //                 xp_reward: Number(gameForm.xp_reward) || 0,
    //                 position: Number(gameForm.position) || 0,
    //                 starter_code: parseCodeInput(gameForm.starter_code),
    //                 solution_code: parseCodeInput(gameForm.solution_code),
    //                 is_active: Boolean(gameForm.is_active),
    //             };

    //             if (editingItem) {
    //                 await updateGame(editingItem.id, payload);
    //             } else {
    //                 await createGame(payload);
    //             }
    //         }

    //         if (activeTab === "badges") {
    //             if (editingItem) {
    //                 await updateBadge(editingItem.id, badgeForm);
    //             } else {
    //                 await createBadge(badgeForm);
    //             }
    //         }

    //         resetForms();
    //         setEditingItem(null);
    //         setModalOpen(false);
    //     } catch (err) {
    //         console.error(err);
    //         alert(err.response?.data?.message || "Unable to save data");
    //     }
    // }

    // const isLoading = worldsLoading || gamesLoading || badgesLoading;

    // const ActiveIcon = tabs.find((tab) => tab.key === activeTab)?.icon;

    // return (
    //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
    //         <div className="mx-auto max-w-7xl">
    //             <div className="rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 bg-white">
    //                 <div className="bg-gradient-to-br from-orange-500 to-pink-500 px-8 py-10 text-white">
    //                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
    //                         <div>
    //                             <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white/15 shadow-lg mb-4">
    //                                 <ActiveIcon className="w-7 h-7" />
    //                             </div>
    //                             <h1 className="text-4xl font-black">Admin Dashboard</h1>
    //                             <p className="mt-2 text-slate-100 max-w-2xl">
    //                                 Gère les worlds, les jeux, les badges et le suivi des utilisateurs depuis une seule page.
    //                             </p>
    //                         </div>
    //                         <button
    //                             onClick={() => {
    //                                 resetForms();
    //                                 setEditingItem(null);
    //                                 setModalOpen(true);
    //                             }}
    //                             className="inline-flex items-center gap-2 rounded-2xl bg-white/15 px-5 py-3 font-semibold shadow-lg hover:bg-white/25 transition"
    //                         >
    //                             <Plus className="w-5 h-5" />
    //                             Nouveau {activeTab === "worlds" ? "World" : activeTab === "games" ? "Game" : activeTab === "badges" ? "Badge" : "Item"}
    //                         </button>
    //                     </div>
    //                 </div>

    //                 <div className="p-6">
    //                     <div className="flex flex-wrap gap-3 mb-6">
    //                         {tabs.map((tab) => {
    //                             const Icon = tab.icon;
    //                             return (
    //                                 <button
    //                                     key={tab.key}
    //                                     onClick={() => setActiveTab(tab.key)}
    //                                     className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${activeTab === tab.key
    //                                         ? "bg-orange-500 text-white border-orange-500"
    //                                         : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
    //                                         }`}
    //                                 >
    //                                     <Icon className="w-4 h-4" />
    //                                     {tab.label}
    //                                 </button>
    //                             );
    //                         })}
    //                     </div>

    //                     <div className="mb-6 flex flex-wrap items-center gap-4">
    //                         <Link
    //                             to="/worlds"
    //                             className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-orange-600 shadow-sm shadow-orange-200 transition hover:bg-orange-50"
    //                         >
    //                             Aller au Monde 1 — Château des Boucles
    //                         </Link>
    //                         <p className="text-sm text-slate-500">
    //                             Accède directement à la nouvelle page de jeu du Monde 1.
    //                         </p>
    //                     </div>

    //                     {isLoading && (
    //                         <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
    //                             Chargement des données...
    //                         </div>
    //                     )}

    //                     {!isLoading && activeTab === "worlds" && (
    //                         <div className="space-y-6">
    //                             <div className="grid gap-6 md:grid-cols-2">
    //                                 {worlds.length > 0 ? (
    //                                     worlds.map((world) => (
    //                                         <div
    //                                             key={world.id}
    //                                             className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    //                                         >
    //                                             <div className="flex items-start justify-between gap-4">
    //                                                 <div>
    //                                                     <h2 className="text-xl font-bold">{world.title}</h2>
    //                                                     <p className="text-slate-500 mt-2">{world.description}</p>
    //                                                 </div>
    //                                                 <div className="flex gap-2">
    //                                                     <button
    //                                                         onClick={() => {
    //                                                             setActiveTab("worlds");
    //                                                             handleEdit(world);
    //                                                         }}
    //                                                         className="rounded-2xl bg-slate-100 px-3 py-2 text-slate-700 hover:bg-slate-200 transition"
    //                                                     >
    //                                                         <Edit2 className="w-4 h-4" />
    //                                                     </button>
    //                                                     <button
    //                                                         onClick={() => deleteWorld(world.id)}
    //                                                         className="rounded-2xl bg-red-500 px-3 py-2 text-white hover:bg-red-600 transition"
    //                                                     >
    //                                                         <Trash2 className="w-4 h-4" />
    //                                                     </button>
    //                                                 </div>
    //                                             </div>
    //                                             <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
    //                                                 <span>Langage: {world.language || "—"}</span>
    //                                                 <span>Position: {world.position ?? "—"}</span>
    //                                                 <span>{world.is_locked ? "Locked" : "Public"}</span>
    //                                             </div>
    //                                         </div>
    //                                     ))
    //                                 ) : (
    //                                     <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
    //                                         Aucun world trouvé. Crée en un maintenant.
    //                                     </div>
    //                                 )}
    //                             </div>
    //                         </div>
    //                     )}

    //                     {!isLoading && activeTab === "games" && (
    //                         <div className="space-y-6">
    //                             <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
    //                                 <table className="min-w-full text-left text-sm">
    //                                     <thead className="bg-slate-50 text-slate-500">
    //                                         <tr>
    //                                             <th className="px-5 py-4">Titre</th>
    //                                             <th className="px-5 py-4">World</th>
    //                                             <th className="px-5 py-4">XP</th>
    //                                             <th className="px-5 py-4">Statut</th>
    //                                             <th className="px-5 py-4">Actions</th>
    //                                         </tr>
    //                                     </thead>
    //                                     <tbody>
    //                                         {games.map((game) => (
    //                                             <tr key={game.id} className="border-t border-slate-200">
    //                                                 <td className="px-5 py-4 font-semibold text-slate-900">{game.title}</td>
    //                                                 <td className="px-5 py-4 text-slate-600">{game.world?.title || game.world_id}</td>
    //                                                 <td className="px-5 py-4 text-slate-600">{game.xp_reward}</td>
    //                                                 <td className="px-5 py-4 text-slate-600">{game.is_active ? "Active" : "Inactive"}</td>
    //                                                 <td className="px-5 py-4 text-slate-600">
    //                                                     <div className="flex items-center gap-2">
    //                                                         <button
    //                                                             onClick={() => {
    //                                                                 setActiveTab("games");
    //                                                                 handleEdit(game);
    //                                                             }}
    //                                                             className="rounded-2xl bg-slate-100 px-3 py-2 hover:bg-slate-200 transition"
    //                                                         >
    //                                                             <Edit2 className="w-4 h-4" />
    //                                                         </button>
    //                                                         <button
    //                                                             onClick={() => deleteGame(game.id)}
    //                                                             className="rounded-2xl bg-red-500 px-3 py-2 text-white hover:bg-red-600 transition"
    //                                                         >
    //                                                             <Trash2 className="w-4 h-4" />
    //                                                         </button>
    //                                                     </div>
    //                                                 </td>
    //                                             </tr>
    //                                         ))}
    //                                         {games.length === 0 && (
    //                                             <tr>
    //                                                 <td colSpan="5" className="px-5 py-10 text-center text-slate-500">
    //                                                     Aucun jeu trouvé. Ajoute un jeu.
    //                                                 </td>
    //                                             </tr>
    //                                         )}
    //                                     </tbody>
    //                                 </table>
    //                             </div>
    //                         </div>
    //                     )}

    //                     {!isLoading && activeTab === "badges" && (
    //                         <div className="space-y-6">
    //                             <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    //                                 {badges.length > 0 ? (
    //                                     badges.map((badge) => (
    //                                         <div key={badge.id} className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    //                                             <BadgeCard
    //                                                 icon={badge.icon || "🏆"}
    //                                                 title={badge.name}
    //                                                 description={badge.description}
    //                                                 xp={badge.xp || 0}
    //                                                 rarity="epic"
    //                                             />
    //                                             <div className="mt-4 flex gap-2 justify-end">
    //                                                 <button
    //                                                     onClick={() => {
    //                                                         setActiveTab("badges");
    //                                                         handleEdit(badge);
    //                                                     }}
    //                                                     className="rounded-2xl bg-slate-100 px-3 py-2 text-slate-700 hover:bg-slate-200 transition"
    //                                                 >
    //                                                     <Edit2 className="w-4 h-4" />
    //                                                 </button>
    //                                                 <button
    //                                                     onClick={() => deleteBadge(badge.id)}
    //                                                     className="rounded-2xl bg-red-500 px-3 py-2 text-white hover:bg-red-600 transition"
    //                                                 >
    //                                                     <Trash2 className="w-4 h-4" />
    //                                                 </button>
    //                                             </div>
    //                                         </div>
    //                                     ))
    //                                 ) : (
    //                                     <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
    //                                         Aucun badge trouvé. Crée le premier badge.
    //                                     </div>
    //                                 )}
    //                             </div>
    //                         </div>
    //                     )}

    //                     {!isLoading && activeTab === "progress" && (
    //                         <div className="space-y-6">
    //                             <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
    //                                 <table className="min-w-full text-left text-sm">
    //                                     <thead className="bg-slate-50 text-slate-500">
    //                                         <tr>
    //                                             <th className="px-5 py-4">Utilisateur</th>
    //                                             <th className="px-5 py-4">Jeu</th>
    //                                             <th className="px-5 py-4">Progression</th>
    //                                             <th className="px-5 py-4">Score</th>
    //                                             <th className="px-5 py-4">Terminée</th>
    //                                         </tr>
    //                                     </thead>
    //                                     <tbody>
                                
    //                                     </tbody>
    //                                 </table>
    //                             </div>
    //                         </div>
    //                     )}
    //                 </div>
    //             </div>
    //         </div>

    //         {modalOpen && (
    //             <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    //                 <div className="w-full max-w-3xl rounded-[32px] bg-white p-8 shadow-2xl">
    //                     <div className="flex items-start justify-between gap-4 mb-6">
    //                         <div>
    //                             <h2 className="text-3xl font-black">
    //                                 {editingItem
    //                                     ? `Modifier ${activeTab === "worlds" ? "World" : activeTab === "games" ? "Game" : "Badge"}`
    //                                     : `Ajouter ${activeTab === "worlds" ? "World" : activeTab === "games" ? "Game" : "Badge"}`}
    //                             </h2>
    //                             <p className="mt-2 text-slate-500">
    //                                 {activeTab === "worlds"
    //                                     ? "Remplis les champs pour configurer un world."
    //                                     : activeTab === "games"
    //                                         ? "Gère les jeux et leurs paramètres." : "Crée ou modifie un badge."}
    //                             </p>
    //                         </div>
    //                         <button
    //                             onClick={() => {
    //                                 setModalOpen(false);
    //                                 setEditingItem(null);
    //                                 resetForms();
    //                             }}
    //                             className="rounded-2xl bg-slate-100 p-3 text-slate-600 hover:bg-slate-200 transition"
    //                         >
    //                             <X className="w-5 h-5" />
    //                         </button>
    //                     </div>

    //                     <div className="grid gap-6 lg:grid-cols-2">
    //                         {activeTab === "worlds" && (
    //                             <>
    //                                 {[["title", "Titre"], ["description", "Description"], ["language", "Langage"], ["position", "Position"]].map(([key, label]) => (
    //                                     <div key={key}>
    //                                         <label className="text-sm font-semibold text-slate-700">{label}</label>
    //                                         <input
    //                                             value={worldForm[key]}
    //                                             onChange={(e) => setWorldForm({ ...worldForm, [key]: e.target.value })}
    //                                             className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
    //                                         />
    //                                     </div>
    //                                 ))}
    //                                 <div className="flex items-center gap-3">
    //                                     <input
    //                                         type="checkbox"
    //                                         checked={worldForm.is_locked}
    //                                         onChange={(e) => setWorldForm({ ...worldForm, is_locked: e.target.checked })}
    //                                         className="h-4 w-4 rounded border-slate-300 text-orange-500"
    //                                     />
    //                                     <label className="text-sm text-slate-600">World verrouillé</label>
    //                                 </div>
    //                             </>
    //                         )}

    //                         {activeTab === "games" && (
    //                             <>
    //                                 <div>
    //                                     <label className="text-sm font-semibold text-slate-700">World ID</label>
    //                                     <select
    //                                         value={gameForm.world_id}
    //                                         onChange={(e) => setGameForm({ ...gameForm, world_id: e.target.value })}
    //                                         className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
    //                                     >
    //                                         <option value="">Sélectionner un world</option>
    //                                         {worlds.map((world) => (
    //                                             <option key={world.id} value={world.id}>
    //                                                 {world.title}
    //                                             </option>
    //                                         ))}
    //                                     </select>
    //                                 </div>
    //                                 {[["title", "Titre"], ["description", "Description"], ["difficulty", "Difficulté"], ["xp_reward", "XP reward"], ["language", "Langage"], ["position", "Position"], ["starter_code", "Starter code"], ["solution_code", "Solution code"]].map(([key, label]) => (
    //                                     <div key={key} className={key.includes("code") ? "lg:col-span-2" : ""}>
    //                                         <label className="text-sm font-semibold text-slate-700">{label}</label>
    //                                         {key.includes("code") ? (
    //                                             <textarea
    //                                                 rows={5}
    //                                                 value={gameForm[key]}
    //                                                 onChange={(e) => setGameForm({ ...gameForm, [key]: e.target.value })}
    //                                                 className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
    //                                             />
    //                                         ) : (
    //                                             <input
    //                                                 type={key === "xp_reward" || key === "position" ? "number" : "text"}
    //                                                 value={gameForm[key]}
    //                                                 onChange={(e) => setGameForm({ ...gameForm, [key]: e.target.value })}
    //                                                 className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
    //                                             />
    //                                         )}
    //                                     </div>
    //                                 ))}
    //                                 <div className="flex items-center gap-3">
    //                                     <input
    //                                         type="checkbox"
    //                                         checked={gameForm.is_active}
    //                                         onChange={(e) => setGameForm({ ...gameForm, is_active: e.target.checked })}
    //                                         className="h-4 w-4 rounded border-slate-300 text-orange-500"
    //                                     />
    //                                     <label className="text-sm text-slate-600">Jeu actif</label>
    //                                 </div>
    //                             </>
    //                         )}

    //                         {activeTab === "badges" && (
    //                             <>
    //                                 {[["name", "Nom"], ["description", "Description"], ["icon", "Icone"]].map(([key, label]) => (
    //                                     <div key={key}>
    //                                         <label className="text-sm font-semibold text-slate-700">{label}</label>
    //                                         <input
    //                                             value={badgeForm[key]}
    //                                             onChange={(e) => setBadgeForm({ ...badgeForm, [key]: e.target.value })}
    //                                             className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-orange-400"
    //                                         />
    //                                     </div>
    //                                 ))}
    //                             </>
    //                         )}
    //                     </div>

    //                     <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
    //                         <button
    //                             onClick={() => {
    //                                 setModalOpen(false);
    //                                 setEditingItem(null);
    //                                 resetForms();
    //                             }}
    //                             className="rounded-2xl border border-slate-200 px-5 py-3 text-slate-600 hover:bg-slate-100 transition"
    //                         >
    //                             Annuler
    //                         </button>
    //                         <button
    //                             onClick={handleSubmit}
    //                             className="rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 px-5 py-3 font-semibold text-white shadow-lg hover:opacity-95 transition"
    //                         >
    //                             {editingItem ? "Mettre à jour" : "Enregistrer"}
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         )}
    //     </div>
    // );
    return(
        <></>
    )
}
