import { naturalSort, preloadFrames, useSpriteAnimation } from "../../hooks/useSpriteAnimation";
import SpriteFrame from "./SpriteFrame";


// ─── Import glob par état ────────────────────────────────────────────────────
const RAW = {
  idle: import.meta.glob("/src/assets/player/Idle/*.png", { eager: true, import: "default" }),
  walking: import.meta.glob("/src/assets/player/Walking/*.png", { eager: true, import: "default" }),
  attack: import.meta.glob("/src/assets/player/Slashing/*.png", { eager: true, import: "default" }),
  dying: import.meta.glob("/src/assets/player/Dying/*.png", { eager: true, import: "default" }),
};

// Extraire + trier + précharger une seule fois au module load
const FRAMES = Object.fromEntries(
  Object.entries(RAW).map(([state, modules]) => {
    const paths = naturalSort(Object.values(modules));
    preloadFrames(paths); // force le navigateur à mettre en cache
    return [state, paths];
  })
);


// ─── Composant principal ─────────────────────────────────────────────────────
export default function Player({
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
    speed: state === "attack" ? 80 : state === "dying" ? 120 : 100,
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
        transition: "left 0.25s ease, top 0.25s ease",
        zIndex: 10,
        // Centre le sprite dans la tuile même si l'image est plus petite
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SpriteFrame
        src={currentSrc}
        alt={`player-${state}`}
        className="w-full h-full object-contain"
      />
    </div>
  );
}