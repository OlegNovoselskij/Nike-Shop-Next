"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      setLoading(true);
      fetch("/api/recently-viewed/list")
        .then((res) => res.json())
        .then((data) => {
          setRecentlyViewed(data);
          setLoading(false);
        });
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">Завантаження...</div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl">Ви не авторизовані</p>
        <a href="/api/auth/signin" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Увійти
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 mt-8">
      <h1 className="text-2xl font-bold">Профіль користувача</h1>
      <img src={session?.user.image} alt="Avatar" className="w-24 h-24 rounded-full mt-4" />
      <p className="mt-2 text-lg">{session?.user.name}</p>
      <p className="text-gray-600">{session?.user.email}</p>
      <button onClick={() => signOut()} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Вийти
      </button>

      <div className="mt-8 w-full max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Нещодавно переглянуті товари</h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : recentlyViewed.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recentlyViewed.map(({ product }) => (
              <div key={product.id} className="border p-2 rounded-lg shadow-md">
                <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover rounded-md" />
                <h3 className="mt-2 text-sm">{product.name}</h3>
                <p className="text-gray-500">${product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>У вас ще немає переглянутих товарів.</p>
        )}
      </div>
    </div>
  );
}
