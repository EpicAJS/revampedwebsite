"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  COLORS,
  COLOR_KEYS,
  SHAPES,
  shapeCells,
  type ColorKey,
} from "@/lib/blocks";
import { PieceView, tileStyle } from "./Tile";

const SIZE = 8;
const CELLS = SIZE * SIZE;
const CLEAR_MS = 320;
const BEST_KEY = "bb-best";

type Piece = { id: number; shape: number[][]; color: ColorKey };
type Grid = (ColorKey | null)[];

let pieceId = 0;
let burstId = 0;

function nextBurstId() {
  return ++burstId;
}

function makePiece(): Piece {
  return {
    id: pieceId++,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    color: COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)],
  };
}

/**
 * The opening hand is fixed so the server and client render the same markup.
 * Every refill after that is randomised in an event handler, client-side only.
 */
function openingTray(): Piece[] {
  return [
    { id: pieceId++, shape: SHAPES[7], color: "blue" },
    { id: pieceId++, shape: SHAPES[3], color: "orange" },
    { id: pieceId++, shape: SHAPES[8], color: "green" },
  ];
}

function emptyGrid(): Grid {
  return Array.from({ length: CELLS }, () => null);
}

function anchorCells(shape: number[][], index: number) {
  const row = Math.floor(index / SIZE);
  const col = index % SIZE;
  return shapeCells(shape).map((cell) => ({
    row: row + cell.row,
    col: col + cell.col,
  }));
}

function canPlace(grid: Grid, shape: number[][], index: number) {
  return anchorCells(shape, index).every(
    ({ row, col }) => row < SIZE && col < SIZE && grid[row * SIZE + col] === null
  );
}

function fits(grid: Grid, shape: number[][]) {
  for (let i = 0; i < CELLS; i++) {
    if (canPlace(grid, shape, i)) return true;
  }
  return false;
}

function findFullLines(grid: Grid) {
  const cleared = new Set<number>();
  let lines = 0;

  for (let row = 0; row < SIZE; row++) {
    const indices = Array.from({ length: SIZE }, (_, c) => row * SIZE + c);
    if (indices.every((i) => grid[i] !== null)) {
      indices.forEach((i) => cleared.add(i));
      lines++;
    }
  }

  for (let col = 0; col < SIZE; col++) {
    const indices = Array.from({ length: SIZE }, (_, r) => r * SIZE + col);
    if (indices.every((i) => grid[i] !== null)) {
      indices.forEach((i) => cleared.add(i));
      lines++;
    }
  }

  return { cleared, lines };
}

// Best score lives in localStorage, read through an external store so the
// server render (0) and the client hydration agree.
let cachedBest: number | null = null;

function readBest() {
  if (cachedBest === null) {
    try {
      cachedBest = Number(window.localStorage.getItem(BEST_KEY)) || 0;
    } catch {
      cachedBest = 0;
    }
  }
  return cachedBest;
}

function writeBest(value: number) {
  cachedBest = value;
  try {
    window.localStorage.setItem(BEST_KEY, String(value));
  } catch {
    // storage unavailable — the session score still shows
  }
}

function subscribeBest() {
  return () => {};
}

export default function PlayableBoard() {
  const [grid, setGrid] = useState<Grid>(emptyGrid);
  const [tray, setTray] = useState<(Piece | null)[]>(openingTray);
  const [selected, setSelected] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [clearing, setClearing] = useState<Set<number>>(() => new Set());
  const [score, setScore] = useState(0);
  const [burst, setBurst] = useState<{ id: number; text: string } | null>(null);

  const storedBest = useSyncExternalStore(subscribeBest, readBest, () => 0);
  const best = Math.max(storedBest, score);

  const gameOver = useMemo(() => {
    if (clearing.size > 0) return false;
    const pieces = tray.filter(Boolean) as Piece[];
    if (pieces.length === 0) return false;
    return !pieces.some((piece) => fits(grid, piece.shape));
  }, [grid, tray, clearing]);

  const reset = useCallback(() => {
    setGrid(emptyGrid());
    setTray([makePiece(), makePiece(), makePiece()]);
    setSelected(null);
    setHover(null);
    setClearing(new Set());
    setScore(0);
  }, []);

  function place(index: number) {
    if (selected === null || gameOver) return;
    const piece = tray[selected];
    if (!piece || !canPlace(grid, piece.shape, index)) return;

    const next = [...grid];
    const placed = anchorCells(piece.shape, index);
    placed.forEach(({ row, col }) => {
      next[row * SIZE + col] = piece.color;
    });

    const { cleared, lines } = findFullLines(next);
    const gained = placed.length + lines * lines * 10;
    const newScore = score + gained;

    setGrid(next);
    setScore(newScore);
    setSelected(null);
    setHover(null);

    if (newScore > best) writeBest(newScore);

    const nextTray = [...tray];
    nextTray[selected] = null;
    setTray(
      nextTray.every((slot) => slot === null)
        ? [makePiece(), makePiece(), makePiece()]
        : nextTray
    );

    if (lines > 0) {
      setClearing(cleared);
      setBurst({
        id: nextBurstId(),
        text: lines > 1 ? `COMBO ×${lines}!` : "CLEAR!",
      });
      window.setTimeout(() => {
        setGrid((current) => {
          const after = [...current];
          cleared.forEach((i) => {
            after[i] = null;
          });
          return after;
        });
        setClearing(new Set());
      }, CLEAR_MS);
    }
  }

  const activePiece = selected !== null ? tray[selected] : null;
  const previewValid =
    activePiece && hover !== null && canPlace(grid, activePiece.shape, hover);
  const previewCells = new Set(
    activePiece && hover !== null && previewValid
      ? anchorCells(activePiece.shape, hover).map(
          ({ row, col }) => row * SIZE + col
        )
      : []
  );

  return (
    <div className="panel p-4 sm:p-5 relative">
      <div className="flex items-end justify-between mb-4 gap-4">
        <div>
          <p className="text-[10px] font-extrabold tracking-[0.18em] opacity-50">
            SCORE
          </p>
          <p className="text-3xl font-extrabold leading-none tabular-nums">
            {score}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-extrabold tracking-[0.18em] opacity-50">
            BEST
          </p>
          <p className="text-lg font-extrabold leading-none tabular-nums opacity-80">
            {best}
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-8 gap-1.5">
          {grid.map((cell, i) => {
            const isClearing = clearing.has(i);
            const isPreview = previewCells.has(i);

            if (cell) {
              return (
                <div
                  key={i}
                  className={`tile aspect-square ${isClearing ? "animate-clear" : ""}`}
                  style={tileStyle(cell)}
                />
              );
            }

            return (
              <button
                key={i}
                type="button"
                aria-label={`cell ${i}`}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover((h) => (h === i ? null : h))}
                onClick={() => place(i)}
                className="tile-empty aspect-square transition-colors"
                style={
                  isPreview && activePiece
                    ? {
                        background: COLORS[activePiece.color].bg,
                        opacity: 0.45,
                      }
                    : undefined
                }
              />
            );
          })}
        </div>

        <AnimatePresence>
          {burst && (
            <motion.div
              key={burst.id}
              initial={{ opacity: 0, scale: 0.6, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: -10 }}
              exit={{ opacity: 0, scale: 1.4, y: -40 }}
              transition={{ duration: 0.45 }}
              onAnimationComplete={() => setBurst(null)}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <span
                className="text-3xl font-extrabold px-4 py-1"
                style={{
                  color: "#fff",
                  textShadow:
                    "0 0 18px rgba(255,255,255,0.7), 0 3px 0 rgba(0,0,0,0.4)",
                }}
              >
                {burst.text}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl backdrop-blur-sm"
              style={{ background: "rgba(16,19,43,0.82)" }}
            >
              <p className="text-2xl font-extrabold">No moves left</p>
              <button
                type="button"
                onClick={reset}
                className="tile tile-lg px-5 py-2.5 font-extrabold"
                style={{ ...tileStyle("green"), color: COLORS.green.text }}
              >
                Play again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 min-h-[74px]">
        {tray.map((piece, i) => (
          <button
            key={piece?.id ?? `empty-${i}`}
            type="button"
            disabled={!piece}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`flex-1 flex items-center justify-center rounded-xl p-2 min-h-[70px] transition-all ${
              selected === i
                ? "bg-white/10 scale-105"
                : "hover:bg-white/5 disabled:opacity-0"
            }`}
          >
            {piece && (
              <PieceView
                shape={piece.shape}
                color={piece.color}
                cell={22}
                gap={3}
              />
            )}
          </button>
        ))}
      </div>

      <p className="mt-2 text-center text-[11px] font-bold tracking-wide opacity-45">
        {selected === null
          ? "PICK A PIECE, THEN TAP THE BOARD"
          : "TAP A SPOT TO DROP IT"}
      </p>
    </div>
  );
}
