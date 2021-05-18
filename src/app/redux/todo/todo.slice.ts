import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import ToDoRepoLocalImpl from "../../../data/repositories/ToDoRepoLocalImpl"
import ToDoRepoFirebaseImpl from "../../../data/repositories/ToDoRepoFirebaseImpl";
import ToDo from "../../../domain/entities/ToDo"
import ToDoServiceImpl from "../../../domain/usecases/ToDoService"




interface CounterState {
    toDo: Array<ToDo>
    error: string
}

// Define the initial state using that type
const initialState: CounterState = {
    toDo: [],
    error: "",
}

export const fetchToDoList = createAsyncThunk("toDoList/fetchToDoList", () => {

    const toDoRepo = new ToDoRepoFirebaseImpl()
    console.log('iiuyt')
    const toDoService = new ToDoServiceImpl(toDoRepo)
    const toDoList = toDoService.GetToDo()
    return toDoList
})

export const addToDo = createAsyncThunk("toDoList/addToDo", (todo: ToDo, {rejectWithValue}) => {
    try {
        const toDoRepo = new ToDoRepoFirebaseImpl()
        const toDoService = new ToDoServiceImpl(toDoRepo)
        const newToDoList = toDoService.AddToDo(todo)
        return newToDoList
    }
    catch (e) {

        return rejectWithValue((e as Error).message)
    }
})

export const deleteToDo = createAsyncThunk("toDoList/deleteToDo", (todo: ToDo) => {
    const toDoRepo = new ToDoRepoFirebaseImpl()
    const toDoService = new ToDoServiceImpl(toDoRepo)
    const deleteToDoList = toDoService.DeleteToDo(todo)
    return deleteToDoList
})

export const editToDo = createAsyncThunk("toDoList/editToDo", (todo: ToDo, {rejectWithValue}) => {

    try {
        const toDoRepo = new ToDoRepoFirebaseImpl()
        const toDoService = new ToDoServiceImpl(toDoRepo)
        const editToDoList = toDoService.EditToDo(todo)
        return editToDoList
    }
    catch (e) {

        return rejectWithValue((e as Error).message)
    }
})

export const markCompleted = createAsyncThunk("toDoList/markCompleted", (todo: ToDo) => {
    const toDoRepo = new ToDoRepoFirebaseImpl()
    const toDoService = new ToDoServiceImpl(toDoRepo)
    const markCompletedList = toDoService.MarkCompleted(todo)
    return markCompletedList
})

export const clearError = createAsyncThunk("toDoList/clearError", () => {

    return ""
})

export const toDoSlice = createSlice({
    name: "toDoList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchToDoList.fulfilled, (state, action) => ({
            ...state,
            toDo: action.payload,
        }))
        builder.addCase(addToDo.fulfilled, (state, action) => ({
            ...state,
            toDo: action.payload,
            error: ""
        }))
        builder.addCase(addToDo.rejected, (state, action) => (console.log(action.payload), {
            ...state,
            error: JSON.stringify(action.payload),
        }))
        builder.addCase(clearError.fulfilled, (state, action) => ({
            ...state,
            error: ""
        }))
        builder.addCase(deleteToDo.fulfilled, (state, action) => ({
            ...state,
            toDo: action.payload,
        }))
        builder.addCase(editToDo.fulfilled, (state, action) => ({
            ...state,
            toDo: action.payload,
        }))
        builder.addCase(editToDo.rejected, (state, action) => (console.log(action.payload), {
            ...state,
            error: JSON.stringify(action.payload),
        }))
        builder.addCase(markCompleted.fulfilled, (state, action) => ({
            ...state,
            toDo: action.payload,
        }))
    },
})
