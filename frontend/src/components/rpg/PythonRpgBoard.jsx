import { useEffect, useState } from "react";
import Player from "../images/Player";
import Goblin from "../images/Goblin";
import Orc from "../images/Orc";

const MIN_TILE_SIZE = 64;

function useResponsiveTileSize(mapWidth, mapHeight) {
  const [tileSize, setTileSize] = useState(MIN_TILE_SIZE);

  useEffect(() => {
    function resize() {
      const editorWidth = 470;
      const headerHeight = 80;

      const availableWidth = window.innerWidth - editorWidth - 160;
      const availableHeight = window.innerHeight - headerHeight - 180;

      const size = Math.floor(
        Math.min(
          availableWidth / mapWidth,
          availableHeight / mapHeight
        )
      );

      setTileSize(Math.max(MIN_TILE_SIZE, size));
    }

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, [mapWidth, mapHeight]);

  return tileSize;
}

const SPRITES = {
  flag: (
    <svg viewBox="0 0 32 32" width="70%" height="70%">
      <rect x="14" y="4" width="2.5" height="26" fill="#8a7a6a" />
      <polygon points="16.5,4 28,10 16.5,16" fill="#e03030" />
    </svg>
  ),

  coin: (
    <svg viewBox="0 0 32 32" width="60%" height="60%">
      <circle cx="16" cy="16" r="12" fill="#d4a017" />
      <circle cx="16" cy="16" r="9" fill="#f0c030" />
      <text x="16" y="20" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#c8700a">
        $
      </text>
    </svg>
  ),

  key: (
    <svg viewBox="0 0 32 32" width="60%" height="60%">
      <circle cx="10" cy="12" r="7" fill="none" stroke="#c8a45a" strokeWidth="3" />
      <rect x="15" y="11" width="14" height="3" fill="#c8a45a" rx="1" />
      <rect x="24" y="14" width="3" height="4" fill="#c8a45a" rx="1" />
    </svg>
  ),
};

function getItemSprite(type) {
  return SPRITES[type] || null;
}

function getObjectSprite(type) {
  return SPRITES[type] || null;
}

function getStoneTile(tileSize) {
  const base = "#191f1e";

  return (
    <svg
      viewBox="0 0 64 64"
      width={tileSize}
      height={tileSize}
      style={{ display: "block" }}
    >
      <rect x="0" y="0" width="64" height="64" fill={base} />

      <rect
        x="0"
        y="0"
        width="64"
        height="64"
        fill="none"
        stroke="#0a0a12"
        strokeWidth="1"
      />

      <ellipse cx="26" cy="22" rx="12" ry="7" fill="#1a3028" opacity="0.65" />
      <ellipse cx="48" cy="48" rx="9" ry="5" fill="#1c3522" opacity="0.5" />

      <rect x="0" y="0" width="64" height="2" fill="#ffffff" opacity="0.02" />
      <rect x="0" y="0" width="2" height="64" fill="#ffffff" opacity="0.02" />
    </svg>
  );
}

export default function PythonRpgBoard({ gameState }) {
  const mapWidth = 12;
  const mapHeight = 6;

  const TILE_SIZE = useResponsiveTileSize(mapWidth, mapHeight);

  const boardW = mapWidth * TILE_SIZE;
  const boardH = mapHeight * TILE_SIZE;

  return (
    <div
      style={{
        fontFamily: "'Cinzel', serif",
        background: "#12100e",
        borderRadius: "10px",
        padding: "18px",
        border: "2px solid #5a3e1b",
        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        width: boardW + 36,
        boxSizing: "content-box",
      }}
    >
      <div style={{ marginBottom: "14px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 700,
            letterSpacing: "4px",
            color: "#c8a45a",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          ⚔ RPG World
        </h2>

        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, #5a3e1b, transparent)",
            marginTop: "8px",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          width: boardW,
          height: boardH,
          borderRadius: "5px",
          overflow: "hidden",
          border: "1.5px solid #5a3e1b",
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
        }}
      >
        {Array.from({ length: mapWidth * mapHeight }).map((_, index) => {
          const tx = index % mapWidth;
          const ty = Math.floor(index / mapWidth);

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                width: TILE_SIZE,
                height: TILE_SIZE,
                left: tx * TILE_SIZE,
                top: ty * TILE_SIZE,
              }}
            >
              {getStoneTile(TILE_SIZE)}
            </div>
          );
        })}

        {gameState.objects?.map((object, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: TILE_SIZE,
              height: TILE_SIZE,
              left: object.x * TILE_SIZE,
              top: object.y * TILE_SIZE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {getObjectSprite(object.type)}
          </div>
        ))}

        {gameState.items?.map((item, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: TILE_SIZE,
              height: TILE_SIZE,
              left: item.x * TILE_SIZE,
              top: item.y * TILE_SIZE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "itemFloat 2s ease-in-out infinite",
            }}
          >
            {getItemSprite(item.type)}
          </div>
        ))}

        {gameState.enemies?.map((enemy) => (
          <div key={enemy.id}>
            {enemy.type === "goblin" && (
              <Goblin
                x={enemy.x}
                y={enemy.y}
                tileSize={TILE_SIZE}
                state={enemy.state}
              />
            )}

            {enemy.type === "orc" && (
              <Orc
                x={enemy.x}
                y={enemy.y}
                tileSize={TILE_SIZE}
                state={enemy.state}
              />
            )}

            <div
              style={{
                position: "absolute",
                top: enemy.y * TILE_SIZE + 6,
                left: enemy.x * TILE_SIZE + 10,
                width: TILE_SIZE - 20,
                height: 6,
                background: "rgba(0,0,0,0.6)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.round((enemy.hp / (enemy.maxHp || 1)) * 100)}%`,
                  background: "linear-gradient(90deg, #8b1a1a, #e03030)",
                }}
              />
            </div>
          </div>
        ))}

        <Player
          x={gameState.player.x}
          y={gameState.player.y}
          tileSize={TILE_SIZE}
          state={gameState.player.state}
        />

        <style>{`
          @keyframes itemFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
        `}</style>
      </div>

      <div style={{ marginTop: 14 }}>
        <div
          style={{
            fontSize: 12,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#c8a45a",
            marginBottom: 8,
            borderBottom: "1px solid #3a2d10",
            paddingBottom: 6,
          }}
        >
          Inventory
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {gameState.inventory?.length === 0 && (
            <span style={{ color: "#6a5a40", fontSize: 13, fontStyle: "italic" }}>
              Empty
            </span>
          )}

          {gameState.inventory?.map((item, index) => (
            <div
              key={index}
              style={{
                width: 44,
                height: 44,
                background: "#1c1610",
                border: "1px solid #c8a45a",
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {getItemSprite(item.type)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}