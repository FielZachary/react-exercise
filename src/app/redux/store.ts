import { configureStore } from "@reduxjs/toolkit"

import { itemSlice } from "./item/item.slice"
import { productSlice } from "./product/product.slice"
import { toDoSlice } from "./todo/todo.slice"
import { userSlice } from "./user/user.slice"
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        users: userSlice.reducer,
        items: itemSlice.reducer,
        todo: toDoSlice.reducer,
        firebase: firebaseReducer,
        firestore: firestoreReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
