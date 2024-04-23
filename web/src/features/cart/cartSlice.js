import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Helper to save cart to cookie
const saveCartToCookie = (cartItems) => {
    Cookies.set("cartItems", JSON.stringify(cartItems), { expires: 7 });
};

// Load initial state from cookie
const loadCartFromCookie = () => {
    const cookie = Cookies.get("cartItems");
    return cookie ? JSON.parse(cookie) : [];
};

const initialState = {
    cartItems: loadCartFromCookie(),
    amount: 0,
    total: 0,
    isLoading: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
            saveCartToCookie(state.cartItems);
            toast.info('Cart cleared!');
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
            cartSlice.caseReducers.calculateTotals(state);
            saveCartToCookie(state.cartItems);
            toast.error('Product removed from the cart!');
        },
        updateCartAmount: (state, action) => {
            const cartItem = state.cartItems.find(item => item.id === action.payload.id);
            if (cartItem) {
                cartItem.amount = Number(action.payload.amount);
                cartSlice.caseReducers.calculateTotals(state);
                saveCartToCookie(state.cartItems);
            }
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach(item => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        },
        addToCart: (state, action) => {
            const cartItem = state.cartItems.find(item => item.id === action.payload.id);
            if(!cartItem){
                state.cartItems.push(action.payload);
            } else {
                cartItem.amount += action.payload.amount;
            }
            cartSlice.caseReducers.calculateTotals(state);
            saveCartToCookie(state.cartItems);
            toast.success('Product added to the cart!');
        },
        updateCartFromCookie: (state, action) => {
            state.cartItems = action.payload;
            // Calculate totals based on these items
            let newTotal = 0;
            let newAmount = 0;
            action.payload.forEach(item => {
              newAmount += item.amount;
              newTotal += item.amount * item.price;
            });
            state.total = newTotal;
            state.amount = newAmount;
          },
    }
});

export const { clearCart, removeItem, updateCartAmount, calculateTotals, addToCart, updateCartFromCookie } = cartSlice.actions;

export default cartSlice.reducer;