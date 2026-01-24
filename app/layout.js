import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopLoader from "./components/TopLoader";
import ScrollToTop from "./components/ScrollToTop";
import Script from "next/script";
import dynamic from "next/dynamic";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const WhatsAppButton = dynamic(() => import("./components/Whatsapp"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Health First Medical Systems",
  description:
    "Health First Medical Systems provides reliable medical equipment and healthcare technology solutions across India.",
  keywords:
    "medical systems, healthcare, medical equipment, hospital supplies, Health First Medical Systems",
  openGraph: {
    title: "Health First Medical Systems",
    description:
      "Reliable medical equipment and healthcare technology solutions for hospitals, clinics, and labs.",
    url: "https://healthfirstmedicalsystems.vercel.app",
    siteName: "Health First Medical Systems",
    images: [
      {
        url: "https://healthfirstmedicalsystems.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Health First Medical Systems",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="xaiS-ThmQ0IWXZ2cvs5L4yUT9IgMpg9scBCFXVki5MA"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WhatsAppButton />
        <Navbar />
        <TopLoader />
        {children}
        <ScrollToTop />
        <Footer />

        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Health First Medical Systems",
              url: "https://healthfirstmedicalsystems.vercel.app",
              logo: "https://healthfirstmedicalsystems.vercel.app/logo.webp",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "08046074634",
                contactType: "Customer Service",
                areaServed: "IN",
                availableLanguage: "English",
              },
            }),
          }}
        />

        {/* LocalBusiness Schema */}
        <Script
          id="localbusiness-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Health First Medical Systems",
              url: "https://healthfirstmedicalsystems.vercel.app",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nanded",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
              },
            }),
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LDHZJGMTRJ"
          strategy="afterInteractive"
        />
        <Script id="gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LDHZJGMTRJ', { page_path: window.location.pathname });
          `}
        </Script>
      </body>
    </html>
  );
}
