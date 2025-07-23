import { Badge } from "@/components/ui/badge";

interface SimplifiedCertificationProps {
  name: string;
  isRequired: boolean;
  onClick: () => void;
}

const SimplifiedCertification = ({ name, isRequired, onClick }: SimplifiedCertificationProps) => {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-3 bg-card border border-border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors group"
    >
      <span className="text-sm font-medium text-foreground group-hover:text-accent-foreground">
        {name}
      </span>
      {isRequired && (
        <Badge variant="destructive" className="text-xs">
          Required
        </Badge>
      )}
    </div>
  );
};

export default SimplifiedCertification;