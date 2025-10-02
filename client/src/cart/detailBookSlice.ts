import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    durasiPeminjaman : '',
    pustakawanDetailBukuTabs: 'Umum'
}

const detailBukuSlice = createSlice({
    name: 'detailBuku',
    initialState: defaultState,
    reducers: {
        setDurasi: (state, action) => {
            state.durasiPeminjaman = action.payload
        },
        setPustakawanDetailBukuTabs: (state, action) => {
            state.pustakawanDetailBukuTabs = action.payload
        }
    }
})


export const { setDurasi, setPustakawanDetailBukuTabs } = detailBukuSlice.actions
export default detailBukuSlice.reducer