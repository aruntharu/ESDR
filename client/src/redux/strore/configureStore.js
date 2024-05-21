import { configureStore } from "@reduxjs/toolkit";
import couterSlice from "../reudcerSlices/couterSlice";
import boxSlice from "../reudcerSlices/boxSlice";

const store = configureStore({
    reducer: {
        counter: couterSlice,
        box: boxSlice
    }
})
export default store