import { ToDo } from "../../domain/entities/ToDo";
import { ToDoRepository } from "../../domain/repositories/ToDoRepository";

const ToDoList = [
    'Exercise',
    'Work'
]

export class ToDoRepoArrayImplement implements ToDoRepository {
    GetToDo(): ToDo {
        return {list: ToDoList}
    }
}