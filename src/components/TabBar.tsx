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
    <div className="sticky top-0 z-10">
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="flex space-x-6 justify-start border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "pb-2 text-base font-medium transition-colors border-b-2",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
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