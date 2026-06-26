// ======================
// Directions
// ======================

export const DIRS = ["UP", "RIGHT", "DOWN", "LEFT"];

export const DELTAS = {
  UP: [0, -1],
  RIGHT: [1, 0],
  DOWN: [0, 1],
  LEFT: [-1, 0],
};

export function turnLeft(dir) {
  const index = DIRS.indexOf(dir);
  if (index === -1) return "UP";
  return DIRS[(index + 3) % 4];
}

export function turnRight(dir) {
  const index = DIRS.indexOf(dir);
  if (index === -1) return "UP";
  return DIRS[(index + 1) % 4];
}

// ======================
// Commands & filters
// ======================

export const COMMANDS = [
  { id: "F", label: "▲", title: "Forward" },
  { id: "L", label: "↺", title: "Turn Left" },
  { id: "R", label: "↻", title: "Turn Right" },
  { id: "F1", label: "F1", title: "Call F1" },
  { id: "F2", label: "F2", title: "Call F2" },
  { id: "F3", label: "F3", title: "Call F3" },
];

export const COLOR_FILTERS = [
  { id: null, label: "●", title: "Any" },
  { id: "blue", label: "●", title: "Blue" },
  { id: "green", label: "●", title: "Green" },
  { id: "orange", label: "●", title: "Orange" },
];

export const VALID_COLORS = ["blue", "green", "orange"];
export const VALID_COMMANDS = COMMANDS.map((cmd) => cmd.id);

// ======================
// Errors
// ======================

export const SIM_ERRORS = {
  INVALID_CONFIG: "invalid_config",
  INVALID_COMMAND: "invalid_command",
  INVALID_COLOR: "invalid_color",
  INVALID_FUNCTION: "invalid_function",
  INFINITE_LOOP: "infinite_loop",
  FELL_OFF: "fell_off",
};

// ======================
// Board helpers
// ======================

const OUT_OF_BOUNDS = Symbol("OUT_OF_BOUNDS");

function getCellRaw(board, x, y) {
  if (!Array.isArray(board)) return OUT_OF_BOUNDS;
  if (y < 0 || y >= board.length) return OUT_OF_BOUNDS;
  if (!Array.isArray(board[y])) return OUT_OF_BOUNDS;
  if (x < 0 || x >= board[y].length) return OUT_OF_BOUNDS;

  return board[y][x];
}

export function getCell(board, x, y) {
  const cell = getCellRaw(board, x, y);
  return cell === OUT_OF_BOUNDS ? null : cell;
}

export function isWalkableCell(board, x, y) {
  const cell = getCellRaw(board, x, y);
  return cell !== OUT_OF_BOUNDS && cell !== null;
}

// ======================
// Validation
// ======================

function validateConfig(config) {
  if (!config) return SIM_ERRORS.INVALID_CONFIG;
  if (!Array.isArray(config.board)) return SIM_ERRORS.INVALID_CONFIG;
  if (!config.robot) return SIM_ERRORS.INVALID_CONFIG;
  if (!Array.isArray(config.stars)) return SIM_ERRORS.INVALID_CONFIG;

  const { x, y, direction } = config.robot;

  if (!Number.isInteger(x) || !Number.isInteger(y)) {
    return SIM_ERRORS.INVALID_CONFIG;
  }

  if (!DIRS.includes(direction)) {
    return SIM_ERRORS.INVALID_CONFIG;
  }

  if (!isWalkableCell(config.board, x, y)) {
    return SIM_ERRORS.INVALID_CONFIG;
  }

  for (const star of config.stars) {
    if (!Number.isInteger(star.x) || !Number.isInteger(star.y)) {
      return SIM_ERRORS.INVALID_CONFIG;
    }

    if (!isWalkableCell(config.board, star.x, star.y)) {
      return SIM_ERRORS.INVALID_CONFIG;
    }
  }

  return null;
}

function validateFunctions(functions) {
  if (!Array.isArray(functions)) return SIM_ERRORS.INVALID_FUNCTION;

  for (const fn of functions) {
    if (!fn || !Array.isArray(fn.slots)) {
      return SIM_ERRORS.INVALID_FUNCTION;
    }

    for (const slot of fn.slots) {
      if (!slot?.cmd) continue;

      if (!VALID_COMMANDS.includes(slot.cmd)) {
        return SIM_ERRORS.INVALID_COMMAND;
      }

      if (slot.color !== null && slot.color !== undefined) {
        if (!VALID_COLORS.includes(slot.color)) {
          return SIM_ERRORS.INVALID_COLOR;
        }
      }
    }
  }

  return null;
}

// ======================
// Simulation
// ======================

const DEFAULT_LIMITS = {
  maxSteps: 500,
  maxDepth: 80,
};

const FN_INDEX = {
  F1: 0,
  F2: 1,
  F3: 2,
};

function buildStarsSet(stars) {
  return new Set(stars.map((s) => `${s.x},${s.y}`));
}

function cloneStarsSet(starsLeft) {
  return new Set([...starsLeft]);
}

function makeStep(robot, starsLeft, action = null) {
  return {
    x: robot.x,
    y: robot.y,
    direction: robot.direction,
    starsLeft: cloneStarsSet(starsLeft),
    action,
  };
}

export function simulate(config, functions, options = {}) {
  const limits = {
    ...DEFAULT_LIMITS,
    ...options,
  };

  const configError = validateConfig(config);
  if (configError) {
    return {
      won: false,
      error: configError,
      steps: [],
      stepsCount: 0,
    };
  }

  const functionError = validateFunctions(functions);
  if (functionError) {
    return {
      won: false,
      error: functionError,
      steps: [],
      stepsCount: 0,
    };
  }

  const { board, stars } = config;

  let robot = { ...config.robot };
  let starsLeft = buildStarsSet(stars);
  let stepCount = 0;

  const steps = [
    makeStep(robot, starsLeft, {
      type: "start",
    }),
  ];

  collectStar();

  function isWon() {
    return starsLeft.size === 0;
  }

  function collectStar() {
    starsLeft.delete(`${robot.x},${robot.y}`);
  }

  function recordStep(action) {
    steps.push(makeStep(robot, starsLeft, action));
  }

  function shouldExecuteSlot(slot) {
    const filterColor = slot.color ?? null;
    if (filterColor === null) return true;

    const currentColor = getCell(board, robot.x, robot.y);
    return currentColor === filterColor;
  }

  function execute(fnIndex, depth = 0) {
    if (isWon()) return null;

    if (depth > limits.maxDepth) {
      return SIM_ERRORS.INFINITE_LOOP;
    }

    if (stepCount > limits.maxSteps) {
      return SIM_ERRORS.INFINITE_LOOP;
    }

    const fn = functions[fnIndex];

    if (!fn) {
      return SIM_ERRORS.INVALID_FUNCTION;
    }

    for (let slotIndex = 0; slotIndex < fn.slots.length; slotIndex++) {
      if (isWon()) return null;

      const slot = fn.slots[slotIndex];
      if (!slot?.cmd) continue;

      if (!shouldExecuteSlot(slot)) {
        continue;
      }

      stepCount++;

      if (stepCount > limits.maxSteps) {
        return SIM_ERRORS.INFINITE_LOOP;
      }

      const error = executeSlot(slot, fnIndex, slotIndex, depth);

      if (error) {
        return error;
      }
    }

    return null;
  }

  function executeSlot(slot, fnIndex, slotIndex, depth) {
    const action = {
      cmd: slot.cmd,
      color: slot.color ?? null,
      fnIndex,
      slotIndex,
    };

    switch (slot.cmd) {
      case "F":
        return moveForward(action);

      case "L":
        return rotate(turnLeft, action);

      case "R":
        return rotate(turnRight, action);

      case "F1":
      case "F2":
      case "F3":
        recordStep({
          ...action,
          type: "call",
          targetFnIndex: FN_INDEX[slot.cmd],
        });

        return execute(FN_INDEX[slot.cmd], depth + 1);

      default:
        return SIM_ERRORS.INVALID_COMMAND;
    }
  }

  function moveForward(action) {
    const [dx, dy] = DELTAS[robot.direction];

    const nx = robot.x + dx;
    const ny = robot.y + dy;

    if (!isWalkableCell(board, nx, ny)) {
      recordStep({
        ...action,
        type: "fell_off",
        to: { x: nx, y: ny },
      });

      return SIM_ERRORS.FELL_OFF;
    }

    robot = {
      ...robot,
      x: nx,
      y: ny,
    };

    collectStar();

    recordStep({
      ...action,
      type: "move",
      to: { x: nx, y: ny },
    });

    return null;
  }

  function rotate(turnFn, action) {
    robot = {
      ...robot,
      direction: turnFn(robot.direction),
    };

    recordStep({
      ...action,
      type: "rotate",
    });

    return null;
  }

  const error = execute(0);

  return {
    won: isWon(),
    error: isWon() ? null : error,
    steps,
    stepsCount: steps.length,
  };
}