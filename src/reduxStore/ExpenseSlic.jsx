import { createSlice } from "@reduxjs/toolkit";

const initialState={
    reRender:true,
    selectedItem:null,
    
    isEditing:false,
    idForEdit:null
}
const ExpenseSlic =createSlice({
    name:"ExpenseReducer",
    initialState:initialState,
    reducers:{
        callGetDataFun(state,action){
            state.reRender = !state.reRender;
        },
        setSelectedItem(state,action){
            state.selectedItem = action.payload
        },
        

        isEdited(state,action){
            state.isEditing = action.payload;

        },
        setEditData(state,action){
            state.idForEdit=action.payload;
        }
    }

})
export const ExpenseAction=ExpenseSlic.actions;
export default ExpenseSlic.reducer;