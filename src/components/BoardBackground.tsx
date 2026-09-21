export default function BoardBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10"
      style={{
        backgroundColor: "var(--background)",
        backgroundImage:
          "linear-gradient(var(--board-line) 1px, transparent 1px), linear-gradient(90deg, var(--board-line) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
  );
}
