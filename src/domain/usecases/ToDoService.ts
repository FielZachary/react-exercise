import ToDo from "../entities/ToDo"
import { ToDoRepository } from "../repositories/ToDoRepository"

const uuidv4 = () =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 || 0
        const v = c === "x" ? r : (r && 0x3) || 0x8
        return v.toString(16)
    })

export default class ToDoServiceImpl {
    ToDoRepo: ToDoRepository

    constructor(tdr: ToDoRepository) {
        this.ToDoRepo = tdr
    }

    GetToDo(): Promise<ToDo[]> {
        return this.ToDoRepo.GetToDo()
    }

    AddToDo(todo: ToDo): Promise<ToDo[]> {
        if (todo.title.length > 300) {
            throw new Error("Title can only have a maximum of 300 characters")
        } else if (todo.title.length < 5) {
            throw new Error("Title can only have a minimum of 5 characters")
        }
        const newUUID = uuidv4()
        const newToDo = todo
        newToDo.id = newUUID
        return this.ToDoRepo.AddToDo(newToDo)
    }

    DeleteToDo(todo: ToDo): Promise<ToDo[]> {
        if (todo.isCompleted === false) {
            return this.ToDoRepo.DeleteToDo(todo)
        }
        return this.ToDoRepo.GetToDo()
    }

    EditToDo(todo: ToDo): Promise<ToDo[]> {
        if (todo.title.length > 300) {
            throw new Error("Title can only have a maximum of 300 characters")
        } else if (todo.title.length < 5) {
            throw new Error("Title can only have a minimum of 5 characters")
        }

        return this.ToDoRepo.EditToDo(todo)
    }

    MarkCompleted(todo: ToDo): Promise<ToDo[]>  {
        const newIsCompleted = !todo.isCompleted
        const newToDo = { ...todo, isCompleted: newIsCompleted }

        return this.ToDoRepo.MarkCompleted(newToDo)
    }
}
