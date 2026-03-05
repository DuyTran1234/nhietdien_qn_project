import { Button, Card, DatePicker, Form, Input, InputNumber, message, Select } from "antd";
import dayjs from "dayjs";
import { vietNamFormatter } from "../../common/numberFormat";
import { Link, useNavigate, useParams } from "react-router-dom";
import { THANH_TOAN_HOP_DONG_PATHS } from "../../paths/paths";
import { ArrowLeftOutlined } from "@ant-design/icons";
import createThanhToanHopDongService from "../../service/thanh-toan-hop-dong/create-thanh-toan-hop-dong.service";
import type { ThanhToanHopDongModel } from "../../model/thanh-toan-hop-dong.model";
import Loading from "../loading/Loading";
import { useState } from "react";

export default function CreateThanhToanHopDong() {
    const [form] = Form.useForm();
    const { uuid } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const createDto = {
            ...values,
            hopDongUUID: uuid,
            ngayThanhToan: values.ngayThanhToan?.format('YYYY-MM-DD'),
        } as ThanhToanHopDongModel;
        try {
            setIsLoading(true);
            await createThanhToanHopDongService(createDto);
            message.success('Tạo thanh toán thành công');
            navigate(`${THANH_TOAN_HOP_DONG_PATHS.VIEW}/${uuid}`);
        } catch (error) {
            message.error("Lỗi tạo thanh toán, vui lòng kiểm tra lại dữ liệu");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Loading isLoading={isLoading} />
            <Card
                title="Nhập thông tin thanh toán" style={{ maxWidth: 600, margin: '20px auto' }}
                extra={
                    <Link to={`${THANH_TOAN_HOP_DONG_PATHS.VIEW}/${uuid}`}>
                        <Button
                            style={{ backgroundColor: 'black', borderColor: 'white' }}
                            type="primary"
                            icon={<ArrowLeftOutlined />}
                        >
                            Quay lại
                        </Button>
                    </Link>
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    {/* Ngày thanh toán */}
                    <Form.Item
                        label="Ngày thanh toán"
                        name="ngayThanhToan"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày thanh toán!' }]}
                    >
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"
                            disabledDate={(current) => {
                                return current && current > dayjs().endOf('year');
                            }}
                        />
                    </Form.Item>

                    {/* Kỳ thanh toán */}
                    <Form.Item
                        label="Kỳ"
                        name="ky"
                        rules={[{ required: true, message: 'Vui lòng chọn kỳ!' }]}
                    >
                        <Select placeholder="Chọn kỳ">
                            <Select.Option value={1}>Kỳ 1</Select.Option>
                            <Select.Option value={2}>Kỳ 2</Select.Option>
                            <Select.Option value={3}>Bổ sung</Select.Option>
                        </Select>
                    </Form.Item>

                    {/* Số tiền thanh toán */}
                    <Form.Item
                        label="Tiền thanh toán"
                        name="tienThanhToan"
                        rules={[{ required: true, message: 'Vui lòng nhập số tiền!', type: "number" }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            formatter={(value) => {
                                return `${vietNamFormatter(Number(value))}`;
                            }}
                            parser={value => value?.replace(/\$\s?|(,*)/g, '') ?? ''}
                        />
                    </Form.Item>

                    {/* Loại nộp */}
                    <Form.Item
                        label="Loại nộp"
                        name="loaiNop"
                        rules={[{ required: true, message: 'Vui lòng chọn loại nộp!' }]}
                    >
                        <Select placeholder="Chọn loại nộp">
                            <Select.Option value={0}>Trước hạn</Select.Option>
                            <Select.Option value={1}>Đúng hạn</Select.Option>
                            <Select.Option value={2}>Bổ sung</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Ghi chú"
                        name="note"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Xác nhận thanh toán
                        </Button>
                        <Button style={{ marginTop: 20 }} onClick={() => form.resetFields()}>
                            Làm mới
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}