import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw, ArrowRight, Trophy, Sparkles } from "lucide-react";

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
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/65 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.88, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 15, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              rounded-[2rem]
              bg-white
              shadow-[0_30px_80px_rgba(0,0,0,0.35)]
              border
              border-white/60
            "
          >
            {/* Decorative glow */}
            <div className="absolute -top-24 -right-24 w-56 h-56 bg-pink-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-orange-400/20 rounded-full blur-3xl" />

            {/* Header */}
            <div className="relative bg-gradient-to-br from-orange-400 to-pink-500 px-6 pt-7 pb-16 text-white">
              <button
                onClick={onClose}
                aria-label="Fermer"
                className="
                  absolute
                  top-4
                  right-4
                  rounded-2xl
                  bg-white/20
                  p-2
                  text-white
                  backdrop-blur
                  transition
                  hover:bg-white/30
                  active:scale-95
                "
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ rotate: -15, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.15, type: "spring" }}
                  className="
                    w-14
                    h-14
                    rounded-3xl
                    bg-white/20
                    flex
                    items-center
                    justify-center
                    shadow-inner
                  "
                >
                  <Trophy className="w-7 h-7" />
                </motion.div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 opacity-90" />
                    <p className="text-xs uppercase tracking-[0.25em] opacity-85">
                      Victory
                    </p>
                  </div>

                  <h2 className="mt-1 text-3xl font-black leading-tight">
                    Level Complete
                  </h2>
                </div>
              </div>
            </div>

            {/* Floating icon */}
            <div className="relative -mt-10 flex justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 260 }}
                className="
                  w-20
                  h-20
                  rounded-full
                  bg-white
                  shadow-xl
                  flex
                  items-center
                  justify-center
                  border-4
                  border-orange-100
                "
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white">
                  <Trophy className="w-7 h-7" />
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="relative px-6 pb-6 pt-4">
              <p className="text-center text-lg font-bold text-slate-800">
                Bravo 🎉
              </p>

              <p className="mt-2 text-center text-slate-500 leading-relaxed">
                Tu as réussi le niveau ! Continue comme ça.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <button
                  onClick={playAgain}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-slate-100
                    px-4
                    py-3.5
                    font-bold
                    text-slate-700
                    transition
                    hover:bg-slate-200
                    active:scale-95
                  "
                >
                  <RotateCcw className="w-4 h-4" />
                  Rejouer
                </button>

                <button
                  onClick={nextStage}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    bg-gradient-to-r
                    from-orange-500
                    to-pink-500
                    px-4
                    py-3.5
                    font-black
                    text-white
                    shadow-lg
                    shadow-pink-500/25
                    transition
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    active:scale-95
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