import "antd/dist/antd.css" // or 'antd/dist/antd.less'

import { ExclamationCircleOutlined } from "@ant-design/icons"
import { Button, Modal } from "antd"

import { useAppDispatch } from "../app/redux/hooks"
import { logOut } from "../app/redux/user/user.slice"

const { confirm } = Modal

export default function Logout() {
    // const [isModalVisible, setIsModalVisible] = useState(false);

    // const showModal = () => {
    //     setIsModalVisible(true);
    // };

    const dispatch = useAppDispatch()

    function showDeleteConfirm() {
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

    return (
        <Button onClick={showDeleteConfirm} type="dashed">
            Log Out ni!!!
        </Button>
    )
}
