import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    isAuthenticate:!!localStorage.getItem("token")
}
const Auth =createSlice({
    name:"Authentication",
    initialState:initialState,
    reducers:{
            login(state,action){
                state.isAuthenticate =true;
                console.log("login from redux call")
            },
            logout(state,action){
                state.isAuthenticate=false;

            }
            
        
        
    }
})
export const authAction =Auth.actions;
export default Auth.reducer;




// import { createSlice } from "@reduxjs/toolkit"



// const initialState={

//     isAuthenticate : !!localStorage.getItem("token"),

// }
// const Auth=createSlice({
//     name:"Authentication",
//     initialState:initialState,
//     reducers:{
//         login(state,action){
//             state.isAuthenticate = true;
//             console.log("login from redux call");

//         },
//         logout(state, action){
//             state.isAuthenticate = false;
//         }
//     }
// })
// export const authAction =Auth.actions;
// export default Auth.reducer;
