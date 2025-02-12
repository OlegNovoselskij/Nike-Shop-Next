"use client";
import Link from "next/link";
import SearchButton from "./Search";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import { setShowCart } from "@/store/cart-slice"; // Додаємо імпорт

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const pathname = usePathname();
    const dispatch = useDispatch();

    function handleClickSearch() {
        setIsSearchOpen(prev => !prev);
    }

    function handleCartClick() {
        dispatch(setShowCart()); // Викликає редюсер для показу/приховування корзини
    }

    const navLinks = [
        { href: "/", label: "HOME" },
        { href: "/shop", label: "SHOP" },
        { href: "/aboutus", label: "ABOUT US" },
        { href: "/contactus", label: "CONTACT US" }
    ];

    return (
        <header className="bg-black text-white py-4 px-8 flex items-center justify-center fixed top-0 w-full z-50">
            <div className="flex items-center justify-between w-2/3">
                <Link href='/'><h1 className="text-lg font-bold">FACTORY</h1></Link>
                {!isSearchOpen ? (
                    <nav className="relative flex space-x-8">
                        {navLinks.map(({ href, label }) => (
                            <Link key={href} href={href} className="relative font-medium tracking-tight hover:opacity-75">
                                {label}
                                {pathname === href && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-[-2px] left-0 right-0 bottom-0 h-0.5 bg-white"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                        <div className="flex text-xl space-x-1 gap-3">
                            <SearchButton handleClickSearch={handleClickSearch} />
                            <ShoppingCart 
                                className="cursor-pointer hover:opacity-75"
                                onClick={handleCartClick} // Виклик функції
                            />
                        </div>
                    </nav>
                ) : (
                    <SearchBar onClose={handleClickSearch} />
                )}
            </div>
        </header>
    );
}
