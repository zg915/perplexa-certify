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
  certification: {
    name: string;
    issuing_body: string;
    region: string;
    description: string;
    classifications: string[];
    mandatory: boolean;
    validity: string;
    official_link: string;
  };
  onClick?: () => void;
}

const CertificationCard = ({ certification, onClick }: CertificationCardProps) => {
  return (
    <div
      className="h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group cursor-pointer border border-border rounded-xl p-5 bg-card flex flex-col justify-between"
      onClick={onClick}
    >
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-base">{certification.name}</span>
          {certification.mandatory && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold">Required</span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
        {certification.classifications?.map((tag, i) => (
          <span key={i} className="px-2 py-0.5 rounded-full bg-secondary text-xs">{tag}</span>
        ))}
      </div>
        <div className="text-xs text-muted-foreground">{certification.issuing_body}</div>
        <div className="text-xs text-muted-foreground">{certification.region}</div>
      </div>
      {/* <div className="mb-2 text-sm text-foreground leading-relaxed">{certification.description}</div> */}
     
      <div className="flex flex-col gap-1 mt-auto pt-2 text-xs">
        <div>Validity: {certification.validity}</div>
        {/* <div>Mandatory: {certification.mandatory ? 'Yes' : 'No'}</div> */}
        <div> Source : {certification.official_link && (
          <a href={certification.official_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">{certification.official_link}</a>
        )}</div>
        
      </div>
    </div>
  );
};

export default CertificationCard;