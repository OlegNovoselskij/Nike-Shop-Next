'use client'
import Link from "next/link";
import SearchButton  from "./Search";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";

export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const pathname = usePathname();

    function handleClickSearch() {
        setIsSearchOpen(prev => !prev);
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
                            <Link key={href} href={href} className="relative font-medium tracking-tight hover:opacity-75  ">
                                {label}
                                {pathname === href && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-[4px] left-0 right-0 bottom-0 h-0.5 bg-white"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                        <div className="flex text-xl space-x-1 gap-3">
                            <SearchButton  handleClickSearch={handleClickSearch} />
                            <Link href='/cart'>
                                <ShoppingCart />
                            </Link>
                        </div>
                    </nav>
                ) : (
                    <div className="bg-[#1a1a1a] h-10 flex items-center w-full max-w-3xl mx-auto rounded">
                        <span className="text-gray-400 text-lg px-3">🔍</span>
                        <input
                            type="text"
                            placeholder="Search Products"
                            className="bg-transparent text-white w-full px-2 text-sm outline-none border-none placeholder-gray-400"
                        />
                        <button onClick={handleClickSearch} className="hover:text-gray-400 text-gray-100 text-lg px-3">✖</button>
                    </div>
                )}
            </div>
        </header>
    );
}
