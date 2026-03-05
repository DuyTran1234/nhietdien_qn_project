import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, Input, InputNumber, message } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { vietNamFormatter } from "../../common/numberFormat";
import type { ThanhToanTaxModel } from "../../model/thanh-toan-tax.model";
import { THANH_TOAN_TAX_PATHS } from "../../paths/paths";
import createThanhToanTaxService from "../../service/thanh-toan-tax/create-thanh-toan-tax.service";
import Loading from "../loading/Loading";

export default function CreateThanhToanTax() {
    const [form] = Form.useForm();
    const { uuid } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const createDto = {
            ...values,
            hopDongUUID: uuid,
            ngayThanhToan: values.ngayThanhToan?.format('YYYY-MM-DD'),
        } as ThanhToanTaxModel;
        try {
            setIsLoading(true);
            await createThanhToanTaxService(createDto);
            message.success('Tạo thanh toán thành công');
            navigate(`${THANH_TOAN_TAX_PATHS.VIEW}/${uuid}`);
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
                    <Link to={`${THANH_TOAN_TAX_PATHS.VIEW}/${uuid}`}>
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