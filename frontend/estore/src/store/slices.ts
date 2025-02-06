import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

interface PRODUCT_CARD_INTERFACE {
    id:string | number | any,
    name:string,
    image:string,
    quantity:number,
    price:number
}

interface CartState {
    items:PRODUCT_CARD_INTERFACE[];
}


const initalValue = {
    items: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("cart") || "[]")  : []  ,
}

const slider = createSlice({
    name:'redux_unnamed',
    initialState : initalValue,
    reducers : {
        addToCart : ( state , action:PayloadAction<PRODUCT_CARD_INTERFACE> )=>{
            const existingProduct = state?.items?.find( (item:PRODUCT_CARD_INTERFACE)=>item.id === action.payload.id );
            if(existingProduct){
                existingProduct.quantity += action.payload.quantity
                existingProduct.price += action.payload.price
            }else {
                state.items.push(action.payload);
            }
            localStorage.setItem( "cart", JSON.stringify(state.items) )
            
        } , 

        removeFromCart : ( state , action:PayloadAction<PRODUCT_CARD_INTERFACE> )=>{
            state.items = state.items.filter( (item:PRODUCT_CARD_INTERFACE) => item.id !== action.payload.id );
            localStorage.setItem( "cart", JSON.stringify(state.items) )
        },

        updateCart: (state,action:PayloadAction<PRODUCT_CARD_INTERFACE>)=>{
            const updatedItem = state.items.find( (item:PRODUCT_CARD_INTERFACE)=>item.id === action.payload.id );
            if(updatedItem){
                updatedItem.quantity = action.payload.quantity
            }
            localStorage.setItem( "cart", JSON.stringify(state.items) )
        },

        clearCart: ( state, action:PayloadAction<PRODUCT_CARD_INTERFACE> )=>{
                state.items = [];
            localStorage.setItem( "cart", JSON.stringify(state.items) )
        }
    },
    
    extraReducers: ( builder )=>{

    }
});


export const { addToCart, clearCart, removeFromCart , updateCart } = slider.actions;
export default slider.reducer;




// is this how we use the dispacther ,? and what do we add in extraReducer , i thinks something to do with the api call like aysn thunk give me an example
