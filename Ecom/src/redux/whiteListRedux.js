import { createSlice } from "@reduxjs/toolkit";

const whiteListSlice = createSlice({
    name: 'whiteList',
    initialState: JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.whiteList) || {list: []},
    reducers: {
        addList: (state, action) => {
            state.list.push(action.payload)
        },
        removeList: (state, action) => {
            state.list = state.list.filter(list => list.id !== action.payload)
        }
    }
})

export const { addList, removeList, inList } = whiteListSlice.actions
export default whiteListSlice.reducer