import "antd/dist/antd.css" // or 'antd/dist/antd.less'

import { LoadingOutlined } from "@ant-design/icons"
import { Button, Card, Form, Input, Row, Spin } from "antd"
import { useRouter } from "next/router"

import { useAppDispatch, useAppSelector } from "../app/redux/hooks"
import { register, setLoading } from "../app/redux/user/user.slice"
import User from "../domain/entities/User"

const tailLayout = {
    wrapperCol: { offset: 8, span: 10 },
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

export default function Register() {
    const loading = useAppSelector((state) => state.users.loading)

    const dispatch = useAppDispatch()

    const router = useRouter()

    const [form] = Form.useForm()

    const onFinish = async (values: any) => {
        dispatch(setLoading(true))

        const newUser = new User(values.email, true)
        newUser.password = values.password
        await dispatch(register(newUser))

        await router.push("/dashboard")

        dispatch(setLoading(false))
    }

    const onFinishFailed = (errorInfo: any) => errorInfo

    const onFill = () => {
        form.setFieldsValue({
            note: "Hello world!",
            gender: "male",
        })
    }

    return (
        <Spin spinning={loading} indicator={antIcon}>
            <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
                <Card style={{ width: 350, height: 430 }}>
                    <h1 style={{ fontSize: 40, textAlign: "center" }}>Register</h1>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label={"Email"}
                            name="email"
                            rules={[{ required: true, message: "Please input your email!" }]}
                        >
                            <Input placeholder={"Use a valid email"} style={{ width: 300 }} />
                        </Form.Item>

                        <Form.Item
                            label={"Password"}
                            name="password"
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input.Password placeholder={"At least 5 characters"} style={{ width: 300 }} />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <div>
                        <Button type="link" htmlType="button" onClick={onFill}>
                            Already have an account?
                        </Button>
                    </div>
                </Card>
            </Row>
        </Spin>
    )
}
