import { ToDo } from "../../domain/entities/ToDo";
import { ToDoRepository } from "../../domain/repositories/ToDoRepository";

let ToDoList = [
    {title: 'Exercise', id: 'a00370a1-6f20-4c12-9f5d-70ccab9166f1'},
    {title: 'Work', id: 'ab2e5df1-cda3-45ed-9d84-61f91d70439d'},
    {title: 'Play', id: '78ef886b-a7ec-4e8e-84c2-f5d050d026bf'}
]

export class ToDoRepoArrayImplement implements ToDoRepository {
    GetToDo(): Array<ToDo> {
        return ToDoList
    }
    AddToDo(todo : ToDo): Array<ToDo> {
        ToDoList = [...ToDoList, todo]
        return ToDoList
    }
    DeleteToDo(todo : ToDo): Array<ToDo> {
        ToDoList = ToDoList.filter(filterTodo => filterTodo.id !== todo.id)
        return ToDoList
    }
    EditToDo(todo: ToDo): Array<ToDo> {
        const oldTodos = ToDoList.filter((existingTodo) => existingTodo.id !== todo.id)
        console.log(todo)
        ToDoList = [...oldTodos, todo]
        return ToDoList
    }
}