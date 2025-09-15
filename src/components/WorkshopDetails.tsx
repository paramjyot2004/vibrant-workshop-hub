import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, User, BookOpen } from "lucide-react";

interface Workshop {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  participants: number;
  maxParticipants: number;
  status: "pending" | "confirmed" | "cancelled";
  description: string;
  category: string;
}

const workshops: Workshop[] = [
  {
    id: "1",
    title: "Python Programming Fundamentals",
    instructor: "Dr. Priya Sharma",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "4 hours",
    location: "Mumbai, Maharashtra",
    participants: 25,
    maxParticipants: 30,
    status: "confirmed",
    description: "Introduction to Python programming with hands-on exercises and real-world projects.",
    category: "Programming"
  },
  {
    id: "2",
    title: "Machine Learning Basics",
    instructor: "Prof. Rajesh Kumar",
    date: "2024-01-20",
    time: "2:00 PM",
    duration: "6 hours",
    location: "Delhi, Delhi",
    participants: 18,
    maxParticipants: 25,
    status: "pending",
    description: "Fundamentals of machine learning algorithms and their practical applications.",
    category: "AI/ML"
  },
  {
    id: "3",
    title: "Web Development with React",
    instructor: "Ms. Anita Patel",
    date: "2024-01-25",
    time: "9:00 AM",
    duration: "8 hours",
    location: "Bangalore, Karnataka",
    participants: 20,
    maxParticipants: 20,
    status: "confirmed",
    description: "Build modern web applications using React, hooks, and modern JavaScript.",
    category: "Web Development"
  }
];

const getStatusColor = (status: Workshop["status"]) => {
  switch (status) {
    case "confirmed":
      return "status-confirmed";
    case "pending":
      return "status-pending";
    case "cancelled":
      return "status-cancelled";
    default:
      return "bg-muted";
  }
};

export const WorkshopDetails = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
            Upcoming Workshops
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our educational workshops led by expert instructors. 
            Book your spot and enhance your skills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {workshops.map((workshop, index) => (
            <Card
              key={workshop.id}
              className={`glass-card-hover p-6 animate-slide-in-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <Badge className={`${getStatusColor(workshop.status)} text-white font-semibold`}>
                  {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
                </Badge>
                <Badge variant="outline" className="border-glass-border">
                  {workshop.category}
                </Badge>
              </div>

              <h3 className="text-xl font-bold mb-2">{workshop.title}</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {workshop.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-accent" />
                  <span>{workshop.instructor}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-accent" />
                  <span>{new Date(workshop.date).toLocaleDateString()}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>{workshop.time} ({workshop.duration})</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>{workshop.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-accent" />
                  <span>{workshop.participants}/{workshop.maxParticipants} participants</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 btn-3d bg-gradient-primary hover:shadow-glow"
                  disabled={workshop.participants >= workshop.maxParticipants}
                >
                  {workshop.participants >= workshop.maxParticipants ? "Full" : "Book Now"}
                </Button>
                <Button 
                  variant="outline" 
                  className="glass-card border-glass-border btn-3d"
                >
                  <BookOpen className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="glass-card border-glass-border btn-3d hover:shadow-glow"
          >
            View All Workshops
          </Button>
        </div>
      </div>
    </section>
  );
};