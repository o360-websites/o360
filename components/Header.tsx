"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { headerNav, site } from "@/content/home";

export function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-navy text-white">
      <div className="mx-auto flex max-w-[1400px] items-center gap-6 px-5 py-3 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="O360 home">
          <Image
            src={site.logoLight}
            alt="O360"
            width={140}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <nav className="hidden flex-1 items-center gap-1 lg:flex" aria-label="Primary">
          {headerNav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 px-3 py-2 text-[15px] font-medium tracking-wide hover:text-blue-2"
              >
                {item.label}
                {item.children ? <span className="text-[10px]">▾</span> : null}
              </Link>
              {item.children && openMenu === item.label ? (
                <div className="absolute left-0 top-full min-w-56 bg-white py-2 text-ink shadow-lg">
                  {item.children.map((child) => (
                    <Link
                      key={child.href + child.label}
                      href={child.href}
                      className="block px-4 py-2 text-[15px] hover:bg-light-2 hover:text-primary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <Link
            href="/pricing"
            className="bg-orange px-5 py-2.5 text-[15px] font-medium tracking-wider text-white hover:bg-orange-hover"
          >
            PRICING
          </Link>
          <a
            href={site.phoneTel}
            className="border border-white/40 px-5 py-2.5 text-[15px] font-medium tracking-wider hover:bg-white/10"
          >
            {site.phone}
          </a>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/15 bg-navy-2 px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {headerNav.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block py-2 text-base font-medium"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.href + child.label}
                    href={child.href}
                    className="block py-1 pl-4 text-sm text-blue-4"
                    onClick={() => setOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link href="/pricing" className="mt-3 bg-orange px-4 py-3 text-center font-medium">
              PRICING
            </Link>
            <a href={site.phoneTel} className="mt-2 border border-white/30 px-4 py-3 text-center">
              {site.phone}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
