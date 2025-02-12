'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "../store/store";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import AuthModal from "@/components/Auth//AuthModal";
import CartSidebar from "@/components/Cart";
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
    <Provider store={store}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <LayoutContent>{children}</LayoutContent>
        </body>
      </html>
    </Provider>
  );
}

function LayoutContent({ children }) {
  const showCart = useSelector((state) => state.cart.showCart);

  return (
    <>
      <NextTopLoader />
      <SessionWrapper>
        <AuthModal />
        <Header />
        {showCart && <CartSidebar />} 
        {children}
        <Footer />
      </SessionWrapper>
    </>
  );
}
