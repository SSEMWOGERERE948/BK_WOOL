'use client';

import { useAuth } from '@/lib/auth-context';
import { LoginForm } from '@/components/auth/login-form';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { MetricsCards } from '@/components/dashboard/metrics-cards';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { InventoryAlerts } from '@/components/dashboard/inventory-alerts';

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name}!
              </h2>
              <p className="text-gray-600">
                Here's what's happening with your inventory today.
              </p>
            </div>

            <MetricsCards />
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <RecentActivity />
              </div>
              <div className="xl:col-span-1">
                <InventoryAlerts />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}