import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    activeTab: '',
    pustakawanPengembalianTab: 'Pengajuan',
    isMissingSwitch: false
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
        },
        setIsMissingSwitch: (state, action) => {
            state.isMissingSwitch = action.payload
        }
    }
})

export const { setActiveTab, setPustakawanPengembalianTab, setIsMissingSwitch } = pengembalianSlice.actions
export default pengembalianSlice.reducer