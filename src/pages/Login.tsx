import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import travelBg from "@/assets/travel-login-bg.jpg";
import { Waves, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Invalid login credentials");
        return;
      }

      if (data.user) {
        // Check if user has admin role
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (userError || userData?.role !== 'admin') {
          toast.error("Access denied. Admin privileges required.");
          await supabase.auth.signOut();
          return;
        }

        toast.success("Login successful!");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${travelBg})` }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-primary/20"></div>
      
      <div className="relative z-10 w-full max-w-md p-6">
        <Card className="travel-card backdrop-blur-sm bg-card/95">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Waves className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold hero-text">Beachways</h1>
            </div>
            <CardTitle className="text-2xl font-semibold text-foreground">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to access your travel dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email / Username
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background/60 border-border/60 focus:bg-background focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-background/60 border-border/60 focus:bg-background focus:border-primary"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full ocean-gradient text-white font-medium hover:opacity-90 transition-opacity"
                size="lg"
              >
                Sign In
              </Button>

              <div className="flex items-center justify-between text-sm">
                <Button variant="ghost" className="text-primary hover:text-primary-glow p-0 h-auto">
                  Forgot Password?
                </Button>
                <Button variant="ghost" className="text-primary hover:text-primary-glow p-0 h-auto">
                  Sign Up
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-white/80 text-sm mt-6">
          Your gateway to exceptional travel experiences
        </p>
      </div>
    </div>
  );
}; 

export default Login;