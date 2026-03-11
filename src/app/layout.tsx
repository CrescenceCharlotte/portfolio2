import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LenisProvider } from "@/components/LenisProvider";
import { StarCursor } from "@/components/StarCursor";
import { GlobalStarField } from "@/components/GlobalStarField";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio - Graphiste Freelance",
    template: "%s | Portfolio"
  },
  description: "Portfolio de graphiste freelance. Découvrez mes créations en design graphique, identité visuelle, web design et plus encore.",
  keywords: ["graphiste", "freelance", "design", "identité visuelle", "web design", "portfolio"],
  authors: [{ name: "Portfolio" }],
  creator: "Portfolio",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://portfolio.com",
    title: "Portfolio - Graphiste Freelance",
    description: "Découvrez mes créations en design graphique, identité visuelle, web design et plus encore.",
    siteName: "Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Graphiste Freelance",
    description: "Découvrez mes créations en design graphique, identité visuelle, web design et plus encore.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`} style={{ cursor: "none" }}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <LenisProvider>
          {/* Filtre SVG pour l'effet Liquid Glass — invisible, référencé par id */}
          <svg style={{ display: "none" }} aria-hidden="true">
            <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
              <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="1" seed="5" result="turbulence" />
              <feComponentTransfer in="turbulence" result="mapped">
                <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
                <feFuncG type="gamma" amplitude="0" exponent="1"  offset="0" />
                <feFuncB type="gamma" amplitude="0" exponent="1"  offset="0.5" />
              </feComponentTransfer>
              <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
              <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100" lightingColor="white" result="specLight">
                <fePointLight x="-200" y="-200" z="300" />
              </feSpecularLighting>
              <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
              <feDisplacementMap in="SourceGraphic" in2="softMap" scale="120" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>

          {/* Fond étoilé global — z-index 0, derrière tout le contenu */}
          <GlobalStarField />
          <StarCursor />
          <Header />
          <main className="flex-1 relative" style={{ zIndex: 1 }}>
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
