import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [], totalQuantity: 0, loading:false, error:null, };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state,action){
        state.cart = action.payload;
        state.totalQuantity = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    },
    addItem(state,action){
        const newItem=action.payload;
        const existingItem = state.cart.find((item) => newItem.id === item.id);
        if(!existingItem){
            state.cart.push({
                id:newItem.id,
                image:newItem.image,
                name:newItem.name,
                category:newItem.category,
                price:newItem.price,
                quantity:newItem.quantity || 1,
                total:(newItem.price * newItem.quantity)
            })
        }
        else{
            existingItem.quantity += newItem.quantity;
            existingItem.total += newItem.price * newItem.quantity; 
        }
        state.totalQuantity = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    },
    updateCartQuantity(state,action){
        const {id,quantity} = action.payload;
        const existingItem = state.cart.find((item) => item.id === id);
        existingItem.quantity=quantity;
        existingItem.total = existingItem.price * quantity;
        
        state.totalQuantity = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    },
    removeItem(state,action){
        const id = action.payload;
        const existingItem = state.cart.find((item) => item.id === id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
        state.cart = state.cart.filter((item) => existingItem.id !== item.id);
    },
    setLoading(state, action){
        state.loading = action.payload
    },
    setError(state,action){
        state.error = action.payload
    },
  },
});

export const {setLoading,setError,replaceCart,addItem,updateCartQuantity,removeItem} = cartSlice.actions;
export default cartSlice.reducer;
