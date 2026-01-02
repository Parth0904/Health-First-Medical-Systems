import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopLoader from "./components/TopLoader";
import dynamic from "next/dynamic";

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
    "This is the official site owned by Shankar Dattatraya Shinde this site is designed to get a ease of acess to all of the products of Health First Medical Systems",
  verification: {
    google: "xaiS-ThmQ0IWXZ2cvs5L4yUT9IgMpg9scBCFXVki5MA",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WhatsAppButton />
        <TopLoader />
        {children}
      </body>
    </html>
  );
}
