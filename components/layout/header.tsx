'use client';

import { Bell, Search, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import { getLowStockItems, getPendingTransfers } from '@/lib/mock-data';

export function Header() {
  const { user } = useAuth();
  const lowStockItems = getLowStockItems();
  const pendingTransfers = getPendingTransfers();
  const totalAlerts = lowStockItems.length + pendingTransfers.length;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {user?.role === 'director' ? 'Director Dashboard' : 'Store Manager Dashboard'}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search products, stores..."
              className="pl-10 w-64"
            />
          </div>

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            {totalAlerts > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
              >
                {totalAlerts}
              </Badge>
            )}
          </Button>

          {totalAlerts > 0 && (
            <div className="flex items-center space-x-2 bg-amber-50 px-3 py-2 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-800">
                {totalAlerts} alert{totalAlerts > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}