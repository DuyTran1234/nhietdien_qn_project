import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, Input, InputNumber, message, Select } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { vietNamFormatter } from "../../common/numberFormat";
import type { CoDongModel } from "../../model/co-dong.model";
import { PATHS } from "../../paths/paths";
import CreateCoDongService from "../../service/co-dong/create-co-dong.service";
import Loading from "../loading/Loading";

export default function CreateCoDong() {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        const createDto = {
            ...values,
            ngayCap: dayjs(values?.ngayCap).format("DD/MM/YYYY"),
        } as CoDongModel;
        try {
            setIsLoading(true);
            await CreateCoDongService(createDto);
            message.success('Tạo cổ đông thành công');
            navigate(`${PATHS.LIST_CO_DONG}`);
        } catch (error) {
            message.error("Lỗi tạo cổ đông, vui lòng kiểm tra lại dữ liệu");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Loading isLoading={isLoading} />
            <Card
                title="Nhập thông tin cổ đông" style={{ maxWidth: 600, margin: '20px auto' }}
                extra={
                    <Link to={`${PATHS.LIST_CO_DONG}`}>
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
                    {/* Họ tên */}
                    <Form.Item
                        label="Họ tên"
                        name="hoTen"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Số DKSH"
                        name="soDKSH"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Ngày cấp"
                        name="ngayCap"
                        rules={[{ required: true }]}
                    >
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"
                            disabledDate={(current) => {
                                return current && current > dayjs().endOf('year');
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ"
                        name="diaChi"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Điện thoại"
                        name="dienThoai"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Quốc tịch"
                        name="quocTich"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Tổng SLCKNG"
                        name="slckngCong"
                        rules={[{ required: true }]}
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
                        label="Trong nước/Ngoài nước"
                        name="type"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="Chọn loại" allowClear options={[
                            { value: 1, label: 'Trong nước' },
                            { value: 2, label: 'Ngoài nước' },
                        ]} />
                    </Form.Item>

                    <Form.Item
                        label="Cá nhân/Tổ chức"
                        name="cntc"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="Chọn loại" allowClear options={[
                            { value: 1, label: 'Cá nhân' },
                            { value: 2, label: 'Tổ chức' },
                        ]} />
                    </Form.Item>

                    <Form.Item
                        label="TXNUM"
                        name="txnum"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Thêm cổ đông
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