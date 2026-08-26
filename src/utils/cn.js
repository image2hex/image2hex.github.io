import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx conditional class logic with tailwind-merge
 * to produce clean, conflict-free Tailwind class strings.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
