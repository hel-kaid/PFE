import { useNavigate } from "react-router-dom";
import useRobozzleStages from "../hooks/useRobozzleStages";
import "../css/RobozzleLevelsPage.css";
import "../css/PythonGame.css";
export default function RobozzleLevelsPage() {
  const navigate = useNavigate();
  const { stages, loading, error } = useRobozzleStages(3);

  if (loading) return <h2 className="html-loading">Loading...</h2>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <main className="robozzle-page">
      <section className="robozzle-card">
        <span className="robozzle-badge">🤖 Robot Puzzle</span>

        <h1 className="robozzle-title">Robozzle</h1>
        <p className="robozzle-subtitle">Choisis une mission robot</p>

        <div className="levels-grid">
          {stages.map((stage, index) => (
            <button
              key={stage.id}
              disabled={stage.locked}
              className={`level-card ${
                stage.completed ? "completed" : ""
              } ${stage.locked ? "locked" : ""}`}
              onClick={() => navigate(`/robozzle/stage/${stage.id}`)}
            >
              <div className="robot-head">
                <span>{stage.completed ? "✓" : stage.locked ? "🔒" : "🤖"}</span>
              </div>

              <span className="level-number">Mission {index + 1}</span>

              <h3>{stage.name}</h3>

              <p>
                {stage.completed
                  ? "Mission terminée"
                  : stage.locked
                  ? "Mission verrouillée"
                  : "Prêt à programmer"}
              </p>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}