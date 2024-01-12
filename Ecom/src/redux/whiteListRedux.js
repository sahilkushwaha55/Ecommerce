import { createSlice } from "@reduxjs/toolkit";

function initialValue(){
    if(localStorage.getItem('persist:root'))
        return JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.whiteList)
    return {list: []}
}

const whiteListSlice = createSlice({
    name: 'whiteList',
    initialState: initialValue(),
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