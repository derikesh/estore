import { configureStore } from "@reduxjs/toolkit";
import slider from "../store/slices";


const store = configureStore({
    reducer:{
        firstReducer:slider
    }
});


// in typescript i think its best practise to export the selector and dispacth action 
export type RootState = ReturnType< typeof store.getState >;
export type AppDispatch = typeof store.dispatch;


export default store;