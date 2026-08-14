import { home } from "@/content/home";

export function Faq() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[900px] px-5 lg:px-8">
        <h2 className="text-center text-[2.2em] font-bold text-navy-2">
          {home.faq.heading}
        </h2>
        <div className="mt-10 divide-y divide-light-1 border-y border-light-1">
          {home.faq.items.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
                <span className="font-display text-[1.15rem] font-bold text-navy-2">
                  {item.q}
                </span>
                <span className="text-orange group-open:hidden">+</span>
                <span className="hidden text-orange group-open:inline">–</span>
              </summary>
              <p className="pb-5 text-[17px] leading-7 text-ink">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
