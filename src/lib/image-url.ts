/**
 * Images are stored in the database as base64 data URIs. Shipping those inside
 * JSON list responses is what made the site slow: a single services request was
 * ~1.2 MB and the browser could neither cache nor lazy-load any of it.
 *
 * List endpoints instead hand out a URL pointing at /api/img, which streams the
 * bytes as a real image with an immutable cache header. `v` is the row's
 * updatedAt, so replacing an image busts the cache.
 */
export function imageUrl(
  type: string,
  id: string,
  value: string | null | undefined,
  updatedAt: Date | string,
  width?: number
): string | null {
  if (!value) return null;
  // Static assets (/Images/...) and anything already remote stay untouched.
  if (!value.startsWith("data:")) return value;

  const v = new Date(updatedAt).getTime();
  const w = width ? `&w=${width}` : "";
  return `/api/img/${type}/${id}?v=${v}${w}`;
}

/** True for a URL we handed out — never write one of these back into the DB. */
export function isProxiedImage(value: unknown): boolean {
  return typeof value === "string" && value.startsWith("/api/img/");
}

/**
 * Drops image fields that still hold a proxy URL, so an admin edit that didn't
 * touch the image leaves the stored base64 alone instead of overwriting it.
 */
export function keepExistingImage<T extends Record<string, unknown>>(data: T, ...fields: (keyof T)[]): T {
  for (const f of fields) {
    if (isProxiedImage(data[f])) delete data[f];
  }
  return data;
}
