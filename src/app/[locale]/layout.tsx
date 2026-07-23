import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import ThemeManager from "@/components/theme-manager";
import { locales, type Locale } from "@/lib/dictionaries";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  return {
    title: isFr
      ? "Harisaran Vasu · Ingénieur Réseaux"
      : "Harisaran Vasu · Network Engineer",
    description: isFr
      ? "Portfolio de Harisaran Vasu : réseaux d'entreprise, sécurité, Active Directory et cloud AWS. Basé en Île-de-France."
      : "Portfolio of Harisaran Vasu: enterprise networking, security, Active Directory, and AWS cloud. Based in the Paris area.",
    alternates: {
      languages: { en: "/en", fr: "/fr" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col antialiased"
      >
        <ThemeManager />
        {children}
      </body>
    </html>
  );
}
