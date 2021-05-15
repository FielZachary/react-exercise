import Head from "next/head"
import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../app/redux/hooks"
import { fetchList } from "../app/redux/item/item.slice"
import { fetchProductList } from "../app/redux/product/product.slice"
import { addToDo, deleteToDo, editToDo, fetchToDoList, markCompleted } from "../app/redux/todo/todo.slice"
import { fetchUserList } from "../app/redux/user/user.slice"
import { ToDo } from "../domain/entities/ToDo"
import styles from "../styles/Home.module.css"

export default function Home() {
    const [editing, setEditing] = useState(false)
    const [currentEdit, setCurrentEdit] = useState("")
    const [valueEdit, setValueEdit] = useState("")
    const [valueAdd, setValueAdd] = useState("")

    const products = useAppSelector((state) => state.products.products)
    const users = useAppSelector((state) => state.users.users)
    const items = useAppSelector((state) => state.items.items)
    const toDo = useAppSelector((state) => state.todo.toDo)
    const loading = useAppSelector((state) => state.items.loading)
    const dispatch = useAppDispatch()
    const handleClick = () => {
        dispatch(fetchToDoList())
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const newToDo = new ToDo(valueAdd)
        newToDo.isCompleted = false
        dispatch(addToDo(newToDo))
        setValueAdd("")
    }
    const handleChange = (e) => {
        setValueAdd(e.target.value)
        //console.log(valueAdd)
    }
    const handleDelete = (todo) => {
        dispatch(deleteToDo(todo))
    }
    const handleEditChange = (e) => {
        setValueEdit(e.target.value)
        //console.log(valueEdit)
    }
    const handleEditSubmit = (e, todo) => {
        e.preventDefault()
        const newToDo = { ...todo, title: valueEdit }
        dispatch(editToDo(newToDo))
        setCurrentEdit("")
    }
    const handleEditForm = (todo) => (
        <div>
            <form onSubmit={(e) => handleEditSubmit(e, todo)}>
                <p>Edit a to do</p>
                <input value={valueEdit} type="text" onChange={handleEditChange} />
            </form>
        </div>
    )
    const handleComplete = (todo) => {
        dispatch(markCompleted(todo))
    }
    const handleDisplay = (todo) => {
        if (todo.id !== currentEdit) {
            if (todo.isCompleted === false) {
                return todo.title
            }
            return <s>{todo.title}</s>
        }

        return handleEditForm(todo)
    }

    return (
        <div>
            <button onClick={handleClick} disabled={loading}>
                Refresh
            </button>
            <ul>
                {toDo.map((todo) => (
                    <li key={todo.id}>
                        {handleDisplay(todo)}
                        <button onClick={() => handleDelete(todo)}>Delete</button>
                        <button
                            onClick={() => {
                                todo.id === currentEdit ? setCurrentEdit("") : setCurrentEdit(todo.id)
                                setValueEdit(todo.title)
                            }}
                        >
                            Edit
                        </button>
                        <button onClick={() => handleComplete(todo)}>
                            {todo.isCompleted === false ? "Mark as complete" : "Unmark as complete"}
                        </button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <p>Add a to do:</p>
                <input value={valueAdd} type="text" onChange={handleChange} />
            </form>
        </div>
    )
}
