import ToDo from "../../domain/entities/ToDo"
import { ToDoRepository } from "../../domain/repositories/ToDoRepository"

// IF ERROR, EXTRACT TODOLIST BACK OUT OF THE CLASS

export default class ToDoRepoArrayImplement implements ToDoRepository {
    ToDoList = [
        { title: "Exercise", id: "a00370a1-6f20-4c12-9f5d-70ccab9166f1", isCompleted: false },
        { title: "Work", id: "ab2e5df1-cda3-45ed-9d84-61f91d70439d", isCompleted: false },
        { title: "Play", id: "78ef886b-a7ec-4e8e-84c2-f5d050d026bf", isCompleted: false },
    ]

    GetToDo(): Promise<ToDo[]> {

        return new Promise((resolve, reject) => {
            resolve(this.ToDoList);
        });
    }


    AddToDo(todo: ToDo): Promise<ToDo[]> {
        this.ToDoList = [...this.ToDoList, todo]
        return new Promise((resolve, reject) => {
            resolve(this.ToDoList);
        });
    }

    DeleteToDo(todo: ToDo): Promise<ToDo[]> {
        this.ToDoList = this.ToDoList.filter((filterTodo) => filterTodo.id !== todo.id)
        return new Promise((resolve, reject) => {
            resolve(this.ToDoList);
        });
    }

    EditToDo(todo: ToDo): Promise<ToDo[]> {
        const oldTodos = this.ToDoList.filter((existingTodo) => existingTodo.id !== todo.id)
        // console.log(todo)
        this.ToDoList = [...oldTodos, todo]
        return new Promise((resolve, reject) => {
            resolve(this.ToDoList);
        });
    }

    MarkCompleted(todo: ToDo): Promise<ToDo[]> {
        const oldTodos = this.ToDoList.filter((existingTodo) => existingTodo.id !== todo.id)
        this.ToDoList = [...oldTodos, todo]
        // console.log(ToDoList)
        return new Promise((resolve, reject) => {
            resolve(this.ToDoList);
        });
    }
}
