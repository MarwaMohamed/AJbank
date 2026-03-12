/**
 * AJB Key Visual Shape — SVG recreation of the brand's signature angular form.
 * Derived from the official Interbrand key visual shapes PDFs:
 *   - "AJB aljazira bank key visual shapes OF CMYK.pdf" (gradient fill versions)
 *   - "AJB aljazira bank key visual shapes OF NO GRADIENT CMYK.pdf" (outline versions)
 *
 * Three variants matching the brand guideline pages:
 *   "single"  — Single angular form: diagonal top edge (lower-left to upper-right),
 *               vertical right edge curving into bottom, left edge with angular kick-out (page 1)
 *   "double"  — Layered parallel forms with depth, Sand edge highlights (page 2)
 *   "columns" — Vertical columns with shared angled top-left diagonal, skyline silhouette (page 3)
 */

interface KeyVisualShapeProps {
  variant?: "single" | "double" | "columns";
  className?: string;
  /** Use "gradient" for filled glass look, "outline" for thin Sand stroke */
  style?: "gradient" | "outline";
  /** Override stroke/fill color — defaults to Sand #b27f59 */
  color?: string;
  /** Opacity of the entire shape */
  opacity?: number;
  /** Unique ID suffix for gradient defs (needed when multiple instances on same page) */
  id?: string;
}

export function KeyVisualShape({
  variant = "single",
  className = "",
  style = "outline",
  color = "#b27f59",
  opacity = 0.15,
  id = "",
}: KeyVisualShapeProps) {
  const isOutline = style === "outline";
  const gid = id || variant; // unique gradient ID per instance

  /*
   * Path geometry notes (from PDF analysis):
   * The brand shape is a parallelogram viewed in perspective. Key features:
   * - Top edge: diagonal line rising from left to right
   * - Right edge: straight vertical, with a large radius curve at the bottom
   * - Left edge: straight vertical at top, then kicks out at an angle toward bottom-left
   * - The shape flows bottom-left to top-right, like a stylized flag or sail
   */

  // Single shape path — matches PDF page 1
  const singlePath =
    "M150 590 L100 380 L280 60 L330 60 L330 360 Q330 480 270 530 L150 590Z";

  // Double shape paths — matches PDF page 2 (back + front offset)
  const doubleBg =
    "M130 590 L80 380 L260 60 L310 60 L310 360 Q310 480 250 530 L130 590Z";
  const doubleFg =
    "M160 570 L110 360 L290 40 L340 40 L340 340 Q340 460 280 510 L160 570Z";

  // Columns paths — matches PDF page 3 (wide column + 2 narrow vertical columns)
  const colMain =
    "M60 600 L60 340 L280 100 L280 600Z";
  const colMid =
    "M300 600 L300 160 L320 140 L320 600Z";
  const colRight =
    "M340 600 L340 140 L360 120 L360 600Z";

  if (variant === "single") {
    return (
      <svg
        viewBox="0 0 400 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ opacity }}
        aria-hidden="true"
      >
        {isOutline ? (
          <path
            d={singlePath}
            stroke={color}
            strokeWidth="1"
            fill="none"
          />
        ) : (
          <>
            <defs>
              <linearGradient id={`kvs-g1-${gid}`} x1="0.3" y1="0" x2="0.8" y2="1">
                <stop offset="0%" stopColor="#001421" />
                <stop offset="35%" stopColor="#000e18" />
                <stop offset="65%" stopColor="#001421" />
                <stop offset="100%" stopColor="#8c684a" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path
              d={singlePath}
              fill={`url(#kvs-g1-${gid})`}
              stroke={color}
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
          </>
        )}
      </svg>
    );
  }

  if (variant === "double") {
    return (
      <svg
        viewBox="0 0 400 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ opacity }}
        aria-hidden="true"
      >
        {isOutline ? (
          <>
            <path d={doubleBg} stroke={color} strokeWidth="0.8" fill="none" strokeOpacity="0.5" />
            <path d={doubleFg} stroke={color} strokeWidth="1" fill="none" />
          </>
        ) : (
          <>
            <defs>
              <linearGradient id={`kvs-g2a-${gid}`} x1="0.3" y1="0" x2="0.8" y2="1">
                <stop offset="0%" stopColor="#001421" />
                <stop offset="60%" stopColor="#000e18" />
                <stop offset="100%" stopColor="#8c684a" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id={`kvs-g2b-${gid}`} x1="0.3" y1="0" x2="0.8" y2="1">
                <stop offset="0%" stopColor="#001421" />
                <stop offset="40%" stopColor="#000e18" />
                <stop offset="100%" stopColor="#8c684a" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path d={doubleBg} fill={`url(#kvs-g2a-${gid})`} stroke={color} strokeWidth="0.6" strokeOpacity="0.3" />
            <path d={doubleFg} fill={`url(#kvs-g2b-${gid})`} stroke={color} strokeWidth="0.8" strokeOpacity="0.5" />
          </>
        )}
      </svg>
    );
  }

  // variant === "columns"
  return (
    <svg
      viewBox="0 0 400 620"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {isOutline ? (
        <>
          <path d={colMain} stroke={color} strokeWidth="0.8" fill="none" strokeOpacity="0.6" />
          <path d={colMid} stroke={color} strokeWidth="1" fill="none" />
          <path d={colRight} stroke={color} strokeWidth="1" fill="none" />
        </>
      ) : (
        <>
          <defs>
            <linearGradient id={`kvs-g3-${gid}`} x1="0.2" y1="0" x2="0.9" y2="1">
              <stop offset="0%" stopColor="#001421" />
              <stop offset="50%" stopColor="#000e18" />
              <stop offset="100%" stopColor="#8c684a" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path d={colMain} fill={`url(#kvs-g3-${gid})`} stroke={color} strokeWidth="0.6" strokeOpacity="0.3" />
          <path d={colMid} fill={`url(#kvs-g3-${gid})`} stroke={color} strokeWidth="0.8" strokeOpacity="0.5" />
          <path d={colRight} fill={`url(#kvs-g3-${gid})`} stroke={color} strokeWidth="0.8" strokeOpacity="0.5" />
        </>
      )}
    </svg>
  );
}
