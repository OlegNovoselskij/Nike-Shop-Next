"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { X, Github } from "lucide-react";

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
            setError("Неправильний email або пароль");
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-all 
                bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:scale-105 shadow-lg"
            >
                Увійти
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-[#18181b] p-6 rounded-2xl shadow-xl w-[90%] max-w-md 
                        max-h-[90vh] overflow-y-auto animate-fade-in relative flex flex-col"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-bold text-center text-white">Вхід до облікового запису</h2>
                        <p className="text-sm text-gray-400 text-center mb-6">Будь ласка, введіть свої дані</p>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 bg-[#27272a] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 bg-[#27272a] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:scale-105 transition shadow-lg"
                            >
                                Увійти
                            </button>
                        </form>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            Використовуючи сервіс, ви погоджуєтесь з <a href="#" className="underline">правилами</a>.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}