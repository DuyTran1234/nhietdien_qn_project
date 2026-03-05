import { Descriptions, Space, Tag } from "antd";
import type { HopDongThueDatModel } from "../../model/hop-dong-thue-dat.model";
import Text from "antd/es/typography/Text";
import dayjs from "dayjs";
import { EnvironmentOutlined } from "@ant-design/icons";
import { vietNamFormatter } from "../../common/numberFormat";

export const renderContractDetails = (contract?: HopDongThueDatModel, isPrimary = false) => (
    <Descriptions
        bordered
        size="middle"
        column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}
        className={isPrimary ? "" : "bg-gray-50"}
    >
        <Descriptions.Item label="Số hợp đồng">
            <Text strong color="blue">{contract?.soHopDong}</Text>
        </Descriptions.Item>

        <Descriptions.Item label="Quyết định thuê">
            {contract?.quyetDinhThueDatSo} ({dayjs(contract?.quyetDinhThueDatDate).format('DD/MM/YYYY')})
        </Descriptions.Item>

        <Descriptions.Item label="Mục đích thuê" style={{ maxWidth: 300 }}>
            {contract?.mucDichThue}
        </Descriptions.Item>

        <Descriptions.Item label="Ngày hợp đồng">
            {dayjs(contract?.hopDongDate).format('DD/MM/YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Diện tích">
            {contract?.dienTich?.toLocaleString()} m²
        </Descriptions.Item>
        <Descriptions.Item label="Thời hạn thuê">
            {dayjs(contract?.batDauThue).format('DD/MM/YYYY')} - {dayjs(contract?.endDate).format('DD/MM/YYYY')}
            <Tag color="processing" className="ml-2">{contract?.soNamThue} năm</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Khu vực/Vị trí">
            <Space direction="vertical" size={0}>
                <Text><EnvironmentOutlined /> {contract?.khuVucThue}</Text>
                <Text type="secondary">{contract?.viTriThue}</Text>
            </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Đơn giá thuê">
            <Text type="danger" strong>{contract?.donGiaThue?.toLocaleString()} VNĐ</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Áp dụng đơn giá ngày">
            <Text >{dayjs(contract?.apDungDonGiaDate).format('DD/MM/YYYY')}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Thuế suất">
            {contract?.thueSuat?.tenThueSuat} ({contract?.thueSuat?.tax ?? 0}%)
        </Descriptions.Item>

        <Descriptions.Item label="Giá phi nông nghiệp">
            {`${vietNamFormatter(Number(contract?.giaPnn))}đ`}
        </Descriptions.Item>

        <Descriptions.Item label="Thời gian ổn định đơn giá">
            {`${dayjs(contract?.onDinhDonGiaDate).format('DD/MM/YYYY')} - ${contract?.soNamOnDinh} năm`}
        </Descriptions.Item>

        <Descriptions.Item label="Ghi chú">
            {contract?.ghiChu || "---"}
        </Descriptions.Item>
    </Descriptions>
);
