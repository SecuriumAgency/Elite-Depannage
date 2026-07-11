import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Élite Dépannage 34 | Plomberie & Serrurerie d'Urgence";
const DESCRIPTION =
  "Fuite, panne ou porte claquée dans l'Hérault ? Élite Dépannage 34 intervient en 30 minutes, 7j/7, pour toutes vos urgences plomberie et serrurerie. Devis clair, artisans certifiés.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.elite-depannage-34.fr"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.elite-depannage-34.fr",
    siteName: "Élite Dépannage 34",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
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
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-50">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
