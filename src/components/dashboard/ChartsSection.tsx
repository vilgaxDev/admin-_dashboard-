import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const bookingTrendData = [
  { month: "Jan", bookings: 185 },
  { month: "Feb", bookings: 220 },
  { month: "Mar", bookings: 195 },
  { month: "Apr", bookings: 285 },
  { month: "May", bookings: 310 },
  { month: "Jun", bookings: 375 }
];

const destinationData = [
  { name: "Guangzhou", value: 35, color: "hsl(194, 95%, 45%)" },
  { name: "Foshan", value: 25, color: "hsl(180, 85%, 55%)" },
  { name: "Beijing", value: 20, color: "hsl(194, 75%, 65%)" },
  { name: "Shenzhen", value: 15, color: "hsl(180, 65%, 75%)" },
  { name: "Others", value: 5, color: "hsl(194, 45%, 85%)" }
];

export const ChartsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Bookings Trend Chart */}
      <Card className="travel-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Bookings Trend</CardTitle>
          <CardDescription>Monthly booking performance over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bookingTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="hsl(194, 95%, 45%)" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(194, 95%, 45%)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'hsl(194, 95%, 45%)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Popular Destinations Pie Chart */}
      <Card className="travel-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Popular Destinations</CardTitle>
          <CardDescription>Distribution of bookings by destination</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={destinationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {destinationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Bookings']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {destinationData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};