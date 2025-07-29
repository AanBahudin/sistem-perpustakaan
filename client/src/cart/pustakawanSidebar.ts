import { createSlice } from "@reduxjs/toolkit";

const defaultSidebar = localStorage.getItem('sidebar') || true

const initialState = {
    showSidebar: defaultSidebar
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState, 
    reducers: {
        setShowSidebar: (state, action) => {
            localStorage.setItem('sidebar', action.payload)
            state.showSidebar = action.payload
        }
    }
})

export const {setShowSidebar} = sidebarSlice.actions
export default sidebarSlice.reducer