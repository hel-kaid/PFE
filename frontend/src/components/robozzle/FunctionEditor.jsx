import { COMMANDS } from "../../utils/robozzle/engine";
import "../../css/FunctionEditor.css";

const FN_COLORS = ["#7c6cf8", "#06b6d4", "#f97316"];

const COLOR_MAP = {
  blue: "#3b82f6",
  green: "#22c55e",
  orange: "#f97316",
};

function getCommand(cmdId) {
  return COMMANDS.find((cmd) => cmd.id === cmdId);
}

function FunctionSlot({
  slot,
  fnIdx,
  slotIdx,
  placeCommand,
  clearSlot,
  disabled,
  currentInstruction,
}) {
  const command = getCommand(slot?.cmd);
  const hasCommand = Boolean(slot?.cmd);

  const isExecuting =
    currentInstruction?.fnIndex === fnIdx &&
    currentInstruction?.slotIndex === slotIdx;

  const handleClick = () => {
    if (disabled) return;
    placeCommand(fnIdx, slotIdx);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    if (disabled) return;
    clearSlot(fnIdx, slotIdx);
  };

  return (
    <button
      type="button"
      className={`slot ${hasCommand ? "filled" : "empty-slot"} ${
        isExecuting ? "executing" : ""
      }`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      disabled={disabled}
    >
      {hasCommand ? (
        <div className="slot-content">
          {slot.color && (
            <span
              className="slot-dot"
              style={{ backgroundColor: COLOR_MAP[slot.color] }}
            />
          )}

          <span className="slot-label">
            {command?.label ?? slot.cmd}
          </span>
        </div>
      ) : (
        <span className="slot-plus">+</span>
      )}
    </button>
  );
}

export default function FunctionEditor({
  functions = [],
  placeCommand,
  clearSlot,
  running = false,
  currentInstruction = null,
}) {
  if (!functions.length) return null;

  return (
    <div className="functions-container">
      {functions.map((fn, fnIdx) => {
        const isCurrentFunction = currentInstruction?.fnIndex === fnIdx;
        const isTargetFunction = currentInstruction?.targetFnIndex === fnIdx;

        return (
          <div
            key={fn.id ?? fnIdx}
            className={`function-card ${
              isCurrentFunction ? "function-running" : ""
            } ${isTargetFunction ? "function-target" : ""}`}
          >
            <div
              className={`function-title ${
                isCurrentFunction ? "title-running" : ""
              } ${isTargetFunction ? "title-target" : ""}`}
              style={{ color: FN_COLORS[fnIdx] ?? "#ffffff" }}
            >
              {isCurrentFunction && <span className="function-pointer">▶</span>}
              {isTargetFunction && !isCurrentFunction && (
                <span className="function-pointer">↓</span>
              )}
              {fn.label ?? `F${fnIdx + 1}`}
            </div>

            <div className="slots-row">
              {(fn.slots ?? []).map((slot, slotIdx) => (
                <FunctionSlot
                  key={slotIdx}
                  slot={slot}
                  fnIdx={fnIdx}
                  slotIdx={slotIdx}
                  placeCommand={placeCommand}
                  clearSlot={clearSlot}
                  disabled={running}
                  currentInstruction={currentInstruction}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}