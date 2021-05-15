import { ToDoRepoArrayImplement } from "../../../data/repositories/ToDoRepoArrayImplement"
import { ToDoServiceImpl } from "../../../domain/usecases/ToDoService"
import { ToDo } from "../../../domain/entities/ToDo"
import { ToDoRepoLocalImpl } from "../../../data/repositories/ToDoRepoLocalImpl"

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { act } from "react-dom/test-utils"

interface CounterState {
    toDo: Array<ToDo>
}

// Define the initial state using that type
const initialState: CounterState = {
    toDo: [],
}

export const fetchToDoList = createAsyncThunk("toDoList/fetchToDoList", () => {
    const toDoRepo = new ToDoRepoLocalImpl()
    const toDoService = new ToDoServiceImpl(toDoRepo)
    const toDoList = toDoService.GetToDo()
    return toDoList
})

export const addToDo = createAsyncThunk("toDoList/addToDo", (todo: ToDo) => {
    const toDoRepo = new ToDoRepoLocalImpl()
    const toDoService = new ToDoServiceImpl(toDoRepo)
    const newToDoList = toDoService.AddToDo(todo)
    return newToDoList
})

export const deleteToDo = createAsyncThunk("toDoList/deleteToDo", (todo: ToDo) => {
    const toDoRepo = new ToDoRepoLocalImpl()
    const toDoService = new ToDoServiceImpl(toDoRepo)
    const deleteToDo = toDoService.DeleteToDo(todo)
    return deleteToDo
})

export const editToDo = createAsyncThunk("toDoList/editToDo", (todo: ToDo) => {
    const toDoRepo = new ToDoRepoLocalImpl()
    const toDoService = new ToDoServiceImpl(toDoRepo)
    const editToDo = toDoService.EditToDo(todo)
    return editToDo
})

export const markCompleted = createAsyncThunk("toDoList/markCompleted", (todo: ToDo) => {
    const toDoRepo = new ToDoRepoLocalImpl()
    const toDoService = new ToDoServiceImpl(toDoRepo)
    const markCompleted = toDoService.MarkCompleted(todo)
    return markCompleted
})

export const toDoSlice = createSlice({
    name: "toDoList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchToDoList.fulfilled, (state, action) => {
            return {
                ...state,
                toDo: action.payload,
            }
        })
        builder.addCase(addToDo.fulfilled, (state, action) => {
            return {
                ...state,
                toDo: action.payload,
            }
        })
        builder.addCase(deleteToDo.fulfilled, (state, action) => {
            return {
                ...state,
                toDo: action.payload,
            }
        })
        builder.addCase(editToDo.fulfilled, (state, action) => {
            return {
                ...state,
                toDo: action.payload,
            }
        })
        builder.addCase(markCompleted.fulfilled, (state, action) => {
            return {
                ...state,
                toDo: action.payload,
            }
        })
    },
})
