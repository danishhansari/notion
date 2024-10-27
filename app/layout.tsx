import type { Metadata } from "next";
import "./global.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Notion App",
  description: "Built by one and only Danish",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${inter.className} antialiased`}>
          <Header />

          <div className='flex min-h-screen'>
            <Sidebar />

            <div className='flex-1 bg-slate-100 overflow-y-auto scrollbar-hide'>
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
