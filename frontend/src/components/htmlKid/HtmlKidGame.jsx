import { useEffect, useMemo, useState } from "react";
import useHtmlKidStages from "../../hooks/useHtmlKidStages";
import CodeEditorHtml from "../CodeEditorHtml";
import VictoryModal from "../VictoryModal";
import "../../css/HtmlKidGame.css";

export default function HtmlKidGame({
  gameId,
  stageId,
  stages,
  onSelectStage,
  onBack,
}) {
  const { fetchStage, completeStage } = useHtmlKidStages(gameId);

  const [stage, setStage] = useState(null);
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [message, setMessage] = useState("");
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  useEffect(() => {
    loadStage();
  }, [stageId]);

  async function loadStage() {
    try {
      setLoading(true);

      const data = await fetchStage(stageId);

      setStage(data);
      setCode(data.config?.defaultCode || "");
      setTimeLeft(data.timer_seconds);
      setElapsed(0);
      setMessage("");
      setFinished(false);
      setShowHint(false);
      setIsRunning(false);
      setShowVictoryModal(false);
    } catch {
      setMessage("Erreur lors du chargement du niveau.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!stage || finished || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [stage, finished, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && stage && !finished) {
      setFinished(true);
      setMessage("⏰ Temps terminé. Réessaie !");
    }
  }, [timeLeft, stage, finished]);

  const keywords = useMemo(() => {
    return stage?.config?.keywords || [];
  }, [stage]);

  function normalizeHtml(value) {
    return value
      .replace(/\s+/g, "")
      .replace(/"/g, "'")
      .toLowerCase();
  }

  function insertKeyword(keyword) {
    if (finished) return;

    setCode((prev) => {
      if (!prev) return keyword;
      return `${prev}\n${keyword}`;
    });
  }

  async function runCode() {
    if (finished || !stage) return;

    setIsRunning(true);

    const expectedCode = stage.config?.expectedCode || "";
    const isCorrect = normalizeHtml(code) === normalizeHtml(expectedCode);

    if (!isCorrect) {
      setMessage("❌ Code incorrect. Regarde le hint et les keywords.");
      setIsRunning(false);
      return;
    }

    setFinished(true);
    setShowVictoryModal(true);
    setMessage("🎉 Bravo ! Niveau terminé.");

    try {
      const result = await completeStage(stage.id, elapsed, { code });

      setMessage(`🎉 Bravo ! Niveau terminé. +${result?.xp_gained || 0} XP`);
    } catch (error) {
      const msg = error.response?.data?.message || "";

      if (
        msg.toLowerCase().includes("already") ||
        msg.toLowerCase().includes("completed") ||
        msg.toLowerCase().includes("déjà")
      ) {
        setMessage("🎉 Niveau déjà complété !");
        setFinished(true);
        setShowVictoryModal(true);
        return;
      }

      setFinished(false);
      setShowVictoryModal(false);
      setMessage(msg || "Erreur lors de la validation du niveau.");
    } finally {
      setIsRunning(false);
    }
  }

  function resetGame() {
    if (!stage) return;

    setCode(stage.config?.defaultCode || "");
    setTimeLeft(stage.timer_seconds);
    setElapsed(0);
    setMessage("");
    setFinished(false);
    setIsRunning(false);
  }

  function playAgain() {
    setShowVictoryModal(false);
    resetGame();
  }

  function nextStage() {
    if (!stages) return;

    const currentIndex = stages.findIndex((s) => s.id === stageId);
    const next = stages[currentIndex + 1];

    setShowVictoryModal(false);

    if (!next) {
      onBack();
      return;
    }

    onSelectStage(next.id);
  }

  function buildPreviewHtml(html) {
    if (!html) return "";

    let result = html;

    const images = {
      "cat.png": "/html-kid/cat.png",
      "dog.png": "/html-kid/dog.png",
      "lion.png": "/html-kid/lion.png",
      "apple.png": "/html-kid/apple.png",
    };

    Object.entries(images).forEach(([fileName, publicPath]) => {
      result = result.replaceAll(
        `src="${fileName}"`,
        `src="${publicPath}" width="180"`
      );

      result = result.replaceAll(
        `src='${fileName}'`,
        `src="${publicPath}" width="180"`
      );
    });

    return result;
  }

  if (loading) return <h2 className="html-loading">Loading...</h2>;
  if (!stage) return <h2 className="html-loading">Niveau introuvable.</h2>;

  return (
    <main className="html-kid-shell">
      <section className="html-kid-topbar">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>

        <div className="stage-title">
          <h1>
            {stage.order} - {stage.name}
          </h1>
          <p>{stage.description}</p>
        </div>

        <div className="top-actions">
          <button
            className="hint-btn"
            onClick={() => setShowHint(!showHint)}
          >
            HINTS
          </button>

          <div className={`stage-badge ${timeLeft <= 10 ? "danger" : ""}`}>
            ⏱ {timeLeft}s
          </div>
        </div>
      </section>

      {showHint && (
        <div className="hint-floating-box">
          <strong>💡 Hint:</strong> {stage.config?.hint}
        </div>
      )}

      <section className="html-kid-main-final">
        <div className="left-preview-column">
          <div className="goal-preview-card">
            <div className="preview-title">🎯 Objectif à créer</div>

            <iframe
              title="expected-preview"
              className="preview-frame"
              srcDoc={buildPreviewHtml(
                stage.config?.expectedPreview || stage.config?.expectedCode
              )}
            />
          </div>

          <div className="live-preview-card">
            <div className="preview-title">👀 Affichage du code</div>

            <iframe
              title="html-preview"
              className="preview-frame"
              srcDoc={buildPreviewHtml(code)}
            />
          </div>
        </div>

        <aside className="right-editor-column">
          <div className="goal-text-box">
            <strong>🎯 Mission:</strong> {stage.config?.goal}
          </div>

          <CodeEditorHtml
            code={code}
            setCode={setCode}
            runCode={runCode}
            resetGame={resetGame}
            isRunning={isRunning}
          />

          <div className="keywords-panel">
            <div className="keywords-title">🔑 Keywords</div>

            <div className="keywords-box">
              {keywords.map((keyword, index) => (
                <button
                  key={index}
                  className="keyword-btn"
                  onClick={() => insertKeyword(keyword)}
                  disabled={finished}
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          {message && <p className="game-message">{message}</p>}
        </aside>
      </section>

      <VictoryModal
        show={showVictoryModal}
        onClose={() => setShowVictoryModal(false)}
        playAgain={playAgain}
        nextStage={nextStage}
      />
    </main>
  );
}