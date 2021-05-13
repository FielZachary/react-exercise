import { ToDo } from "../entities/ToDo";

export interface ToDoRepository {
    GetToDo(): Array<ToDo>
    AddToDo(todo : ToDo): Array<ToDo>
    DeleteToDo(todo : ToDo): Array<ToDo>
    EditToDo(todo : ToDo): Array<ToDo>
    MarkCompleted(todo : ToDo): Array<ToDo>
}