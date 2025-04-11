import { CartItem } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
    items: CartItem[];
  }
  
  const initialState: CartState = {
    items: [],
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
      },
      removeItem: (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
      },
      updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
        const item = state.items.find((i) => i.id === action.payload.id);
        if (item) {
          if (action.payload.quantity <= 0) {
            state.items = state.items.filter((i) => i.id !== action.payload.id);
          } else {
            item.quantity = action.payload.quantity;
          }
        }
      },
      clearCart: (state) => {
        state.items = [];
      },
    },
  });
  
  export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
  export default cartSlice.reducer;