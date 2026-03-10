interface SectionMarkerProps {
  number: string;
  label: string;
  light?: boolean;
}

export function SectionMarker({ number, label, light = false }: SectionMarkerProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-xs font-bold tabular-nums tracking-wider"
        style={{ color: "#b88463" }}
      >
        {number}
      </span>
      <span
        className="h-px w-6"
        style={{ background: "#b88463", opacity: 0.4 }}
      />
      <span
        className="text-[11px] font-bold uppercase tracking-[0.2em]"
        style={{ color: light ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.7)" }}
      >
        {label}
      </span>
    </div>
  );
}
