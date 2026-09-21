export default function BlockTag({
  label,
  color,
  textColor,
}: {
  label: string;
  color: string;
  textColor: string;
}) {
  return (
    <span
      className="inline-block px-3 py-1 rounded-lg text-xs font-bold border-2 border-black/30"
      style={{
        background: color,
        color: textColor,
        boxShadow: "inset 0 2px 0 rgba(255,255,255,0.35)",
      }}
    >
      {label}
    </span>
  );
}
