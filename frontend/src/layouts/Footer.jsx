import {
  Rocket,
  Globe,
  Trophy,
  BookOpen,
  Code2,
  ShieldCheck,
  Mail,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* TOP */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* BRAND */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 flex items-center justify-center shadow-lg shadow-orange-200">
                <Rocket className="w-6 h-6 text-white" />
              </div>

              <div>
                <h3 className="font-black text-xl text-slate-900">
                  KidCoders
                </h3>

                <p className="text-xs text-slate-500">
                  Learn to Code Through Play
                </p>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed text-sm">
              Fun programming adventures for kids with exciting missions,
              heroes, and interactive games.
            </p>
          </div>

          {/* GAMES */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Games</h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-slate-500 hover:text-orange-500 transition"
                >
                  <Globe className="w-4 h-4" />
                  Game Worlds
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-slate-500 hover:text-pink-500 transition"
                >
                  <Code2 className="w-4 h-4" />
                  Missions
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-slate-500 hover:text-purple-500 transition"
                >
                  <Trophy className="w-4 h-4" />
                  Leaderboard
                </a>
              </li>
            </ul>
          </div>

          {/* LEARN */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Learn</h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-slate-500 hover:text-orange-500 transition"
                >
                  <BookOpen className="w-4 h-4" />
                  HTML & CSS
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-slate-500 hover:text-pink-500 transition"
                >
                  <Code2 className="w-4 h-4" />
                  JavaScript
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-slate-500 hover:text-purple-500 transition"
                >
                  <Rocket className="w-4 h-4" />
                  Python
                </a>
              </li>
            </ul>
          </div>

          {/* ACCOUNT */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Account</h4>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-slate-500 hover:text-orange-500 transition"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Login
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-slate-500 hover:text-pink-500 transition"
                >
                  <Rocket className="w-4 h-4" />
                  Sign Up
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-slate-500 hover:text-purple-500 transition"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 pt-5 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-slate-500">
            © 2026 KidCoders. Built with creativity and code.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-slate-500 hover:text-orange-500 transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-slate-500 hover:text-pink-500 transition"
            >
              Terms of Service
            </a>

            <a
              href="#"
              className="text-slate-500 hover:text-purple-500 transition"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;