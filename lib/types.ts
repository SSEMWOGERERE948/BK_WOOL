export interface User {
  id: string;
  name: string;
  email: string;
  role: 'director' | 'manager';
  storeId?: string;
  avatar?: string;
}

export interface Store {
  id: string;
  name: string;
  location: string;
  managerId: string;
  managerName: string;
  phone: string;
  email: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  category: 'braids' | 'wigs' | 'extensions' | 'tools' | 'care';
  batchNumber: string;
  productionDate: Date;
  quantityProduced: number;
  storageLocation: string;
  costPrice: number;
  sellingPrice: number;
  description?: string;
  createdAt: Date;
}

export interface StoreInventory {
  id: string;
  storeId: string;
  productId: string;
  quantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  lastRestocked: Date;
  product: Product;
  store: Store;
}

export interface Sale {
  id: string;
  storeId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  salesDate: Date;
  managerId: string;
  notes?: string;
  product: Product;
  store: Store;
}

export interface Transfer {
  id: string;
  fromStoreId: string;
  toStoreId: string;
  productId: string;
  quantity: number;
  requestedBy: string;
  approvedBy?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestDate: Date;
  approvedDate?: Date;
  completedDate?: Date;
  notes?: string;
  product: Product;
  fromStore: Store;
  toStore: Store;
}

export interface DashboardMetrics {
  totalProducts: number;
  totalStores: number;
  totalSales: number;
  totalRevenue: number;
  lowStockItems: number;
  pendingTransfers: number;
  topSellingProducts: Array<{
    product: Product;
    quantity: number;
    revenue: number;
  }>;
  storePerformance: Array<{
    store: Store;
    sales: number;
    revenue: number;
  }>;
}