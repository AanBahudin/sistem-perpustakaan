import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    statusPengembalian: 'Semua',
    keadaanBuku: 'Semua',
    statusPembayaran: 'Semua',
    isMissing: 'Semua',
}

const pengembalianSlice = createSlice({
    name: 'pengembalian',
    initialState: defaultState,
    reducers: {
        setStatusPengembalian: (state, action) => {
            state.statusPengembalian = action.payload
        },
        setKeadaanBuku: (state, action) => {
            state.keadaanBuku = action.payload
        },
        setStatusPembayaran: (state, action) => {
            state.statusPembayaran = action.payload
        },
        setIsMissing: (state, action) => {
            state.isMissing = action.payload
        },
        resetPengembalianFilter: (state) => {
            state.statusPengembalian = 'Semua'
            state.keadaanBuku = 'Semua'
            state.statusPembayaran = 'Semua'
            state.isMissing = 'Semua'
        }
    }
})

export const { 
    setStatusPembayaran, 
    setKeadaanBuku, 
    setStatusPengembalian, 
    setIsMissing, 
    resetPengembalianFilter } = pengembalianSlice.actions
export default pengembalianSlice.reducer