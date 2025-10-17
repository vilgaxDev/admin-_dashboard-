import { TrendingUp, Users, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryData {
  totalBookings: number;
  activeCustomers: number;
  upcomingTours: number;
  revenue: number;
}

interface SummaryCardsProps {
  data: SummaryData;
}

export const SummaryCards = ({ data }: SummaryCardsProps) => {
  const summaryData = [
    {
      title: "Total Bookings",
      value: data.totalBookings.toLocaleString(),
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Calendar,
      period: "this month"
    },
    {
      title: "Active Customers", 
      value: data.activeCustomers.toLocaleString(),
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Users,
      period: "currently"
    },
    {
      title: "Upcoming Tours",
      value: data.upcomingTours.toString(),
      change: "+3",
      changeType: "positive" as const,
      icon: TrendingUp,
      period: "next 30 days"
    },
    {
      title: "Revenue (USD)",
      value: `$${data.revenue.toLocaleString()}`,
      change: "+15.8%",
      changeType: "positive" as const,
      icon: DollarSign,
      period: "this month"
    }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item, index) => (
        <Card key={index} className="dashboard-metric">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
              <div className="flex items-center space-x-2 text-xs">
                <span 
                  className={`font-medium ${
                    item.changeType === 'positive' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}
                >
                  {item.change}
                </span>
                <span className="text-muted-foreground">{item.period}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};