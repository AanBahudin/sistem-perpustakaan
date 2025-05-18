import { createSlice } from "@reduxjs/toolkit";

type DefaultStateType = {
    layout: 'grid' | 'list',
    activeTab: 1,
    peminjamanFilter: 'semua' | 'Dipinjam' | 'Dikembalikan' | 'Diajukan' | 'Ditolak'
}

const defaultState : DefaultStateType = {
    layout: 'list',
    activeTab: 1,
    peminjamanFilter: 'semua'
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
        }
    }
})


export const { setLayout, setTab } = peminjamanSlice.actions
export default peminjamanSlice.reducer