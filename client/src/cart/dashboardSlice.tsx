import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeTab: 'peminjaman'
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setTab: (state, action) => {
            state.activeTab = action.payload
        }
    }
})

export const { setTab } = dashboardSlice.actions
export default dashboardSlice.reducer