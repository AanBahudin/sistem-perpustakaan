import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    judulBuku: '',
    taglineBuku: '',
    deskripsiBuku: '',
    penulisBuku: '',
    penerbitBuku: '',
    ISBNBuku: '',
    tahunTerbitBuku: new Date().getFullYear(),
    jumlahHalamanBuku: 0,
    bahasaBuku: 'Indonesia',
    panjangBuku: 0,
    lebarBuku: 0,
    sumberPengadaan: 'Beli'
}

const pustakawanTambahBukuSlice = createSlice({
    name: 'pustakawanTambahBuku',
    initialState,
    reducers: {
        setJudulBuku: (state, action) => {
            if (state.judulBuku.length <= 200) {
                state.judulBuku = action.payload
            }
        },
        setTaglineBuku: (state, action) => {
            if (state.taglineBuku.length <= 500) {
                state.taglineBuku = action.payload
            }
        },
        setDeskripsiBuku: (state, action) => {
            if (state.deskripsiBuku.length <= 1000) {
                state.deskripsiBuku = action.payload
            }
        }
    }
})

export const { setJudulBuku, setTaglineBuku, setDeskripsiBuku } = pustakawanTambahBukuSlice.actions
export default pustakawanTambahBukuSlice.reducer