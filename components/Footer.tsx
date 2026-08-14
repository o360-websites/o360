import Image from "next/image";
import Link from "next/link";
import { footerLinks, site } from "@/content/home";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Image
            src={site.logoLight}
            alt="O360"
            width={160}
            height={48}
            className="h-12 w-auto"
          />
          <p className="mt-6 text-[16px] leading-7 text-blue-4">
            Tel: {site.phone}
            <br />
            Fax &amp; Text: {site.fax}
            <br />
            {site.regions}
            <br />
            {site.address}
          </p>
        </div>
        <div>
          <h2 className="font-sans text-lg font-medium tracking-wide">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-[16px]">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-blue-4 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-[16px] text-blue-4">
          <p>Copyright {new Date().getFullYear()} O360®</p>
          <p className="mt-2">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            {" | "}
            <Link href="/disclaimer" className="hover:text-white">
              Disclaimer
            </Link>
            {" | "}
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
            {" | "}
            <Link href="/legal" className="hover:text-white">
              Legal
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
