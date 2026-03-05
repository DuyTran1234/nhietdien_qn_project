import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./component/home/Home"
import ListTax from "./component/tax/ListTax"
import { CO_DONG_PATHS, HOP_DONG_THUE_DAT_PATHS, PATHS, THANH_TOAN_HOP_DONG_PATHS, THANH_TOAN_TAX_PATHS, THUE_SUAT_DAT_PATHS } from "./paths/paths"
import CreateThueSuatDat from "./component/tax/CreateThueSuatDat"
import UpdateThueSuatDat from "./component/tax/UpdateThueSuatDat"
import DeleteThueSuatDat from "./component/tax/DeleteThueSuatDat"
import ListHopDongThueDat from "./component/hop-dong-thue-dat/ListHopDongThueDat"
import CreateHopDongThueDat from "./component/hop-dong-thue-dat/CreateHopDongThueDat"
import DisplayHopDongThueDat from "./component/hop-dong-thue-dat/DisplayHopDongThueDat"
import CreateNewestHopDongThueDat from "./component/hop-dong-thue-dat/CreateNewestHopDongThueDat"
import UpdateHopDongThueDat from "./component/hop-dong-thue-dat/UpdateHopDongThueDat"
import DeleteHopDongThueDat from "./component/hop-dong-thue-dat/DeleteHopDongThueDat"
import CreateThanhToanHopDong from "./component/thanh-toan-hop-dong/CreateThanhToanHopDong"
import ListThanhToanHopDong from "./component/thanh-toan-hop-dong/ListThanhToanHopDong"
import UpdateThanhToanHopDong from "./component/thanh-toan-hop-dong/UpdateThanhToanHopDong"
import DeleteThanhToanHopDong from "./component/thanh-toan-hop-dong/DeleteThanhToanHopDong"
import ListThanhToanTax from "./component/thanh-toan-tax/ListThanhToanTax"
import CreateThanhToanTax from "./component/thanh-toan-tax/CreateThanhToanTax"
import UpdateThanhToanTax from "./component/thanh-toan-tax/UpdateThanhToanTax"
import DeleteThanhToanTax from "./component/thanh-toan-tax/DeleteThanhToanTax"
import ListCoDong from "./component/co-dong/ListCoDong"
import CreateCoDong from "./component/co-dong/CreateCoDong"
import UpdateCoDong from "./component/co-dong/UpdateCoDong"
import DeleteCoDong from "./component/co-dong/DeleteCoDong"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path={PATHS.TONG_QUAN} element={<Home />} />

                {/* Routes Thuế suất đất */}
                <Route path={PATHS.LIST_TAX} element={<ListTax />} />
                <Route path={THUE_SUAT_DAT_PATHS.CREATE_ROUTE} element={<CreateThueSuatDat />} />
                <Route path={THUE_SUAT_DAT_PATHS.UPDATE_ROUTE} element={<UpdateThueSuatDat />} />
                <Route path={THUE_SUAT_DAT_PATHS.DELETE_ROUTE} element={<DeleteThueSuatDat />} />

                {/* Routes Hợp đồng thuê đất */}
                <Route path={PATHS.LIST_HOP_DONG} element={<ListHopDongThueDat />} />
                <Route path={HOP_DONG_THUE_DAT_PATHS.CREATE_ROUTE} element={<CreateHopDongThueDat />} />
                <Route path={HOP_DONG_THUE_DAT_PATHS.VIEW_ROUTE} element={<DisplayHopDongThueDat />} />
                <Route path={HOP_DONG_THUE_DAT_PATHS.CREATE_NEWEST_ROUTE} element={<CreateNewestHopDongThueDat />} />
                <Route path={HOP_DONG_THUE_DAT_PATHS.UPDATE_ROUTE} element={<UpdateHopDongThueDat />} />
                <Route
                    path={HOP_DONG_THUE_DAT_PATHS.DELETE_BY_UUID_ROUTE}
                    element={<DeleteHopDongThueDat />}
                />
                <Route
                    path={HOP_DONG_THUE_DAT_PATHS.DELETE_BY_ID_ROUTE}
                    element={<DeleteHopDongThueDat />}
                />

                {/* Routes Thanh toán hợp đồng */}
                <Route path={THANH_TOAN_HOP_DONG_PATHS.CREATE_ROUTE} element={<CreateThanhToanHopDong />} />
                <Route path={THANH_TOAN_HOP_DONG_PATHS.VIEW_ROUTE} element={<ListThanhToanHopDong />} />
                <Route path={THANH_TOAN_HOP_DONG_PATHS.UPDATE_ROUTE} element={<UpdateThanhToanHopDong />} />
                <Route path={THANH_TOAN_HOP_DONG_PATHS.DELETE_ROUTE} element={< DeleteThanhToanHopDong />} />

                {/* Routes Thanh toán Tax */}
                <Route path={THANH_TOAN_TAX_PATHS.VIEW_ROUTE} element={<ListThanhToanTax />} />
                <Route path={THANH_TOAN_TAX_PATHS.CREATE_ROUTE} element={<CreateThanhToanTax />} />
                <Route path={THANH_TOAN_TAX_PATHS.UPDATE_ROUTE} element={<UpdateThanhToanTax />} />
                <Route path={THANH_TOAN_TAX_PATHS.DELETE_ROUTE} element={<DeleteThanhToanTax />} />

                {/* Routes Cổ đông */}
                <Route path={PATHS.LIST_CO_DONG} element={<ListCoDong />} />
                <Route path={CO_DONG_PATHS.CREATE_ROUTE} element={<CreateCoDong />} />
                <Route path={CO_DONG_PATHS.UPDATE_ROUTE} element={<UpdateCoDong />} />
                <Route path={CO_DONG_PATHS.DELETE_ROUTE} element={<DeleteCoDong />} />
            </Routes>
        </BrowserRouter>
    )
}
export default App
