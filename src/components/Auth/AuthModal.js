"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { X, Github, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });
    
        if (result?.error) {
            setError("Invalid email or password");
        } else {
            setIsOpen(false);
            router.push("/");
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 rounded-full hover:bg-gray-800 transition"
            >
                <LogIn size={22} className="text-white" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-black p-6 rounded-2xl shadow-xl w-[90%] max-w-md 
                            max-h-[90vh] overflow-y-auto animate-fade-in relative flex flex-col text-white"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-2xl font-bold text-center">Sign in</h2>
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg 
                                    focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 bg-gray-900 text-white border border-gray-700 rounded-lg 
                                    focus:outline-none focus:ring-2 focus:ring-gray-500"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-white text-black py-3 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Sign in
                                </button>
                            </form>

                            <div className="flex flex-col gap-3 mt-4">
                                <button
                                    onClick={() => signIn("github")}
                                    className="flex items-center justify-center gap-3 w-full py-3 bg-gray-900 text-white rounded-lg 
                                    hover:bg-gray-800 transition"
                                >
                                    <Github size={20} /> Sign in with GitHub
                                </button>
                                <button
                                    onClick={() => signIn("google")}
                                    className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                                >
                                    Sign in with Google
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push("/register");
                                }}
                                className="w-full mt-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
                            >
                                Register
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}