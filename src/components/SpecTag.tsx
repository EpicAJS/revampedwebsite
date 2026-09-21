export default function SpecTag({ label }: { label: string }) {
  return (
    <span
      className="inline-block px-2.5 py-1 text-xs tracked uppercase border hairline"
      style={{ fontFamily: "var(--font-display)", color: "var(--silver)" }}
    >
      {label}
    </span>
  );
}
