import { createSlice } from "@reduxjs/toolkit";

const defaultSidebar = localStorage.getItem('sidebar') || true

const initialState = {
    showSidebar: defaultSidebar,
    userListTabs: 'dosen'
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState, 
    reducers: {
        setShowSidebar: (state, action) => {
            localStorage.setItem('sidebar', action.payload)
            state.showSidebar = action.payload
        },
        setUserList: (state, action) => {
            state.userListTabs = action.payload
        }
    }
})

export const {setShowSidebar, setUserList} = sidebarSlice.actions
export default sidebarSlice.reducer