import ToDo from "../../domain/entities/ToDo"
import { ToDoRepository } from "../../domain/repositories/ToDoRepository"

export default  class ToDoRepoLocalImpl implements ToDoRepository {
    localToDoList = localStorage.getItem("toDoList")

    ToDoList = JSON.parse(this.localToDoList)

    GetToDo(): Promise<ToDo[]> {
        return this.ToDoList
    }

    AddToDo(todo: ToDo): Promise<ToDo[]> {
        this.ToDoList = [...this.ToDoList, todo]
        localStorage.setItem("toDoList", JSON.stringify(this.ToDoList))

        return this.ToDoList
    }

    DeleteToDo(todo: ToDo): Promise<ToDo[]> {
        this.ToDoList = this.ToDoList.filter((filterTodo) => filterTodo.id !== todo.id)
        localStorage.setItem("toDoList", JSON.stringify(this.ToDoList))

        return this.ToDoList
    }

    EditToDo(todo: ToDo): Promise<ToDo[]> {
        const oldTodos = this.ToDoList.filter((existingTodo) => existingTodo.id !== todo.id)
        // console.log(todo)
        this.ToDoList = [...oldTodos, todo]
        localStorage.setItem("toDoList", JSON.stringify(this.ToDoList))

        return this.ToDoList
    }

    MarkCompleted(todo: ToDo): Promise<ToDo[]> {
        const oldTodos = this.ToDoList.filter((existingTodo) => existingTodo.id !== todo.id)
        this.ToDoList = [...oldTodos, todo]
        // console.log(this.ToDoList)
        localStorage.setItem("toDoList", JSON.stringify(this.ToDoList))

        return this.ToDoList
    }
}
