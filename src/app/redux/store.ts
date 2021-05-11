import { configureStore } from '@reduxjs/toolkit'
import {itemSlice} from "./item/item.slice";
import {userSlice} from "./user/user.slice";
import {productSlice} from "./product/product.slice";
import {toDoSlice} from "./todo/todo.slice";

export const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        users: userSlice.reducer,
        items: itemSlice.reducer,
        todo: toDoSlice.reducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch