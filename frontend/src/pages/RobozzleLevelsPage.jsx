import { useNavigate } from "react-router-dom";
import useRobozzleStages from "../hooks/useRobozzleStages";
import "../css/RobozzleLevelsPage.css";

export default function RobozzleLevelsPage() {
  const navigate = useNavigate();

  const { stages, loading, error } = useRobozzleStages(3);

  if (loading) {
    return <p className="status">Loading...</p>;
  }

  if (error) {
    return <p className="status error">{error}</p>;
  }

  return (
    <main className="robozzle-page">
      <section className="robozzle-card">
        <h1 className="robozzle-title">Robozzle</h1>
        <p className="robozzle-subtitle">Choisis un niveau pour commencer</p>

        <div className="levels-grid">
          {stages.map((stage) => (
            <button
              key={stage.id}
              disabled={stage.locked}
              className={`level-button ${
                stage.completed ? "completed" : ""
              } ${stage.locked ? "locked" : ""}`}
              onClick={() => navigate(`/robozzle/stage/${stage.id}`)}
            >
              <span>{stage.name}</span>

              <span className="level-icon">
                {stage.completed && "✅"}
                {stage.locked && "🔒"}
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}