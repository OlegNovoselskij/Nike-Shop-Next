"use client";
import { useSession, signOut } from "next-auth/react";
import { CircleUser, LogOut } from "lucide-react";
import Link from "next/link";
import AuthModal from "./AuthModal"; 

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
                            className="flex items-center gap-1 px-2 py-2 text-sm font-medium rounded-full transition-all 
                             text-white hover:scale-105 shadow-lg"
                        >
                            <CircleUser size={22} />
                        </button>
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="flex items-center gap-1 px-2 py-2 text-sm font-medium rounded-full transition-all 
                         text-white hover:scale-105 shadow-lg"
                    >
                        <LogOut size={22} />
                    </button>
                </>
            )}
        </div>
    );
}