import { useEffect, useState } from "react";

export default function AnimatedSprite({
    frames,
    speed = 100,
    loop = true,
    className = "",
}) {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame((prev) => {
                const next = prev + 1;

                if (next >= frames.length) {
                    return loop ? 0 : prev;
                }

                return next;
            });
        }, speed);

        return () => clearInterval(interval);
    }, [frames, speed, loop]);

    return (
        <img
            src={frames[frame]}
            className={className}
            alt=""
        />
    );
}