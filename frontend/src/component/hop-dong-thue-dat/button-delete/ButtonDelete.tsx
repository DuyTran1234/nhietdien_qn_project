import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { useNavigate } from "react-router-dom";
import { HOP_DONG_THUE_DAT_PATHS } from "../../../paths/paths";

export default function ButtonDelete({ uuid }: { uuid: string }) {
    const navigate = useNavigate();
    return (
        <Popconfirm
            title="Xóa bản ghi"
            description="Bạn có chắc chắn muốn xóa hợp đồng này không? Hành động này sẽ xóa hết tất cả các hợp đồng đi kèm"
            onConfirm={() => {
                navigate(`${HOP_DONG_THUE_DAT_PATHS.DELETE_BY_UUID}/${uuid}`);
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