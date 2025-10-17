import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Plus, Eye, Edit, Trash2, Users, UserCheck, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Customer {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_bookings: number;
  total_spent: string;
  status: string;
  last_booking: string;
  created_at: string;
  avatar?: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      // Get unique customers from bookings table
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('customer_name, customer_email, customer_phone, amount, created_at')
        .order('created_at', { ascending: false });

      if (bookingsError) {
        console.error('Error fetching bookings:', bookingsError);
        return;
      }

      // Process customers data
      const customerMap = new Map();
      
      bookingsData?.forEach(booking => {
        const email = booking.customer_email;
        if (!customerMap.has(email)) {
          customerMap.set(email, {
            customer_name: booking.customer_name,
            customer_email: booking.customer_email,
            customer_phone: booking.customer_phone || 'Not provided',
            total_bookings: 0,
            total_spent: 0,
            last_booking: booking.created_at,
            status: 'Regular'
          });
        }
        
        const customer = customerMap.get(email);
        customer.total_bookings += 1;
        
        // Parse amount (e.g., "$1,500" -> 1500)
        const amountValue = parseFloat(booking.amount?.replace(/[^0-9.]/g, '') || '0');
        customer.total_spent += amountValue;
      });
      // Convert map to array and format data
      const customersData = Array.from(customerMap.values()).map((customer, index) => ({
        id: `CU${String(index + 1).padStart(3, '0')}`,
        customer_name: customer.customer_name,
        customer_email: customer.customer_email,
        customer_phone: customer.customer_phone,
        total_bookings: customer.total_bookings,
        total_spent: `$${customer.total_spent.toLocaleString()}`,
        status: customer.total_bookings >= 5 ? 'VIP' : customer.total_bookings >= 2 ? 'Regular' : 'New',
        last_booking: new Date(customer.last_booking).toISOString().split('T')[0],
        created_at: customer.last_booking,
        avatar: undefined // or provide a default avatar URL if available
      }));

      setCustomers(customersData);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      "VIP": "default",
      "Regular": "secondary",
      "New": "outline"
    } as const;
    return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status}</Badge>;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Calculate stats from real data
  const totalCustomers = customers.length;
  const vipCustomers = customers.filter(c => c.status === 'VIP').length;
  const activeCustomers = customers.filter(c => c.total_bookings > 0).length;
  const newThisMonth = customers.filter(c => {
    const createdDate = new Date(c.created_at);
    const now = new Date();
    return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear();
  }).length;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading customers...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Customers</h1>
            <p className="text-muted-foreground">Manage your customer relationships</p>
          </div>
          <Button className="ocean-gradient text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">{totalCustomers}</h3>
                <p className="text-sm text-muted-foreground">Total Customers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-600">{vipCustomers}</h3>
                <p className="text-sm text-muted-foreground">VIP Customers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <UserCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-600">{activeCustomers}</h3>
                <p className="text-sm text-muted-foreground">Active Customers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <Plus className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-600">{newThisMonth}</h3>
                <p className="text-sm text-muted-foreground">New This Month</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search customers..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Bookings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Bookings</SelectItem>
                  <SelectItem value="5+">5+ Bookings</SelectItem>
                  <SelectItem value="1-4">1-4 Bookings</SelectItem>
                  <SelectItem value="0">No Bookings</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="bookings">Total Bookings</SelectItem>
                  <SelectItem value="spent">Total Spent</SelectItem>
                  <SelectItem value="recent">Last Booking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Booking</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={customer.avatar} alt={customer.customer_name} />
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(customer.customer_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.customer_name}</p>
                          <p className="text-sm text-muted-foreground">{customer.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{customer.customer_email}</p>
                        <p className="text-sm text-muted-foreground">{customer.customer_phone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-semibold">{customer.total_bookings}</TableCell>
                    <TableCell className="font-semibold">{customer.total_spent}</TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell>{customer.last_booking}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Customers;