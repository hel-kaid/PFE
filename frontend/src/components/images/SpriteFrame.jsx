import { useState } from "react";

export default function SpriteFrame({
  src,
  alt = "",
  className = "",
  flip = false,
  style = {},
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return <div className={className} style={{ background: "transparent", ...style }} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      draggable={false}
      onError={() => setFailed(true)}
      style={{
        imageRendering: "pixelated",
        transform: flip ? "scaleX(-1)" : "none",
        ...style,
      }}
    />
  );
}