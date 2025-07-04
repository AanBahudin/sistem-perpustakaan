import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    alasan: '',
    durasi: ''
}

const PerpanjanganSlice = createSlice({
    name: 'perpanjangan',
    initialState: defaultState,
    reducers: {
        setAlasanPerpanjangan: (state, action) => {
            state.alasan = action.payload
        },
        setDurasiPerpanjangan: (state, action) => {
            state.durasi = action.payload
        }
    }
})

export const {setAlasanPerpanjangan, setDurasiPerpanjangan} = PerpanjanganSlice.actions
export default PerpanjanganSlice.reducer