import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blokirPenggunaAlert: false,
    verifikasiPenggunaAlert: false,
    bukaBlokirPenggunaAlert: false
}

const prodiPenggunaSlice = createSlice({
    name: 'prodiPenggunaSlice',
    initialState,
    reducers: {
        setBlokirPenggunaAlert: (state, action) => {
            state.blokirPenggunaAlert = action.payload
        },
        setVerifikasiPenggunaAlert: (state, action) => {
            state.verifikasiPenggunaAlert = action.payload
        },
        setBukuBlokirPenggunaAlert: (state, action) => {
            state.bukaBlokirPenggunaAlert = action.payload
        }
    }
})


export const { 
    setBlokirPenggunaAlert, 
    setVerifikasiPenggunaAlert,
    setBukuBlokirPenggunaAlert } = prodiPenggunaSlice.actions
export default prodiPenggunaSlice.reducer