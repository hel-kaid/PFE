import { naturalSort, preloadFrames, useSpriteAnimation } from "../../hooks/useSpriteAnimation";
import SpriteFrame from "./SpriteFrame";

const RAW = {
  idle: import.meta.glob("/src/assets/monsters/orc/Idle/*.png", { eager: true, import: "default" }),
  attack: import.meta.glob("/src/assets/monsters/orc/Slashing/*.png", { eager: true, import: "default" }),
};

const FRAMES = Object.fromEntries(
  Object.entries(RAW).map(([state, modules]) => {
    const paths = naturalSort(Object.values(modules));
    preloadFrames(paths);
    return [state, paths];
  })
);

export default function Orc({ x, y, tileSize, state = "idle", onDeathComplete }) {
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
        overflow: "visible",
      }}
    >
      <SpriteFrame
        src={currentSrc}
        alt={`orc-${state}`}
        flip={true}
        style={{
          width: tileSize * 1.2,
          height: tileSize * 1.2,
          objectFit: "cover",
          transform: "translateY(-20px) scaleX(-1)",
        }}
      />
    </div>
  );
}