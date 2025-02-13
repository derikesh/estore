import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/slices";
import { api } from "./rtkQuery";

const store = configureStore({
    reducer:{
        [api.reducerPath] : api.reducer ,
        cart:cartReducer,
    },
    middleware: ( getDefaultMiddleware )=>
        getDefaultMiddleware().concat(api.middleware)
    
});

// in typescript i think its best practise to export the selector and dispacth action 
export type RootState = ReturnType< typeof store.getState >;
export type AppDispatch = typeof store.dispatch;

export default store; 
