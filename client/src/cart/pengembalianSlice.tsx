import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    activeTab: '',
    pustakawanPengembalianTab: 'Pengajuan'
}

const pengembalianSlice = createSlice({
    name: 'pengembalian',
    initialState: defaultState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        },
        setPustakawanPengembalianTab: (state, action) => {
            state.pustakawanPengembalianTab = action.payload
        }
    }
})

export const { setActiveTab, setPustakawanPengembalianTab } = pengembalianSlice.actions
export default pengembalianSlice.reducer