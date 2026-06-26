import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, ArrowRight, Trophy } from "lucide-react";

export default function VictoryModal({
    show,
    onClose,
    playAgain,
    nextStage,
}) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* BACKDROP */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* MODAL */}
                    <motion.div
                        initial={{ scale: 0.85, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="
                relative
                bg-white
                rounded-3xl
                shadow-2xl
                w-full
                max-w-md
                overflow-hidden
                border
                border-slate-200
                "
                    >
                        {/* HEADER GRADIENT (style GameCard) */}
                        <div className="bg-gradient-to-br from-orange-400 to-pink-500 p-6 text-white relative">

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 bg-white/20 p-2 rounded-xl hover:bg-white/30 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                                    <Trophy className="w-6 h-6" />
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-widest opacity-80">
                                        Victory
                                    </p>
                                    <h2 className="text-2xl font-black">
                                        Level Complete
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {/* CONTENT */}
                        <div className="p-6">
                            <p className="text-slate-600 text-center mb-6">
                                Bravo 🎉 Tu as réussi le niveau !
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={playAgain}
                                    className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-3
                    rounded-2xl
                    bg-slate-100
                    text-slate-700
                    font-semibold
                    hover:bg-slate-200
                    transition
                     "
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    Rejouer
                                </button>

                                <button
                                    onClick={nextStage}
                                    className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-3
                    rounded-2xl
                    bg-gradient-to-r
                    from-orange-500
                    to-pink-500
                    text-white
                    font-bold
                    shadow-lg
                    hover:scale-105
                    transition
                    "
                                >
                                    Suivant
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}