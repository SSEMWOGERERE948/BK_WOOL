'use client';

import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockInventory, mockStores } from '@/lib/mock-data';
import { Package, Store, Search, AlertTriangle, Plus } from 'lucide-react';
import { useState } from 'react';

export default function InventoryPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('all');

  if (!user) {
    redirect('/');
  }

  // Filter inventory based on user role
  let filteredInventory = mockInventory;
  
  if (user.role === 'manager' && user.storeId) {
    filteredInventory = mockInventory.filter(item => item.storeId === user.storeId);
  }

  // Apply search and store filters
  if (searchTerm) {
    filteredInventory = filteredInventory.filter(item =>
      item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (selectedStore !== 'all') {
    filteredInventory = filteredInventory.filter(item => item.storeId === selectedStore);
  }

  const getStockStatus = (item: any) => {
    if (item.quantity <= item.minStockLevel) {
      return { status: 'Low Stock', color: 'bg-red-100 text-red-800' };
    } else if (item.quantity <= item.minStockLevel * 1.5) {
      return { status: 'Medium Stock', color: 'bg-yellow-100 text-yellow-800' };
    } else {
      return { status: 'Good Stock', color: 'bg-green-100 text-green-800' };
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {user.role === 'director' ? 'Inventory Management' : 'My Store Inventory'}
                </h2>
                <p className="text-gray-600">
                  Monitor and manage your product inventory across all locations.
                </p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Stock
              </Button>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  {user.role === 'director' && (
                    <Select value={selectedStore} onValueChange={setSelectedStore}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select store" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stores</SelectItem>
                        {mockStores.map((store) => (
                          <SelectItem key={store.id} value={store.id}>
                            {store.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Inventory Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInventory.map((item) => {
                const stockStatus = getStockStatus(item);
                return (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{item.product.name}</CardTitle>
                        <Badge className={stockStatus.color}>
                          {stockStatus.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Store className="w-4 h-4" />
                          <span>{item.store.name}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Package className="w-4 h-4" />
                          <span className="capitalize">{item.product.category}</span>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Current Stock</span>
                            <span className="text-lg font-bold">{item.quantity}</span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Min: {item.minStockLevel}</span>
                            <span>Max: {item.maxStockLevel}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${Math.min(100, (item.quantity / item.maxStockLevel) * 100)}%`
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Last Restocked:</span>
                          <span>{item.lastRestocked.toLocaleDateString()}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Selling Price:</span>
                          <span className="font-medium">${item.product.sellingPrice}</span>
                        </div>

                        {item.quantity <= item.minStockLevel && (
                          <div className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-red-800">Needs Restocking</span>
                          </div>
                        )}

                        <div className="flex space-x-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            Update Stock
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Request Transfer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredInventory.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No inventory items found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}