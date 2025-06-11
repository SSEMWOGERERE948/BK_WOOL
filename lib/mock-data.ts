import { User, Store, Product, StoreInventory, Sale, Transfer } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@bk wool.com',
    role: 'director',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Marcus Williams',
    email: 'marcus@bk wool.com',
    role: 'manager',
    storeId: '1',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Diana Chen',
    email: 'diana@bk wool.com',
    role: 'manager',
    storeId: '2',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'James Rodriguez',
    email: 'james@bk wool.com',
    role: 'manager',
    storeId: '3',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockStores: Store[] = [
  {
    id: '1',
    name: 'Downtown Beauty Hub',
    location: '123 Main Street, Downtown',
    managerId: '2',
    managerName: 'Marcus Williams',
    phone: '(555) 123-4567',
    email: 'downtown@bk wool.com',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Westside Hair Palace',
    location: '456 West Avenue, Westside',
    managerId: '3',
    managerName: 'Diana Chen',
    phone: '(555) 234-5678',
    email: 'westside@bk wool.com',
    createdAt: new Date('2023-02-20')
  },
  {
    id: '3',
    name: 'Uptown Style Center',
    location: '789 North Boulevard, Uptown',
    managerId: '4',
    managerName: 'James Rodriguez',
    phone: '(555) 345-6789',
    email: 'uptown@bk wool.com',
    createdAt: new Date('2023-03-10')
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Curly Wool 12in',
    category: 'braids',
    batchNumber: 'CW12-2024-001',
    productionDate: new Date('2024-01-15'),
    quantityProduced: 500,
    storageLocation: 'Warehouse A-12',
    costPrice: 15.00,
    sellingPrice: 25.00,
    description: 'Premium curly wool braiding hair, 12 inches',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Straight Lace Front Wig',
    category: 'wigs',
    batchNumber: 'SLF-2024-002',
    productionDate: new Date('2024-01-20'),
    quantityProduced: 200,
    storageLocation: 'Warehouse B-08',
    costPrice: 45.00,
    sellingPrice: 85.00,
    description: 'Natural straight lace front wig, human hair',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Clip-In Extensions 18in',
    category: 'extensions',
    batchNumber: 'CIE18-2024-003',
    productionDate: new Date('2024-01-25'),
    quantityProduced: 350,
    storageLocation: 'Warehouse C-15',
    costPrice: 25.00,
    sellingPrice: 45.00,
    description: 'Clip-in hair extensions, 18 inches, multiple colors',
    createdAt: new Date('2024-01-25')
  },
  {
    id: '4',
    name: 'Kinky Curly Wig',
    category: 'wigs',
    batchNumber: 'KC-2024-004',
    productionDate: new Date('2024-02-01'),
    quantityProduced: 150,
    storageLocation: 'Warehouse B-12',
    costPrice: 55.00,
    sellingPrice: 95.00,
    description: 'Kinky curly lace front wig, natural texture',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '5',
    name: 'Hair Care Kit',
    category: 'care',
    batchNumber: 'HCK-2024-005',
    productionDate: new Date('2024-02-05'),
    quantityProduced: 400,
    storageLocation: 'Warehouse D-05',
    costPrice: 12.00,
    sellingPrice: 22.00,
    description: 'Complete hair care kit with shampoo, conditioner, and oil',
    createdAt: new Date('2024-02-05')
  }
];

export const mockInventory: StoreInventory[] = [
  {
    id: '1',
    storeId: '1',
    productId: '1',
    quantity: 45,
    minStockLevel: 20,
    maxStockLevel: 100,
    lastRestocked: new Date('2024-01-20'),
    product: mockProducts[0],
    store: mockStores[0]
  },
  {
    id: '2',
    storeId: '1',
    productId: '2',
    quantity: 8,
    minStockLevel: 10,
    maxStockLevel: 50,
    lastRestocked: new Date('2024-01-25'),
    product: mockProducts[1],
    store: mockStores[0]
  },
  {
    id: '3',
    storeId: '2',
    productId: '1',
    quantity: 65,
    minStockLevel: 25,
    maxStockLevel: 80,
    lastRestocked: new Date('2024-01-22'),
    product: mockProducts[0],
    store: mockStores[1]
  },
  {
    id: '4',
    storeId: '2',
    productId: '3',
    quantity: 30,
    minStockLevel: 15,
    maxStockLevel: 60,
    lastRestocked: new Date('2024-01-28'),
    product: mockProducts[2],
    store: mockStores[1]
  },
  {
    id: '5',
    storeId: '3',
    productId: '4',
    quantity: 12,
    minStockLevel: 8,
    maxStockLevel: 40,
    lastRestocked: new Date('2024-02-03'),
    product: mockProducts[3],
    store: mockStores[2]
  },
  {
    id: '6',
    storeId: '3',
    productId: '5',
    quantity: 55,
    minStockLevel: 20,
    maxStockLevel: 75,
    lastRestocked: new Date('2024-02-07'),
    product: mockProducts[4],
    store: mockStores[2]
  }
];

export const mockSales: Sale[] = [
  {
    id: '1',
    storeId: '1',
    productId: '1',
    quantity: 3,
    unitPrice: 25.00,
    totalAmount: 75.00,
    customerId: 'C001',
    customerName: 'Angela Thompson',
    customerPhone: '(555) 987-6543',
    salesDate: new Date('2024-02-10'),
    managerId: '2',
    notes: 'Regular customer, prefers natural colors',
    product: mockProducts[0],
    store: mockStores[0]
  },
  {
    id: '2',
    storeId: '2',
    productId: '3',
    quantity: 2,
    unitPrice: 45.00,
    totalAmount: 90.00,
    customerName: 'Maria Santos',
    customerPhone: '(555) 456-7890',
    salesDate: new Date('2024-02-11'),
    managerId: '3',
    product: mockProducts[2],
    store: mockStores[1]
  },
  {
    id: '3',
    storeId: '3',
    productId: '4',
    quantity: 1,
    unitPrice: 95.00,
    totalAmount: 95.00,
    customerName: 'Keisha Johnson',
    customerPhone: '(555) 234-5678',
    salesDate: new Date('2024-02-12'),
    managerId: '4',
    notes: 'First-time customer, referred by friend',
    product: mockProducts[3],
    store: mockStores[2]
  }
];

export const mockTransfers: Transfer[] = [
  {
    id: '1',
    fromStoreId: '1',
    toStoreId: '2',
    productId: '2',
    quantity: 5,
    requestedBy: '3',
    approvedBy: '1',
    status: 'completed',
    requestDate: new Date('2024-02-08'),
    approvedDate: new Date('2024-02-09'),
    completedDate: new Date('2024-02-10'),
    notes: 'Urgent request due to high demand',
    product: mockProducts[1],
    fromStore: mockStores[0],
    toStore: mockStores[1]
  },
  {
    id: '2',
    fromStoreId: '2',
    toStoreId: '3',
    productId: '5',
    quantity: 10,
    requestedBy: '4',
    status: 'pending',
    requestDate: new Date('2024-02-12'),
    notes: 'Running low on hair care products',
    product: mockProducts[4],
    fromStore: mockStores[1],
    toStore: mockStores[2]
  },
  {
    id: '3',
    fromStoreId: '3',
    toStoreId: '1',
    productId: '1',
    quantity: 15,
    requestedBy: '2',
    approvedBy: '1',
    status: 'approved',
    requestDate: new Date('2024-02-13'),
    approvedDate: new Date('2024-02-13'),
    notes: 'Restocking for weekend promotion',
    product: mockProducts[0],
    fromStore: mockStores[2],
    toStore: mockStores[0]
  }
];

// Helper functions
export const getCurrentUser = (): User => mockUsers[0]; // Director for demo

export const getUserStore = (userId: string): Store | undefined => {
  const user = mockUsers.find(u => u.id === userId);
  if (user?.storeId) {
    return mockStores.find(s => s.id === user.storeId);
  }
  return undefined;
};

export const getLowStockItems = (): StoreInventory[] => {
  return mockInventory.filter(item => item.quantity <= item.minStockLevel);
};

export const getPendingTransfers = (): Transfer[] => {
  return mockTransfers.filter(transfer => transfer.status === 'pending');
};