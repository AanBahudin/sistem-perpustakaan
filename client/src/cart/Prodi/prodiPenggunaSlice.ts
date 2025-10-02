import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blokirPenggunaAlert: false,
    verifikasiPenggunaAlert: false,
    bukaBlokirPenggunaAlert: false,
    activeUserId: ''
}

const prodiPenggunaSlice = createSlice({
    name: 'prodiPenggunaSlice',
    initialState,
    reducers: {
        setBlokirPenggunaAlert: (state, action) => {
            const {id, value} = action.payload
            state.blokirPenggunaAlert = value
            state.activeUserId = id
        },
        setVerifikasiPenggunaAlert: (state, action) => {
            const {id, value} = action.payload
            state.verifikasiPenggunaAlert = value
            state.activeUserId = id
        },
        setBukuBlokirPenggunaAlert: (state, action) => {
            const {id, value} = action.payload
            state.bukaBlokirPenggunaAlert = value
            state.activeUserId = id
        }
    }
})


export const { 
    setBlokirPenggunaAlert, 
    setVerifikasiPenggunaAlert,
    setBukuBlokirPenggunaAlert } = prodiPenggunaSlice.actions
export default prodiPenggunaSlice.reducer