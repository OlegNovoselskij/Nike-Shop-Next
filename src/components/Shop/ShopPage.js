'use client'
import Modal from './MostPopularModal'
import ProductList from "./ProductList";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ShopMain() {
    const searchParams = useSearchParams();
    const categoryFromUrl = searchParams.get('category'); // Отримуємо category з URL
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSort, setSelectedSort] = useState(null);

    useEffect(() => {
        if (categoryFromUrl === 'mens') {
            setSelectedCategory(1);
        } else if (categoryFromUrl === 'womens') {
            setSelectedCategory(2);
        }
    }, [categoryFromUrl]);

    return (
        <div className="bg-black text-white mt-[200px] flex justify-center">
            <aside className="w-2/12 p-9">
                <h3 
                    onClick={() => setSelectedCategory(null)} 
                    className={`font-family-aktiv-grotesk relative font-medium tracking-tight font-bold text-lg mb-4 cursor-pointer ${selectedCategory === null ? "opacity-100" : "opacity-75"}`}
                >
                    All Products
                </h3>
                <ul className="space-y-2">
                    <li onClick={() => setSelectedCategory(1)} className={`cursor-pointer ${selectedCategory === 1 ? "opacity-100" : "opacity-75"}`}>Mens</li>
                    <li onClick={() => setSelectedCategory(2)} className={`cursor-pointer ${selectedCategory === 2 ? "opacity-100" : "opacity-75"}`}>Womens</li>
                </ul>
            </aside>
            <main className="w-1/2 p-8 flex flex-col">
                <div className="flex justify-between items-center mb-6 relative">
                    <h2 className="text-2xl font-bold font-family-aktiv-grotesk">
                        {selectedCategory === 1 ? "Mens" : selectedCategory === 2 ? "Womens" : "All Products"}
                    </h2>
                    <Modal selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
                </div>
                <ProductList selectedCategory={selectedCategory} selectedSort={selectedSort} />
            </main>
        </div>
    );
}
