import { ToDo } from "../../domain/entities/ToDo"
import { ToDoRepository } from "../../domain/repositories/ToDoRepository"

export class ToDoRepoLocalImpl implements ToDoRepository {
    localToDoList = localStorage.getItem("toDoList")

    ToDoList = JSON.parse(this.localToDoList)

    GetToDo(): Array<ToDo> {
        return this.ToDoList
    }

    AddToDo(todo: ToDo): Array<ToDo> {
        this.ToDoList = [...this.ToDoList, todo]
        localStorage.setItem("toDoList", JSON.stringify(this.ToDoList))

        return this.ToDoList
    }

    DeleteToDo(todo: ToDo): Array<ToDo> {
        this.ToDoList = this.ToDoList.filter((filterTodo) => filterTodo.id !== todo.id)
        localStorage.setItem("toDoList", JSON.stringify(this.ToDoList))

        return this.ToDoList
    }

    EditToDo(todo: ToDo): Array<ToDo> {
        const oldTodos = this.ToDoList.filter((existingTodo) => existingTodo.id !== todo.id)
        // console.log(todo)
        this.ToDoList = [...oldTodos, todo]
        localStorage.setItem("toDoList", JSON.stringify(this.ToDoList))

        return this.ToDoList
    }

    MarkCompleted(todo: ToDo): Array<ToDo> {
        const oldTodos = this.ToDoList.filter((existingTodo) => existingTodo.id !== todo.id)
        this.ToDoList = [...oldTodos, todo]
        // console.log(this.ToDoList)
        localStorage.setItem("toDoList", JSON.stringify(this.ToDoList))

        return this.ToDoList
    }
}
