import "../../css/Board.css";

const CELL_COLORS = {
  blue: "#38bdf8",
  green: "#7ee000",
  orange: "#ff8c00",
};

const DIR_ROTATION = {
  UP: "rotate(0deg)",
  RIGHT: "rotate(90deg)",
  DOWN: "rotate(180deg)",
  LEFT: "rotate(270deg)",
};

function Star() {
  return <div className="star">★</div>;
}

function Robot({ direction }) {
  return (
    <div
      className="robot"
      style={{ transform: DIR_ROTATION[direction] }}
    >
      ▲
    </div>
  );
}

function Cell({ color, hasStar, isRobot, direction }) {
  const isEmpty = !color;

  return (
    <div
      className={`cell ${isEmpty ? "empty" : "filled"}`}
      style={{
        backgroundColor: color ? CELL_COLORS[color] : "transparent",
      }}
    >
      {hasStar && <Star />}
      {isRobot && <Robot direction={direction} />}
    </div>
  );
}

export default function Board({ board, robot, starsLeft }) {
  if (!board || !robot) return null;

  const cols = board[0]?.length ?? 1;

  return (
    <div className="board-wrapper">
      <div
        className="board"
        style={{
          gridTemplateColumns: `repeat(${cols}, 40px)`,
        }}
      >
        {board.map((row, y) =>
          row.map((color, x) => (
            <Cell
              key={`${x}-${y}`}
              color={color}
              hasStar={starsLeft?.has(`${x},${y}`)}
              isRobot={robot.x === x && robot.y === y}
              direction={robot.direction}
            />
          ))
        )}
      </div>
    </div>
  );
}