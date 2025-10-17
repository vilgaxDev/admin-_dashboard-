import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface Booking {
  id: string;
  customer_name: string;
  tour_name: string;
  tour_date: string;
  status: string;
  amount: number;
}

export interface Tour {
  tour_name: string;
  tour_date: string;
  duration: string;
  capacity: number;
  booked: number;
}

export interface TablesSectionProps {
  recentBookings: Booking[];
  upcomingTours: Tour[];
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>;
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    case "cancelled":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getAvailabilityBadge = (available: number) => {
  if (available === 0) {
    return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Full</Badge>;
  } else if (available <= 3) {
    return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Limited</Badge>;
  } else {
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>;
  }
};

export const TablesSection = ({ recentBookings, upcomingTours }: TablesSectionProps) => {
  return (
    <div className="space-y-8">
      {/* Recent Bookings Table */}
      <Card className="travel-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Bookings</CardTitle>
          <CardDescription>Latest customer bookings and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Tour</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-accent/50">
                  <TableCell className="font-mono text-sm">{booking.id}</TableCell>
                  <TableCell className="font-medium">{booking.customer_name}</TableCell>
                  <TableCell>{booking.tour_name}</TableCell>
                  <TableCell className="text-muted-foreground">{booking.tour_date}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell className="text-right font-semibold">${booking.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upcoming Tours Table */}
      <Card className="travel-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Upcoming Tours</CardTitle>
          <CardDescription>Tours scheduled for the next 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Booked/Capacity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingTours.map((tour, index) => (
                <TableRow key={index} className="hover:bg-accent/50">
                  <TableCell className="font-medium">{tour.tour_name}</TableCell>
                  <TableCell className="text-muted-foreground">{tour.tour_date}</TableCell>
                  <TableCell>{tour.duration}</TableCell>
                  <TableCell>
                    <span className="font-medium">{tour.booked}</span>
                    <span className="text-muted-foreground">/{tour.capacity}</span>
                  </TableCell>
                  <TableCell>{getAvailabilityBadge(tour.capacity - tour.booked)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};