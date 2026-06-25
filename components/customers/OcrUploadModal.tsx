import React from 'react';
import { Icons } from '../Icons';

interface OcrUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OcrUploadModal: React.FC<OcrUploadModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                 <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Tạo khách hàng từ ảnh</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <Icons.Close className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100">
                         <Icons.UploadCloud className="h-12 w-12 text-gray-400" />
                    </div>
                    <h4 className="mt-4 text-lg font-medium text-gray-800">Kéo và thả ảnh danh thiếp</h4>
                    <p className="mt-1 text-sm text-gray-500">hoặc</p>
                    <button className="mt-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/5">
                        Chọn tệp từ máy tính
                    </button>
                    <p className="mt-4 text-xs text-gray-400">Tính năng đang được phát triển.</p>
                </div>
                 <div className="px-6 py-4 bg-gray-50 text-right">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Đóng</button>
                </div>
            </div>
        </div>
    );
};

export default OcrUploadModal;
