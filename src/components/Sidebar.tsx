import { Sparkles, Home, MessageSquare, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const sidebarItems = [
    { icon: Sparkles, active: true },
    { icon: Home, active: false },
    { icon: MessageSquare, active: false },
    { icon: Settings, active: false },
    { icon: HelpCircle, active: false },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-12 bg-card border-r border-border flex flex-col items-center py-4 space-y-2">
      {sidebarItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
              item.active 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;