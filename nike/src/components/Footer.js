import { Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="grid grid-cols-3 h-[100px] items-center px-8 py-4 text-gray-400">
            <p className="text-sm">© 2020 Factory - All Rights Reserved.</p>
            <div className="flex justify-center gap-4">
                <a href="https://facebook.com" target="_blank" 
                   className="bg-white p-2 rounded-full shadow-md">
                    <Facebook className="w-5 h-5 text-black" />
                </a>
                <a href="https://twitter.com" target="_blank" 
                   className="bg-white p-2 rounded-full shadow-md">
                    <Twitter className="w-5 h-5 text-black" />
                </a>
                <a href="https://instagram.com" target="_blank" 
                   className="bg-white p-2 rounded-full shadow-md">
                    <Instagram className="w-5 h-5 text-black" />
                </a>
            </div>
            <p className="text-sm text-right">
                Powered by <span className="font-semibold">GoDaddy</span>
            </p>
        </footer>
    );
}