import { createSlice } from "@reduxjs/toolkit";
import { setLayout } from "./peminjamanSlice";

const defaultState = {
    activeTab: '',
    layout: localStorage.getItem('pengembalianLayout') || 'grid'
}

const pengembalianSlice = createSlice({
    name: 'pengembalian',
    initialState: defaultState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        },
        setLayout: (state, action) => {
            state.layout = action.payload
            localStorage.setItem('pengembalianLayout', action.payload)
        }
    }
})

export const { setActiveTab } = pengembalianSlice.actions
export default pengembalianSlice.reducer