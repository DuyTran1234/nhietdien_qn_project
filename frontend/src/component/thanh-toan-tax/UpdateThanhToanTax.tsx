import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, Input, InputNumber, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { vietNamFormatter } from "../../common/numberFormat";
import type { ThanhToanTaxModel } from "../../model/thanh-toan-tax.model";
import { THANH_TOAN_TAX_PATHS } from "../../paths/paths";
import Loading from "../loading/Loading";
import getThanhToanTaxByIdService from "../../service/thanh-toan-tax/get-thanh-toan-tax-by-id.service";
import UpdateThanhToanTaxService from "../../service/thanh-toan-tax/update-thanh-toan-tax.service";

export default function UpdateThanhToanTax() {
    const [form] = Form.useForm();
    const { id, uuid } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(true);
            try {
                const data = await getThanhToanTaxByIdService(Number(id ?? - 1));
                form.setFieldsValue({
                    ...data,
                    ngayThanhToan: dayjs(data.ngayThanhToan),
                });
            } catch (error) {
                message.error('Lỗi tải dữ liệu');
                navigate(`${THANH_TOAN_TAX_PATHS.VIEW}/${uuid}`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchApi();
    }, []);

    const onFinish = async (values: any) => {
        const updateDto = {
            ...values,
            hopDongUUID: uuid,
            ngayThanhToan: values.ngayThanhToan?.format('YYYY-MM-DD'),
        } as ThanhToanTaxModel;
        try {
            setIsLoading(true);
            await UpdateThanhToanTaxService(updateDto);
            message.success('Cập nhật thanh toán thành công');
            navigate(`${THANH_TOAN_TAX_PATHS.VIEW}/${uuid}`);
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
                            Lưu thanh toán
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