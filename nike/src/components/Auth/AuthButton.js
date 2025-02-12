"use client";
import { useSession, signOut } from "next-auth/react";
import { CircleUser, LogOut } from "lucide-react";
import Link from "next/link";
import AuthModal from "./Auth-Modal/AuthModal"; 

export default function AuthButton() {
    const { data: session } = useSession();

    return (
        <div className="flex gap-4">
            {!session ? (
                <AuthModal />
            ) : (
                <>
                    <Link href="/profile">
                        <button
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all 
                            bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 shadow-lg"
                        >
                            <CircleUser size={18} /> Profile
                        </button>
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all 
                        bg-red-500 text-white hover:scale-105 shadow-lg"
                    >
                        <LogOut size={18} /> Sign Out
                    </button>
                </>
            )}
        </div>
    );
}
