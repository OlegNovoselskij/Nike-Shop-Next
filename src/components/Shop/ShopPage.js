'use client'
import Modal from './MostPopularModal'
import ProductList from "./ProductList";
import { useState } from 'react';

export default function ShopMain() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className="bg-black text-white mt-[200px] flex justify-center">
            <aside className="w-2/12 p-9">
                <h3 onClick={() => setSelectedCategory(null)} className="font-family-aktiv-grotesk relative font-medium tracking-tight opacity-75 font-bold text-lg mb-4 cursor-pointer">
                    All Products
                </h3>
                <ul className="space-y-2">
                    <li onClick={() => setSelectedCategory(1)} className="cursor-pointer hover:opacity-75">Mens</li>
                    <li onClick={() => setSelectedCategory(2)} className="cursor-pointer hover:opacity-75">Womens</li>
                </ul>
            </aside>
            <main className="w-1/2 p-8">
                <div className="flex justify-between items-center mb-6 relative">
                    <h2 className="text-2xl font-bold font-family-aktiv-grotesk">
                        All Products
                    </h2>
                    <Modal />
                </div>
                <ProductList selectedCategory={selectedCategory} />
            </main>
        </div>
    );
}
