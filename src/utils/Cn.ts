import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges conditional class names while resolving Tailwind conflicts.
 * @returns The merged class name string.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
