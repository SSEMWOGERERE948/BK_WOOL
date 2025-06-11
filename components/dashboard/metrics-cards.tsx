'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Store, 
  ShoppingCart, 
  DollarSign, 
  AlertTriangle, 
  ArrowLeftRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { mockProducts, mockStores, mockSales, mockInventory, mockTransfers } from '@/lib/mock-data';

export function MetricsCards() {
  const totalProducts = mockProducts.length;
  const totalStores = mockStores.length;
  const totalSales = mockSales.reduce((sum, sale) => sum + sale.quantity, 0);
  const totalRevenue = mockSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const lowStockItems = mockInventory.filter(item => item.quantity <= item.minStockLevel).length;
  const pendingTransfers = mockTransfers.filter(t => t.status === 'pending').length;

  const metrics = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Active Stores',
      value: totalStores,
      icon: Store,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: '+5%',
      changeType: 'increase'
    },
    {
      title: 'Total Sales',
      value: totalSales,
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+18%',
      changeType: 'increase'
    },
    {
      title: 'Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+23%',
      changeType: 'increase'
    },
    {
      title: 'Low Stock Items',
      value: lowStockItems,
      icon: AlertTriangle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      change: '-8%',
      changeType: 'decrease'
    },
    {
      title: 'Pending Transfers',
      value: pendingTransfers,
      icon: ArrowLeftRight,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '+15%',
      changeType: 'increase'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {metric.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${metric.bgColor}`}>
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900">
                {metric.value}
              </div>
              <div className="flex items-center space-x-1">
                {metric.changeType === 'increase' ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <Badge 
                  variant={metric.changeType === 'increase' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {metric.change}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}