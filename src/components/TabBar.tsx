import { cn } from "@/lib/utils";

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  const tabs = [
    { id: "answer", label: "Answer" },
    { id: "certifications", label: "Certifications" },
  ];

  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="flex space-x-1 py-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                "hover:bg-accent hover:text-accent-foreground",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabBar;