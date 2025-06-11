'use client';

import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUsers, mockStores, mockSales } from '@/lib/mock-data';
import { Users, Search, Plus, Mail, Shield, Store, DollarSign } from 'lucide-react';
import { useState } from 'react';

export default function UsersPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  if (!user) {
    redirect('/');
  }

  // Only directors can access this page
  if (user.role !== 'director') {
    redirect('/dashboard');
  }

  // Filter users
  let filteredUsers = mockUsers;

  if (searchTerm) {
    filteredUsers = filteredUsers.filter(u =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const getUserStore = (userId: string) => {
    const userRecord = mockUsers.find(u => u.id === userId);
    if (userRecord?.storeId) {
      return mockStores.find(s => s.id === userRecord.storeId);
    }
    return null;
  };

  const getUserSales = (userId: string) => {
    return mockSales.filter(sale => sale.managerId === userId);
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'director' 
      ? 'bg-purple-100 text-purple-800' 
      : 'bg-blue-100 text-blue-800';
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
                  User Management
                </h2>
                <p className="text-gray-600">
                  Manage system users and their access permissions.
                </p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockUsers.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Directors</CardTitle>
                  <Shield className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockUsers.filter(u => u.role === 'director').length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Managers</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockUsers.filter(u => u.role === 'manager').length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockUsers.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Users List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredUsers.map((userRecord) => {
                const userStore = getUserStore(userRecord.id);
                const userSales = getUserSales(userRecord.id);
                const totalRevenue = userSales.reduce((sum, sale) => sum + sale.totalAmount, 0);
                
                return (
                  <Card key={userRecord.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={userRecord.avatar} alt={userRecord.name} />
                            <AvatarFallback>
                              {userRecord.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{userRecord.name}</CardTitle>
                            <p className="text-sm text-gray-600">{userRecord.email}</p>
                          </div>
                        </div>
                        <Badge className={getRoleBadgeColor(userRecord.role)}>
                          {userRecord.role}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* User Info */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span>{userRecord.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Shield className="w-4 h-4" />
                            <span>Role: {userRecord.role.charAt(0).toUpperCase() + userRecord.role.slice(1)}</span>
                          </div>
                          {userStore && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Store className="w-4 h-4" />
                              <span>Store: {userStore.name}</span>
                            </div>
                          )}
                        </div>

                        {/* Performance (for managers) */}
                        {userRecord.role === 'manager' && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-3">Performance Overview</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-600">Total Sales</p>
                                <p className="font-bold">{userSales.length}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Revenue</p>
                                <p className="font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Units Sold</p>
                                <p className="font-bold">
                                  {userSales.reduce((sum, sale) => sum + sale.quantity, 0)}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Avg Order</p>
                                <p className="font-bold">
                                  ${userSales.length > 0 ? (totalRevenue / userSales.length).toFixed(2) : '0.00'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Director Overview */}
                        {userRecord.role === 'director' && (
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2 text-purple-800">System Administrator</h4>
                            <p className="text-sm text-purple-700">
                              Full access to all stores, inventory, and user management.
                            </p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex space-x-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            Edit User
                          </Button>
                          {userRecord.role === 'manager' && (
                            <Button variant="outline" size="sm" className="flex-1">
                              View Store
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredUsers.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No users found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}