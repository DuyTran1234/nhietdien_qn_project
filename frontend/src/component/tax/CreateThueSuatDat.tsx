import { CloseOutlined, SaveOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, InputNumber, message, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import type { ThueSuatDatModel } from "../../model/thue-suat-dat.model";
import { PATHS } from "../../paths/paths";
import CreateThueSuatDatService from "../../service/thue-suat-dat/create-thue-suat-dat.service";
import { useState } from "react";
import Loading from "../loading/Loading";

export default function CreateThueSuatDat() {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (createDto: ThueSuatDatModel) => {
        try {
            setIsLoading(true);
            await CreateThueSuatDatService(createDto);
            setIsLoading(false);
            message.success('Đã lưu thuế suất mới thành công!');
            navigate(PATHS.LIST_TAX);
        } catch (error) {
            message.error('Không thể tạo thuế suất mới!')
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
                        <span>Thêm mới Thuế suất</span>
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