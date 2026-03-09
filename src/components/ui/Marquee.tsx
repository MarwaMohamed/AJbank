"use client";

interface MarqueeProps {
  text: string;
  separator?: string;
  className?: string;
  style?: React.CSSProperties;
  repeat?: number;
}

export function Marquee({
  text,
  separator = " \u2022 ",
  className = "",
  style,
  repeat = 8,
}: MarqueeProps) {
  const items = Array(repeat)
    .fill(null)
    .map((_, i) => (
      <span key={i} className="whitespace-nowrap">
        {text}
        <span className="mx-6" style={{ color: "#b88463" }}>{separator}</span>
      </span>
    ));

  return (
    <div className={`overflow-hidden ${className}`} style={style} aria-hidden="true">
      <div className="animate-marquee flex w-max">
        {items}
        {items}
      </div>
    </div>
  );
}
