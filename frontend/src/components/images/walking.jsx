import { useEffect, useState } from "react";

const frames = Object.values(
    import.meta.glob(
        "/src/assets/player/Dying/*.png",
        {
            eager: true,
            import: "default",
        }
    )
).sort();

export default function Walking() {
    const [frame, setFrame] = useState(0);
    const [attacking, setAttacking] = useState(false);

    useEffect(() => {
        if (!attacking) return;

        const interval = setInterval(() => {
            setFrame((prev) => {
                const next = prev + 1;

                if (next >= frames.length) {
                    clearInterval(interval);
                    setAttacking(false);
                    return 0;
                }

                return next;
            });
        }, 80);

        return () => clearInterval(interval);
    }, [attacking]);

    const attack = () => {
        setFrame(0);
        setAttacking(true);
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-6">
            <img
                src={frames[frame]}
                alt="player"
                className="w-40 h-40 pixelated"
            />

            <button
                onClick={attack}
                className="px-6 py-3 rounded-xl bg-red-600 text-white font-bold"
            >
                Attack ⚔️
            </button>
        </div>
    );
}