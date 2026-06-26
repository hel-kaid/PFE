import { COMMANDS } from "./constants";

const MAX_LOOP = 1000;
const MAX_STEPS = 5000; // total actions guard

// ─── Tokenizer ────────────────────────────────────────────────────────────────

function tokenize(code) {
    return code
        .split("\n")
        .map((raw, index) => {
            // Strip inline comments
            const noComment = raw.replace(/#.*$/, "");
            const stripped = noComment.trimEnd();
            const trimmed = stripped.trimStart();
            const indent = stripped.length - trimmed.length;
            return { raw: trimmed, indent, lineNo: index + 1 };
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
// Handles: integer literals, variables, +, -, *, //, %
// Does NOT handle parentheses (not needed for typical game code)

function evalExpr(str, env) {
    const s = str.trim();

    // Integer literal
    if (/^-?\d+$/.test(s)) return Number(s);

    // Variable
    if (/^\w+$/.test(s)) {
        if (!env.has(s)) throw new Error(`Undefined variable: "${s}"`);
        return env.get(s);
    }

    // Binary operations (right-to-left split so we get the last operator)
    // Order: +/- first (lowest precedence), then */ //  %
    for (const op of ["+", "-", "*", "//", "%"]) {
        const idx = s.lastIndexOf(op);
        if (idx > 0) {
            const left = evalExpr(s.slice(0, idx), env);
            const right = evalExpr(s.slice(idx + op.length), env);
            switch (op) {
                case "+": return left + right;
                case "-": return left - right;
                case "*": return left * right;
                case "//": return Math.trunc(left / right);
                case "%": return left % right;
            }
        }
    }

    throw new Error(`Cannot evaluate expression: "${s}"`);
}

// ─── Condition evaluator ──────────────────────────────────────────────────────

const GAME_CONDITIONS = new Set([
    "enemy_ahead()", "enemy_right()", "enemy_left()",
    "enemy_above()", "enemy_below()", "enemy_nearby()",
]);

function evalCondition(condStr, ctx, env) {
    const s = condStr.trim();

    // not <condition>
    if (s.startsWith("not ")) {
        return !evalCondition(s.slice(4).trim(), ctx, env);
    }

    // X and Y
    const andIdx = s.indexOf(" and ");
    if (andIdx !== -1) {
        return (
            evalCondition(s.slice(0, andIdx), ctx, env) &&
            evalCondition(s.slice(andIdx + 5), ctx, env)
        );
    }

    // X or Y
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
                case "==": return left === right;
                case "!=": return left !== right;
                case "<": return left < right;
                case ">": return left > right;
                case "<=": return left <= right;
                case ">=": return left >= right;
            }
        }
    }

    if (GAME_CONDITIONS.has(s)) {
        const { player, enemies } = ctx;
        switch (s) {
            case "enemy_ahead()":
                return enemies.some((e) => e.x === player.x && e.y === player.y);
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
        }
    }

    throw new Error(`Unknown condition: "${s}"`);
}



const COMMAND_MAP = {
    "move_right()": COMMANDS.RIGHT,
    "move_left()": COMMANDS.LEFT,
    "move_up()": COMMANDS.UP,
    "move_down()": COMMANDS.DOWN,
    "attack()": COMMANDS.ATTACK,
};



function* interpretBlock(tokens, getCtx, env, userFuncs, stepCounter) {
    let i = 0;

    while (i < tokens.length) {
        const token = tokens[i];
        const { raw, lineNo } = token;


        if (stepCounter.count > MAX_STEPS) {
            throw new Error(`Execution limit reached (max ${MAX_STEPS} steps)`);
        }


        if (!raw || raw.startsWith("#")) { i++; continue; }


        if (raw.startsWith("print(")) { i++; continue; }


        if (COMMAND_MAP[raw] !== undefined) {
            stepCounter.count++;
            yield COMMAND_MAP[raw];
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

        const defMatch = raw.match(/^def\s+([a-zA-Z_]\w*)\s*\(\s*\)\s*:$/);
        if (defMatch) {
            const { block, nextIndex } = extractBlock(tokens, i);
            if (block.length === 0) throw new Error(`Empty function body: "${defMatch[1]}" (line ${lineNo})`);
            userFuncs.set(defMatch[1], block);
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
            if (block.length === 0) throw new Error(`Empty loop body (line ${lineNo})`);

            for (let j = 0; j < repeat; j++) {

                const loopEnv = new Map(env);
                loopEnv.set(loopVar, j);
                yield* interpretBlock(block, getCtx, loopEnv, userFuncs, stepCounter);
            }

            i = nextIndex;
            continue;
        }


        const whileMatch = raw.match(/^while\s+(.+)\s*:$/);
        if (whileMatch) {
            const condStr = whileMatch[1];
            const { block, nextIndex } = extractBlock(tokens, i);
            if (block.length === 0) throw new Error(`Empty while body (line ${lineNo})`);

            let guard = 0;
            while (evalCondition(condStr, getCtx(), env)) {
                if (++guard > MAX_LOOP) throw new Error(`Infinite loop detected (line ${lineNo})`);
                yield* interpretBlock(block, getCtx, new Map(env), userFuncs, stepCounter);
            }

            i = nextIndex;
            continue;
        }


        const ifMatch = raw.match(/^if\s+(.+)\s*:$/);
        if (ifMatch) {
            const condStr = ifMatch[1];
            const { block: ifBlock, nextIndex: afterIf } = extractBlock(tokens, i);
            if (ifBlock.length === 0) throw new Error(`Empty if body (line ${lineNo})`);

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
                yield* interpretBlock(ifBlock, getCtx, new Map(env), userFuncs, stepCounter);
            } else if (elseBlock.length > 0) {
                yield* interpretBlock(elseBlock, getCtx, new Map(env), userFuncs, stepCounter);
            }

            i = nextIndex;
            continue;
        }

        const callMatch = raw.match(/^([a-zA-Z_]\w*)\(\)$/);
        if (callMatch) {
            const funcName = callMatch[1];
            if (!userFuncs.has(funcName)) {
                throw new Error(`Unknown command or function: "${funcName}" (line ${lineNo})`);
            }
            yield* interpretBlock(userFuncs.get(funcName), getCtx, new Map(env), userFuncs, stepCounter);
            i++;
            continue;
        }

        throw new Error(`Syntax error: "${raw}" (line ${lineNo})`);
    }
}



export function parseCode(code, getCtx) {
    if (!getCtx) {
        getCtx = () => ({ player: { x: 0, y: 0 }, enemies: [] });
    }

    const tokens = tokenize(code);
    const env = new Map();
    const userFuncs = new Map();
    const stepCounter = { count: 0 };
    return interpretBlock(tokens, getCtx, env, userFuncs, stepCounter);
}