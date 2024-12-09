import { Action, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";


const initalValues = {
    value : 0
}


const slider = createSlice({
    name:'redux_unnamed',
    initialState : initalValues,
    reducers : (  )=>({

        increment : ( state , action:Action )=>{                          //this is one of action 
            state.value++;
        }

    }),
    extraReducers: ( builder )=>{

    }
});



export default slider.reducer;
export const { increment } = slider.actions;




// is this how we use the dispacther ,? and what do we add in extraReducer , i thinks something to do with the api call like aysn thunk give me an example
