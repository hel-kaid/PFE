import { naturalSort, preloadFrames, useSpriteAnimation } from "../../hooks/useSpriteAnimation";
import SpriteFrame from "./SpriteFrame";

// ─── Globs au niveau module ──────────────────────────────────────────────────
const RAW = {
  idle: import.meta.glob("/src/assets/monsters/goblen/Idle/*.png", { eager: true, import: "default" }),
  attack: import.meta.glob("/src/assets/monsters/goblen/Slashing/*.png", { eager: true, import: "default" }),
};

const FRAMES = Object.fromEntries(
  Object.entries(RAW).map(([state, modules]) => {
    const paths = naturalSort(Object.values(modules));
    preloadFrames(paths);
    return [state, paths];
  })
);


// ─── Composant principal ─────────────────────────────────────────────────────
export default function Goblin({
  x,
  y,
  tileSize,
  state = "idle",
  onDeathComplete,
}) {
  const frames = FRAMES[state] ?? FRAMES.idle;
  const isDying = state === "dying";

  const currentIndex = useSpriteAnimation({
    frames,
    speed: state === "attack" ? 90 : 120,
    loop: !isDying,
    onComplete: isDying ? onDeathComplete : undefined,
  });

  const currentSrc = frames[currentIndex] ?? frames[0];

  return (
    <div
      style={{
        position: "absolute",
        width: tileSize,
        height: tileSize,
        left: x * tileSize,
        top: y * tileSize,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SpriteFrame
        src={currentSrc}
        alt={`goblin-${state}`}
        className="w-full h-full object-contain"
      />
    </div>
  );
}