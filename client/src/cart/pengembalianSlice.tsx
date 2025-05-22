import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    activeTab: '',
}

const pengembalianSlice = createSlice({
    name: 'pengembalian',
    initialState: defaultState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload
        }
    }
})

export const { setActiveTab } = pengembalianSlice.actions
export default pengembalianSlice.reducer