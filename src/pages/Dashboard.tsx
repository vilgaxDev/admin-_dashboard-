import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { ChartsSection } from "@/components/dashboard/ChartsSection";
import { TablesSection } from "@/components/dashboard/TablesSection";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { supabase } from "@/lib/supabase";

interface DashboardData {
  totalBookings: number;
  activeCustomers: number;
  upcomingTours: number;
  revenue: number;
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalBookings: 0,
    activeCustomers: 0,
    upcomingTours: 0,
    revenue: 0
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [upcomingToursData, setUpcomingToursData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total bookings
        const { count: totalBookings } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true });

        // Fetch active customers (customers with bookings in the last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const { count: activeCustomers } = await supabase
          .from('bookings')
          .select('customer_email', { count: 'exact', head: true })
          .gte('created_at', thirtyDaysAgo.toISOString());

        // Fetch upcoming tours (bookings in the next 30 days)
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
        
        const { count: upcomingTours } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .gte('tour_date', new Date().toISOString())
          .lte('tour_date', thirtyDaysFromNow.toISOString());

        // Fetch total revenue
        const { data: revenueData } = await supabase
          .from('bookings')
          .select('total_amount')
          .eq('status', 'confirmed');

        const revenue = revenueData?.reduce((sum, booking) => sum + (booking.total_amount || 0), 0) || 0;

        // Fetch recent bookings (last 5 bookings)
        const { data: recentBookingsData } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        // Fetch upcoming tours data for the tables
        const { data: upcomingToursData } = await supabase
          .from('bookings')
          .select('tour_name, tour_date, duration, capacity, booked')
          .gte('tour_date', new Date().toISOString())
          .lte('tour_date', thirtyDaysFromNow.toISOString())
          .order('tour_date', { ascending: true });

        setDashboardData({
          totalBookings: totalBookings || 0,
          activeCustomers: activeCustomers || 0,
          upcomingTours: upcomingTours || 0,
          revenue: revenue
        });
        
        setRecentBookings(recentBookingsData || []);
        setUpcomingToursData(upcomingToursData || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your travel business today.
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards data={dashboardData} />

        {/* Charts and Analytics */}
        <ChartsSection />

        {/* Tables and Quick Actions */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3">
            <TablesSection 
              recentBookings={recentBookings}
              upcomingTours={upcomingToursData}
            />
          </div>
          <div className="xl:col-span-1">
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;