import type { Metadata } from "next";
import { avenir, markPro } from "./fonts";
import { home, site } from "@/content/home";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: home.seo.title,
  description: home.seo.description,
  icons: { icon: "/brand/logo.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${avenir.variable} ${markPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-light-2 text-ink">
        <a className="sr-only" href="#main">
          Skip to content
        </a>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <span className="sr-only">{site.name}</span>
      </body>
    </html>
  );
}
