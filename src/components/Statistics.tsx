import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Calendar, MapPin, Award, BookOpen } from "lucide-react";

const stats = [
  {
    title: "Total Workshops",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: BookOpen,
    color: "from-primary to-primary-glow"
  },
  {
    title: "Active Instructors",
    value: "56",
    change: "+8%",
    trend: "up", 
    icon: Users,
    color: "from-accent to-accent-glow"
  },
  {
    title: "Participants",
    value: "15,678",
    change: "+24%",
    trend: "up",
    icon: Award,
    color: "from-workshop-confirmed to-green-400"
  },
  {
    title: "Cities Covered",
    value: "28",
    change: "+2",
    trend: "up",
    icon: MapPin,
    color: "from-workshop-pending to-yellow-400"
  }
];

const recentWorkshops = [
  {
    title: "Data Science Workshop",
    location: "Bangalore",
    participants: 45,
    status: "completed",
    date: "Dec 20, 2024"
  },
  {
    title: "React Development",
    location: "Mumbai", 
    participants: 32,
    status: "ongoing",
    date: "Dec 22, 2024"
  },
  {
    title: "Python Basics",
    location: "Delhi",
    participants: 28,
    status: "upcoming",
    date: "Dec 25, 2024"
  }
];

const topLocations = [
  { city: "Mumbai", workshops: 156, percentage: 85 },
  { city: "Bangalore", workshops: 142, percentage: 78 },
  { city: "Delhi", workshops: 134, percentage: 73 },
  { city: "Chennai", workshops: 98, percentage: 54 },
  { city: "Pune", workshops: 87, percentage: 48 }
];

export const Statistics = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-muted/20 to-accent/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-6">
            Workshop Statistics
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track the impact of our educational workshops across India. 
            See real-time statistics and performance metrics.
          </p>
        </div>

        {/* Main Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className={`glass-card-hover p-6 text-center animate-slide-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${stat.color} mb-4 animate-float`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-muted-foreground mb-2">{stat.title}</p>
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4 text-workshop-confirmed" />
                <span className="text-sm text-workshop-confirmed font-semibold">
                  {stat.change} this month
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Workshops */}
          <Card className="glass-card p-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="h-6 w-6 text-accent" />
              Recent Workshops
            </h3>
            <div className="space-y-4">
              {recentWorkshops.map((workshop, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg bg-gradient-card border border-glass-border animate-slide-in-right`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{workshop.title}</h4>
                    <Badge
                      className={
                        workshop.status === "completed"
                          ? "status-confirmed text-white"
                          : workshop.status === "ongoing"
                          ? "status-pending text-white"
                          : "bg-accent text-accent-foreground"
                      }
                    >
                      {workshop.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {workshop.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {workshop.participants} participants
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{workshop.date}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Locations */}
          <Card className="glass-card p-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-accent" />
              Top Locations
            </h3>
            <div className="space-y-4">
              {topLocations.map((location, index) => (
                <div
                  key={location.city}
                  className={`animate-slide-in-right`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{location.city}</span>
                    <span className="text-sm text-muted-foreground">
                      {location.workshops} workshops
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-accent h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${location.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};