export default function BadgeCard({
  icon = "🏆",
  title = "Code Master",
  description = "Complete 10 coding lessons",
  xp = 500,
  rarity = "legendary",
}) {

  const rarityStyles = {
    common: "from-slate-300 to-slate-500",
    rare: "from-blue-400 to-cyan-500",
    epic: "from-purple-500 to-pink-500",
    legendary: "from-yellow-400 to-orange-500",
  };

  return (
    <div
      className="
        relative
        bg-white
        rounded-3xl
        p-6
        shadow-xl
        border border-slate-200
        hover:scale-105
        transition-all duration-300
        overflow-hidden
      "
    >

      {/* Glow */}
      <div
        className={`
          absolute inset-0 opacity-10
          bg-gradient-to-br
          ${rarityStyles[rarity]}
        `}
      />

      {/* ICON */}
      <div
        className={`
          w-24 h-24 mx-auto
          rounded-3xl
          bg-gradient-to-br
          ${rarityStyles[rarity]}
          flex items-center justify-center
          shadow-lg
          text-5xl
        `}
      >
        {icon}
      </div>

      {/* CONTENT */}
      <div className="text-center mt-5 relative z-10">

        <h2 className="text-2xl font-black">
          {title}
        </h2>

        <p className="text-slate-500 text-sm mt-2">
          {description}
        </p>

      </div>

      {/* XP */}
      <div className="mt-5 flex justify-center relative z-10">

        <div
          className="
            px-4 py-2
            rounded-full
            bg-orange-100
            text-orange-600
            font-bold
            text-sm
          "
        >
          +{xp} XP
        </div>

      </div>

      {/* RARITY */}
      <div className="mt-4 text-center">

        <span
          className="
            text-xs
            uppercase
            tracking-widest
            text-slate-400
            font-bold
          "
        >
          {rarity}
        </span>

      </div>

    </div>
  );
}