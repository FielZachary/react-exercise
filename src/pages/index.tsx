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
import { Breadcrumb, Layout, Menu, message, Modal, Spin } from "antd"
import { useRouter } from "next/router"

import { useAppDispatch, useAppSelector } from "../app/redux/hooks"
import { logOut, setLoading } from "../app/redux/user/user.slice"

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout

const { confirm } = Modal
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

export default function Home() {
    const user = useAppSelector((state) => state.users.User)
    const loading = useAppSelector((state) => state.users.loading)
    // const items = useAppSelector((state) => state.items.items)
    // const dummies = useAppSelector((state) => state.dummy.dummies)
    const router = useRouter()
    const dispatch = useAppDispatch()

    // const handleClick = () => {
    //     dispatch(fetchDummyList())
    // }
    //
    // useEffect(() => {
    //     router.push("/login")
    // })
    //
    const redirectPage = async (url) => {
        await router.push(url)
        dispatch(setLoading(false))
    }

    const onDashboardButtonClick = () => {
        if (user.isSignedIn === false || null) {
            message.error("You must be logged in to go into your dashboard")
        } else if (user.isSignedIn === true) {
            dispatch(setLoading(true))
            redirectPage("/dashboard")
        }
    }

    const onAuthButtonClick = () => {
        if (user.isSignedIn === false || null) {
            dispatch(setLoading(true))
            redirectPage("/login")
        } else if (user.isSignedIn === true) {
            confirm({
                title: "Are you sure you want to log out?",
                icon: <ExclamationCircleOutlined />,
                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                onOk() {
                    dispatch(logOut())
                },
            })
        }
    }

    return (
        <Spin indicator={antIcon} spinning={loading}>
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item onClick={onDashboardButtonClick} key="mail" icon={<DashboardOutlined />}>
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
                            onClick={onAuthButtonClick}
                            icon={user.isSignedIn === false || null ? <LoginOutlined /> : <LogoutOutlined />}
                        >
                            {user.isSignedIn === false || null ? "Login" : "Logout"}
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

// <ul>
//     {dummies.map((dummy) => (
//         <li key={dummy.id}>{dummy.firstName}</li>
//     ))}
// </ul>

// <ul>
//     {dummies.map((user) => (
//         <li>{user.userEmail}</li>
//     ))}
// </ul>

// <Spin indicator={antIcon} spinning={loading}>
//     <Layout>
//         <Header className="header">
//             <div className="logo" />
//             <Menu theme={"dark"} mode="horizontal">
//                 <Menu.Item onClick={onDashboardButtonClick} key="mail" icon={<DashboardOutlined />}>
//                     Dashboard
//                 </Menu.Item>
//                 <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
//                     Navigation Two
//                 </Menu.Item>
//                 <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
//                     <Menu.ItemGroup title="Item 1">
//                         <Menu.Item key="setting:1">Option 1</Menu.Item>
//                         <Menu.Item key="setting:2">Option 2</Menu.Item>
//                     </Menu.ItemGroup>
//                     <Menu.ItemGroup title="Item 2">
//                         <Menu.Item key="setting:3">Option 3</Menu.Item>
//                         <Menu.Item key="setting:4">Option 4</Menu.Item>
//                     </Menu.ItemGroup>
//                 </SubMenu>
//                 <Menu.Item key="alipay">
//                     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
//                         Navigation Four - Link
//                     </a>
//                 </Menu.Item>
//                 <Menu.Item
//                     onClick={onAuthButtonClick}
//                     icon={user.isSignedIn === false && null ? <LoginOutlined /> : <LogoutOutlined />}
//                 >
//                     {user.isSignedIn === false && null ? "Login" : "Logout"}
//                 </Menu.Item>
//             </Menu>
//         </Header>
//         <Layout>
//             <Sider width={150} className="site-layout-background">
//                 <Menu
//                     mode="inline"
//                     defaultSelectedKeys={["1"]}
//                     defaultOpenKeys={["sub1"]}
//                     style={{ height: "100%", borderRight: 0 }}
//                 >
//                     <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
//                         <Menu.Item key="1">option1</Menu.Item>
//                         <Menu.Item key="2">option2</Menu.Item>
//                         <Menu.Item key="3">option3</Menu.Item>
//                         <Menu.Item key="4">option4</Menu.Item>
//                     </SubMenu>
//                     <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
//                         <Menu.Item key="5">option5</Menu.Item>
//                         <Menu.Item key="6">option6</Menu.Item>
//                         <Menu.Item key="7">option7</Menu.Item>
//                         <Menu.Item key="8">option8</Menu.Item>
//                     </SubMenu>
//                     <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
//                         <Menu.Item key="9">option9</Menu.Item>
//                         <Menu.Item key="10">option10</Menu.Item>
//                         <Menu.Item key="11">option11</Menu.Item>
//                         <Menu.Item key="12">option12</Menu.Item>
//                     </SubMenu>
//                 </Menu>
//             </Sider>
//             <Layout style={{ padding: "0 24px 24px" }}>
//                 <Breadcrumb style={{ margin: "16px 0" }}>
//                     <Breadcrumb.Item>Home</Breadcrumb.Item>
//                 </Breadcrumb>
//                 <Content
//                     className="site-layout-background"
//                     style={{
//                         padding: 24,
//                         margin: 0,
//                         minHeight: 500,
//                     }}
//                 >
//                     Put things here
//                 </Content>
//             </Layout>
//         </Layout>
//     </Layout>
//     ,
// </Spin>
