import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Users, MapPin, BookOpen } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Book workshops based on instructor availability",
    color: "from-primary to-primary-glow"
  },
  {
    icon: Users,
    title: "Instructor Network",
    description: "Connect with qualified workshop instructors",
    color: "from-accent to-accent-glow"
  },
  {
    icon: MapPin,
    title: "Location Mapping",
    description: "Workshops tracked across India with statistics",
    color: "from-workshop-confirmed to-green-400"
  },
  {
    icon: BookOpen,
    title: "Progress Tracking",
    description: "Monitor workshop progress and completion",
    color: "from-workshop-pending to-yellow-400"
  }
];

export const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-background/90" />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full filter blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/30 rounded-full filter blur-3xl animate-pulse-glow" />
      
      {/* Main Content */}
      <div className="relative z-10 text-center mb-16 animate-slide-in-up">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
          FOSSEE Workshop
          <br />
          <span className="text-accent">Booking Platform</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Connect coordinators with instructors. Book educational workshops, 
          track progress, and manage your learning community with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="btn-3d bg-gradient-primary hover:shadow-glow-lg transition-all duration-500"
          >
            Book Workshop
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="glass-card hover:glass-card-hover btn-3d border-glass-border"
          >
            View Statistics
          </Button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card 
            key={feature.title}
            className={`glass-card-hover p-6 text-center animate-slide-in-up`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} mb-4 animate-float`}>
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};