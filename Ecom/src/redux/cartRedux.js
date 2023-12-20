import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        product: [],
        quantity: 0,
        totalAmount: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += action.payload.quantity
            state.totalAmount += action.payload.price
            const productIndex = state.product.findIndex(product => product?._id === action.payload.product._id)
            if(productIndex >= 0)
                state.product[productIndex].quantity += action.payload.quantity
            else
                state.product.push(action.payload.product)
        },
        incrQuantity: (state, action) => {
            state.quantity += 1
            state.totalAmount += action.payload.price
            const productIndex = state.product.findIndex(product => product?._id === action.payload.id)
            state.product[productIndex].quantity += 1
        },
        descQuantity: (state, action) => {
            state.quantity -= 1
            state.totalAmount -= action.payload.price
            const productIndex = state.product.findIndex(product => product?._id === action.payload.id)
            state.product[productIndex].quantity -= 1
            if(state.product[productIndex].quantity === 0)
                state.product = state.product.filter(product => product._id !== action.payload.id)
        }
    }
})

export const { addProduct, incrQuantity, descQuantity } = cartSlice.actions
export default cartSlice.reducer