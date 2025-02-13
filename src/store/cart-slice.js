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
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.itemList.push({
          name: newItem.name,
          price: newItem.price,
          totalPrice: newItem.price * newItem.quantity,
          id: newItem.id,
          quantity: newItem.quantity,
          image: newItem.image
        });
      }
    },

    increaseQuantity(state, action) {
      const item = state.itemList.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
        item.totalPrice = item.price * item.quantity;
      }
    },

    decreaseQuantity(state, action) {
      const item = state.itemList.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.price * item.quantity;
      }
    },

    removeFromCart(state, action) {
      state.itemList = state.itemList.filter((item) => item.id !== action.payload.id);
    },

    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, setShowCart } = cartSlice.actions;
export default cartSlice.reducer;
