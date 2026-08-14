import type { ReactNode } from "react";
import Link from "next/link";

type Variant = "orange" | "blue" | "ghost" | "white";

const styles: Record<Variant, string> = {
  orange:
    "bg-orange text-white hover:bg-orange-hover",
  blue: "bg-primary text-white hover:bg-blue-hover",
  ghost:
    "border border-white/70 bg-transparent text-white hover:bg-white hover:text-navy-2",
  white: "bg-white text-primary hover:bg-light-1",
};

export function Button({
  href,
  children,
  variant = "orange",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center px-7 text-[17px] font-medium tracking-wide ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
