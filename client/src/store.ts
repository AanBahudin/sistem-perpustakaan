import { configureStore } from "@reduxjs/toolkit";
import profileReducer from '@/cart/profileSlice'
import peminjamanReducer from '@/cart/peminjamanSlice'

export const store = configureStore({
    reducer: {
        profileState: profileReducer,
        peminjamanState: peminjamanReducer
    }
})