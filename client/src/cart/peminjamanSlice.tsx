import { createSlice } from "@reduxjs/toolkit";

const initialLayout = localStorage.getItem('layout') || 'grid'

export type DefaultStateType = {
    layout: string,
    activeTab: 1,
    peminjamanFilter: string
}

const defaultState : DefaultStateType = {
    layout: initialLayout,
    activeTab: 1,
    peminjamanFilter: ''
}

const peminjamanSlice = createSlice({
    name: 'peminjaman',
    initialState: defaultState,
    reducers: {
        setLayout: (state, action) => {
            state.layout = action.payload
        },
        setTab: (state, action) => {
            const {id, title} = action.payload
            state.activeTab = id
            state.peminjamanFilter = title
        },
        setFilter: (state, action) => {
            state.peminjamanFilter = action.payload
        }
    }
})

export const { setLayout, setTab, setFilter } = peminjamanSlice.actions
export default peminjamanSlice.reducer