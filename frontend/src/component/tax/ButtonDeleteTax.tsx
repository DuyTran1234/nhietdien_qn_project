import { Button, Popconfirm } from "antd";
import { THUE_SUAT_DAT_PATHS } from "../../paths/paths";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

export default function ButtonDeleteTax({ id }: { id: number }) {
    const navigate = useNavigate();
    return (
        <Popconfirm
            title="Xóa bản ghi"
            description="Bạn có chắc chắn muốn xóa thuế suất này không?"
            onConfirm={() => {
                navigate(`${THUE_SUAT_DAT_PATHS.DELETE}/${id}`);
            }} // Gọi hàm xóa khi bấm "Yes"
            okText="Có"
            cancelText="Không"
            okButtonProps={{ danger: true }} // Nút xác nhận màu đỏ
        >
            <Button type="link">
                <DeleteOutlined style={{ fontSize: 24, color: 'red' }} />
            </Button>
        </Popconfirm>

    );
}