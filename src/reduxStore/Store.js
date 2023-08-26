import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice"
import ExpenseSlic from "./ExpenseSlic";


const store =configureStore({
    reducer:{
        AuthReducer,
        // ExpenseSlic
        ExpenseSlic
    }
})
export default store;



