import { createSlice } from "@reduxjs/toolkit";

interface IinitialState{
    isOpen : boolean
}
const initialState:IinitialState = {
    isOpen : false,
}

export const adminSlice = createSlice({
    name :"admin",
    initialState,
    reducers:{
        setDialog : (state,action) => {
            state.isOpen = action.payload;
        }
    },
})

export default adminSlice.reducer;
export const { setDialog } = adminSlice.actions;