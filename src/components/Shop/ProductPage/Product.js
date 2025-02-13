"use client";
import { ShoppingCart } from "lucide-react";
import Button from "@/components/ui/Button";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "@/store/cart-slice"; 
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Loading from "../loading";
import { getProduct } from "@/http";
import IncDec from "@/components/ui/IncDec";

const Product = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quentity, setQuentity] = useState(1); // Додаємо локальний стан для кількості

  const cartItem = useSelector((state) =>
    state.cart.itemList.find((item) => item.id === product?.id)
  );
  const cartQuantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProduct(slug);
      setProduct(data);
      setIsLoading(false);

      if (data?.id) {
        handleViewProduct(data.id);
      }
    }
    fetchProduct();
  }, [slug]);

  const handleViewProduct = async (productId) => {
    await fetch("/api/recently-viewed", {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: { "Content-Type": "application/json" },
    });
  };

  function handleIncrease() {
    if (cartQuantity > 0) {
      dispatch(increaseQuantity({ id: product.id }));
    } else {
      setQuentity((prev) => prev + 1);
    }
  }

  function handleDecrease() {
    if (cartQuantity > 0) {
      dispatch(decreaseQuantity({ id: product.id }));
    } else if (quentity > 1) {
      setQuentity((prev) => prev - 1);
    }
  }

  function handleAddToCart() {
    if (product) {
      dispatch(
        addToCart({
          name: product.name,
          price: product.price,
          totalPrice: product.price * quentity,
          id: product.id,
          image: product.imageUrl,
          quantity: quentity,
        })
      );
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
          <a onClick={() => redirect("/shop")} className="text-gray-400 text-xl cursor-pointer hover:opacity-75">
            &lt; All Products
          </a>
        </div>

        <img src={product.imageUrl} alt="Product" className="w-[530px] h-[530px] object-cover" />

        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-3xl text-gray-300">${product.price}</p>

          <div>
            <label className="block text-gray-400 text-2xl mb-2">Quantity</label>
            <IncDec 
              glovalDiv="flex items-center"
              innerDiv="flex items-center bg-[#181818] border border-gray-700 rounded-full px-6 py-1"
              quentity={cartQuantity > 0 ? cartQuantity : quentity} // Відображаємо або з кошика, або локальне значення
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
            />
          </div>

          <div onClick={handleAddToCart}>
            <Button className="bg-[#484444] font-family-aktiv-grotesk hover:bg-gray-600 text-white py-3 px-6 text-lg flex items-center gap-2">
              <ShoppingCart size={20} /> ADD TO CART
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
