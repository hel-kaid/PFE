import { COMMANDS } from "./constants";

const MAX_LOOP = 1000;
const MAX_STEPS = 5000;

// ─── Tokenizer ────────────────────────────────────────────────────────────────

function tokenize(code) {
  return code
    .split("\n")
    .map((raw, index) => {
      const noComment = raw.replace(/#.*$/, "");
      const stripped = noComment.trimEnd();
      const trimmed = stripped.trimStart();
      const indent = stripped.length - trimmed.length;

      return {
        raw: trimmed,
        indent,
        lineNo: index + 1,
      };
    })
    .filter((t) => t.raw.length > 0);
}

// ─── Block extractor ──────────────────────────────────────────────────────────

function extractBlock(tokens, headerIndex) {
  const baseIndent = tokens[headerIndex].indent;
  const block = [];
  let i = headerIndex + 1;

  while (i < tokens.length && tokens[i].indent > baseIndent) {
    block.push(tokens[i]);
    i++;
  }

  return { block, nextIndex: i };
}

// ─── Expression evaluator ─────────────────────────────────────────────────────

function evalExpr(str, env) {
  const s = str.trim();

  if (/^-?\d+$/.test(s)) {
    return Number(s);
  }

  if (/^\w+$/.test(s)) {
    if (!env.has(s)) {
      throw new Error(`Undefined variable: "${s}"`);
    }

    return env.get(s);
  }

  for (const op of ["+", "-", "*", "//", "%"]) {
    const idx = s.lastIndexOf(op);

    if (idx > 0) {
      const left = evalExpr(s.slice(0, idx), env);
      const right = evalExpr(s.slice(idx + op.length), env);

      switch (op) {
        case "+":
          return left + right;
        case "-":
          return left - right;
        case "*":
          return left * right;
        case "//":
          return Math.trunc(left / right);
        case "%":
          return left % right;
      }
    }
  }

  throw new Error(`Cannot evaluate expression: "${s}"`);
}

// ─── Condition evaluator ──────────────────────────────────────────────────────

const GAME_CONDITIONS = new Set([
  "enemy_ahead()",
  "enemy_right()",
  "enemy_left()",
  "enemy_above()",
  "enemy_below()",
  "enemy_nearby()",

  "on_coin()",
  "has_key()",
  "door_ahead()",
  "flag_reached()",
  "has_enemy()",
  "wall_ahead()",
]);

function evalCondition(condStr, ctx, env) {
  const s = condStr.trim();

  if (s.startsWith("not ")) {
    return !evalCondition(s.slice(4).trim(), ctx, env);
  }

  const andIdx = s.indexOf(" and ");
  if (andIdx !== -1) {
    return (
      evalCondition(s.slice(0, andIdx), ctx, env) &&
      evalCondition(s.slice(andIdx + 5), ctx, env)
    );
  }

  const orIdx = s.indexOf(" or ");
  if (orIdx !== -1) {
    return (
      evalCondition(s.slice(0, orIdx), ctx, env) ||
      evalCondition(s.slice(orIdx + 4), ctx, env)
    );
  }

  for (const op of ["==", "!=", "<=", ">=", "<", ">"]) {
    const idx = s.indexOf(op);

    if (idx !== -1) {
      const left = evalExpr(s.slice(0, idx).trim(), env);
      const right = evalExpr(s.slice(idx + op.length).trim(), env);

      switch (op) {
        case "==":
          return left === right;
        case "!=":
          return left !== right;
        case "<":
          return left < right;
        case ">":
          return left > right;
        case "<=":
          return left <= right;
        case ">=":
          return left >= right;
      }
    }
  }

  if (GAME_CONDITIONS.has(s)) {
    const {
      player,
      enemies = [],
      items = [],
      objects = [],
      inventory = [],
    } = ctx;

    const front = {
      x: player.x,
      y: player.y,
    };

    if (player.direction === "right") front.x += 1;
    if (player.direction === "left") front.x -= 1;
    if (player.direction === "up") front.y -= 1;
    if (player.direction === "down") front.y += 1;

    switch (s) {
      case "enemy_ahead()":
        return enemies.some((e) => e.x === front.x && e.y === front.y);

      case "enemy_right()":
        return enemies.some((e) => e.x === player.x + 1 && e.y === player.y);

      case "enemy_left()":
        return enemies.some((e) => e.x === player.x - 1 && e.y === player.y);

      case "enemy_above()":
        return enemies.some((e) => e.x === player.x && e.y === player.y - 1);

      case "enemy_below()":
        return enemies.some((e) => e.x === player.x && e.y === player.y + 1);

      case "enemy_nearby()":
        return enemies.some(
          (e) => Math.abs(e.x - player.x) + Math.abs(e.y - player.y) <= 1
        );
        case "wall_ahead()": {
          const tile =
            ctx.map?.tiles?.[front.y]?.[front.x] ?? "floor";

          return tile === "wall" || tile === "void";
        }
      case "on_coin()":
        return items.some(
          (item) =>
            item.type === "coin" &&
            item.x === player.x &&
            item.y === player.y
        );

      case "has_key()":
        return inventory.some((item) => item.type === "key");

      case "door_ahead()":
        return objects.some(
          (obj) =>
            obj.type === "door" &&
            obj.opened !== true &&
            obj.x === front.x &&
            obj.y === front.y
        );

      case "flag_reached()":
        return objects.some(
          (obj) =>
            obj.type === "flag" &&
            obj.x === player.x &&
            obj.y === player.y
        );

      case "has_enemy()":
        return enemies.length > 0;
    }
  }

  throw new Error(`Unknown condition: "${s}"`);
}

// ─── Commands ────────────────────────────────────────────────────────────────

const COMMAND_MAP = {
  "move_right()": COMMANDS.RIGHT,
  "move_left()": COMMANDS.LEFT,
  "move_up()": COMMANDS.UP,
  "move_down()": COMMANDS.DOWN,
  "attack()": COMMANDS.ATTACK,
};

function* yieldCommand(commandKey, repeat, stepCounter, lineNo) {
  if (!Number.isInteger(repeat) || repeat < 1) {
    throw new Error(`Invalid repeat value: ${repeat} (line ${lineNo})`);
  }

  if (repeat > MAX_LOOP) {
    throw new Error(`Repeat count too large (max ${MAX_LOOP}) (line ${lineNo})`);
  }

  for (let j = 0; j < repeat; j++) {
    stepCounter.count++;

    if (stepCounter.count > MAX_STEPS) {
      throw new Error(`Execution limit reached (max ${MAX_STEPS} steps)`);
    }

    yield COMMAND_MAP[commandKey];
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function splitArgs(str) {
  const s = str.trim();

  if (s === "") {
    return [];
  }

  return s.split(",").map((arg) => arg.trim());
}

// ─── Interpreter ──────────────────────────────────────────────────────────────

function* interpretBlock(tokens, getCtx, env, userFuncs, stepCounter) {
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];
    const { raw, lineNo } = token;

    if (stepCounter.count > MAX_STEPS) {
      throw new Error(`Execution limit reached (max ${MAX_STEPS} steps)`);
    }

    if (!raw || raw.startsWith("#")) {
      i++;
      continue;
    }

    if (raw.startsWith("print(")) {
      i++;
      continue;
    }

    const assignMatch = raw.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);

    if (assignMatch && !raw.startsWith("if ") && !raw.startsWith("while ")) {
      const name = assignMatch[1];
      const value = evalExpr(assignMatch[2], env);
      env.set(name, value);
      i++;
      continue;
    }

    const defMatch = raw.match(/^def\s+([a-zA-Z_]\w*)\s*\((.*?)\)\s*:$/);

    if (defMatch) {
      const funcName = defMatch[1];
      const params = splitArgs(defMatch[2]);

      const { block, nextIndex } = extractBlock(tokens, i);

      if (block.length === 0) {
        throw new Error(`Empty function body: "${funcName}" (line ${lineNo})`);
      }

      userFuncs.set(funcName, {
        params,
        body: block,
      });

      i = nextIndex;
      continue;
    }

    const forMatch = raw.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+range\((.+)\)\s*:$/);

    if (forMatch) {
      const loopVar = forMatch[1];
      const repeat = evalExpr(forMatch[2], env);

      if (!Number.isInteger(repeat) || repeat < 0) {
        throw new Error(`Invalid range value: ${repeat} (line ${lineNo})`);
      }

      if (repeat > MAX_LOOP) {
        throw new Error(`Loop count too large (max ${MAX_LOOP}) (line ${lineNo})`);
      }

      const { block, nextIndex } = extractBlock(tokens, i);

      if (block.length === 0) {
        throw new Error(`Empty loop body (line ${lineNo})`);
      }

      for (let j = 0; j < repeat; j++) {
        env.set(loopVar, j);
        yield* interpretBlock(block, getCtx, env, userFuncs, stepCounter);
      }

      i = nextIndex;
      continue;
    }

    const whileMatch = raw.match(/^while\s+(.+)\s*:$/);

    if (whileMatch) {
      const condStr = whileMatch[1];
      const { block, nextIndex } = extractBlock(tokens, i);

      if (block.length === 0) {
        throw new Error(`Empty while body (line ${lineNo})`);
      }

      let guard = 0;

      while (evalCondition(condStr, getCtx(), env)) {
        if (++guard > MAX_LOOP) {
          throw new Error(`Infinite loop detected (line ${lineNo})`);
        }

        yield* interpretBlock(block, getCtx, env, userFuncs, stepCounter);
      }

      i = nextIndex;
      continue;
    }

    const ifMatch = raw.match(/^if\s+(.+)\s*:$/);

    if (ifMatch) {
      const condStr = ifMatch[1];
      const { block: ifBlock, nextIndex: afterIf } = extractBlock(tokens, i);

      if (ifBlock.length === 0) {
        throw new Error(`Empty if body (line ${lineNo})`);
      }

      let elseBlock = [];
      let nextIndex = afterIf;

      if (
        afterIf < tokens.length &&
        tokens[afterIf].raw === "else:" &&
        tokens[afterIf].indent === token.indent
      ) {
        const { block, nextIndex: afterElse } = extractBlock(tokens, afterIf);
        elseBlock = block;
        nextIndex = afterElse;
      }

      if (evalCondition(condStr, getCtx(), env)) {
        yield* interpretBlock(ifBlock, getCtx, env, userFuncs, stepCounter);
      } else if (elseBlock.length > 0) {
        yield* interpretBlock(elseBlock, getCtx, env, userFuncs, stepCounter);
      }

      i = nextIndex;
      continue;
    }

    const callMatch = raw.match(/^([a-zA-Z_]\w*)\s*\((.*?)\)\s*$/);

    if (callMatch) {
      const funcOrCommandName = callMatch[1];
      const argStrings = splitArgs(callMatch[2]);
      const argValues = argStrings.map((arg) => evalExpr(arg, env));

      const commandKey = `${funcOrCommandName}()`;

      if (COMMAND_MAP[commandKey] !== undefined) {
        const repeat = argValues.length === 0 ? 1 : argValues[0];
        yield* yieldCommand(commandKey, repeat, stepCounter, lineNo);
        i++;
        continue;
      }

      if (!userFuncs.has(funcOrCommandName)) {
        throw new Error(
          `Unknown command or function: "${funcOrCommandName}" (line ${lineNo})`
        );
      }

      const func = userFuncs.get(funcOrCommandName);

      if (argValues.length !== func.params.length) {
        throw new Error(
          `Function "${funcOrCommandName}" expects ${func.params.length} argument(s), got ${argValues.length} (line ${lineNo})`
        );
      }

      const localEnv = new Map(env);

      func.params.forEach((paramName, index) => {
        localEnv.set(paramName, argValues[index]);
      });

      yield* interpretBlock(
        func.body,
        getCtx,
        localEnv,
        userFuncs,
        stepCounter
      );

      i++;
      continue;
    }

    throw new Error(`Syntax error: "${raw}" (line ${lineNo})`);
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function parseCode(code, getCtx) {
  if (!getCtx) {
    getCtx = () => ({
      player: { x: 0, y: 0 },
      enemies: [],
    });
  }

  const tokens = tokenize(code);
  const env = new Map();
  const userFuncs = new Map();
  const stepCounter = { count: 0 };

  return interpretBlock(tokens, getCtx, env, userFuncs, stepCounter);
}