import { configureStore } from "@reduxjs/toolkit";
import profileReducer from '@/cart/profileSlice'

export const store = configureStore({
    reducer: {
        profileState: profileReducer
    }
})