import { configureStore } from "@reduxjs/toolkit";
import globalReducer from '@/cart/globalSlice'
import profileReducer from '@/cart/profileSlice'
import peminjamanReducer from '@/cart/peminjamanSlice'
import pengembalianReducer from '@/cart/pengembalianSlice'
import detailBukuReducer from '@/cart/detailBookSlice'
import dashboardState from '@/cart/dashboardSlice'

export const store = configureStore({
    reducer: {
        globalState: globalReducer,
        dashboardState: dashboardState,
        profileState: profileReducer,
        peminjamanState: peminjamanReducer,
        pengembalianState: pengembalianReducer,
        detailBukuState: detailBukuReducer
    }
})