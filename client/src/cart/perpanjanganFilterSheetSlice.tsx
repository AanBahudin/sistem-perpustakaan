import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    durasi: 'Semua',
    disetujui: 'Semua',
}

const perpanjanganFilterSheetSlice = createSlice({
    name: 'perpanjanganSheetFilter',
    initialState: defaultState,
    reducers: {
        setDurasiPerpanjangan: (state, action) => {
            console.log(action)
            state.durasi = action.payload
        },
        setDisetujuiPerpanjangan: (state, action) => {
            state.disetujui = action.payload
        },
        resetPerpanjanganFilter: (state) => {
            state.disetujui = 'Semua',
            state.durasi = 'Semua'
        }
    }
})

export const { setDurasiPerpanjangan, setDisetujuiPerpanjangan, resetPerpanjanganFilter } = perpanjanganFilterSheetSlice.actions
export default perpanjanganFilterSheetSlice.reducer