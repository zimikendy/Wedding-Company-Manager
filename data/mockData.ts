import { Project, ProjectStatus, UserRole, User, Customer, CustomerSource, StaffStatus, Transaction, Package, ServiceItem } from '../types';

export const mockUsers: User[] = [
    { id: '1', firstName: 'Admin', lastName: 'User', email: 'admin@crmstudio.com', avatarUrl: 'https://i.pravatar.cc/150?u=admin', role: UserRole.ADMIN, status: StaffStatus.ACTIVE },
    { id: '2', firstName: 'Manager', lastName: 'User', email: 'manager@crmstudio.com', avatarUrl: 'https://i.pravatar.cc/150?u=manager', role: UserRole.MANAGER, status: StaffStatus.ACTIVE },
    { id: '3', firstName: 'Photographer', lastName: 'A', email: 'photo.a@crmstudio.com', avatarUrl: 'https://i.pravatar.cc/150?u=photoA', role: UserRole.USER, rate: 500000, rateType: 'shoot', status: StaffStatus.ACTIVE },
    { id: '4', firstName: 'Videographer', lastName: 'B', email: 'video.b@crmstudio.com', avatarUrl: 'https://i.pravatar.cc/150?u=videoB', role: UserRole.USER, rate: 400000, rateType: 'shoot', status: StaffStatus.ACTIVE },
    { id: '5', firstName: 'Editor', lastName: 'C', email: 'editor.c@crmstudio.com', avatarUrl: 'https://i.pravatar.cc/150?u=editorC', role: UserRole.USER, rate: 300000, rateType: 'giờ', status: StaffStatus.INACTIVE },
    { id: '6', firstName: 'Viewer', lastName: 'Only', email: 'viewer@crmstudio.com', avatarUrl: 'https://i.pravatar.cc/150?u=viewer-only', role: UserRole.VIEWER, status: StaffStatus.ACTIVE },
];

export const mockCustomers: Customer[] = [
    { id: '1', firstName: 'Nguyễn', lastName: 'Văn A', email: 'nguyenvana@email.com', phone: '0901234567', avatarUrl: 'https://i.pravatar.cc/150?u=clientA', source: CustomerSource.FACEBOOK, projectCount: 5 },
    { id: '2', firstName: 'Trần', lastName: 'Thị B', email: 'tranthib@email.com', phone: '0901234568', avatarUrl: 'https://i.pravatar.cc/150?u=clientB', source: CustomerSource.GOOGLE, projectCount: 3 },
    { id: '3', firstName: 'Lê', lastName: 'Văn C', email: 'levanc@email.com', phone: '0901234569', avatarUrl: 'https://i.pravatar.cc/150?u=clientC', source: CustomerSource.REFERRAL, projectCount: 2 },
    { id: '4', firstName: 'Phạm', lastName: 'Thị D', email: 'phamthid@email.com', phone: '0901234570', avatarUrl: 'https://i.pravatar.cc/150?u=clientD', source: CustomerSource.WEBSITE, projectCount: 1 },
];

export const mockProjects: Project[] = [
    {
        id: '1',
        name: 'Wedding ABC',
        client: 'Nguyễn Văn A',
        status: ProjectStatus.SIGNED,
        date: '2025-01-15',
        price: 50000000,
        thumbnailUrl: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=600',
        team: [mockUsers[2], mockUsers[3]],
        description: 'Chụp ảnh và quay phim cho đám cưới tại nhà hàng ABC. Yêu cầu có flycam.',
        location: 'Nhà hàng ABC, Quận 1, TP.HCM',
        startDate: '2025-01-15',
        endDate: '2025-01-20',
        payments: [
            { id: 'p1-1', description: 'Tiền cọc', amount: 20000000, date: '2024-12-10', status: 'Đã thanh toán' },
            { id: 'p1-2', description: 'Thanh toán cuối', amount: 30000000, date: '2025-01-20', status: 'Chờ thanh toán' },
        ],
        timeline: [
            { id: 't1-1', title: 'Chụp ảnh cưới', date: '2025-01-15T09:00:00', location: 'Nhà hàng ABC', team: [mockUsers[2], mockUsers[3]], status: 'Hoàn thành' },
            { id: 't1-2', title: 'Giao album', date: '2025-01-20T14:00:00', location: 'Studio', team: [], status: 'Sắp tới' },
        ],
        files: [
            { id: 'f1-1', name: 'contract.pdf', size: '2.5 MB', uploadDate: '2024-12-10' },
            { id: 'f1-2', name: 'photo-inspiration.zip', size: '15.2 MB', uploadDate: '2024-12-11' },
        ]
    },
    {
        id: '2',
        name: 'Event XYZ',
        client: 'Trần Thị B',
        status: ProjectStatus.IN_PROCESS,
        date: '2025-01-18',
        price: 30000000,
        thumbnailUrl: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=600',
        team: [mockUsers[2]],
        description: 'Chụp ảnh sự kiện khai trương cho Công ty XYZ.',
        location: 'Trung tâm thương mại XYZ, Quận 3',
        payments: [
            { id: 'p2-1', description: 'Thanh toán toàn bộ', amount: 30000000, date: '2025-01-10', status: 'Đã thanh toán' },
        ],
        timeline: [],
        files: []
    },
    // Add more detailed projects if needed
    {
        id: '3',
        name: 'Portrait Shoot',
        client: 'Lê Văn C',
        status: ProjectStatus.COMPLETE,
        date: '2024-12-20',
        price: 5000000,
        thumbnailUrl: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=600',
        team: [mockUsers[2]]
    },
    {
        id: '4',
        name: 'Corporate Headshots',
        client: 'Công ty Z',
        status: ProjectStatus.DEPOSITED,
        date: '2025-02-01',
        price: 15000000,
        thumbnailUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
        team: [mockUsers[2], mockUsers[4]]
    },
    {
        id: '5',
        name: 'Product Photography',
        client: 'Shop Online T',
        status: ProjectStatus.FINAL_PAYMENT,
        date: '2025-01-10',
        price: 8000000,
        thumbnailUrl: 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=600',
        team: [mockUsers[3]]
    },
    {
        id: '6',
        name: 'Proposal Wedding K',
        client: 'Phạm Thị D',
        status: ProjectStatus.PROPOSAL,
        date: '2025-03-15',
        price: 65000000,
        thumbnailUrl: 'https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=600',
        team: []
    },
    {
        id: '7',
        name: 'New inquiry from web',
        client: 'Hoàng Văn E',
        status: ProjectStatus.CONTACT,
        date: '2025-01-25',
        price: 0,
        thumbnailUrl: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=600',
        team: []
    },
     {
        id: '8',
        name: 'Family Photoshoot',
        client: 'Gia đình H',
        status: ProjectStatus.COMPLETE,
        date: '2024-11-30',
        price: 7500000,
        thumbnailUrl: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=600',
        team: [mockUsers[2]]
    },
];

export const mockTransactions: Transaction[] = [
    { id: '1', type: 'Thu nhập', category: 'Tiền cọc', description: 'Cọc dự án Wedding ABC', amount: 20000000, date: '2025-01-10', client: 'Nguyễn Văn A' },
    { id: '2', type: 'Chi phí', category: 'Thiết bị', description: 'Mua ống kính mới', amount: 8000000, date: '2025-01-15', client: null },
    { id: '3', type: 'Thu nhập', category: 'Thanh toán cuối', description: 'Thanh toán dự án Portrait', amount: 5000000, date: '2024-12-25', client: 'Lê Văn C' },
    { id: '4', type: 'Chi phí', category: 'Marketing', description: 'Chạy quảng cáo Facebook', amount: 3000000, date: '2025-01-05', client: null },
    { id: '5', type: 'Chi phí', category: 'Nhân sự', description: 'Lương Photographer A', amount: 10000000, date: '2025-01-30', client: null },
    { id: '6', type: 'Chi phí', category: 'Chi phí cố định', description: 'Tiền thuê studio', amount: 5000000, date: '2025-01-01', client: null },
];

export const mockPackages: Package[] = [
    {
        id: '1',
        name: 'Gói Cưới Cao Cấp',
        category: 'Cưới',
        description: 'Gói dịch vụ cưới cao cấp với đầy đủ dịch vụ chụp ảnh, quay phim và album.',
        services: [
            { name: 'Chụp ảnh cưới', quantity: 1, price: 15000000 },
            { name: 'Quay phim cưới', quantity: 1, price: 12000000 },
            { name: 'Album ảnh cao cấp', quantity: 1, price: 3000000 },
            { name: 'Video highlight', quantity: 1, price: 2000000 },
            { name: 'Drone shots', quantity: 1, price: 2000000 },
        ],
        totalPrice: 34000000,
        isActive: true,
    },
    {
        id: '2',
        name: 'Gói Event Doanh Nghiệp',
        category: 'Event',
        description: 'Ghi lại những khoảnh khắc quan trọng của sự kiện doanh nghiệp.',
        services: [
            { name: 'Chụp ảnh sự kiện (4 giờ)', quantity: 1, price: 8000000 },
            { name: 'Quay phim sự kiện (4 giờ)', quantity: 1, price: 10000000 },
        ],
        totalPrice: 18000000,
        isActive: true,
    },
    {
        id: '3',
        name: 'Gói Portrait Chuyên Nghiệp',
        category: 'Portrait',
        description: 'Chụp ảnh chân dung chuyên nghiệp tại studio hoặc ngoại cảnh.',
        services: [
            { name: 'Chụp ảnh (2 giờ)', quantity: 1, price: 3000000 },
            { name: 'Chỉnh sửa 10 ảnh', quantity: 1, price: 1000000 },
        ],
        totalPrice: 4000000,
        isActive: false,
    }
];