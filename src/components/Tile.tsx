import type { CSSProperties } from "react";
import { COLORS, shapeSize, type ColorKey } from "@/lib/blocks";

type TileVars = CSSProperties & { "--tile": string };

export function tileStyle(color: ColorKey): TileVars {
  return { "--tile": COLORS[color].bg };
}

export function Tile({
  color,
  className = "",
  style,
}: {
  color: ColorKey;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`tile ${className}`}
      style={{ ...tileStyle(color), ...style }}
    />
  );
}

/** Renders a Block Blast piece as a grid of tiles. */
export function PieceView({
  shape,
  color,
  cell = 22,
  gap = 3,
  className = "",
}: {
  shape: number[][];
  color: ColorKey;
  cell?: number;
  gap?: number;
  className?: string;
}) {
  const { rows, cols } = shapeSize(shape);

  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, ${cell}px)`,
        gridTemplateRows: `repeat(${rows}, ${cell}px)`,
        gap,
        // Keep corners proportional so small pieces don't render as circles.
        ["--tile-radius" as string]: `${Math.max(3, Math.round(cell * 0.24))}px`,
      }}
    >
      {shape.flatMap((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <Tile key={`${r}-${c}`} color={color} />
          ) : (
            <div key={`${r}-${c}`} />
          )
        )
      )}
    </div>
  );
}
