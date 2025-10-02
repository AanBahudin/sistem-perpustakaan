import { createSlice } from "@reduxjs/toolkit";

const pustakawanPengaturanPageSlice = createSlice({
    name: 'pustakawanPengaturanPageSlice',
    initialState: {
        isEditDialogOpen: false,
        isDeleteAlertOpen: false
    },
    reducers: {
        setOpenEditDialog: (state, action) => {
            state.isEditDialogOpen = action.payload
        },
        setOpenDeleteAlert: (state, action) => {
            state.isDeleteAlertOpen = action.payload
        }
    }
})

export const {
    setOpenEditDialog,
    setOpenDeleteAlert
} = pustakawanPengaturanPageSlice.actions
export default pustakawanPengaturanPageSlice.reducer