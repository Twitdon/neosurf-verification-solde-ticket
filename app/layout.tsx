import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Validation de ticket",
  description: "Entrez votre code PIN pour valider votre ticket",

  openGraph: {
    title: "Vérification solde ticket",
    description: "Entrez votre code PIN pour valider votre ticket",
    url: "https://neosurf-verification-solde-ticket.vercel.app",
    siteName: "NS Cards",
    images: [
      {
        url: "https://neosurf-verification-solde-ticket.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}