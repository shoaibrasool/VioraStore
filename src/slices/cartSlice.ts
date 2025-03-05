import { CartItem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    items: CartItem[];
    total: number;
  }
  
  const initialState: CartState = {
    items: [],
    total: 0,
  };
  
  const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
      addItem: (state, action: PayloadAction<CartItem>) => {
        const existingItem = state.items.find((i) => i.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
        state.total += action.payload.price;
      },
      removeItem: (state, action: PayloadAction<string>) => {
        const item = state.items.find((i) => i.id === action.payload);
        if (item) {
          state.total -= item.price * item.quantity;
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      },
      updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
        const item = state.items.find((i) => i.id === action.payload.id);
        if (item) {
          state.total += (action.payload.quantity - item.quantity) * item.price;
          item.quantity = action.payload.quantity;
        }
      },
      clearCart: (state) => {
        state.items = [];
        state.total = 0;
      },
    },
  });
  
  export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
  export default cartSlice.reducer;