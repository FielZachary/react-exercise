import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import UserRepoImplement from "../../../data/repositories/UserRepoImplement"
import User from "../../../domain/entities/User"

// Define a type for the slice state
interface CounterState {
    users: Array<User>
}

// Define the initial state using that type
const initialState: CounterState = {
    users: [],
}

export const fetchUserList = createAsyncThunk("userList/fetchList", async () => {
    // console.log("hello")
    const userRepo = new UserRepoImplement()
    const users = await userRepo.GetUsers()
    return users
})
export const userSlice = createSlice({
    name: "userList",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserList.fulfilled, (state, action) => ({
            ...state,
            user: action.payload,
        }))
        builder.addCase(fetchUserList.pending, (state) => ({
            ...state,
            loading: true,
        }))
        builder.addCase(fetchUserList.rejected, (state) => ({
            ...state,
            loading: false,
        }))
    },
})

// // Other code such as selectors can use the imported `RootState` type
// export const items = (state: RootState) => state.items.items
//
// export default itemSlice.reducer
