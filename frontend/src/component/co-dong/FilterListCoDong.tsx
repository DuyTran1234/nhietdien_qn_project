import { FilterOutlined } from "@ant-design/icons";
import { Button, Form, Popover, Select, Space, type FormInstance } from "antd";
import { useState } from "react";

export default function FilterListCoDong(
    { form, setPagination }
        : {
            form: FormInstance<any>, setPagination: React.Dispatch<React.SetStateAction<{
                page: number;
                limit: number;
                filterCntc: undefined;
                filterType: undefined;
                searchCoDong: string;
                filterCoDongLon: undefined;
            }>>
        }
) {
    const [visible, setVisible] = useState(false);
    const handleReset = () => {
        form.resetFields();
        const values = form.getFieldsValue();
        setPagination((prev) => {
            return {
                ...prev, ...values
            };
        });
    }
    const handleApply = () => {
        const values = form.getFieldsValue();
        setPagination((prev) => {
            return {
                ...prev, ...values
            };
        });
    }
    const filterContent = (
        <Form form={form} layout="vertical" style={{ width: 250 }}>
            <Form.Item name="filterType" label="Loại cổ đông">
                <Select placeholder="Chọn loại" allowClear options={[
                    { value: 1, label: 'Trong nước' },
                    { value: 2, label: 'Ngoài nước' },
                ]} />
            </Form.Item>

            <Form.Item name="filterCntc" label="Cá nhân/Tổ chức">
                <Select placeholder="Chọn loại" allowClear options={[
                    { value: 1, label: 'Cá nhân' },
                    { value: 2, label: 'Tổ chức' },
                ]} />
            </Form.Item>

            <Form.Item name="filterCoDongLon" label="Cổ đông lớn/nhỏ">
                <Select placeholder="Chọn loại" allowClear options={[
                    { value: true, label: 'Cổ đông lớn' },
                    { value: false, label: 'Cổ đông nhỏ' },
                ]} />
            </Form.Item>

            <div style={{ textAlign: 'right', borderTop: '1px solid #f0f0f0', paddingTop: 10 }}>
                <Space>
                    <Button size="small" onClick={handleReset}>Reset</Button>
                    <Button size="small" type="primary" onClick={handleApply}>Áp dụng</Button>
                </Space>
            </div>
        </Form>
    );

    return (
        <Popover
            content={filterContent}
            title="Bộ lọc nâng cao"
            trigger="click"
            open={visible}
            onOpenChange={setVisible}
            placement="bottomRight"
        >
            <Button icon={<FilterOutlined />}>
                Bộ lọc
            </Button>
        </Popover>
    );
}