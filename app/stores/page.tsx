'use client';

import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockStores, mockSales, mockInventory } from '@/lib/mock-data';
import { Store, Search, Plus, MapPin, Phone, Mail, User, DollarSign, Package } from 'lucide-react';
import { useState } from 'react';

export default function StoresPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) {
    redirect('/');
  }

  // Only directors can access this page
  if (user.role !== 'director') {
    redirect('/dashboard');
  }

  // Filter stores
  let filteredStores = mockStores;

  if (searchTerm) {
    filteredStores = filteredStores.filter(store =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.managerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Calculate store performance
  const getStoreMetrics = (storeId: string) => {
    const storeSales = mockSales.filter(sale => sale.storeId === storeId);
    const storeInventory = mockInventory.filter(item => item.storeId === storeId);
    
    const totalRevenue = storeSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalUnits = storeSales.reduce((sum, sale) => sum + sale.quantity, 0);
    const inventoryValue = storeInventory.reduce((sum, item) => sum + (item.quantity * item.product.costPrice), 0);
    const lowStockItems = storeInventory.filter(item => item.quantity <= item.minStockLevel).length;

    return {
      revenue: totalRevenue,
      units: totalUnits,
      inventoryValue,
      lowStockItems,
      totalProducts: storeInventory.length
    };
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
                  Store Management
                </h2>
                <p className="text-gray-600">
                  Manage your retail locations and monitor their performance.
                </p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Store
              </Button>
            </div>

            {/* Store Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
                  <Store className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStores.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${mockSales.reduce((sum, sale) => sum + sale.totalAmount, 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Managers</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockStores.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${mockInventory.reduce((sum, item) => sum + (item.quantity * item.product.costPrice), 0).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search stores..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Stores Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredStores.map((store) => {
                const metrics = getStoreMetrics(store.id);
                return (
                  <Card key={store.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{store.name}</CardTitle>
                        <Badge variant="outline">Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Store Info */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{store.location}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>Manager: {store.managerName}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{store.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span>{store.email}</span>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-3">Performance Overview</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-600">Revenue</p>
                              <p className="font-bold text-green-600">${metrics.revenue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Units Sold</p>
                              <p className="font-bold">{metrics.units}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Inventory Value</p>
                              <p className="font-bold">${metrics.inventoryValue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Products</p>
                              <p className="font-bold">{metrics.totalProducts}</p>
                            </div>
                          </div>
                        </div>

                        {/* Alerts */}
                        {metrics.lowStockItems > 0 && (
                          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Package className="w-4 h-4 text-amber-600" />
                              <span className="text-sm text-amber-800">
                                {metrics.lowStockItems} item{metrics.lowStockItems > 1 ? 's' : ''} need restocking
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex space-x-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Edit Store
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Contact Manager
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredStores.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Store className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No stores found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}