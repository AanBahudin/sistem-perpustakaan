import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    alasan: '',
    durasi: '',
    perpanjanganDetailTabsPustakawan: 'Pengajuan'
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
        },
        setPerpanjanganDetailTabsPustakawan: (state, action) => {
            state.perpanjanganDetailTabsPustakawan = action.payload
        }
    }
})

export const {setAlasanPerpanjangan, setDurasiPerpanjangan, setPerpanjanganDetailTabsPustakawan} = PerpanjanganSlice.actions
export default PerpanjanganSlice.reducer