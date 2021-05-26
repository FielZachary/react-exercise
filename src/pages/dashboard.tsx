import "antd/dist/antd.css"

import { Breadcrumb, Button, Layout, Result } from "antd"
import { useRouter } from "next/router"

import { useAppSelector } from "../app/redux/hooks"

const { Header, Content } = Layout

export default function Dashboard() {
    const router = useRouter()
    const user = useAppSelector((state) => state.users.User)

    // useEffect(() => {
    //     if (user.isSignedIn === false) {
    //         router.push("/landing")
    //     }
    // })

    if (user.isSignedIn === true) {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                </Header>
                <Content style={{ padding: "0 50px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">dashing a board</div>
                </Content>
            </Layout>
        )
    }

    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
                <Button onClick={() => router.push("/")} type="primary">
                    Back Home
                </Button>
            }
        />
    )
}
