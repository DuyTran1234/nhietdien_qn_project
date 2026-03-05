import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import type { HopDongThueDatModel } from "../../model/hop-dong-thue-dat.model";
import { HOP_DONG_THUE_DAT_PATHS } from "../../paths/paths";
import ButtonDelete from "./button-delete/ButtonDelete";
import DisplayThanhToan from "./DisplayThanhToan";
import ButtonThanhToanHopDong from "./ButtonThanhToanHopDong";
import ButtonThanhToanTax from "./ButtonThanhToanTax";

export const columnsListHopDongThueDat: ColumnsType<HopDongThueDatModel> = [
    {
        title: 'Số hợp đồng',
        dataIndex: 'soHopDong',
        key: 'soHopDong',
        render: (_, v) => {
            return (
                <div>
                    <p>{`Hợp đồng số ${v.soHopDong}`}</p>
                    <p>{`Tạo ngày ${dayjs(v.hopDongDate).format('DD/MM/YYYY')}`}</p>
                </div>
            );
        }
    },
    {
        title: 'Vị trí thuê',
        dataIndex: 'viTriThue',
        key: 'viTriThue',
        render: (_, v) => {
            return (
                <div>
                    <p><b>Vị trí thuê: </b>{v.viTriThue}</p>
                    <p><b>Khu vực: </b>{v.khuVucThue}</p>
                    <p><b>Diện tích: </b>{v.dienTich}㎡</p>
                </div>
            );
        }
    },
    {
        title: 'Mục đích thuê',
        dataIndex: "mucDichThue",
        key: 'mucDichThue',
        width: 200
    },
    {
        title: 'Thanh toán kỳ 1',
        key: 'thanhToanKy1',
        render: (_, v) => {
            return <div>
                <DisplayThanhToan
                    tongSoTien={v.chiTietCacKy[0].tongSoTien}
                    daThanhToan={v.chiTietCacKy[0].daThanhToan}
                />
                {
                    v.chiTietCacKy[0].daThanhToan < v.chiTietCacKy[0].tongSoTien ?
                        <ButtonThanhToanHopDong hopDong={v} ky={1} /> : ""
                }
            </div>;
        }
    },
    {
        title: 'Thanh toán kỳ 2',
        key: 'thanhToanKy2',
        render: (_, v) => {
            return <div>
                <DisplayThanhToan
                    tongSoTien={v.chiTietCacKy[1].tongSoTien}
                    daThanhToan={v.chiTietCacKy[1].daThanhToan}
                />
                {
                    v.chiTietCacKy[1].daThanhToan < v.chiTietCacKy[1].tongSoTien ?
                        <ButtonThanhToanHopDong hopDong={v} ky={2} /> : ""
                }
            </div>;
        }
    },
    {
        title: 'Thanh toán bổ sung',
        key: 'thanhToanBoSung',
        render: (_, v) => {
            if (v.chiTietCacKy.length > 2) {
                return <div>
                    <DisplayThanhToan
                        tongSoTien={v.chiTietCacKy[2].tongSoTien}
                        daThanhToan={v.chiTietCacKy[2].daThanhToan}
                    />
                    {
                        v.chiTietCacKy[2].daThanhToan < v.chiTietCacKy[2].tongSoTien ?
                            <ButtonThanhToanHopDong hopDong={v} ky={3} /> : ""
                    }
                </div>;
            } else {
                return <p>Không có</p>
            }
        }
    },
    {
        title: 'Thanh toán thuế',
        key: 'thanhToanTax',
        render: (_, v) => {
            return (
                <div>
                    <DisplayThanhToan
                        tongSoTien={v.chiTietNopTax.newestAmount + v.chiTietNopTax.olderAmount}
                        daThanhToan={v.chiTietNopTax.daThanhToan}
                    />
                    {
                        v.chiTietNopTax.daThanhToan < v.chiTietNopTax.newestAmount + v.chiTietNopTax.olderAmount ?
                            <ButtonThanhToanTax hopDong={v} /> : ""
                    }
                </div>
            );;
        }
    },
    {
        title: 'Hành động',
        key: 'action',
        width: 210,
        render: (_, record) => (
            <Space size="middle">
                <Link to={`${HOP_DONG_THUE_DAT_PATHS.VIEW}/${record.hopDongUUID}`}>
                    <Button type="link">
                        <EyeOutlined style={{ fontSize: 24, color: 'green' }} />
                    </Button>
                </Link>

                <Link to={`${HOP_DONG_THUE_DAT_PATHS.UPDATE}/${record.hopDongUUID}`}>
                    <Button type="link">
                        <EditOutlined style={{ fontSize: 24 }} />
                    </Button>
                </Link>

                <ButtonDelete uuid={record.hopDongUUID} />
            </Space>
        ),
    },
];