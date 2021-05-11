import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ProductRepoImplement } from "../../../data/repositories/ProductRepoImplement";
import { Product } from "../../../domain/entities/Product";

interface CounterState {
    products: Array<Product>
}

const initialState: CounterState = {
    products: []
}

export const fetchProductList = createAsyncThunk('productList/fetchProductList',  async () => {
    const productRepo = new ProductRepoImplement()
    const products = await productRepo.GetProduct()
    return products
})

export const productSlice = createSlice({
    name: 'productList',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchProductList.fulfilled, (state, action) => {
            return {
                ...state,
                products: action.payload
            }
        })
    }
})