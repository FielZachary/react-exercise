import ToDo from "../../domain/entities/ToDo"
import { ToDoRepository } from "../../domain/repositories/ToDoRepository"

// IF ERROR, EXTRACT TODOLIST BACK OUT OF THE CLASS

export default class ToDoRepoArrayImplement implements ToDoRepository {
    ToDoList = [
        { title: "Exercise", id: "a00370a1-6f20-4c12-9f5d-70ccab9166f1", isCompleted: false },
        { title: "Work", id: "ab2e5df1-cda3-45ed-9d84-61f91d70439d", isCompleted: false },
        { title: "Play", id: "78ef886b-a7ec-4e8e-84c2-f5d050d026bf", isCompleted: false },
    ]

    GetToDo(): Array<ToDo> {
        return this.ToDoList
    }

    AddToDo(todo: ToDo): Array<ToDo> {
        this.ToDoList = [...this.ToDoList, todo]
        return this.ToDoList
    }

    DeleteToDo(todo: ToDo): Array<ToDo> {
        this.ToDoList = this.ToDoList.filter((filterTodo) => filterTodo.id !== todo.id)
        return this.ToDoList
    }

    EditToDo(todo: ToDo): Array<ToDo> {
        const oldTodos = this.ToDoList.filter((existingTodo) => existingTodo.id !== todo.id)
        // console.log(todo)
        this.ToDoList = [...oldTodos, todo]
        return this.ToDoList
    }

    MarkCompleted(todo: ToDo): Array<ToDo> {
        const oldTodos = this.ToDoList.filter((existingTodo) => existingTodo.id !== todo.id)
        this.ToDoList = [...oldTodos, todo]
        // console.log(ToDoList)
        return this.ToDoList
    }
}
