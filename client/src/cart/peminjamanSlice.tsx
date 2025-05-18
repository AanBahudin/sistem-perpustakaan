import { createSlice } from "@reduxjs/toolkit";

type DefaultStateType = {
    layout: 'grid' | 'list',
    activeTab: 1
}

const defaultState : DefaultStateType = {
    layout: 'list',
    activeTab: 1
}

const peminjamanSlice = createSlice({
    name: 'peminjaman',
    initialState: defaultState,
    reducers: {
        setLayout: (state, action) => {
            state.layout = action.payload
        },
        setTab: (state, action) => {
            state.activeTab = action.payload
        }
    }
})


export const { setLayout, setTab } = peminjamanSlice.actions
export default peminjamanSlice.reducer