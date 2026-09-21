export type ColorKey =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple";

export const COLORS: Record<ColorKey, { bg: string; text: string }> = {
  red: { bg: "var(--block-red)", text: "#3d0d0d" },
  orange: { bg: "var(--block-orange)", text: "#3d2200" },
  yellow: { bg: "var(--block-yellow)", text: "#3d2e00" },
  green: { bg: "var(--block-green)", text: "#0b3a1f" },
  blue: { bg: "var(--block-blue)", text: "#0a2440" },
  purple: { bg: "var(--block-purple)", text: "#26103f" },
};

export const COLOR_KEYS = Object.keys(COLORS) as ColorKey[];

/** Each section owns one color so the palette reads as a system, not confetti. */
export const SECTION_COLOR = {
  about: "blue",
  projects: "orange",
  skills: "purple",
  blog: "green",
  contact: "yellow",
} as const satisfies Record<string, ColorKey>;

export type SectionKey = keyof typeof SECTION_COLOR;

/** Block Blast style pieces: rows of 0/1 cells. */
export const SHAPES: number[][][] = [
  [[1]],
  [[1, 1]],
  [[1], [1]],
  [[1, 1, 1]],
  [[1], [1], [1]],
  [[1, 1, 1, 1]],
  [[1], [1], [1], [1]],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1, 0],
    [1, 1],
  ],
  [
    [0, 1],
    [1, 1],
  ],
  [
    [1, 1],
    [1, 0],
  ],
  [
    [1, 1],
    [0, 1],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
  ],
];

/** Decorative shapes for the drifting background field. */
export const AMBIENT_SHAPES = SHAPES.filter(
  (shape) => shape.length * shape[0].length >= 3
);

export function shapeCells(shape: number[][]) {
  const cells: { row: number; col: number }[] = [];
  shape.forEach((row, r) =>
    row.forEach((filled, c) => {
      if (filled) cells.push({ row: r, col: c });
    })
  );
  return cells;
}

export function shapeSize(shape: number[][]) {
  return { rows: shape.length, cols: shape[0].length };
}
