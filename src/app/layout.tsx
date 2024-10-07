// src/app/layout.tsx
import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuthProvider } from '@/components/SessionProvider';
import { Toaster } from 'react-hot-toast';
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: "Indigenous connect",
  description: "Uniting the Indigenous Community of Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased flex flex-col `}>
        <AuthProvider>
          <Toaster />
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}