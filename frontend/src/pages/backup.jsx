import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";

import { api } from "../services/api";
import CodeEditor from "../components/CodeEditor";
import GameGrid from "../components/GameGrid";
import VictoryModal from "../components/VictoryModal";

import { parseCode } from "../utils/parser";
import { COMMANDS } from "../utils/constants";
import useSnakeGameStages from "../hooks/useSnakeGameStages";


function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


export default function StagePlayPage() {
    const { gameId, id } = useParams();
    const navigate = useNavigate();

    const { currentStage, fetchStage } = useSnakeGameStages(gameId);

    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [shake, setShake] = useState(false);
    const [explosion, setExplosion] = useState(null);
    const [showVictoryModal, setShowVictoryModal] = useState(false);
    const [snakeTrail, setSnakeTrail] = useState([]);

    /* =========================
        FETCH STAGE
    ========================= */
    useEffect(() => {
        if (id) fetchStage(id);
    }, [id, fetchStage]);

    /* =========================
        INIT GAME
    ========================= */
    useEffect(() => {
        if (!currentStage?.config) return;

        // Initialize game state based on stage config
        const initializeGame = async () => {
            setCode(currentStage.config.defaultCode || "");
            setSnakeTrail(
                currentStage.config.snakeStart
                    ? [currentStage.config.snakeStart]
                    : []
            );
        };

        initializeGame();
    }, [currentStage]);

    /* =========================
        RESET
    ========================= */
    function resetGame() {
        if (!currentStage?.config) return;

        setSnakeTrail(
            currentStage.config.snakeStart
                ? [currentStage.config.snakeStart]
                : []
        );

        setExplosion(null);
        setMessage("");
    }

    function playAgain() {
        setShowVictoryModal(false);
        resetGame();
    }

    function nextStage() {
        setShowVictoryModal(false);

        const nextId = Number(id) + 1;

        navigate(
            nextId
                ? `/games/${gameId}/stages/${nextId}`
                : `/games/${gameId}/stages`
        );
    }

    /* =========================
        RUN CODE
    ========================= */
    async function runCode() {
        if (isRunning || !currentStage?.config) return;

        resetGame();
        setIsRunning(true);

        let x = currentStage.config.snakeStart.x;
        let y = currentStage.config.snakeStart.y;

        try {
            const actions = parseCode(code);

            for (const action of actions) {
                if (action === COMMANDS.RIGHT) x++;
                if (action === COMMANDS.LEFT) x--;
                if (action === COMMANDS.UP) y--;
                if (action === COMMANDS.DOWN) y++;

                const size = currentStage.config.gridSize;

                const outside =
                    x < 0 || y < 0 || x >= size || y >= size;

                if (outside) {
                    setMessage("Out of bounds ❌");
                    setIsRunning(false);
                    return;
                }

                const obstacle = currentStage.config.obstacles?.some(
                    (o) => o.x === x && o.y === y
                );

                if (obstacle) {
                    setExplosion({ x, y });
                    setShake(true);

                    setTimeout(() => setShake(false), 500);

                    setMessage("You hit a wall ❌");
                    setIsRunning(false);
                    return;
                }

                setSnakeTrail((prev) => [...prev, { x, y }]);

                await sleep(250);
            }

            const treasure = currentStage.config.treasure;

            const success =
                x === treasure.x && y === treasure.y;

            if (!success) {
                setMessage("Treasure not reached ❌");
                setIsRunning(false);
                return;
            }

            const requiresLoop = currentStage.config.requiresLoop;

            if (requiresLoop && !code.includes("for")) {
                setMessage("Use a loop ❌");
                setIsRunning(false);
                return;
            }

            const response = await api.post("/snake/complete", {
                game_id: parseInt(gameId),
                stage_id: parseInt(currentStage.id),
            });
            console.log(
                    `+${response.data.xp_gained} XP`
                );

                console.log(
                    `Level ${response.data.level}`
                );

            setMessage("Stage completed 🎉🔥⚡");
            setShowVictoryModal(true);

        } catch (err) {
            setMessage(err.message || "Error");
        } finally {
            setIsRunning(false);
        }
    }

    /* =========================
       LOADING SAFETY
    ========================= */
    if (!currentStage?.config) {
        return <p className="text-white p-10">Loading...</p>;
    }

    /* =========================
       RENDER
    ========================= */
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50 text-slate-800 p-6">

            {/* BACKGROUND DECOR */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-orange-300 rounded-full blur-[120px]" />
                <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-pink-300 rounded-full blur-[120px]" />
            </div>

            {/* HEADER */}
            <div className="relative z-10 flex justify-between items-center mb-10">

                <div>
                    <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                        {currentStage.name}
                    </h1>

                    <p className="text-slate-500 mt-2 text-lg max-w-xl">
                        {currentStage.description}
                    </p>
                </div>

                <div className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        px-6
        py-4
        shadow-lg
      ">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                            <Trophy className="text-white w-5 h-5" />
                        </div>

                        <div>
                            <p className="text-xs text-slate-500">STAGE</p>
                            <p className="font-black text-slate-800">
                                {id}
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* MAIN GRID */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 h-[750px]">

                {/* CODE EDITOR */}
                <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
                    <CodeEditor
                        code={code}
                        setCode={setCode}
                        runCode={runCode}
                        resetGame={resetGame}
                        isRunning={isRunning}
                    />
                </div>

                {/* GAME */}
                <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
                    <GameGrid
                        currentStage={currentStage}
                        snakeTrail={snakeTrail}
                        explosion={explosion}
                        message={message}
                        shake={shake}
                    />
                </div>

            </div>

            {/* VICTORY MODAL */}
            <VictoryModal
                show={showVictoryModal}
                onClose={() => setShowVictoryModal(false)}
                playAgain={playAgain}
                nextStage={nextStage}
            />

        </div>
    );
}