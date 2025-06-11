'use client';

import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockSales, mockProducts, mockStores, mockInventory } from '@/lib/mock-data';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Store, Target } from 'lucide-react';
import { useState } from 'react';

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('month');
  const [selectedStore, setSelectedStore] = useState('all');

  if (!user) {
    redirect('/');
  }

  // Filter data based on user role
  let filteredSales = mockSales;
  let filteredInventory = mockInventory;
  
  if (user.role === 'manager' && user.storeId) {
    filteredSales = mockSales.filter(sale => sale.storeId === user.storeId);
    filteredInventory = mockInventory.filter(item => item.storeId === user.storeId);
  }

  if (selectedStore !== 'all' && user.role === 'director') {
    filteredSales = filteredSales.filter(sale => sale.storeId === selectedStore);
    filteredInventory = filteredInventory.filter(item => item.storeId === selectedStore);
  }

  // Calculate analytics
  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalUnits = filteredSales.reduce((sum, sale) => sum + sale.quantity, 0);
  const averageOrderValue = filteredSales.length > 0 ? totalRevenue / filteredSales.length : 0;
  
  // Product performance
  const productSales = filteredSales.reduce((acc, sale) => {
    const productId = sale.productId;
    if (!acc[productId]) {
      acc[productId] = {
        product: sale.product,
        quantity: 0,
        revenue: 0,
        orders: 0
      };
    }
    acc[productId].quantity += sale.quantity;
    acc[productId].revenue += sale.totalAmount;
    acc[productId].orders += 1;
    return acc;
  }, {} as Record<string, any>);

  const topProducts = Object.values(productSales)
    .sort((a: any, b: any) => b.revenue - a.revenue)
    .slice(0, 5);

  // Store performance (for directors)
  const storePerformance = user.role === 'director' ? mockStores.map(store => {
    const storeSales = mockSales.filter(sale => sale.storeId === store.id);
    const storeRevenue = storeSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const storeUnits = storeSales.reduce((sum, sale) => sum + sale.quantity, 0);
    return {
      store,
      revenue: storeRevenue,
      units: storeUnits,
      orders: storeSales.length
    };
  }).sort((a, b) => b.revenue - a.revenue) : [];

  // Inventory insights
  const lowStockItems = filteredInventory.filter(item => item.quantity <= item.minStockLevel);
  const overstockItems = filteredInventory.filter(item => item.quantity >= item.maxStockLevel * 0.9);
  const totalInventoryValue = filteredInventory.reduce((sum, item) => sum + (item.quantity * item.product.costPrice), 0);

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
                  {user.role === 'director' ? 'Business Analytics' : 'Store Analytics'}
                </h2>
                <p className="text-gray-600">
                  Comprehensive insights into your business performance.
                </p>
              </div>
              <div className="flex space-x-4">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
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
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600">+12.5%</span>
                    <span>from last period</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalUnits}</div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600">+8.2%</span>
                    <span>from last period</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600">+3.8%</span>
                    <span>from last period</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalInventoryValue.toLocaleString()}</div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <TrendingDown className="w-3 h-3 text-red-600" />
                    <span className="text-red-600">-2.1%</span>
                    <span>from last period</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Top Performing Products</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((item: any, index) => (
                      <div key={item.product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-500">{item.quantity} units sold</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${item.revenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">{item.orders} orders</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Store Performance (Directors only) */}
              {user.role === 'director' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Store className="w-5 h-5" />
                      <span>Store Performance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {storePerformance.map((item, index) => (
                        <div key={item.store.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium">{item.store.name}</p>
                              <p className="text-sm text-gray-500">{item.units} units sold</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${item.revenue.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">{item.orders} orders</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Inventory Insights */}
              <Card className={user.role === 'manager' ? 'lg:col-span-2' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="w-5 h-5" />
                    <span>Inventory Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium text-red-800">Low Stock</span>
                      </div>
                      <p className="text-2xl font-bold text-red-900">{lowStockItems.length}</p>
                      <p className="text-xs text-red-700">items need restocking</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-medium text-yellow-800">Overstock</span>
                      </div>
                      <p className="text-2xl font-bold text-yellow-900">{overstockItems.length}</p>
                      <p className="text-xs text-yellow-700">items overstocked</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-800">Optimal</span>
                      </div>
                      <p className="text-2xl font-bold text-green-900">
                        {filteredInventory.length - lowStockItems.length - overstockItems.length}
                      </p>
                      <p className="text-xs text-green-700">items well-stocked</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">85%</div>
                    <p className="text-sm text-gray-600">Inventory Turnover</p>
                    <Badge variant="outline" className="mt-1">+5% vs last month</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">92%</div>
                    <p className="text-sm text-gray-600">Order Fulfillment</p>
                    <Badge variant="outline" className="mt-1">+2% vs last month</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">78%</div>
                    <p className="text-sm text-gray-600">Customer Satisfaction</p>
                    <Badge variant="outline" className="mt-1">+8% vs last month</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">15%</div>
                    <p className="text-sm text-gray-600">Profit Margin</p>
                    <Badge variant="outline" className="mt-1">+1% vs last month</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}