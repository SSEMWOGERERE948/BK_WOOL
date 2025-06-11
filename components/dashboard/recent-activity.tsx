'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockSales, mockTransfers, mockUsers } from '@/lib/mock-data';
import { ShoppingCart, ArrowLeftRight, Package, Clock } from 'lucide-react';

export function RecentActivity() {
  const recentSales = mockSales.slice(-3);
  const recentTransfers = mockTransfers.slice(-2);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getManagerInfo = (managerId: string) => {
    return mockUsers.find(user => user.id === managerId);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Recent Sales</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentSales.map((sale) => {
              const manager = getManagerInfo(sale.managerId);
              return (
                <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={manager?.avatar} alt={manager?.name} />
                      <AvatarFallback>
                        {manager?.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{sale.product.name}</p>
                      <p className="text-xs text-gray-500">
                        {sale.store.name} • {sale.quantity} units
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${sale.totalAmount}</p>
                    <p className="text-xs text-gray-500">
                      {sale.salesDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowLeftRight className="w-5 h-5" />
            <span>Recent Transfers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransfers.map((transfer) => (
              <div key={transfer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transfer.product.name}</p>
                    <p className="text-xs text-gray-500">
                      {transfer.fromStore.name} → {transfer.toStore.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(transfer.status)}>
                    {transfer.status}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    {transfer.quantity} units
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}