import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    shareBookLink : '',
    isCopied: false
}

const globalSlice = createSlice({
    name: 'global',
    initialState: defaultState,
    reducers: {
        setShareLink: (state, action) => {
            state.shareBookLink = action.payload
        },
        setIsCopied: (state, action) => {
            state.isCopied = action.payload
        }
    }
})


export const { setShareLink, setIsCopied } = globalSlice.actions
export default globalSlice.reducer