import { ToDo } from "../entities/ToDo"
import { ToDoRepository } from "../repositories/ToDoRepository"

export class ToDoServiceImpl {
    ToDoRepo: ToDoRepository

    uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            let r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8
            return v.toString(16)
        })
    }

    constructor(tdr: ToDoRepository) {
        this.ToDoRepo = tdr
    }

    GetToDo(): Array<ToDo> {
        return this.ToDoRepo.GetToDo()
    }

    AddToDo(todo: ToDo): Array<ToDo> {
        const newUUID = this.uuidv4()
        todo.id = newUUID
        return this.ToDoRepo.AddToDo(todo)
    }

    DeleteToDo(todo: ToDo): Array<ToDo> {
        if (todo.isCompleted === false) {
            return this.ToDoRepo.DeleteToDo(todo)
        }
        return this.ToDoRepo.GetToDo()
    }

    EditToDo(todo: ToDo): Array<ToDo> {
        return this.ToDoRepo.EditToDo(todo)
    }

    MarkCompleted(todo: ToDo): Array<ToDo> {
        const newIsCompleted = !todo.isCompleted
        const newToDo = { ...todo, isCompleted: newIsCompleted }

        return this.ToDoRepo.MarkCompleted(newToDo)
    }
}
