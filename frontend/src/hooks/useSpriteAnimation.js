import { useState, useEffect, useRef } from "react";

export function naturalSort(paths) {
  return [...paths].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
  );
}

export function preloadFrames(paths) {
  return paths.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });
}

export function useSpriteAnimation({ frames, speed, loop = true, onComplete }) {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    indexRef.current = 0;
    setIndex(0);

    if (!frames || frames.length === 0) return;

    timerRef.current = setInterval(() => {
      const next = indexRef.current + 1;

      if (next >= frames.length) {
        if (!loop) {
          clearInterval(timerRef.current);
          onComplete?.();
          return;
        }
        indexRef.current = 0;
        setIndex(0);
      } else {
        indexRef.current = next;
        setIndex(next);
      }
    }, speed);

    return () => clearInterval(timerRef.current);
  }, [frames, speed, loop]);

  return index;
}