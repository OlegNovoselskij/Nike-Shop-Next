'use client'
import ProductItem from './ProductItem';
import { useEffect, useState } from "react";
import { getAllProducts } from '@/http';
import Loading from './loading';
import { useRouter } from 'next/navigation';

function ProductList({ selectedCategory, selectedSort }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchProducts() {
            const data = await getAllProducts();
            setProducts(data);
            setIsLoading(false);
        }
        fetchProducts();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen">
                <div className="absolute top-0 left-0 right-0 flex justify-center items-center w-full h-full">
                    <Loading />
                </div>
            </div>
        );
    }

    let filteredProducts = selectedCategory ? products.filter(item => item.categoryId === selectedCategory) : products;

    // 🔽 Сортування
    if (selectedSort === "Name (A-Z)") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === "Name (Z-A)") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
    } else if (selectedSort === "Price (low to high)") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (selectedSort === "Price (high to low)") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {filteredProducts.map((item) => (
                <ProductItem 
                    key={item.id} 
                    handleClickOnProduct={() => router.push(`/shop/${item.id}`)} 
                    id={item.id} 
                    image={item.imageUrl} 
                    title={item.name} 
                    price={item.price} 
                />
            ))}
        </div>
    );
}

export default ProductList;
