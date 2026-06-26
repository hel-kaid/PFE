import "../../css/ResultBanner.css";

const CONTENT = {
  win: {
    icon: "🎉",
    heading: "Level Complete!",
    defaultMessage: "Good job!",
  },
  lose: {
    icon: "❌",
    heading: "Mission Failed",
    defaultMessage: "Try again!",
  },
};

export default function ResultBanner({
  result,
  errorMsg,
  xpGained,
  level,
  onRetry,
  onNext,
}) {
  if (!result) return null;

  const isWin = result === "win";
  const content = CONTENT[result];

  if (!content) return null;

  return (
    <div className={`result-banner ${isWin ? "result-win" : "result-lose"}`}>
      <div className="result-icon">{content.icon}</div>

      <div className="result-text">
        <h2>{content.heading}</h2>

        {isWin ? (
          <>
            {xpGained !== undefined && <p>+{xpGained} XP</p>}
            {level && <p>Level {level}</p>}
            {!xpGained && !level && <p>{content.defaultMessage}</p>}
          </>
        ) : (
          <p>{errorMsg || content.defaultMessage}</p>
        )}
      </div>

      <div className="result-actions">
        {!isWin && onRetry && (
          <button type="button" onClick={onRetry}>
            Retry
          </button>
        )}

        {isWin && onNext && (
          <button type="button" onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}