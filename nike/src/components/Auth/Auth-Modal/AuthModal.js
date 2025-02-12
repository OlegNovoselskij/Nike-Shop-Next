"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { X, Github } from "lucide-react";
import { useRouter } from "next/navigation";


export default function AuthModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError("Невірний email або пароль");
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-all 
                bg-black text-white hover:scale-105 shadow-lg"
            >
                Увійти
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-black p-6 rounded-2xl shadow-xl w-[90%] max-w-md 
                        max-h-[90vh] overflow-y-auto animate-fade-in relative flex flex-col text-white"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold text-center">Вхід до облікового запису</h2>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                            <input
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
                            >
                                Увійти
                            </button>
                        </form>

                        <div className="flex flex-col gap-3 mt-4">
                            <button
                                onClick={() => signIn("github")}
                                className="flex items-center justify-center gap-3 w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                            >
                                <Github size={20} /> Увійти через GitHub
                            </button>
                            <button
                                onClick={() => signIn("google")}
                                className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                            >
                                Увійти через Google
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                setIsOpen(false);
                                router.push("/register");
                            }}
                            className="w-full mt-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                        >
                            Реєстрація
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
