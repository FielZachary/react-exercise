import { ToDo } from "../../domain/entities/ToDo";
import { ToDoRepository } from "../../domain/repositories/ToDoRepository";

const ToDoList = [
    'Exercise',
    'Work'
]

export class ToDoRepoArrayImplement implements ToDoRepository {
    GetToDo(): Array<ToDo> {
        return [
            {name: 'Exercise'},
            {name: 'Work'}
        ]
    }
}