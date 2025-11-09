import type { Metadata } from "next";
import { Open_Sans, Oswald } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-openSans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roma Torres",
  description: "Web Developer & UX Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pr-BR" className="bg-linear-to-t from-[#060606] to-[#030303]">
      <body className={`${oswald.variable} ${openSans.variable} antialiased`}>
        {children}
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
