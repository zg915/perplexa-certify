import { Sparkles, Home, MessageSquare, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onChatClick: () => void;
}

const Sidebar = ({ onChatClick }: SidebarProps) => {
  const sidebarItems = [
    { icon: Sparkles, active: true, action: () => {} },
    { icon: Home, active: false, action: () => {} },
    { icon: MessageSquare, active: false, action: onChatClick },
    { icon: Settings, active: false, action: () => {} },
    { icon: HelpCircle, active: false, action: () => {} },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-12 bg-card border-r border-border flex flex-col items-center py-4 space-y-1 z-40">
      {sidebarItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <button
            key={index}
            onClick={item.action}
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