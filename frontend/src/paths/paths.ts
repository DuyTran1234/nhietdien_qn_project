import { BACKEND_URL } from "../common/common";
import { APP_SIDEBAR_KEYS } from "../component/app-sidebar/enum";

export const PATHS = {
    TONG_QUAN: `/${APP_SIDEBAR_KEYS.TONG_QUAN}`,
    QUAN_LY_HOP_DONG: `/${APP_SIDEBAR_KEYS.QUAN_LY_HOP_DONG}`,
    LIST_HOP_DONG: `/${APP_SIDEBAR_KEYS.LIST_HOP_DONG}`,
    LIST_TAX: `/${APP_SIDEBAR_KEYS.LIST_TAX}`,
    LIST_HOP_DONG_HET_HAN: `/${APP_SIDEBAR_KEYS.LIST_HOP_DONG_HET_HAN}`,
    CO_DONG_CO_TUC: `/${APP_SIDEBAR_KEYS.CO_DONG_CO_TUC}`,
    LIST_CO_DONG: `/${APP_SIDEBAR_KEYS.LIST_CO_DONG}`,
    LIST_CO_TUC: `/${APP_SIDEBAR_KEYS.LIST_CO_TUC}`,
    THANH_TOAN_HOP_DONG: `/thanh-toan-hop-dong`,
    THANH_TOAN_TAX: '/thanh-toan-tax',
};

export const THUE_SUAT_DAT_PATHS = {
    VIEW_ROUTE: `${PATHS.LIST_TAX}/view/:id`,
    UPDATE_ROUTE: `${PATHS.LIST_TAX}/update/:id`,
    DELETE_ROUTE: `${PATHS.LIST_TAX}/delete/:id`,
    CREATE_ROUTE: `${PATHS.LIST_TAX}/create`,

    VIEW: `${PATHS.LIST_TAX}/view`,
    UPDATE: `${PATHS.LIST_TAX}/update`,
    DELETE: `${PATHS.LIST_TAX}/delete`,
};

export const HOP_DONG_THUE_DAT_PATHS = {
    CREATE_ROUTE: `${PATHS.LIST_HOP_DONG}/create`,
    VIEW_ROUTE: `${PATHS.LIST_HOP_DONG}/view/:uuid`,
    CREATE_NEWEST_ROUTE: `${PATHS.LIST_HOP_DONG}/create/newest/:uuid`,
    UPDATE_ROUTE: `${PATHS.LIST_HOP_DONG}/update/:uuid`,
    DELETE_BY_UUID_ROUTE: `${PATHS.LIST_HOP_DONG}/delete/uuid/:uuid`,
    DELETE_BY_ID_ROUTE: `${PATHS.LIST_HOP_DONG}/delete/id/:id`,

    VIEW: `${PATHS.LIST_HOP_DONG}/view`,
    CREATE_NEWEST: `${PATHS.LIST_HOP_DONG}/create/newest`,
    UPDATE: `${PATHS.LIST_HOP_DONG}/update`,
    DELETE_BY_UUID: `${PATHS.LIST_HOP_DONG}/delete/uuid`,
    DELETE_BY_ID: `${PATHS.LIST_HOP_DONG}/delete/id`,
};

export const THANH_TOAN_HOP_DONG_PATHS = {
    CREATE_ROUTE: `${PATHS.THANH_TOAN_HOP_DONG}/create/:uuid`,
    VIEW_ROUTE: `${PATHS.THANH_TOAN_HOP_DONG}/view/:uuid`,
    UPDATE_ROUTE: `${PATHS.THANH_TOAN_HOP_DONG}/update/:id/:uuid`,
    DELETE_ROUTE: `${PATHS.THANH_TOAN_HOP_DONG}/delete/:id/:uuid`,

    CREATE: `${PATHS.THANH_TOAN_HOP_DONG}/create`,
    VIEW: `${PATHS.THANH_TOAN_HOP_DONG}/view`,
    UPDATE: `${PATHS.THANH_TOAN_HOP_DONG}/update`,
    DELETE: `${PATHS.THANH_TOAN_HOP_DONG}/delete`,
}

export const THANH_TOAN_TAX_PATHS = {
    VIEW_ROUTE: `${PATHS.THANH_TOAN_TAX}/view/:uuid`,
    CREATE_ROUTE: `${PATHS.THANH_TOAN_TAX}/create/:uuid`,
    UPDATE_ROUTE: `${PATHS.THANH_TOAN_TAX}/update/:id/:uuid`,
    DELETE_ROUTE: `${PATHS.THANH_TOAN_TAX}/delete/:id/:uuid`,

    VIEW: `${PATHS.THANH_TOAN_TAX}/view`,
    CREATE: `${PATHS.THANH_TOAN_TAX}/create`,
    UPDATE: `${PATHS.THANH_TOAN_TAX}/update`,
    DELETE: `${PATHS.THANH_TOAN_TAX}/delete`,
}

export const XUAT_BIEU_MAU_PATHS = {
    bangTheoDoi: `${BACKEND_URL}/xuat-bieu-mau-hop-dong/bang-theo-doi`,
    bangTinhTienKy1: `${BACKEND_URL}/xuat-bieu-mau-hop-dong/bang-tinh-tien-ky/1`,
    bangTinhTienKy2: `${BACKEND_URL}/xuat-bieu-mau-hop-dong/bang-tinh-tien-ky/2`,
    keHoachNopTienThueDat: `${BACKEND_URL}/xuat-bieu-mau-hop-dong/ke-hoach-nop-tien-thue-dat`,
    keHoachNopTax: `${BACKEND_URL}/xuat-bieu-mau-hop-dong/ke-hoach-nop-tax`,
    tinhTienTax: `${BACKEND_URL}/xuat-bieu-mau-hop-dong/bang-tinh-tien-tax`,
    nopBoSungThueDat: `${BACKEND_URL}/xuat-bieu-mau-hop-dong/bang-nop-bo-sung-thue-dat`,
}

export const CO_DONG_PATHS = {
    CREATE_ROUTE: `${PATHS.LIST_CO_DONG}/create`,
    UPDATE_ROUTE: `${PATHS.LIST_CO_DONG}/update/:id`,
    DELETE_ROUTE: `${PATHS.LIST_CO_DONG}/delete/:id`,

    UPDATE: `${PATHS.LIST_CO_DONG}/update`,
    DELETE: `${PATHS.LIST_CO_DONG}/delete`,
};