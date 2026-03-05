import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, message, Row, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { vietNamFormatter } from "../../common/numberFormat";
import type { HopDongThueDatModel } from "../../model/hop-dong-thue-dat.model";
import type { ThueSuatDatModel } from "../../model/thue-suat-dat.model";
import { HOP_DONG_THUE_DAT_PATHS } from "../../paths/paths";
import getHopDongThueDatService from "../../service/hop-dong-thue-dat/get-hop-dong-thue-dat.service";
import UpdateHopDongThueDatService from "../../service/hop-dong-thue-dat/update-hop-dong-thue-dat.service";
import listThueSuatDatService from "../../service/thue-suat-dat/list-thue-suat-dat.service";
import Loading from "../loading/Loading";

export default function UpdateHopDongThueDat() {
    const { uuid } = useParams();
    const [form] = Form.useForm();
    const [listThueSuat, setListThueSuat] = useState<ThueSuatDatModel[]>();
    const [newest, setNewest] = useState<HopDongThueDatModel>();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            try {
                setIsLoading(true);
                const rs = await listThueSuatDatService();
                const data = await getHopDongThueDatService(uuid, { apDungDonGiaDate: "desc" });
                if (data && data.length > 0) {
                    setNewest(data[0]);
                    form.setFieldsValue({
                        ...data[0],
                        thueSuatId: String(data[0].thueSuatId),
                        hopDongDate: dayjs(data[0].hopDongDate),
                        quyetDinhThueDatDate: dayjs(data[0].quyetDinhThueDatDate),
                        quyetDinhDonGiaDate: dayjs(data[0].quyetDinhDonGiaDate),
                        onDinhDonGiaDate: dayjs(data[0].onDinhDonGiaDate),
                        apDungDonGiaDate: dayjs(data[0].apDungDonGiaDate),
                        batDauThue: dayjs(data[0].batDauThue),
                    });
                }
                setIsLoading(false);
                setListThueSuat(rs.list);
            } catch (error) {
                setIsLoading(false);
                message.error('Không thể tải dữ liệu danh sách thuế suất đất!');
                navigate(`${HOP_DONG_THUE_DAT_PATHS.VIEW}/${uuid}`);
            }
        }
        fetchApi();
    }, []);

    const onFinish = async (values: any) => {
        // Chuyển đổi format date từ dayjs sang string trước khi gửi API
        const updateDto = {
            ...values,
            id: newest?.id,
            thueSuatId: Number(values?.thueSuatId),
            hopDongDate: values.hopDongDate?.format('YYYY-MM-DD') ?? undefined,
            batDauThue: values.batDauThue?.format('YYYY-MM-DD') ?? undefined,
            quyetDinhThueDatDate: values.quyetDinhThueDatDate?.format('YYYY-MM-DD') ?? undefined,
            quyetDinhDonGiaDate: values.quyetDinhDonGiaDate?.format('YYYY-MM-DD') ?? undefined,
            onDinhDonGiaDate: values.onDinhDonGiaDate?.format('YYYY-MM-DD') ?? undefined,
            apDungDonGiaDate: values.apDungDonGiaDate?.format('YYYY-MM-DD') ?? undefined,
        } as HopDongThueDatModel;
        const endDate = dayjs(updateDto.batDauThue).add(updateDto.soNamThue, 'year');
        if (dayjs(updateDto.apDungDonGiaDate).isAfter(endDate)) {
            message.error('Ngày áp dụng đơn giá không được lớn hơn ngày hết hạn thuê đất');
            return;
        }
        try {
            setIsLoading(true);
            await UpdateHopDongThueDatService(updateDto);
            setIsLoading(false);
            message.success(`Cập nhật hợp đồng thuê đất số ${newest?.soHopDong} thành công`);
            navigate(`${HOP_DONG_THUE_DAT_PATHS.VIEW}/${newest?.hopDongUUID}`);
        } catch (error) {
            setIsLoading(false);
            message.error('Tạo hợp đồng thuê đất nối mới thất bại, vui lòng kiểm tra lại thông tin nhập');
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <Loading isLoading={isLoading} />
            <Card>
                <Space>
                    <Link to={`${HOP_DONG_THUE_DAT_PATHS.VIEW}/${newest?.hopDongUUID}`}>
                        <Button
                            type="text"
                            icon={<CloseOutlined style={{ color: 'red', fontSize: 30 }} />}
                        />
                    </Link>
                </Space>
                <Title style={{ paddingTop: 25 }} level={3}>
                    {`Cập nhật Hợp Đồng Thuê Đất số ${newest?.soHopDong}`}
                </Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ isActive: true, isNewest: true }}
                >
                    {/* Thông tin chung */}
                    <Title level={5}>1. Thông tin hợp đồng</Title>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Số hợp đồng" name="soHopDong"
                                rules={[{ required: true, type: "string", message: "Vui lòng nhập số hợp đồng" }]}>
                                <Input placeholder="Nhập số hợp đồng" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Hợp đồng ngày" name="hopDongDate"
                                rules={[{ required: true, message: "Vui lòng nhập ngày ký hợp đồng" }]}>
                                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Diện tích (m2)" name="dienTich"
                                rules={[{
                                    required: true,
                                    type: "number",
                                    message: "Vui lòng nhập lại diện tích",
                                    min: 1
                                }]}>
                                <InputNumber
                                    disabled
                                    style={{ width: '100%' }}
                                    formatter={(value) => {
                                        return `${vietNamFormatter(Number(value))}`;
                                    }}
                                    parser={value => value?.replace(/\$\s?|(,*)/g, '') ?? ''}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item
                                label="Thuế suất(%)"
                                name="thueSuatId"
                                rules={[{ required: true, message: 'Vui lòng chọn thuế suất' }]}
                            >
                                <Select
                                    placeholder="Chọn thuế suất"
                                    loading={isLoading}
                                    allowClear
                                >
                                    {listThueSuat?.map(item => (
                                        <Select.Option key={`${item.id}`} value={`${item.id}`}>
                                            {`${item.tenThueSuat} - ${item.tax}%`}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Bắt đầu thuê" name="batDauThue" rules={[{ required: true }]}>
                                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Số năm thuê" name="soNamThue"
                                rules={[{ required: true, type: 'number', min: 1 }]}
                            >
                                <InputNumber style={{ width: '100%' }} min={0} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Giá phi nông nghiệp (đồng)" name="giaPnn"
                                rules={[{ required: true, type: 'number', min: 0 }]}
                            >
                                <InputNumber style={{ width: '100%' }}
                                    formatter={(value) => {
                                        return `${vietNamFormatter(Number(value))}`;
                                    }}
                                    parser={value => value?.replace(/\$\s?|(,*)/g, '') ?? ''}

                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Chi tiết vị trí & mục đích */}
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item
                                label="Mục đích thuê" name="mucDichThue" rules={[{ required: true }]}>
                                <TextArea rows={2} disabled />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Khu vực thuê" name="khuVucThue" rules={[{ required: true }]}>
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="Vị trí thuê" name="viTriThue" rules={[{ required: true }]}>
                                <Input disabled />
                            </Form.Item>
                        </Col>
                    </Row>

                    <hr style={{ border: '0.5px solid #f0f0f0', margin: '20px 0' }} />

                    {/* Quyết định & Đơn giá */}
                    <Title level={5}>2. Quyết định & Đơn giá</Title>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label="Số Quyết định thuê đất" name="quyetDinhThueDatSo" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Quyết định thuê đất ngày" name="quyetDinhThueDatDate" rules={[{ required: true }]}>
                                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Số Quyết định đơn giá" name="quyetDinhDonGiaSo" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Quyết định đơn giá ngày" name="quyetDinhDonGiaDate" rules={[{ required: true }]}>
                                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={6}>
                            <Form.Item label="Đơn giá (đồng)" name="donGiaThue"
                                rules={[{ required: true, type: "number", min: 0 }]}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    formatter={(value) => {
                                        return `${vietNamFormatter(Number(value))}`;
                                    }}
                                    parser={value => value?.replace(/\$\s?|(,*)/g, '') ?? ''}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Ngày ổn định đơn giá" name="onDinhDonGiaDate"
                                rules={[{ required: true }]}
                            >
                                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Số năm ổn định" name="soNamOnDinh"
                                rules={[{ required: true, type: "number", min: 0 }]}>
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Ngày áp dụng đơn giá" name="apDungDonGiaDate"
                                rules={[{ required: true }]}
                            >
                                <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY"
                                    disabledDate={(current) => {
                                        return current && current > dayjs().endOf('year');
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Trạng thái & Ghi chú */}
                    <Row gutter={16}>
                        <Col span={16}>
                            <Form.Item label="Ghi chú" name="ghiChu">
                                <TextArea rows={2} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Lưu hợp đồng
                            </Button>
                            <Button onClick={() => form.resetFields()}>
                                Làm mới
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}