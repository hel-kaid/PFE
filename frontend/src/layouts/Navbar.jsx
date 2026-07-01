import {
  Gamepad2,
  Globe,
  Mail,
  Menu,
  User,
  LogOut,
  Loader,
  Star,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import logo from "../assets/logo.png";
import { useAuth } from "../hooks/useAuth";

export function Navbar() {
  const navigate = useNavigate();
  const { user, loading, profile, logout } = useAuth();

  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    if (isAuthenticated && !user) {
      profile();
    }
  }, [isAuthenticated, user, profile]);

  const handleProfileClick = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    await logout();
    navigate("/login");
  }, [logout, navigate]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-2xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-14 h-14">
            <img
              src={logo}
              alt="KidCoders"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              KidCoders
            </h1>

            <p className="text-xs text-slate-500 font-medium">
              Learn to code through play
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-3 bg-slate-100/80 px-4 py-2 rounded-2xl border border-slate-200 shadow-inner">
          <Link to="/">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-700 hover:bg-white hover:text-orange-500 transition-all duration-300 font-semibold">
              <Globe className="w-4 h-4" />
              Home
            </button>
          </Link>

          <Link to="/games">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-700 hover:bg-white hover:text-purple-500 transition-all duration-300 font-semibold">
              <Gamepad2 className="w-4 h-4" />
              Games
            </button>
          </Link>

          <Link to="/contact">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-700 hover:bg-white hover:text-pink-500 transition-all duration-300 font-semibold">
              <Mail className="w-4 h-4" />
              Contact
            </button>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button
                onClick={handleProfileClick}
                className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin text-orange-500" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}

                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900">
                    {loading ? "Loading..." : user?.username || "Kid Coder"}
                  </p>

                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Star className="w-3 h-3 text-orange-400" />
                    Level {user?.level || 1}
                  </p>
                </div>
              </button>



              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-300 font-semibold"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-slate-300 bg-white hover:border-orange-400 hover:text-orange-500 transition-all duration-300 font-semibold shadow-sm">
                  <User className="w-4 h-4" />
                  Login
                </button>
              </Link>

              <Link to="/login">
                <button className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 hover:scale-105 transition-all duration-300 font-bold text-white shadow-xl shadow-orange-200">
                  Start Game
                </button>
              </Link>
            </>
          )}

          <button className="md:hidden w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center bg-white shadow-sm hover:bg-slate-50 transition">
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;