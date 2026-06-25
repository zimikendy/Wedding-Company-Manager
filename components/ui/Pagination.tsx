import React from 'react';
import { Icons } from '../Icons';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-center space-x-4 mt-6">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="flex items-center justify-center p-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
                <Icons.ChevronLeft className="h-5 w-5" />
                <span className="ml-2">Previous</span>
            </button>
            <span className="text-sm text-gray-700">
                Trang {currentPage} / {totalPages}
            </span>
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center p-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
                <span className="mr-2">Next</span>
                <Icons.ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );
};

export default Pagination;
