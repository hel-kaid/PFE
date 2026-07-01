import {
  Rocket,
  Gamepad2,
  Trophy,
  Code2,
  Sparkles,
  Star,
  Swords,
  MoveRight,
  Map,
} from "lucide-react";
import { Link } from "react-router-dom";
const Home = () => {
  const games = [
    {
      id: "snake",
      title: "Snake Control",
      description:
        "Master the basics of logic by guiding your snake through the maze.",
      badge: "Beginner",
      icon: "🐍",
      gradient: "from-sky-100 to-blue-200",
    },
    {
      id: "robozzle",
      title: "Robozzle",
      description:
        "Master the basics of logic by guiding your robot through the maze.",
      badge: "Beginner",
      icon: "🤖",
      gradient: "from-blue-100 to-cyan-200",
    },
    {
      id: "dragon",
      title: "HTML",
      description:
        "Learn the basics of HTML create your own website.",
      badge: "Beginner",
      icon: "💻",
      gradient: "from-green-100 to-emerald-200",
    },
    {
      id: "rpg",
      title: "RPG World",
      description:
        "Create your own action sequences to defeat the dungeon monsters.",
      badge: "Advanced",
      icon: "⚔️",
      gradient: "from-yellow-100 to-orange-200",
    },
  ];

  const benefits = [
    {
      title: "Learn Through Play",
      icon: <Gamepad2 />,
      text: "Coding becomes the key to winning the game.",
    },
    {
      title: "Progressive Challenges",
      icon: <Map />,
      text: "Puzzles designed to match every child's pace.",
    },
    {
      title: "Simple Interface",
      icon: <Code2 />,
      text: "A clean, visual, and easy-to-use editor.",
    },
    {
      title: "Motivating Progress",
      icon: <Trophy />,
      text: "Unlock badges, stars, and avatars.",
    },
  ];

  const steps = [
    "Beginner",
    "Movement",
    "Conditions",
    "Loops",
    "Functions",
    "Final Project",
  ];

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-50 via-white to-purple-50" />

        <div>
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-orange-200 shadow-sm text-orange-500 font-bold mb-6">
            <Rocket className="w-4 h-4" />
            The adventure starts here
          </span>

          <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
            Learning to code becomes an{" "}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              adventure!
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
            Discover programming through interactive games. Write your first
            lines of code and guide your heroes to victory.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="px-7 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold shadow-xl shadow-orange-200 hover:scale-105 transition-all">
              Start Now
            </button>

            <button
              onClick={() => scrollToSection("games")}
              className="px-7 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold shadow-sm hover:border-orange-400 hover:text-orange-500 transition-all"
            >
              Explore the Games
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] bg-slate-950 border-4 border-white shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 bg-slate-900 px-5 py-4">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-4 text-slate-400 text-sm font-mono">
                main.py
              </span>
            </div>

            <div className="p-8 font-mono text-lg space-y-4">
              <p className="text-sky-400">move_right()</p>
              <p className="text-sky-400">collect_star()</p>
              <p className="text-pink-400">attack()</p>
              <p className="text-slate-400">// ⚔️ Orc defeated!</p>
            </div>
          </div>
        </div>
      </section>

      {/* GAMES */}
      <section id="games" className="bg-slate-50 py-24 px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black">
            Choose Your Game World
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Each world teaches you a programming superpower.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className="group bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all"
            >
              <div
                className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform`}
              >
                {game.icon}
              </div>

              <span className="inline-block px-4 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-bold mb-4">
                Level {game.badge}
              </span>

              <h3 className="text-2xl font-black mb-3">{game.title}</h3>

              <p className="text-slate-600 leading-relaxed mb-8">
                {game.description}
              </p>
            <Link to={'/games'}>
              <button className="w-full py-3 rounded-2xl bg-slate-100 text-slate-800 font-bold group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-pink-500 group-hover:text-white transition-all">
                Play Game
              </button>
            </Link>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black">
            Why Learn With Us?
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            A learning method designed to make coding fun and frustration-free.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-[2rem] bg-white border border-slate-200 p-7 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white">
                {benefit.icon}
              </div>

              <h3 className="font-black text-xl mb-3">{benefit.title}</h3>
              <p className="text-slate-600">{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PATHWAY */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-black">
            Your Journey to Becoming a Developer
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Progress step by step.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {steps.map((step, index) => (
            <div
              key={step}
              className="bg-white rounded-3xl p-6 text-center border border-slate-200 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-black">
                {String(index + 1).padStart(2, "0")}
              </div>

              <h3 className="font-black text-lg">{step}</h3>
              <p className="text-sm text-slate-500 mt-1">
                {index === 5 ? "Your Own Game!" : "New Skill"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-orange-500 via-pink-500 to-purple-600 text-white text-center px-6 py-20 shadow-2xl shadow-orange-200">
          <Sparkles className="absolute top-10 left-10 w-14 h-14 opacity-30" />
          <Star className="absolute bottom-10 right-10 w-16 h-16 opacity-30" />
          <Swords className="absolute top-12 right-20 w-12 h-12 opacity-20" />

          <h2 className="text-4xl md:text-5xl font-black mb-5">
            Ready to Take the Challenge?
          </h2>

          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Join young creators and start coding today.
          </p>

          <button className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-orange-500 font-black shadow-xl hover:scale-105 transition-all">
            Create My Free Account
            <MoveRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;