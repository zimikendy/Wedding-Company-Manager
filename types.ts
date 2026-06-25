export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
  VIEWER = 'VIEWER',
}

export enum StaffStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive'
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  // Staff-specific fields
  rate?: number;
  rateType?: 'shoot' | 'giờ';
  status?: StaffStatus;
}

export enum ProjectStatus {
    CONTACT = 'Contact',
    PROPOSAL = 'Proposal',
    SIGNED = 'Signed',
    DEPOSITED = 'Deposited',
    IN_PROCESS = 'In Process',
    FINAL_PAYMENT = 'Final Payment',
    COMPLETE = 'Complete'
}

export interface Payment {
    id: string;
    description: string;
    amount: number;
    date: string;
    status: 'Đã thanh toán' | 'Chờ thanh toán';
}

export interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    location: string;
    team: User[];
    status: 'Hoàn thành' | 'Sắp tới';
}

export interface ProjectFile {
    id: string;
    name: string;
    size: string;
    uploadDate: string;
}


export interface Project {
    id: string;
    name: string;
    client: string;
    status: ProjectStatus;
    date: string;
    price: number;
    thumbnailUrl: string;
    team: User[];
    // Detailed fields
    description?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    payments?: Payment[];
    timeline?: TimelineEvent[];
    files?: ProjectFile[];
}

export enum CustomerSource {
    FACEBOOK = 'Facebook',
    GOOGLE = 'Google',
    REFERRAL = 'Referral',
    WEBSITE = 'Website',
    OTHER = 'Khác'
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatarUrl: string;
    source: CustomerSource;
    projectCount: number;
}

export interface Transaction {
    id: string;
    type: 'Thu nhập' | 'Chi phí';
    category: string;
    description: string;
    amount: number;
    date: string;
    client: string | null;
}

export interface ServiceItem {
    name: string;
    quantity: number;
    price: number;
}

export interface Package {
    id: string;
    name: string;
    category: 'Cưới' | 'Event' | 'Portrait' | 'Sản phẩm' | 'Khác';
    description: string;
    services: ServiceItem[];
    totalPrice: number;
    isActive: boolean;
}