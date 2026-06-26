import {
  COMMANDS,
  COLOR_FILTERS,
} from "../../utils/robozzle/engine";
import "../../css/Toolbar.css";

const FN_COLORS = {
  F1: "#7c6cf8",
  F2: "#06b6d4",
  F3: "#f97316",
};

const COLOR_MAP = {
  blue: "#38bdf8",
  green: "#7ee000",
  orange: "#ff8c00",
};

function isFunctionCommand(cmdId) {
  return ["F1", "F2", "F3"].includes(cmdId);
}

function canShowCommand(cmd, fnCount) {
  if (cmd.id === "F2") return fnCount >= 2;
  if (cmd.id === "F3") return fnCount >= 3;
  return true;
}

function CommandButton({ cmd, selected, onSelect }) {
  const isActive = selected.cmd === cmd.id;

  return (
    <button
      type="button"
      className={`tool-btn command-btn ${isActive ? "active" : ""}`}
      style={{
        color: FN_COLORS[cmd.id] || "#111827",
      }}
      title={cmd.title}
      onClick={() => onSelect(cmd.id)}
    >
      {cmd.label}
    </button>
  );
}

function ColorButton({ filter, selected, onSelect }) {
  const isActive = selected.color === filter.id;
  const color = filter.id ? COLOR_MAP[filter.id] : "#111827";

  return (
    <button
      type="button"
      className={`tool-btn color-btn ${isActive ? "active" : ""}`}
      title={filter.title}
      onClick={() => onSelect(filter.id)}
    >
      <span
        className="color-dot"
        style={{
          color,
        }}
      >
        ●
      </span>
    </button>
  );
}

export default function Toolbar({
  selected,
  setSelected,
  fnCount = 1,
  disabled = false,
}) {
  const visibleCommands = COMMANDS.filter((cmd) =>
    canShowCommand(cmd, fnCount)
  );

  const selectCommand = (cmdId) => {
    if (disabled) return;

    setSelected((prev) => ({
      ...prev,
      cmd: cmdId,
    }));
  };

  const selectColor = (colorId) => {
    if (disabled) return;

    setSelected((prev) => ({
      ...prev,
      color: colorId,
    }));
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar-section">
        <h3>Commandes</h3>

        <div className="toolbar-row">
          {visibleCommands.map((cmd) => (
            <CommandButton
              key={cmd.id}
              cmd={cmd}
              selected={selected}
              onSelect={selectCommand}
            />
          ))}
        </div>
      </div>

      <div className="toolbar-section">
        <h3>Couleurs</h3>

        <div className="toolbar-row">
          {COLOR_FILTERS.map((filter) => (
            <ColorButton
              key={String(filter.id)}
              filter={filter}
              selected={selected}
              onSelect={selectColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}