import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, BookOpen, BarChart3, Calendar, Users, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Workshops", href: "#workshops", icon: BookOpen },
  { name: "Statistics", href: "#statistics", icon: BarChart3 },
  { name: "Schedule", href: "#schedule", icon: Calendar },
  { name: "Instructors", href: "#instructors", icon: Users },
];

export const Navigation = () => {
  const [activeItem, setActiveItem] = useState("Home");

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-40 glass-card border-0 border-b border-glass-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                FOSSEE Workshops
              </span>
            </div>

            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className={cn(
                    "btn-3d transition-all duration-300",
                    activeItem === item.name
                      ? "bg-gradient-primary text-primary-foreground"
                      : "hover:bg-glass"
                  )}
                  onClick={() => setActiveItem(item.name)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-40 glass-card border-0 border-b border-glass-border">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                FOSSEE
              </span>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="btn-3d">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-card border-glass-border">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className={cn(
                        "justify-start btn-3d transition-all duration-300",
                        activeItem === item.name
                          ? "bg-gradient-primary text-primary-foreground"
                          : "hover:bg-glass"
                      )}
                      onClick={() => setActiveItem(item.name)}
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navigation */}
      <div className="h-20" />
    </>
  );
};