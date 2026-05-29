import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  metadataBase: new URL("https://healthfirstmed.in"),

  title: {
    default: "Health First Medical Systems",
    template: "%s | Health First Medical Systems",
  },
  description:
    "Supplier of ECG machines, diagnostic systems and medical equipment for clinics, hospitals and healthcare providers across India.",
  keywords: [
    "ECG Machine",
    "Medical Equipment",
    "Diagnostic Equipment",
    "Hospital Equipment",
    "Medical Systems",
    "Healthcare Equipment",
    "ECG Supplier India",
    "Medical Equipment Supplier",
  ],
  alternates: {
  canonical: "https://healthfirstmed.in",
},
  openGraph: {
    title: "Health First Medical Systems",
    description:
      "Reliable medical equipment and healthcare technology solutions for hospitals, clinics, and labs.",
    url: "https://healthfirstmed.in",
    siteName: "Health First Medical Systems",
    images: [
      {
        url: "https://healthfirstmed.in/og-image.webp",
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
        {children}
        <ScrollToTop />
        <Footer />

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
              url: "https://healthfirstmed.in",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Shop No 7, E11 Building, Madhuban Co-operative Society",
                addressLocality: "Titwala",
                addressRegion: "Maharashtra",
                postalCode: "421605",
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
