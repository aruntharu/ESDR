import { configureStore } from "@reduxjs/toolkit";
import boxSlice from "../reducerSlices/boxSlice";
import userSlice from "../reducerSlices/userSlice";



const store = configureStore({
    reducer:{
        box: boxSlice,
        user: userSlice

    }
})

export default store