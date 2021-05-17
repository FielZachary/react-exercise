import "antd/dist/antd.css" // or 'antd/dist/antd.less'

import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input } from "antd"
import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../app/redux/hooks"
import { addToDo, deleteToDo, editToDo, fetchToDoList, markCompleted } from "../app/redux/todo/todo.slice"
import ToDo from "../domain/entities/ToDo"

export default function Home() {
    const [currentEdit, setCurrentEdit] = useState("")
    const [valueEdit, setValueEdit] = useState("")
    const [valueAdd, setValueAdd] = useState("")

    const toDo = useAppSelector((state) => state.todo.toDo)
    const loading = useAppSelector((state) => state.items.loading)
    const dispatch = useAppDispatch()
    const handleClick = () => {
        dispatch(fetchToDoList())
    }
    const handleSubmit = () => {
        try {
            console.log("in handle submit")
            const newToDo = new ToDo(valueAdd)
            newToDo.isCompleted = false
            dispatch(addToDo(newToDo))
        } catch (e) {
            console.log("caught")
        }
    }
    const handleChange = (e) => {
        setValueAdd(e.target.value)
        // console.log(valueAdd)
    }
    const handleDelete = (todo) => {
        dispatch(deleteToDo(todo))
    }
    const handleEditChange = (e) => {
        setValueEdit(e.target.value)
        // console.log(valueEdit)
    }
    const handleEditSubmit = (todo) => {
        const newToDo = { ...todo, title: valueEdit }
        dispatch(editToDo(newToDo))
        setCurrentEdit("")
    }
    const handleEditForm = (todo) => (
        <div>
            <Form onFinish={() => handleEditSubmit(todo)}>
                <p>Edit a to do</p>
                <Input value={valueEdit} type="text" onChange={handleEditChange} />
            </Form>
            <br />
        </div>
    )
    const handleComplete = (todo) => {
        dispatch(markCompleted(todo))
    }
    const handleDisplay = (todo) => {
        if (todo.id !== currentEdit) {
            return null
        }

        return handleEditForm(todo)
    }

    return (
        <div>
            <Button onClick={handleClick} disabled={loading}>
                Refresh
            </Button>

            <Card title="Your Todos" style={{ width: 450 }}>
                {toDo.map((todo) => (
                    <li key={todo.id}>
                        <Card
                            size="small"
                            type="inner"
                            title={todo.isCompleted === false ? todo.title : <s>{todo.title}</s>}
                            style={{ width: 410 }}
                        >
                            {handleDisplay(todo)}
                            <Button style={{ margin: 5 }} onClick={() => handleDelete(todo)} icon={<DeleteOutlined />}>
                                Delete
                            </Button>
                            <Button
                                style={{ margin: 5 }}
                                icon={<EditOutlined />}
                                onClick={() => {
                                    if (todo.id === currentEdit) {
                                        setCurrentEdit("")
                                    } else {
                                        setCurrentEdit(todo.id)
                                    }
                                    setValueEdit(todo.title)
                                    handleEditForm(todo)
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                style={{ margin: 5 }}
                                onClick={() => handleComplete(todo)}
                                icon={todo.isCompleted === false ? <CheckOutlined /> : <CloseOutlined />}
                            >
                                {todo.isCompleted === false ? "Mark as complete" : "Unmark as complete"}
                            </Button>
                        </Card>
                        <br />
                    </li>
                ))}
            </Card>

            <br />

            <Card size="small" style={{ width: 300 }} title="Add a To Do">
                <Form autoComplete="off" onFinish={handleSubmit}>
                    <Form.Item label="Title" name="title">
                        <Input value={valueAdd} type="text" onChange={handleChange} />
                        {}
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
