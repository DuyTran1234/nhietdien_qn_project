import { Button, Card, Form, Input, InputNumber, message, Space } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { ThueSuatDatModel } from "../../model/thue-suat-dat.model";
import Loading from "../loading/Loading";
import { CloseOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { PATHS } from "../../paths/paths";
import getThueSuatDatService from "../../service/thue-suat-dat/get-thue-suat-dat.service";
import updateThueSuatDatService from "../../service/thue-suat-dat/update-thue-suat-dat.service";

export default function UpdateThueSuatDat() {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true);
                const res = await getThueSuatDatService(Number(id));
                form.setFieldsValue(res);
                setIsLoading(false);
            } catch (error) {
                navigate(PATHS.LIST_TAX);
                message.error('Không thể tải được dữ liệu cần cập nhật');
            }
        };
        fetchApi();
    }, [])

    const onFinish = async (updateDto: ThueSuatDatModel) => {
        try {
            updateDto.id = Number(id);
            setIsLoading(true);
            await updateThueSuatDatService(updateDto);
            setIsLoading(false);
            message.success('Cập nhật thuế suất thành công!');
            navigate(PATHS.LIST_TAX);
        } catch (error) {
            message.error('Không thể cập nhật thuế suất')
        }
    };

    return (
        <div style={{ padding: '40px' }}>
            <Loading isLoading={isLoading} />
            {/* 2. Khung nội dung chính */}
            <Card
                title={
                    <Space>
                        <Link to={`${PATHS.LIST_TAX}`}>
                            <Button
                                type="text"
                                icon={<CloseOutlined style={{ color: 'red' }} />}
                            />
                        </Link>
                        <span>Cập nhật Thuế suất</span>
                    </Space>
                }
                style={{ maxWidth: 800, margin: '0 auto' }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="tenThueSuat"
                        label="Tên thuế suất"
                        rules={[{ required: true, message: 'Vui lòng không để trống tên thuế suất!' }]}
                    >
                        <Input placeholder="Nhập tên loại thuế (vd: Thuế đất 2026...)" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="tax"
                        label="Mức thuế (%)"
                        rules={[{ required: true, message: 'Vui lòng nhập mức thuế!' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={0}
                            max={100}
                            step={0.01}
                            placeholder="0.03"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button icon={<UndoOutlined />} onClick={() => form.resetFields()}>
                                Reset
                            </Button>
                            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                                Lưu
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}