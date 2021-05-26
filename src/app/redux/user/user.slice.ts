import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import UserRepositoryImpl from "../../../data/repositories/UserRepositoryImpl"
import User from "../../../domain/entities/User"
import UserService from "../../../domain/usecases/UserService"

// These two lines make the User property of password optional
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type UserState = PartialBy<User, "password">

// Define a type for the slice state
interface CounterState {
    User: UserState
    loading: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
    User: { uid: "", email: "", isSignedIn: null },
    loading: false,
}

export const signIn = createAsyncThunk("user/signIn", (currentUser: User) => {
    const userRepo = new UserRepositoryImpl()
    const userService = new UserService(userRepo)
    const user = userService.SignIn(currentUser)
    return user
})

export const register = createAsyncThunk("user/register", (currentUser: User) => {
    const userRepo = new UserRepositoryImpl()
    const userService = new UserService(userRepo)
    const user = userService.Register(currentUser)
    return user
})

export const logOut = createAsyncThunk("user/logOut", () => {
    const userRepo = new UserRepositoryImpl()
    const userService = new UserService(userRepo)
    const user = userService.LogOut()
    return user
})

export const onAuthStateChange = createAsyncThunk("user/onAuthStateChange", (currentUser: User) => {
    const userRepo = new UserRepositoryImpl()
    const userService = new UserService(userRepo)
    const user = userService.onAuthStateChange(currentUser)
    return user
})

export const CleanState = createAsyncThunk("user/CleanState", () => {
    const userRepo = new UserRepositoryImpl()
    const userService = new UserService(userRepo)
    const user = userService.CleanState()
    return user
})

export const setLoading = createAsyncThunk("user/setLoading", (value: boolean) => value)

export const userSlice = createSlice({
    name: "user",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signIn.fulfilled, (state, action) => ({
            ...state,
            User: action.payload,
        }))
        builder.addCase(register.fulfilled, (state, action) => ({
            ...state,
            User: action.payload,
        }))
        builder.addCase(onAuthStateChange.fulfilled, (state, action) => ({
            ...state,
            User: action.payload,
        }))
        builder.addCase(CleanState.fulfilled, (state, action) => ({
            ...state,
            User: action.payload,
        }))
        builder.addCase(setLoading.fulfilled, (state, action) => ({
            ...state,
            loading: action.payload,
        }))
    },
})
