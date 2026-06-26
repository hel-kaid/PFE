import {
  Rocket,
  Gamepad2,
  Globe,
  Flag,
  Menu,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";

export function Navbar() {
  const navigate = useNavigate();

  const handleProfileClick = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-2xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-orange-200 transition-transform duration-300 group-hover:scale-105">
            <Rocket className="w-7 h-7 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              KidCoders
            </h1>

            <p className="text-xs text-slate-500 font-medium">
              Apprendre à coder en jouant
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-3 bg-slate-100/80 px-4 py-2 rounded-2xl border border-slate-200 shadow-inner">
          <Link to="/">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-700 hover:bg-white hover:text-orange-500 transition-all duration-300 font-semibold">
              <Globe className="w-4 h-4" />
              Accueil
            </button>
          </Link>

          <Link to="/world-one">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-700 hover:bg-white hover:text-orange-500 transition-all duration-300 font-semibold">
              <Gamepad2 className="w-4 h-4" />
              Mondes
            </button>
          </Link>

          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-700 hover:bg-white hover:text-purple-500 transition-all duration-300 font-semibold"
          >
            <Flag className="w-4 h-4" />
            Jeux
          </a>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button
                onClick={handleProfileClick}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                title="Profil"
              >
                <User className="w-5 h-5 text-white" />
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-slate-300 bg-white hover:border-orange-400 hover:text-orange-500 transition-all duration-300 font-semibold shadow-sm">
                <User className="w-4 h-4" />
                Connexion
              </button>
            </Link>
          )}

          <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 hover:scale-105 transition-all duration-300 font-bold text-white shadow-xl shadow-orange-200">
            Commencer le jeu
          </button>

          {/* MENU MOBILE */}
          <button className="md:hidden w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center bg-white shadow-sm">
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>
    </header>
  );
}