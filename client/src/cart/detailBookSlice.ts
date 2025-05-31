import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    durasiPeminjaman : '',
}

const detailBukuSlice = createSlice({
    name: 'detailBuku',
    initialState: defaultState,
    reducers: {
        setDurasi: (state, action) => {
            state.durasiPeminjaman = action.payload
        }
    }
})


export const { setDurasi } = detailBukuSlice.actions
export default detailBukuSlice.reducer