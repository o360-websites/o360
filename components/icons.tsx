import type { ReactNode } from "react";

const icons = {
  design: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 20l4.5-1.2L19 8.3a2 2 0 0 0 0-2.8L18.5 6 14 1.5l-.5.5a2 2 0 0 0-2.8 0L4.2 15.5 4 20z" />
      <path d="M13 4.5 19.5 11" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 12.5 8 16.5 14.5 8" />
      <path d="M10 16.5 14 20.5 21 10" />
    </svg>
  ),
  devices: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="5" width="14" height="11" rx="1.5" />
      <rect x="17" y="9" width="5" height="9" rx="1" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 5 5" />
    </svg>
  ),
} as const;

export function FeatureIcon({ name }: { name: keyof typeof icons }) {
  return <span className="text-blue-2">{icons[name] as ReactNode}</span>;
}
