import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    statusPeminjaman: 'Semua',
    durasiPeminjaman: 0,
    kondisi: '',
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
        
    }
})

export const { 
    setStatusPeminjaman,
    setDurasiPeminjaman,
    setKondisi,
    setDisetujui } = peminjamanFilterSheetSlice.actions
export default peminjamanFilterSheetSlice.reducer