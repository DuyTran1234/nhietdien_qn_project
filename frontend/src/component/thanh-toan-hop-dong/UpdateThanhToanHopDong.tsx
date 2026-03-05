import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, Input, InputNumber, message, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { vietNamFormatter } from "../../common/numberFormat";
import type { ThanhToanHopDongModel } from "../../model/thanh-toan-hop-dong.model";
import getThanhToanHopDongByIdService from "../../service/thanh-toan-hop-dong/get-thanh-toan-hop-dong-by-id.service";
import updateThanhToanHopDongService from "../../service/thanh-toan-hop-dong/update-thanh-toan-hop-dong.service";
import Loading from "../loading/Loading";
import { THANH_TOAN_HOP_DONG_PATHS } from "../../paths/paths";

export default function UpdateThanhToanHopDong() {
    const [form] = Form.useForm();
    const { id, uuid } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [thanhToan, setThanhToan] = useState<ThanhToanHopDongModel>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true);
                const data = await getThanhToanHopDongByIdService(Number(id));
                setThanhToan(data);
                form.setFieldsValue({
                    ...data,
                    ngayThanhToan: dayjs(data.ngayThanhToan),
                });
            } catch (error) {
                message.error('Lỗi tải dữ liệu');
                navigate(`${THANH_TOAN_HOP_DONG_PATHS.VIEW}/${uuid}`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchApi();
    }, []);

    const onFinish = async (values: any) => {
        const updateDto = {
            ...values,
            id: thanhToan?.id,
            ngayThanhToan: values.ngayThanhToan?.format('YYYY-MM-DD'),
        } as ThanhToanHopDongModel;
        try {
            setIsLoading(true);
            await updateThanhToanHopDongService(updateDto);
            message.success('Cập nhật thanh toán thành công');
            navigate(`${THANH_TOAN_HOP_DONG_PATHS.VIEW}/${uuid}`);
        } catch (error) {
            message.error("Lỗi cập nhật thanh toán, vui lòng kiểm tra lại dữ liệu");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Loading isLoading={isLoading} />
            <Card
                title="Cập nhật thông tin thanh toán" style={{ maxWidth: 600, margin: '20px auto' }}
                extra={
                    <Button
                        onClick={() => navigate(`${THANH_TOAN_HOP_DONG_PATHS.VIEW}/${uuid}`)}
                        style={{ backgroundColor: 'black', borderColor: 'white' }}
                        type="primary"
                        icon={<ArrowLeftOutlined />}
                    >
                        Quay lại
                    </Button>
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
                            Cập nhật
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