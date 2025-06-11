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
import { mockTransfers, mockStores } from '@/lib/mock-data';
import { ArrowLeftRight, Search, Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function TransfersPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [storeFilter, setStoreFilter] = useState('all');

  if (!user) {
    redirect('/');
  }

  // Filter transfers based on user role
  let filteredTransfers = mockTransfers;
  
  if (user.role === 'manager' && user.storeId) {
    filteredTransfers = mockTransfers.filter(transfer => 
      transfer.fromStoreId === user.storeId || transfer.toStoreId === user.storeId
    );
  }

  // Apply filters
  if (searchTerm) {
    filteredTransfers = filteredTransfers.filter(transfer =>
      transfer.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.fromStore.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transfer.toStore.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (statusFilter !== 'all') {
    filteredTransfers = filteredTransfers.filter(transfer => transfer.status === statusFilter);
  }

  if (storeFilter !== 'all') {
    filteredTransfers = filteredTransfers.filter(transfer => 
      transfer.fromStoreId === storeFilter || transfer.toStoreId === storeFilter
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'approved':
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate stats
  const pendingCount = filteredTransfers.filter(t => t.status === 'pending').length;
  const completedCount = filteredTransfers.filter(t => t.status === 'completed').length;
  const totalQuantity = filteredTransfers.reduce((sum, t) => sum + t.quantity, 0);

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
                  Transfer Management
                </h2>
                <p className="text-gray-600">
                  Track and manage inventory transfers between stores.
                </p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Request Transfer
              </Button>
            </div>

            {/* Transfer Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Transfers</CardTitle>
                  <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{filteredTransfers.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pendingCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completedCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Units Transferred</CardTitle>
                  <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalQuantity}</div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search transfers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  {user.role === 'director' && (
                    <Select value={storeFilter} onValueChange={setStoreFilter}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by store" />
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

            {/* Transfers List */}
            <div className="space-y-4">
              {filteredTransfers.map((transfer) => (
                <Card key={transfer.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <ArrowLeftRight className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{transfer.product.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>{transfer.fromStore.name}</span>
                            <ArrowLeftRight className="w-3 h-3" />
                            <span>{transfer.toStore.name}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Requested: {transfer.requestDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(transfer.status)}
                          <Badge className={getStatusColor(transfer.status)}>
                            {transfer.status}
                          </Badge>
                        </div>
                        <p className="text-lg font-bold">{transfer.quantity} units</p>
                        {transfer.notes && (
                          <p className="text-xs text-gray-500 mt-1 max-w-xs">
                            {transfer.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    {transfer.status === 'pending' && user.role === 'director' && (
                      <div className="flex space-x-2 mt-4 pt-4 border-t">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve Transfer
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                          Reject Transfer
                        </Button>
                      </div>
                    )}

                    {transfer.status === 'approved' && (
                      <div className="flex space-x-2 mt-4 pt-4 border-t">
                        <Button size="sm">
                          Mark as Completed
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTransfers.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <ArrowLeftRight className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No transfers found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}