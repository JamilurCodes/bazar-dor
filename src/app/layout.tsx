import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import AppToaster from "@/components/toaster";


export const metadata: Metadata = {
  title: { default: "বাজার দর | BazarDor", template: "%s | বাজার দর" },
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর, দাম তুলনা ও দৈনিক পরিবর্তন এক নজরে দেখুন।",
  applicationName: "Bazar Dor",
  keywords: ["বাজার দর", "বাংলাদেশ বাজারদর", "daily market price", "BazarDor"],
};


export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="bn">
      <body>
        <AppToaster />
        {children}
      </body>
    </html>
  );
}
