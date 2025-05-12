import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    tipe: ''
}

const profileSlice = createSlice({
    name: 'profil',
    initialState: defaultState,
    reducers: {
        setEdit: (state, action) => {
            state.tipe = action.payload
        }
    }
})

export const {setEdit} = profileSlice.actions
export default profileSlice.reducer