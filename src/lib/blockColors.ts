export const blockColors = [
  { bg: "var(--block-red)", text: "#3a0f0f" },
  { bg: "var(--block-orange)", text: "#3a2200" },
  { bg: "var(--block-yellow)", text: "#3a2c00" },
  { bg: "var(--block-green)", text: "#0f3a20" },
  { bg: "var(--block-blue)", text: "#0f2540" },
  { bg: "var(--block-purple)", text: "#28103f" },
];

export function colorForIndex(i: number) {
  return blockColors[i % blockColors.length];
}
