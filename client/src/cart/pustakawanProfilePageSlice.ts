import { createSlice } from "@reduxjs/toolkit";

const pustakawanProfilePageSlice = createSlice({
    name: 'pustakawanProfilePageSlice',
    initialState: {
        isEmailDialogOpen: false,
        isPasswordDialogOpen: false,
        showOldPassword: false,
        showNewPassword: false
    },
    reducers: {
        setEmailDialog: (state, action) => {
            state.isEmailDialogOpen = action.payload
        },
        setPasswordDialog: (state, action) => {
            state.isPasswordDialogOpen = action.payload
        },
        setShowOldPassword: (state) => {
            state.showOldPassword = !state.showOldPassword
        },
        setShoNewPassword: (state) => {
            state.showNewPassword = !state.showNewPassword
        }
    }
})

export const { 
    setEmailDialog, 
    setPasswordDialog,
    setShowOldPassword,
    setShoNewPassword 
} = pustakawanProfilePageSlice.actions
export default pustakawanProfilePageSlice.reducer