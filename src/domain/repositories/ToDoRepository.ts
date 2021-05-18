import ToDo from "../entities/ToDo"

export interface ToDoRepository {
    GetToDo(): Promise<ToDo[]>
    AddToDo(todo: ToDo): Promise<ToDo[]>
    DeleteToDo(todo: ToDo): Promise<ToDo[]>
    EditToDo(todo: ToDo): Promise<ToDo[]>
    MarkCompleted(todo: ToDo): Promise<ToDo[]>
}
