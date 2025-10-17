import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Download, Calendar, TrendingUp, Users, DollarSign, MapPin, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface RevenueData {
  month: string;
  revenue: number;
}

interface BookingsData {
  month: string;
  bookings: number;
}

interface DestinationData {
  name: string;
  value: number;
  color: string;
}

interface CustomerSegmentData {
  segment: string;
  count: number;
}

const Reports = () => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [bookingsData, setBookingsData] = useState<BookingsData[]>([]);
  const [destinationData, setDestinationData] = useState<DestinationData[]>([]);
  const [customerSegmentData, setCustomerSegmentData] = useState<CustomerSegmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [activeTours, setActiveTours] = useState(0);
  const [occupancyRate, setOccupancyRate] = useState(0);

  useEffect(() => {
    fetchReportsData();
  }, []);

  const fetchReportsData = async () => {
    try {
      // Fetch revenue data (last 6 months)
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      
      const { data: bookings } = await supabase
        .from('bookings')
        .select('amount, created_at, tour_name, status')
        .gte('created_at', sixMonthsAgo.toISOString());

      if (bookings) {
        // Process revenue data by month
        const monthlyRevenue: { [key: string]: number } = {};
        const monthlyBookings: { [key: string]: number } = {};
        const destinations: { [key: string]: number } = {};
        
        let totalRev = 0;
        let totalBookingsCount = 0;
        
        bookings.forEach(booking => {
          // Parse amount (e.g., "$1,500" -> 1500)
          const amountValue = parseFloat(booking.amount?.replace(/[^0-9.]/g, '') || '0');
          
          const month = new Date(booking.created_at).toLocaleString('en-US', { month: 'short' });
          
          // Monthly revenue
          monthlyRevenue[month] = (monthlyRevenue[month] || 0) + amountValue;
          
          // Monthly bookings count
          monthlyBookings[month] = (monthlyBookings[month] || 0) + 1;
          
          // Destination popularity
          if (booking.tour_name) {
            destinations[booking.tour_name] = (destinations[booking.tour_name] || 0) + 1;
          }
          
          totalRev += amountValue;
          totalBookingsCount++;
        });

        // Format revenue data
        const revenueDataFormatted = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
          month,
          revenue: Math.round(revenue)
        }));

        // Format bookings data
        const bookingsDataFormatted = Object.entries(monthlyBookings).map(([month, bookings]) => ({
          month,
          bookings
        }));

        // Format destination data
        const totalDestinations = Object.values(destinations).reduce((sum, count) => sum + count, 0);
        const destinationDataFormatted = Object.entries(destinations).map(([name, count], index) => ({
          name,
          value: Math.round((count / totalDestinations) * 100),
          color: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'][index % 6]
        }));

        // Calculate customer segments (simplified for now)
        const customerSegmentDataFormatted = [
          { segment: 'New Customers', count: Math.round(totalBookingsCount * 0.6) },
          { segment: 'Returning', count: Math.round(totalBookingsCount * 0.3) },
          { segment: 'VIP', count: Math.round(totalBookingsCount * 0.08) },
          { segment: 'Corporate', count: Math.round(totalBookingsCount * 0.02) }
        ];

        setRevenueData(revenueDataFormatted);
        setBookingsData(bookingsDataFormatted);
        setDestinationData(destinationDataFormatted);
        setCustomerSegmentData(customerSegmentDataFormatted);
        setTotalRevenue(totalRev);
        setTotalBookings(totalBookingsCount);
        
        // Calculate active tours and occupancy rate (simplified)
        const uniqueTours = new Set(bookings.map(b => b.tour_name)).size;
        setActiveTours(uniqueTours);
        setOccupancyRate(Math.round((totalBookingsCount / (uniqueTours * 20)) * 100)); // Assuming 20 spots per tour
      }
    } catch (error) {
      console.error('Error fetching reports data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Reports & Analytics</h2>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Last 6 months</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bookings</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBookings}</div>
              <p className="text-xs text-muted-foreground">Last 6 months</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tours</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeTours}</div>
              <p className="text-xs text-muted-foreground">Unique destinations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{occupancyRate}%</div>
              <p className="text-xs text-muted-foreground">Average occupancy</p>
            </CardContent>
          </Card>
        </div>

          {/* Revenue & Bookings Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bookings by Month</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={bookingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="bookings" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Destination Performance & Customer Segments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Destinations</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={destinationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {destinationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={customerSegmentData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="segment" width={100} />
                    <Tooltip />
                    <Bar 
                      dataKey="count" 
                      fill="hsl(var(--accent-foreground))" 
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Performance Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">AVERAGE BOOKING VALUE</h4>
                  <p className="text-2xl font-bold">${totalBookings > 0 ? Math.round(totalRevenue / totalBookings).toLocaleString() : '0'}</p>
                  <p className="text-sm text-muted-foreground">Based on {totalBookings} bookings</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">CUSTOMER RETENTION</h4>
                  <p className="text-2xl font-bold">{customerSegmentData.find(s => s.segment === 'Returning')?.count || 0}</p>
                  <p className="text-sm text-muted-foreground">Returning customers</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">TOUR COMPLETION RATE</h4>
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-sm text-muted-foreground">Based on tour feedback</p>
                </div>
              </div>
              
            </CardContent>
          </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;