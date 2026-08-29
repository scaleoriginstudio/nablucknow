/** A Google Material Symbol, rendered as an outline (unfilled) glyph.
    Real, established icon set — no hand-drawn SVG paths. Usage:
    <Icon name="visibility" size={28} className="text-white" /> */
export function Icon({
  name,
  size = 24,
  weight = 300,
  className = "",
}: {
  name: string;
  size?: number;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  className?: string;
}) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: size,
        // FILL 0 keeps it a stroke-only outline, never a solid glyph.
        fontVariationSettings: `'FILL' 0, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
