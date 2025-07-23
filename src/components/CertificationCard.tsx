import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Certification {
  certificate_name: string;
  certificate_description: string;
  legal_regulation: string;
  legal_text_excerpt: string;
  legal_text_meaning: string;
  registration_fee: string;
  is_required: boolean;
}

interface CertificationCardProps {
  certification: Certification;
}

const CertificationCard = ({ certification }: CertificationCardProps) => {
  return (
    <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg font-semibold leading-tight">
            {certification.certificate_name}
          </CardTitle>
          {certification.is_required && (
            <Badge variant="destructive" className="shrink-0 text-xs">
              Required
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-0">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
          <p className="text-sm text-foreground leading-relaxed">
            {certification.certificate_description}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Legal Regulation</h4>
          <p className="text-sm text-foreground font-medium">
            {certification.legal_regulation}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Legal Text Excerpt</h4>
          <p className="text-sm text-foreground italic border-l-2 border-primary pl-3">
            "{certification.legal_text_excerpt}"
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Meaning</h4>
          <p className="text-sm text-foreground leading-relaxed">
            {certification.legal_text_meaning}
          </p>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Registration Fee</span>
            <span className="text-sm font-semibold text-foreground">
              {certification.registration_fee}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificationCard;