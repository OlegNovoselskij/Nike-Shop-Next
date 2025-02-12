import { createSlice } from "@reduxjs/toolkit";

const initialState = { itemList: [], totalQuantity: 0, showCart: false };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.itemList.find((item) => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.itemList.push({
          name: newItem.name,
          price: newItem.price,
          totalPrice: newItem.price,
          id: newItem.id,
          quantity: 1,
          image: newItem.image
        });
      }
      
      console.log("Updated cart:", state.itemList); // Додаємо логування
    },
    
    removeFromCart(state, action) {
      const findItem = state.itemList.find(
        (item) => item.id === action.payload.id
      );
      if (findItem.quantity === 1) {
        state.itemList = state.itemList.filter(
          (item) => item.id != action.payload.id
        );
      } else {
        findItem.quantity--;
        findItem.totalPrice -= findItem.price;
      }
    },
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const { addToCart, removeFromCart, setShowCart } = cartSlice.actions;
export default cartSlice.reducer;