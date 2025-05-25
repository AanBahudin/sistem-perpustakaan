import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 1
}

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        nextPage: (state, action) => {
            
        },
        prevPage: (state, action) => {

        },
        navigatedPage: (state, action) => {

        }
    }
})