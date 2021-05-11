import { ToDo } from "../entities/ToDo";

export interface ToDoRepository {
    GetToDo(): ToDo
}