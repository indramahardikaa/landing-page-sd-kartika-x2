import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SD KARTIKA X-2 | Cerdas, Berkarakter, Berprestasi",
  description: "Website resmi SD KARTIKA X-2 Kota Jakarta Selatan. Pendidikan berkualitas untuk generasi penerus bangsa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <SessionProvider>
          <Toaster position="top-right" />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
