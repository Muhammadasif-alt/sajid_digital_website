import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Build a wa.me link from a raw phone number (e.g. "0300-7033832").
 * Strips non-digits and assumes Pakistan (+92) when a local 0-prefixed
 * number is supplied. Returns null if no usable digits are present.
 */
export function whatsappLink(raw: string | null | undefined, message?: string): string | null {
  if (!raw) return null;
  let digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  if (digits.startsWith("00")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = "92" + digits.slice(1);
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

