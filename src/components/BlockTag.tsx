import { COLORS, type ColorKey } from "@/lib/blocks";
import { tileStyle } from "./Tile";

export default function BlockTag({
  label,
  color,
}: {
  label: string;
  color: ColorKey;
}) {
  return (
    <span
      className="tile inline-block px-2.5 py-1 text-xs font-extrabold"
      style={{ ...tileStyle(color), color: COLORS[color].text }}
    >
      {label}
    </span>
  );
}
