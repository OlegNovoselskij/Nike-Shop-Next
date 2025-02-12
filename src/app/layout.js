'use client' // Додаємо, щоб дозволити хуки Redux

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/Cart";
import Providers from "../store/Provider"; // Переконуємось, що імпортується
import { useSelector } from "react-redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers> {/* Обгортаємо всі компоненти в Redux Provider */}
          <LayoutContent>{children}</LayoutContent>
        </Providers>
      </body>
    </html>
  );
}

// Виносимо useSelector в окремий клієнтський компонент
function LayoutContent({ children }) {
  const showCart = useSelector((state) => state.cart.showCart);

  return (
    <>
      {showCart && <CartSidebar />}
      <Header />
      {children}
      <Footer />
    </>
  );
}
