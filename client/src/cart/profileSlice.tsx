import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    tipe: '',
    selectedImg: ''
}

const profileSlice = createSlice({
    name: 'profil',
    initialState: defaultState,
    reducers: {
        setEdit: (state, action) => {
            state.tipe = action.payload
        },
        setSelectedImg: (state, action) => {
            state.selectedImg = action.payload
        },
        removeSelectedImg: (state) => {
            state.selectedImg = ''
        }
    }
})

export const {setEdit, setSelectedImg, removeSelectedImg} = profileSlice.actions
export default profileSlice.reducer