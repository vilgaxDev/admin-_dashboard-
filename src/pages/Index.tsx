import { Button } from "@/components/ui/button";
import { Waves, ArrowRight, MapPin, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/20 to-accent/30">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-xl">
              <Waves className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold hero-text">Beachways</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-primary hover:text-primary-glow">
                Sign In
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="ocean-gradient text-white hover:opacity-90">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-foreground leading-tight">
              Your Gateway to 
              <span className="hero-text"> Exceptional Travel</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Professional travel management dashboard for tour operators. 
              Streamline bookings, manage customers, and grow your travel business.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="ocean-gradient text-white px-8 py-6 text-lg hover:opacity-90">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary/5">
                View Demo
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="travel-card p-6 text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Tour Management</h3>
              <p className="text-muted-foreground">
                Create and manage tours to popular destinations like Guangzhou, Beijing, and Shenzhen.
              </p>
            </div>

            <div className="travel-card p-6 text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Secure Bookings</h3>
              <p className="text-muted-foreground">
                Handle customer bookings with secure payment processing and real-time updates.
              </p>
            </div>

            <div className="travel-card p-6 text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mx-auto">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Analytics & Reports</h3>
              <p className="text-muted-foreground">
                Track performance with detailed analytics and automated business reports.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
