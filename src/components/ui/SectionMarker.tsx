interface SectionMarkerProps {
  number: string;
  label: string;
  light?: boolean;
}

export function SectionMarker({ number, label, light = false }: SectionMarkerProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-xs font-medium tabular-nums tracking-wider"
        style={{ color: "#b88463" }}
      >
        {number}
      </span>
      <span
        className="h-px w-6"
        style={{ background: light ? "rgba(184,132,99,0.4)" : "rgba(184,132,99,0.3)" }}
      />
      <span
        className="text-[11px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: light ? "rgba(255,255,255,0.5)" : "#a2a9ac" }}
      >
        {label}
      </span>
    </div>
  );
}
