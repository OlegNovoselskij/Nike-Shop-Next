'use client'
import { ShoppingCart } from "lucide-react";
import Button from "@/components/ui/Button";
import { redirect } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cart-slice"; // Додаємо імпорт
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from '../loading';
import { getProduct } from "@/http";

const Product = () => {
  const dispatch = useDispatch()
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      async function fetchProduct() {
          const data = await getProduct(slug);
          setProduct(data);
          setIsLoading(false);
      }
      fetchProduct();
  }, [slug]);

  function handleAddToCart() {
    if (product) {
      dispatch(addToCart({
        name: product.name,
        price: product.price,
        totalPrice: product.price, // Assuming totalPrice is initially the product price
        id: product.id,
        image: product.imageUrl,
      }));
    }
  }
      
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
    <div className="bg-black text-white flex justify-center items-center h-[80vh] mt-[150px]">
      <div className="flex gap-16 max-w-5xl">
        <div>
          <a onClick={() => redirect('/shop')} className="text-gray-400 text-xl cursor-pointer hover:opacity-75">
            &lt; All Products
          </a>
        </div>

        <img src={product.imageUrl} alt="Product" className="w-[530px] h-[530px] object-cover" />

        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-3xl text-gray-300">${product.price}</p>

          <div>
            <label className="block text-gray-400 text-2xl mb-2">Quantity</label>
            <input
              type="number"
              className="w-[140px] p-3 bg-[#181818] border border-gray-700 text-white text-left appearance-none"
            />
          </div>
          <div onClick={handleAddToCart}>
            <Button className="bg-[#484444] font-family-aktiv-grotesk hover:bg-gray-600 text-white py-3 px-6 text-lg flex items-center gap-2">
              <ShoppingCart
              size={20} /> ADD TO CART
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
