import Image from "next/image";

type Props = {
  art: [string, string];
  label: string;
  /** Optional cover photo, e.g. "/covers/waresport.jpg". Falls back to art. */
  image?: string;
  className?: string;
  rounded?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Cover art. Uses a real photo when one is supplied, otherwise generates a
 * deterministic gradient-and-waveform cover so nothing ever looks unfinished.
 */
export default function AlbumArt({
  art,
  label,
  image,
  className = "",
  rounded = "rounded-md",
  sizes = "(max-width: 768px) 40vw, 240px",
  priority,
}: Props) {
  if (image) {
    return (
      <div className={`relative overflow-hidden ${rounded} ${className}`}>
        <Image
          src={image}
          alt={label}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const initials = label
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const bars = Array.from({ length: 9 }, (_, i) => {
    const seed = (label.charCodeAt(i % label.length) * (i + 3)) % 100;
    return 25 + (seed % 65);
  });

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{
        background: `linear-gradient(145deg, ${art[0]} 0%, ${art[1]} 100%)`,
        containerType: "inline-size",
      }}
    >
      <div className="absolute inset-0 flex items-end justify-center gap-[3.5%] px-[12%] pb-[16%] opacity-30">
        {bars.map((height, i) => (
          <div
            key={i}
            className="flex-1 rounded-full bg-white"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-extrabold text-white/90 leading-none"
          style={{ fontSize: "clamp(0.85rem, 26cqw, 5rem)" }}
        >
          {initials}
        </span>
      </div>
    </div>
  );
}
