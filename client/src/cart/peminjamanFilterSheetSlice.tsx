import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    statusPeminjaman: 'Semua',
    durasiPeminjaman: 'Semua',
    kondisi: 'Semua',
    disetujui: 'Semua',
}

const peminjamanFilterSheetSlice = createSlice({
    name: 'peminjamanSheetFilter',
    initialState: defaultState,
    reducers: {
        setStatusPeminjaman: (state, action) => {
            state.statusPeminjaman = action.payload
        },
        setDurasiPeminjaman: (state, action) => {
            state.durasiPeminjaman = action.payload
        },
        setKondisi: (state, action) => {
            state.kondisi = action.payload
        },
        setDisetujui: (state, action) => {
            state.disetujui = action.payload
        },
        resetFilter: (state) => {
            state.statusPeminjaman = 'Semua'
            state.durasiPeminjaman = 'Semua'
            state.kondisi = 'Semua'
            state.disetujui = 'Semua'
        }
        
    }
})

export const { 
    setStatusPeminjaman,
    setDurasiPeminjaman,
    setKondisi,
    setDisetujui,
    resetFilter } = peminjamanFilterSheetSlice.actions
export default peminjamanFilterSheetSlice.reducer