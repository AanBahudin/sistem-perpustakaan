import { configureStore } from "@reduxjs/toolkit";
import profileReducer from '@/cart/profileSlice'
import peminjamanReducer from '@/cart/peminjamanSlice'
import pengembalianReducer from '@/cart/pengembalianSlice'

export const store = configureStore({
    reducer: {
        profileState: profileReducer,
        peminjamanState: peminjamanReducer,
        pengembalianState: pengembalianReducer
    }
})