import { ShoppingCart, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setShowCart, increaseQuantity, decreaseQuantity } from "@/store/cart-slice"; 
import { motion, AnimatePresence } from "framer-motion";
import IncDec from "./ui/IncDec"; // Використовуємо IncDec

const CartSidebar = () => {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.cart.showCart);
  const cartItems = useSelector((state) => state.cart.itemList);

  function handleCartClick() {
    dispatch(setShowCart());
  }

  return (
    <AnimatePresence>
      {showCart && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 w-96 h-full bg-black text-white p-6 shadow-lg flex flex-col z-[9999] border-l-4 border-white"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">My Cart</h2>
            <button
              onClick={handleCartClick}
              className="p-2 text-white border-2 rounded-lg border-white hover:text-gray-400"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-grow flex flex-col items-center">
            {cartItems.length === 0 ? (
              <div className="text-center">
                <ShoppingCart size={80} className="mb-4 ml-5" />
                <p className="text-lg font-medium">Your cart is empty.</p>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <ul className="divide-y divide-gray-700">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-center py-4">
                      <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                        <span className="text-white font-medium ml-1">{item.name}</span>
                      </div>

                      <div className="ml-4">
                        <IncDec 
                          glovalDiv={"flex items-center"} 
                          innerDiv={"flex items-center bg-[#181818] border border-gray-700 rounded-full px-0 py-1"} 
                          quentity={item.quantity} 
                          handleIncrease={() => dispatch(increaseQuantity({ id: item.id }))} 
                          handleDecrease={() => dispatch(decreaseQuantity({ id: item.id }))} 
                        />
                      </div>
                      <span className="font-semibold ml-2">{item.totalPrice.toFixed(2)}$</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-white text-lg font-semibold">
                    <span>Total:</span>
                    <span>
                      ${cartItems.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
