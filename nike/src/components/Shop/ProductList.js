'use client'
import ProductItem from './ProductItem';
import { useEffect, useState } from "react";
import { getAllProducts } from '@/http';
import Loading from './loading';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

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

    return (
        <div className="grid grid-cols-4 gap-4">
            {products.map((item) => (
                <ProductItem key={item.name} image={item.imageUrl} title={item.name} price={item.price} />
            ))}
        </div>
    );
}

export default ProductList;
