import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Form, Input, InputNumber, message, Select, Space } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { vietNamFormatter } from "../../common/numberFormat";
import type { CoDongModel } from "../../model/co-dong.model";
import { PATHS } from "../../paths/paths";
import GetCoDongByIdService from "../../service/co-dong/get-co-dong-by-id.service";
import UpdateCoDongService from "../../service/co-dong/update-co-dong.service";
import Loading from "../loading/Loading";

export default function UpdateCoDong() {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true);
                const data = await GetCoDongByIdService(Number(id ?? -1));
                form.setFieldsValue({
                    ...data,
                    // ngayCap: dayjs(data.ngayCap).format("YYYY-MM-DD"),
                });
            } catch (error) {
                message.error('Không thể tải dữ liệu, vui lòng thử lại')
            } finally {
                setIsLoading(false);
            }
        };
        fetchApi();
    }, []);

    const onFinish = async (values: any) => {
        const updateDto = {
            ...values,
            id: Number(id),
        } as CoDongModel;
        try {
            setIsLoading(true);
            await UpdateCoDongService(updateDto);
            message.success('Cập nhật cổ đông thành công');
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

                    <Form.List name="ngayCap">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={name} // name ở đây sẽ là index (0, 1, 2...)
                                            rules={[{ required: true, message: 'Chọn ngày!' }]}
                                            // Quan trọng: Biến đổi giá trị từ DatePicker thành String ngay khi chọn
                                            getValueFromEvent={(date) => date ? date.format('DD/MM/YYYY') : null}
                                            // Quan trọng: Khi hiển thị lại (nếu có dữ liệu cũ), ép string về dayjs
                                            getValueProps={(value) => ({
                                                value: value ? dayjs(value, 'DD/MM/YYYY') : undefined,
                                            })}
                                        >
                                            <DatePicker
                                                placeholder="Chọn ngày cấp"
                                                format="DD/MM/YYYY"
                                                disabledDate={(current) => current && current > dayjs().endOf('year')}
                                            />
                                        </Form.Item>

                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Thêm ngày cấp
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
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
                            Cập nhật cổ đông
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