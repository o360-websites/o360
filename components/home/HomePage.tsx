import Image from "next/image";
import Link from "next/link";
import { home } from "@/content/home";
import { Button } from "@/components/Button";
import { FeatureIcon } from "@/components/icons";
import { Faq } from "@/components/home/Faq";
import { FounderSection } from "@/components/home/FounderSection";

export function HomePage() {
  const { desktopHero, mobileHero } = home;

  return (
    <main id="main">
      {/* Mobile hero — hidden on desktop, matching live hide_desktop/hide_tablet */}
      <section
        className="relative flex min-h-[635px] flex-col items-center justify-center px-5 text-center lg:hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(4,28,94,0.79), rgba(4,28,94,0.79)), url(${mobileHero.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="max-w-[80%] text-[2rem] font-bold text-white">
          {mobileHero.heading}
        </h1>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={mobileHero.primary.href} variant="blue">
            {mobileHero.primary.label}
          </Button>
          <Button href={mobileHero.secondary.href} variant="orange">
            {mobileHero.secondary.label}
          </Button>
        </div>
      </section>

      {/* Desktop hero + logo wall */}
      <section
        className="relative hidden overflow-hidden px-5 pb-16 pt-14 text-white lg:block lg:px-8 lg:pb-20 lg:pt-16"
        style={{
          backgroundColor: "#041C5E",
          backgroundImage: `linear-gradient(180deg, rgba(4,28,94,0.55), rgba(0,46,91,0.72)), url(${desktopHero.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-[1400px]">
          <h1 className="mx-auto max-w-5xl text-center text-[55px] font-bold">
            {desktopHero.heading}
          </h1>
          <div className="mt-8 flex justify-center gap-4">
            <Button href={desktopHero.primary.href} variant="blue">
              {desktopHero.primary.label}
            </Button>
            <Button href={desktopHero.secondary.href} variant="orange">
              {desktopHero.secondary.label}
            </Button>
          </div>

          <div className="mt-14 columns-2 gap-3 md:columns-3 xl:columns-5">
            {desktopHero.screenshots.map((src) => (
              <div key={src} className="mb-3 break-inside-avoid overflow-hidden rounded-sm bg-white/10">
                <Image
                  src={src}
                  alt="O360 client website"
                  width={360}
                  height={240}
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:grid-cols-4">
            {desktopHero.features.map((f) => (
              <div key={f.text} className="flex gap-4 text-[16px] leading-6 text-blue-5">
                <FeatureIcon name={f.icon as "design" | "check" | "devices" | "search"} />
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-light-2 px-5 py-16 text-center lg:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-[2.2em] font-bold text-navy-2">{home.intro.heading}</h2>
          <p className="mt-5 text-[20px] leading-8 text-ink">{home.intro.body}</p>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <div className="bg-primary px-8 py-16 text-white lg:px-16">
          <p className="text-[22px] font-light tracking-wide text-blue-4">
            {home.split.design.pretitle}
          </p>
          <h2 className="mt-1 text-[36px] font-bold">{home.split.design.title}</h2>
          <p className="mt-4 max-w-md text-[17px] leading-7 text-blue-5">
            {home.split.design.body}
          </p>
          <ul className="mt-6 space-y-2 text-[18px] font-medium">
            {home.split.design.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-blue-2">•</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={home.split.design.primary.href} variant="orange">
              {home.split.design.primary.label}
            </Button>
            <Button href={home.split.design.secondary.href} variant="ghost">
              {home.split.design.secondary.label}
            </Button>
          </div>
        </div>
        <div className="bg-navy-2 px-8 py-16 text-white lg:px-16">
          <p className="text-[22px] font-light tracking-wide text-blue-4">
            {home.split.marketing.pretitle}
          </p>
          <h2 className="mt-1 text-[36px] font-bold">{home.split.marketing.title}</h2>
          <p className="mt-4 max-w-md text-[17px] leading-7 text-blue-5">
            {home.split.marketing.body}
          </p>
          <ul className="mt-6 space-y-2 text-[18px] font-medium">
            {home.split.marketing.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-orange">•</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href={home.split.marketing.primary.href} variant="orange">
              {home.split.marketing.primary.label}
            </Button>
          </div>
        </div>
      </section>

      <FounderSection />

      <section className="bg-light-4 px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            {home.gallery.thumbs.map((t) => (
              <Link key={t.src} href={t.href} className="overflow-hidden bg-white shadow-sm">
                <Image src={t.src} alt="" width={480} height={320} className="h-auto w-full object-cover" />
              </Link>
            ))}
          </div>
          <div>
            <h2 className="text-[2em] font-bold text-navy-2">{home.gallery.heading}</h2>
            <p className="mt-4 leading-7">{home.gallery.body}</p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-medium text-primary">
              {home.gallery.specialties.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={home.gallery.cta.href} variant="orange">
                {home.gallery.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy px-5 py-16 text-white lg:py-20">
        <div className="mx-auto max-w-[1400px] text-center">
          <h2 className="text-[2em] font-bold">{home.stats.heading}</h2>
          <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {home.stats.items.map((s) => (
              <div key={s.label}>
                <p className="font-display text-5xl font-bold text-blue-2">{s.value}</p>
                <p className="mt-2 text-[16px] font-light uppercase tracking-wider text-blue-4">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-5 py-16 lg:px-8 lg:py-24"
        style={{
          backgroundImage: `linear-gradient(#eff5fce6, #eff5fce6), url(${home.marketing.background})`,
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto max-w-[1400px] text-center">
          <h2 className="text-[2em] font-bold text-navy-2">{home.marketing.heading}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-[17px]">{home.marketing.body}</p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {home.marketing.cards.map((c) => (
              <article key={c.title} className="bg-white p-8 text-left shadow-sm">
                <Image src={c.image} alt="" width={120} height={80} className="h-16 w-auto" />
                <h3 className="mt-5 font-display text-[1.6em] font-bold text-navy-2">{c.title}</h3>
                <p className="mt-3 text-[16px] leading-7">{c.body}</p>
                <div className="mt-6">
                  <Button href={c.cta.href} variant="blue">
                    {c.cta.label}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="website-specialty" className="bg-white px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-center text-[2em] font-bold text-navy-2">
            {home.specialties.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center">{home.specialties.body}</p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {home.specialties.groups.map((g) => (
              <div key={g.title}>
                <Link href={g.href} className="font-display text-xl font-bold uppercase tracking-wide text-primary">
                  {g.title}
                </Link>
                <ul className="mt-4 columns-1 gap-x-6 text-[16px] sm:columns-2">
                  {g.items.map((item) => (
                    <li key={item} className="py-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq />

      <section className="bg-primary px-5 py-16 text-center text-white lg:py-20">
        <h2 className="text-[2em] font-bold">{home.close.heading}</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href={home.close.primary.href} variant="white">
            {home.close.primary.label}
          </Button>
          <Button href={home.close.secondary.href} variant="orange">
            {home.close.secondary.label}
          </Button>
        </div>
      </section>
    </main>
  );
}
