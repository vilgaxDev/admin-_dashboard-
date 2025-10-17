import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Eye, Edit, Trash2, MapPin, Clock, Users, Star } from "lucide-react";

const Tours = () => {
  const tours = [
    {
      id: "TR001",
      name: "Guangzhou Heritage Tour",
      destination: "Guangzhou",
      duration: "3 Days / 2 Nights",
      price: "$1,250",
      capacity: 20,
      booked: 15,
      status: "Active",
      rating: 4.8,
      nextDeparture: "2024-03-15"
    },
    {
      id: "TR002", 
      name: "Beijing Historical Journey",
      destination: "Beijing",
      duration: "5 Days / 4 Nights", 
      price: "$2,100",
      capacity: 25,
      booked: 22,
      status: "Almost Full",
      rating: 4.9,
      nextDeparture: "2024-03-20"
    },
    {
      id: "TR003",
      name: "Shenzhen Modern City",
      destination: "Shenzhen",
      duration: "2 Days / 1 Night",
      price: "$890",
      capacity: 15,
      booked: 8,
      status: "Active",
      rating: 4.6,
      nextDeparture: "2024-03-25"
    },
    {
      id: "TR004",
      name: "Foshan Cultural Experience",
      destination: "Foshan", 
      duration: "4 Days / 3 Nights",
      price: "$1,680",
      capacity: 18,
      booked: 0,
      status: "Draft",
      rating: 0,
      nextDeparture: "2024-04-02"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      "Active": "default",
      "Almost Full": "secondary",
      "Draft": "outline"
    } as const;
    return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status}</Badge>;
  };

  const getAvailabilityColor = (booked: number, capacity: number) => {
    const percentage = (booked / capacity) * 100;
    if (percentage >= 90) return "text-red-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tours & Itineraries</h1>
            <p className="text-muted-foreground">Create and manage tour packages</p>
          </div>
          <Button className="ocean-gradient text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Tour
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">24</h3>
                <p className="text-sm text-muted-foreground">Active Tours</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-600">342</h3>
                <p className="text-sm text-muted-foreground">Total Capacity</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-600">78%</h3>
                <p className="text-sm text-muted-foreground">Avg Occupancy</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center">
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-600">4.7</h3>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Tours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tours..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Destination" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Destinations</SelectItem>
                  <SelectItem value="guangzhou">Guangzhou</SelectItem>
                  <SelectItem value="beijing">Beijing</SelectItem>
                  <SelectItem value="shenzhen">Shenzhen</SelectItem>
                  <SelectItem value="foshan">Foshan</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="almostFull">Almost Full</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="1-2">1-2 Days</SelectItem>
                  <SelectItem value="3-4">3-4 Days</SelectItem>
                  <SelectItem value="5+">5+ Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tours Table */}
        <Card>
          <CardHeader>
            <CardTitle>Tour Packages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tour Name</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Departure</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tours.map((tour) => (
                  <TableRow key={tour.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{tour.name}</p>
                        <p className="text-sm text-muted-foreground">{tour.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {tour.destination}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {tour.duration}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{tour.price}</TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-2 ${getAvailabilityColor(tour.booked, tour.capacity)}`}>
                        <Users className="h-4 w-4" />
                        {tour.booked}/{tour.capacity}
                      </div>
                    </TableCell>
                    <TableCell>
                      {tour.rating > 0 ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {tour.rating}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No rating</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(tour.status)}</TableCell>
                    <TableCell>{tour.nextDeparture}</TableCell>
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

export default Tours;