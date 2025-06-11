'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Package, Store } from 'lucide-react';
import { getLowStockItems } from '@/lib/mock-data';

export function InventoryAlerts() {
  const lowStockItems = getLowStockItems();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>Inventory Alerts</span>
          <Badge variant="secondary">{lowStockItems.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {lowStockItems.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">All inventory levels are healthy!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-900">{item.product.name}</p>
                    <div className="flex items-center space-x-2 text-xs text-amber-700">
                      <Store className="w-3 h-3" />
                      <span>{item.store.name}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-amber-900">
                    {item.quantity} / {item.minStockLevel} units
                  </p>
                  <Button size="sm" variant="outline" className="mt-1 text-xs">
                    Request Restock
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}