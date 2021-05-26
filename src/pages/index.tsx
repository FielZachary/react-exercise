import "antd/dist/antd.css" // or 'antd/dist/antd.less'
import {
    AppstoreOutlined,
    DashboardOutlined,
    ExclamationCircleOutlined,
    LaptopOutlined,
    LoadingOutlined,
    LoginOutlined,
    LogoutOutlined,
    NotificationOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons"

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { useRouter } from "next/router";


import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Spin, Layout, Menu, Breadcrumb, Form, Input, message } from "antd"
import {useEffect, useState} from "react"

import { useAppDispatch, useAppSelector } from "../app/redux/hooks"
import { addToDo, deleteToDo, editToDo, fetchToDoList, markCompleted, clearError } from "../app/redux/todo/todo.slice"
import ToDo from "../domain/entities/ToDo"

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

const firebaseConfig = {
    apiKey: "AIzaSyDl9IiCvWKxaGl1fKvyWRJu3ShTbYbT_Fo",
    authDomain: "todo-5de9a.firebaseapp.com",
    projectId: "todo-5de9a",
    storageBucket: "todo-5de9a.appspot.com",
    messagingSenderId: "885055285273",
    appId: "1:885055285273:web:8069af57747c4789fd2288"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
}

const db=firebase.firestore();

export { db, firebase }

export default function Home() {

    const router = useRouter()

    // useEffect(() => {
    //
    //     router.push('/landing')
    // })

    const [currentEdit, setCurrentEdit] = useState("")
    const [valueEdit, setValueEdit] = useState("")
    const [valueAdd, setValueAdd] = useState("")

    const toDo = useAppSelector((state) => state.todo.toDo)
    const error = useAppSelector((state) => state.todo.error)
    const loading = useAppSelector((state) => state.items.loading)
    const dispatch = useAppDispatch()
    const handleClick = () => {
        dispatch(fetchToDoList())
    }
    const handleSubmit = async () => {

        console.log("in handle submit")
        const newToDo = new ToDo(valueAdd)
        newToDo.isCompleted = false
        await dispatch(addToDo(newToDo))

    }
    // useEffect(() => {
    //     if ( error !== "") {
    //         console.log('in error1')
    //         message.error(error)
    //         dispatch(clearError())
    //     } else {
    //         console.log('in error2')
    //         return null
    //     }
    // })
    const handleChange = (e) => {
        setValueAdd(e.target.value)
        // console.log(valueAdd)
    }
    const handleDelete = (todo) => {
        dispatch(deleteToDo(todo))
        message.success('The ' + todo.title + ' todo has been deleted')
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
        <Spin spinning={loading}>
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu theme={"dark"} mode="horizontal">
                        <Menu.Item key="mail" onClick={() => console.log('clicked dashboard')} icon={<DashboardOutlined />}>
                            Dashboard
                        </Menu.Item>
                        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
                            Navigation Two
                        </Menu.Item>
                        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
                            <Menu.ItemGroup title="Item 1">
                                <Menu.Item key="setting:1">Option 1</Menu.Item>
                                <Menu.Item key="setting:2">Option 2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="Item 2">
                                <Menu.Item key="setting:3">Option 3</Menu.Item>
                                <Menu.Item key="setting:4">Option 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <Menu.Item key="alipay">
                            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                Navigation Four - Link
                            </a>
                        </Menu.Item>
                        <Menu.Item
                            onClick={() => console.log('clicked login')}
                            icon={<LoginOutlined />}
                        >
                            Login
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={150} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                            defaultOpenKeys={["sub1"]}
                            style={{ height: "100%", borderRight: 0 }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: "0 24px 24px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 500,
                            }}
                        >
                            Put things here
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
            ,
        </Spin>
    )
}


// <div>
//     <Button type={"primary"} onClick={handleClick} disabled={loading}>
//         Refresh
//     </Button>
//
//     <Card title="Your Todos" style={{ width: 450 }}>
//         {toDo.map((todo) => (
//             <li key={todo.id}>
//                 <Card
//                     size="small"
//                     type="inner"
//                     title={todo.isCompleted === false ? todo.title : <s>{todo.title}</s>}
//                     style={{ width: 410 }}
//                 >
//                     {handleDisplay(todo)}
//                     <Button style={{ margin: 5 }} onClick={() => handleDelete(todo)} icon={<DeleteOutlined />}>
//                         Delete
//                     </Button>
//                     <Button
//                         style={{ margin: 5 }}
//                         icon={<EditOutlined />}
//                         onClick={() => {
//                             if (todo.id === currentEdit) {
//                                 setCurrentEdit("")
//                             } else {
//                                 setCurrentEdit(todo.id)
//                             }
//                             setValueEdit(todo.title)
//                             handleEditForm(todo)
//                         }}
//                     >
//                         Edit
//                     </Button>
//                     <Button
//                         style={{ margin: 5 }}
//                         onClick={() => handleComplete(todo)}
//                         icon={todo.isCompleted === false ? <CheckOutlined /> : <CloseOutlined />}
//                     >
//                         {todo.isCompleted === false ? "Mark as complete" : "Unmark as complete"}
//                     </Button>
//                 </Card>
//                 <br />
//             </li>
//         ))}
//     </Card>
//
//     <br />
//
//     <Card size="small" style={{ width: 300 }} title="Add a To Do">
//         <Form autoComplete="off" onFinish={() => handleSubmit}>
//             <Form.Item label="Title" name="title">
//                 <Input value={valueAdd} type="text" onChange={handleChange} />
//             </Form.Item>
//             <Button type={"primary"} onClick={handleSubmit}>Submit</Button>
//         </Form>
//     </Card>
// </div>
