import { createSlice } from "@reduxjs/toolkit";

type DefaultStateType = {
    layout: 'grid' | 'list'
}

const defaultState : DefaultStateType = {
    layout: 'list'
}

const peminjamanSlice = createSlice({
    name: 'peminjaman',
    initialState: defaultState,
    reducers: {
        setLayout: (state, action) => {
            state.layout = action.payload
        }
    }
})


export const { setLayout } = peminjamanSlice.actions
export default peminjamanSlice.reducer