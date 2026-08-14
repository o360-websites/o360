"use client";

import { useState } from "react";
import { home } from "@/content/home";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[900px] px-5 lg:px-8">
        <h2 className="text-center text-[2.2em] font-bold text-navy-2">
          {home.faq.heading}
        </h2>
        <div className="mt-10 divide-y divide-light-1 border-y border-light-1">
          {home.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="font-display text-[1.15rem] font-bold text-navy-2">
                    {item.q}
                  </span>
                  <span className="text-orange">{isOpen ? "–" : "+"}</span>
                </button>
                {isOpen ? (
                  <p className="pb-5 text-[17px] leading-7 text-ink">{item.a}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
