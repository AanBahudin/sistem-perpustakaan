import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    role: 'Semua',
    statusAkun: 'Semua',
    verifikasiProdi: 'Semua',
    verifikasiEmail: 'Semua',
}

const sheetSlice = createSlice({
    name: 'sheet',
    initialState: defaultState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload
        },
        setStatusAkun: (state, action) => {
            state.statusAkun = action.payload
        },
        setVerifikasiEmail: (state, action) => {
            state.verifikasiEmail = action.payload
        },
        setVerifikasiProdi: (state, action) => {
            state.verifikasiProdi = action.payload
        },
        // resetFilter: (state) => {
        //     state = defaultState
        // }
        
    }
})

export const { setRole, setStatusAkun, setVerifikasiEmail, setVerifikasiProdi } = sheetSlice.actions
export default sheetSlice.reducer