import { Action, createSlice } from "@reduxjs/toolkit";


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

    })
});



export default slider.reducer;
export const { increment } = slider.actions;