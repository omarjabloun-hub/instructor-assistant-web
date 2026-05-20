import { clsx, type ClassValue } from 'clsx'

/**
 * Conditional classname joiner. Accepts strings, objects, arrays.
 * Use this instead of template literals so the API is consistent everywhere.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs)
}
