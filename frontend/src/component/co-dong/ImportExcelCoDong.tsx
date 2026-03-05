import { FileExcelOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import CreateDanhSachCoDongService from "../../service/co-dong/create-danh-sach-co-dong.service";
import { useState } from "react";
import Loading from "../loading/Loading";

export default function ImportExcelCoDong(
    { setPagination }
        : {
            setPagination: React.Dispatch<React.SetStateAction<{
                page: number;
                limit: number;
                filterCntc: undefined;
                filterType: undefined;
                searchCoDong: string;
                filterCoDongLon: undefined;
            }>>
        }
) {
    const [isLoading, setIsLoading] = useState(false);
    const handleRequest = async (options: any) => {
        const { file } = options;
        const formData = new FormData();
        formData.append('file', file);
        setIsLoading(true);
        try {
            await CreateDanhSachCoDongService(formData);
            message.success('Tạo danh sách cổ đông thành công');
            setPagination((prev) => ({ ...prev }));
        } catch (error) {
            message.error('Tạo danh sách cổ đông thất bại!');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Loading isLoading={isLoading} />
            <Upload
                customRequest={handleRequest}
                maxCount={1}
                accept=".xlsx"
                showUploadList={false}
            >
                <Button
                    type="primary"
                    style={{
                        backgroundColor: '#1D6F42',
                        borderColor: '#1D6F42'
                    }}
                    icon={<FileExcelOutlined />}
                >
                    Nhập Excel Cổ đông
                </Button>
            </Upload>
        </div>
    );
}