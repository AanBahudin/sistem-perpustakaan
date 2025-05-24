import { configureStore } from "@reduxjs/toolkit";
import globalReducer from '@/cart/globalSlice'
import profileReducer from '@/cart/profileSlice'
import peminjamanReducer from '@/cart/peminjamanSlice'
import pengembalianReducer from '@/cart/pengembalianSlice'

export const store = configureStore({
    reducer: {
        globalState: globalReducer,
        profileState: profileReducer,
        peminjamanState: peminjamanReducer,
        pengembalianState: pengembalianReducer
    }
})