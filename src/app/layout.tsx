import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
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
  metadataBase: new URL("https://www.elite-depannage-34.fr"),
  title: "Élite Dépannage 34 | Plomberie & Serrurerie d'Urgence",
  description:
    "Fuite, panne ou porte claquée dans l'Hérault ? Élite Dépannage 34 intervient en 30 minutes, 7j/7, pour tous vos urgences plomberie, serrurerie et vitrerie. Devis clair, artisans certifiés.",
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
      </body>
    </html>
  );
}
