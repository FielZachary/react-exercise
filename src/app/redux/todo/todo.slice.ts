import { ToDoRepoArrayImplement } from "../../../data/repositories/ToDoRepoArrayImplement";
import { ToDo } from "../../../domain/entities/ToDo";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface CounterState {
    toDo: ToDo
}

// Define the initial state using that type
const initialState: CounterState = {
    toDo: {list: []},
}

export const fetchToDoList = createAsyncThunk('toDoList/fetchToDoList', () => {
    const toDoRepo =  new ToDoRepoArrayImplement()
    const toDoList = toDoRepo.GetToDo()
    return toDoList;
})

export const addToDo = createAsyncThunk(
    'toDoList/addToDo',
    (formValues : string) => {
        return formValues;
    }
)

export const toDoSlice = createSlice({
    name: 'toDoList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchToDoList.fulfilled, (state, action) => {
            return {
                ...state,
                toDo: action.payload
            }
        })
        builder.addCase(addToDo.fulfilled, (state, action) => {
            return {
                ...state,
                toDo: {list: [...state.toDo.list, action.payload]}
            }
        })
    }
})