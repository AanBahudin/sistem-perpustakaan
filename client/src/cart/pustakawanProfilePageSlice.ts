import { createSlice } from "@reduxjs/toolkit";

const pustakawanProfilePageSlice = createSlice({
    name: 'pustakawanProfilePageSlice',
    initialState: {
        isEmailDialogOpen: false,
        isPasswordDialogOpen: false
    },
    reducers: {
        setEmailDialog: (state, action) => {
            state.isEmailDialogOpen = action.payload
        },
        setPasswordDialog: (state, action) => {
            state.isPasswordDialogOpen = action.payload
        }
    }
})

export const { setEmailDialog, setPasswordDialog } = pustakawanProfilePageSlice.actions
export default pustakawanProfilePageSlice.reducer