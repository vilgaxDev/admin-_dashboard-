import { Plus, Calendar, FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const quickActions = [
  {
    title: "Add New Booking",
    description: "Create a booking for a customer",
    icon: Plus,
    action: () => console.log("Add booking"),
    variant: "default" as const
  },
  {
    title: "Add New Tour",
    description: "Create a new tour package",
    icon: Calendar,
    action: () => console.log("Add tour"),
    variant: "secondary" as const
  },
  {
    title: "Generate Report", 
    description: "Create business analytics report",
    icon: FileText,
    action: () => console.log("Generate report"),
    variant: "outline" as const
  },
  {
    title: "Manage Customers",
    description: "View and edit customer profiles",
    icon: Users,
    action: () => console.log("Manage customers"),
    variant: "ghost" as const
  }
];

export const QuickActions = () => {
  return (
    <Card className="travel-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        <CardDescription>Frequently used operations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            className="w-full justify-start h-auto p-4 text-left"
            onClick={action.action}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg mt-1">
                <action.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {action.description}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};