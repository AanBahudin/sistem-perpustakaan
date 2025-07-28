import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showSidebar: localStorage.getItem('sidebar') || false
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState, 
    reducers: {
        showSidebar: (state, action) => {
            localStorage.setItem('sidebar', action.payload)
            state.showSidebar = !action.payload
        }
    }
})

export const {showSidebar} = sidebarSlice.actions
export default sidebarSlice.reducer