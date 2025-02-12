"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { setShowCart } from "@/store/cart-slice";
import SearchButton from "./Search";
import SearchBar from "./SearchBar";
import AuthButton from "./Auth/AuthButton";

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const pathname = usePathname();
    const dispatch = useDispatch();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/shop", label: "Shop" },
        { href: "/aboutus", label: "About Us" },
    ];

    return (
        <header className="bg-black text-white py-6 px-10 fixed top-0 w-full z-50 shadow-xl">
            <div className="container mx-auto flex items-center justify-between">
                <Link href='/' passHref>
                    <span className="text-3xl font-extrabold cursor-pointer tracking-tight uppercase text-gradient">
                        FACTORY
                    </span>
                </Link>

                {!isSearchOpen ? (
                    <nav className="flex items-center space-x-8">
                        {navLinks.map(({ href, label }) => (
                            <Link key={href} href={href} passHref>
                                <span className={`relative font-semibold text-lg cursor-pointer tracking-wide transition-all duration-200 hover:text-gray-300`}>
                                    {label}
                                    {pathname === href && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute bottom-[-3px] left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </span>
                            </Link>
                        ))}

                        <div className="flex items-center space-x-6">
                            <SearchButton handleClickSearch={() => setIsSearchOpen(prev => !prev)} />
                            <ShoppingCart 
                                className="cursor-pointer hover:opacity-80 transition-all duration-200" 
                                onClick={() => dispatch(setShowCart())} 
                            />
                            <AuthButton />
                        </div>
                    </nav>
                ) : (
                    <SearchBar onClose={() => setIsSearchOpen(false)} />
                )}
            </div>
        </header>
    );
}
