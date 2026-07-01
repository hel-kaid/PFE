import {
  Gamepad2,
  Star,
  Lock,
  Play,
  Trophy,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const Games = () => {
  const games = [
    {
      id: "snake",
      title: "Snake Control",
      description:
        "Guide your snake through the maze, collect stars, and learn basic movement logic.",
      level: "Beginner",
      icon: "🐍",
      status: "Available",
      path: "/snake",
      gradient: "from-sky-100 to-blue-200",
    },
    {
      id: "robozzle",
      title: "Robozzle",
      description:
        "Program your robot step by step and solve logic puzzles using simple commands.",
      level: "Beginner",
      icon: "🤖",
      status: "Available",
      path: "/robozzle",
      gradient: "from-blue-100 to-cyan-200",
    },
    {
      id: "rpg",
      title: "RPG World",
      description:
        "Create action sequences, defeat dungeon monsters, and master advanced logic.",
      level: "Advanced",
      icon: "⚔️",
      status: "Available",
      path: "/python-rpg",
      gradient: "from-yellow-100 to-orange-200",
    },
    {
      id: "html-kid",
      title: "HTML Kid",
      description:
        "Learn HTML by coding your own interactive web pages with visual results.",
      level: "Advanced",
      icon: "</>",
      status: "Available",
      path: "/html-kid",
      gradient: "from-red-100 to-red-200",
    },
    {
      id: "dragon",
      title: "Dragon's Land",
      description:
        "Help the little dragon collect magical stars while learning conditions and loops.",
      level: "Intermediate",
      icon: "🐉",
      status: "Locked",
      path: "/dragon",
      gradient: "from-green-100 to-emerald-200",
    },
    
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 text-slate-900">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-orange-200 shadow-sm text-orange-500 font-bold mb-6">
          <Gamepad2 className="w-4 h-4" />
          Game Worlds
        </span>

        <h1 className="text-5xl md:text-6xl font-black tracking-tight">
          Choose Your{" "}
          <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            Coding Adventure
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Explore interactive games designed to help you learn programming
          concepts step by step while having fun.
        </p>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 text-center border border-slate-200 shadow-sm">
            <h3 className="text-4xl font-black text-orange-500">4</h3>
            <p className="text-slate-600 font-semibold mt-2">Games</p>
          </div>

          <div className="bg-white rounded-3xl p-6 text-center border border-slate-200 shadow-sm">
            <h3 className="text-4xl font-black text-pink-500">100</h3>
            <p className="text-slate-600 font-semibold mt-2">
              Difficulty Levels
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 text-center border border-slate-200 shadow-sm">
            <h3 className="text-4xl font-black text-purple-500">∞</h3>
            <p className="text-slate-600 font-semibold mt-2">
              Coding Challenges
            </p>
          </div>
        </div>
      </section>

      {/* GAMES GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {games.map((game) => {
            const isLocked = game.status === "Locked";

            return (
              <div
                key={game.id}
                className="group relative bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all overflow-hidden"
              >
                {isLocked && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-10 flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="w-10 h-10 mx-auto text-slate-500 mb-3" />
                      <p className="font-black text-slate-700">
                        Coming Soon
                      </p>
                    </div>
                  </div>
                )}

                <div
                  className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform`}
                >
                  {game.icon}
                </div>

                <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-bold mb-4">
                  <Star className="w-4 h-4 text-orange-400" />
                  {game.level}
                </span>

                <h2 className="text-2xl font-black mb-3">
                  {game.title}
                </h2>

                <p className="text-slate-600 leading-relaxed mb-8">
                  {game.description}
                </p>

                {isLocked ? (
                  <button
                    disabled
                    className="w-full py-3 rounded-2xl bg-slate-100 text-slate-400 font-bold cursor-not-allowed"
                  >
                    Locked
                  </button>
                ) : (
                  <Link to={game.path}>
                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold hover:scale-105 transition-all shadow-lg shadow-orange-100">
                      <Play className="w-4 h-4" />
                      Play Now
                    </button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white text-center px-6 py-20 shadow-2xl shadow-orange-200">
          <Sparkles className="absolute top-10 left-10 w-14 h-14 opacity-30" />
          <Trophy className="absolute bottom-10 right-10 w-16 h-16 opacity-30" />

          <h2 className="text-4xl md:text-5xl font-black mb-5">
            Start Your Coding Journey
          </h2>

          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Complete challenges, unlock new skills, and become a young coding
            hero.
          </p>

          <Link to="/snake">
            <button className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-orange-500 font-black shadow-xl hover:scale-105 transition-all">
              Start First Game
              <Play className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Games;