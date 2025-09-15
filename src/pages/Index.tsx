import { Navigation } from "@/components/Navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Hero } from "@/components/Hero";
import { WorkshopDetails } from "@/components/WorkshopDetails";
import { Statistics } from "@/components/Statistics";
import { ChatBot } from "@/components/ChatBot";
import { NotificationPopup } from "@/components/NotificationPopup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ThemeToggle />
      <NotificationPopup />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="workshops">
          <WorkshopDetails />
        </section>
        
        <section id="statistics">
          <Statistics />
        </section>
      </main>
      
      <ChatBot />
      
      {/* Footer */}
      <footer className="py-12 px-4 border-t border-glass-border bg-gradient-card">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 FOSSEE Workshop Booking Platform. Enhancing education through technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
