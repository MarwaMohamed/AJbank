/**
 * Prepends the Next.js basePath to a public asset path.
 * Use this for raw <img> and SVG <image> tags that don't go through next/image.
 */
const basePath = process.env.NODE_ENV === "production" ? "/AJbank" : "";

export function asset(path: string): string {
  // Ensure path starts with /
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
