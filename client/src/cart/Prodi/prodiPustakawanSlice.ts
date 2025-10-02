import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nonaktifAlert: false,
    aktifkanAlert: false,
    activePustakawanId: ''
}

const prodiPustakawanSlice = createSlice({
    name: 'prodiPustakawanSlice',
    initialState,
    reducers: {
        setNonaktifAlert: (state, action) => {
            const {pustakawanId, alertState} = action.payload
            // jika alert state = true atau terbuka. maka Id pustakawan diatur
            if (alertState) {
                state.activePustakawanId = pustakawanId
            } else {
                state.activePustakawanId = ''
            }
            state.nonaktifAlert = alertState
        },
        setAktifAlert: (state, action) => {
            const {pustakawanId, alertState} = action.payload
            if (alertState) {
                state.activePustakawanId = pustakawanId
            } else {
                state.activePustakawanId = ''
            }
            state.aktifkanAlert = alertState
        }
    }
})

export const {
    setAktifAlert,
    setNonaktifAlert
} = prodiPustakawanSlice.actions
export default prodiPustakawanSlice.reducer