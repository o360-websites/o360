import localFont from "next/font/local";

export const avenir = localFont({
  src: [
    { path: "./fonts/Avenir-Light-35-Font.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Avenir-Roman-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Avenir-Font-Black-95.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-avenir",
  display: "swap",
});

export const markPro = localFont({
  src: [
    { path: "./fonts/Mark-Pro-Bold-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Mark-Pro-Font-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-mark-pro",
  display: "swap",
});
