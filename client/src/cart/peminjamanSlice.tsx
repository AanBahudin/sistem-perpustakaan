import { createSlice } from "@reduxjs/toolkit";

export type DefaultStateType = {
    layout: string,
    activeTab: 1,
    detailPeminjamanTab: 'peminjaman' | 'perpanjangan' | 'pengembalian' | '',
    peminjamanFilter: string
}

const defaultState : DefaultStateType = {
    layout: localStorage.getItem('layout') || 'grid',
    activeTab: 1,
    peminjamanFilter: '',
    detailPeminjamanTab: ''
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
        },
        setDetailPeminjamanTab: (state, action) => {
            state.detailPeminjamanTab = action.payload 
        }
    }
})

export const { setLayout, setTab, setFilter, setDetailPeminjamanTab } = peminjamanSlice.actions
export default peminjamanSlice.reducer