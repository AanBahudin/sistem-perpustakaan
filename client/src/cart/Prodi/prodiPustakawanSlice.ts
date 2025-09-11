import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nonaktifAlert: false
}

const prodiPustakawanSlice = createSlice({
    name: 'prodiPustakawanSlice',
    initialState,
    reducers: {
        setNonaktifAlert: (state, action) => {
            state.nonaktifAlert = action.payload
        }
    }
})

export const {
    setNonaktifAlert
} = prodiPustakawanSlice.actions
export default prodiPustakawanSlice.reducer