import ToDo from "../../domain/entities/ToDo"
import { ToDoRepository } from "../../domain/repositories/ToDoRepository"
import ToDoDTO from "../../domain/DTOs/ToDoDTO";

import { db } from '../../pages/index'
import {fetchToDoList} from "../../app/redux/todo/todo.slice";
//
// console.log(db.collection("Todos"))
//
// const fetchCollection = async () => {
//     const response = db.collection('Todos')
//     const data = await response.get()
//     return data.docs.map((todo) => todo.data())
// }


export default  class ToDoRepoFirebaseImpl implements ToDoRepository {

    localToDoList = localStorage.getItem("toDoList")

    ToDoList = JSON.parse(this.localToDoList)

    fetchCollection = async () => {
        const response = db.collection('Todos')
        const data = await response.get()
        const ToDoList = await data.docs.map((todo) => todo.data())
        return ToDoList.map((todo: ToDoDTO) => ({id: todo.id, isCompleted: todo.isCompleted, title: todo.title}))
    }

    async GetToDo(): Promise<ToDo[]> {
        const ToDoList = await this.fetchCollection()

        return ToDoList
    }

    async AddToDo(todo: ToDo): Promise<ToDo[]> {
        let ToDoList = await this.fetchCollection()
        ToDoList = [...ToDoList, todo]
        const res = await db.collection('Todos').doc(todo.id).set({
            id: todo.id,
            title: todo.title,
            isCompleted: todo.isCompleted
        })

        console.log(ToDoList)
        return ToDoList
    }

    async DeleteToDo(todo: ToDo): Promise<ToDo[]> {
        let ToDoList = await this.fetchCollection()
        ToDoList = ToDoList.filter((filterTodo) => filterTodo.id !== todo.id)
        const res = await db.collection('Todos').doc(todo.id).delete();

        return ToDoList
    }

    async EditToDo(todo: ToDo): Promise<ToDo[]> {
        let ToDoList = await this.fetchCollection()
        const oldTodos = ToDoList.filter((existingTodo) => existingTodo.id !== todo.id)
        // console.log(todo)
        ToDoList = [...oldTodos, todo]
        const res = await db.collection('Todos').doc(todo.id).update({
            title: todo.title,
        })

        return ToDoList
    }

    async MarkCompleted(todo: ToDo): Promise<ToDo[]> {
        let ToDoList = await this.fetchCollection()
        const oldTodos = ToDoList.filter((existingTodo) => existingTodo.id !== todo.id)
        ToDoList = [...oldTodos, todo]
        // console.log(this.ToDoList)
        const res = await db.collection('Todos').doc(todo.id).update({
            isCompleted: todo.isCompleted,
        })

        return ToDoList
    }
}
