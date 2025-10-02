import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    penulis: 'Semua',
    penerbit: 'Semua',
    tahunTerbit: 'Semua',
    status: 'Semua',
    kategori: 'Semua'
}


const bukuFilterSheetSlice = createSlice({
    name: 'bukuSheetFilter',
    initialState: defaultState,
    reducers: {
        setPenulis: (state, action) => {
            state.penulis = action.payload
        },
        setPenerbit: (state, action) => {
            state.penerbit = action.payload
        },
        setTahunTerbit: (state, action) => {
            state.tahunTerbit = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setKategori: (state, action) => {
            state.kategori = action.payload
        },
        resetFilterBuku: (state) => {
            state.penulis = 'Semua'
            state.penerbit = 'Semua'
            state.tahunTerbit = 'Semua'
            state.status = 'Semua'
            state.kategori = 'Semua'
        }
        
    }
})

export const {
    setPenulis,
    setPenerbit,
    setTahunTerbit,
    setStatus,
    setKategori,
    resetFilterBuku
} = bukuFilterSheetSlice.actions
export default bukuFilterSheetSlice.reducer