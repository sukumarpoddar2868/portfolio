import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { profile } from "@/content";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: profile.title,
  description: profile.description,
  openGraph: { title: profile.title, description: profile.description, type: "website" },
};

// Applies the saved theme before first paint, so there is no flash.
const themeScript = `try{var t=localStorage.getItem("theme-bg");if(t)document.documentElement.style.setProperty("--page-bg",t);if(localStorage.getItem("dark")==="1")document.documentElement.classList.add("dark-mode")}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
