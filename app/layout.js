import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopLoader from "./components/TopLoader";
import Script from "next/script";
import dynamic from 'next/dynamic';
const Navbar = dynamic(() => import('./components/Navbar'));
const Footer = dynamic(() => import('./components/Footer'));
const WhatsAppButton = dynamic(() => import('./components/Whatsapp'));

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
  title: "HealthFirst Medical Systems",
  description:
    "Health First Medical Systems - Providing Reliable Medical Systems and Healthcare Technology Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSquIBj5dT4sJTc2h_a1spd8o_thibULUFy2MQfCWOEb1A90oYEk7Q60kxMorJj8VY4SRc5vZppTb1o/pub?output=csv" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WhatsAppButton />
        <Navbar />
        <TopLoader />
        {children}
        <Footer />

        {/* Lazy analytics example */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"
          strategy="afterInteractive"
        />
        <Script id="gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXX', { page_path: window.location.pathname });
          `}
        </Script>
      </body>
    </html>
  );
}
