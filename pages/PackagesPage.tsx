import React, { useState, useMemo } from 'react';
import { Icons } from '../components/Icons';
import { mockPackages } from '../data/mockData';
import { Package } from '../types';
import Pagination from '../components/ui/Pagination';
import PackageCard from '../components/packages/PackageCard';
import PackageFormModal from '../components/packages/PackageFormModal';

const CATEGORY_FILTERS = ['Tất cả', 'Cưới', 'Event', 'Portrait', 'Sản phẩm', 'Khác'];
const ITEMS_PER_PAGE = 6;

const PackagesPage: React.FC = () => {
    const [packages, setPackages] = useState<Package[]>(mockPackages);
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<Package | null>(null);

    const filteredPackages = useMemo(() => {
        return packages.filter(p => {
            const categoryMatch = activeCategory === 'Tất cả' || p.category === activeCategory;
            const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                p.description.toLowerCase().includes(searchTerm.toLowerCase());
            return categoryMatch && searchMatch;
        });
    }, [activeCategory, searchTerm, packages]);

    const paginatedPackages = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredPackages.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredPackages, currentPage]);

    const totalPages = Math.ceil(filteredPackages.length / ITEMS_PER_PAGE);

    const handleSave = (pkg: Package) => {
        if (editingPackage) {
            setPackages(packages.map(p => p.id === pkg.id ? pkg : p));
        } else {
            setPackages([...packages, { ...pkg, id: (packages.length + 1).toString() }]);
        }
        setModalOpen(false);
        setEditingPackage(null);
    };

    const handleEdit = (pkg: Package) => {
        setEditingPackage(pkg);
        setModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-1/3">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm theo tên gói..."
                        value={searchTerm}
                        onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2 border rounded-md"
                    />
                </div>
                <button onClick={() => { setEditingPackage(null); setModalOpen(true); }} className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 w-full md:w-auto">
                    <Icons.Add className="h-4 w-4 mr-2" />
                    Thêm gói dịch vụ
                </button>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
                {CATEGORY_FILTERS.map(cat => (
                    <button key={cat} onClick={() => { setActiveCategory(cat); setCurrentPage(1); }} className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap ${activeCategory === cat ? 'bg-primary text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
                        {cat}
                    </button>
                ))}
            </div>

             {paginatedPackages.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {paginatedPackages.map(p => <PackageCard key={p.id} pkg={p} onEdit={handleEdit} />)}
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </>
             ) : (
                <div className="text-center py-16">
                    <Icons.Packages className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Không tìm thấy gói dịch vụ</h3>
                </div>
             )}

            {isModalOpen && (
                <PackageFormModal 
                    isOpen={isModalOpen}
                    onClose={() => { setModalOpen(false); setEditingPackage(null); }}
                    onSave={handleSave}
                    pkg={editingPackage}
                />
            )}
        </div>
    );
};

export default PackagesPage;