import MiniCertificationCard from "./MiniCertificationCard";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Flashcard {
  name: string;
  issuing_body: string;
  region: string;
  description: string;
  classifications: string[];
  mandatory: boolean;
  validity: string;
  official_link: string;
}

interface AnswerContentProps {
  onCertificationPillClick: (cert: any) => void;
  answer: string;
  certifications: any[];
  loading?: boolean;
}

const AnswerContent = ({ onCertificationPillClick, answer, certifications, loading }: AnswerContentProps) => {
  const maxPills = 3;
  const showMore = certifications.length > maxPills;
  const visibleCerts = certifications.slice(0, maxPills);
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 pb-24">
      <div className="space-y-6">
        {/* Certification Pills Row */}
        {loading ? (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col p-4 rounded-xl border border-border bg-card shadow-sm max-w-xs min-w-[220px] h-[140px] space-y-2"
              >
                <Skeleton className="h-5 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
                <Skeleton className="h-4 w-1/3 rounded" />
                <Skeleton className="h-3 w-full rounded" />
              </div>
            ))}
          </div>
        ) : certifications.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {visibleCerts.map((cert, index) => (
              <MiniCertificationCard
                key={index}
                cert={cert}
                showLink={false}
                onClick={() => onCertificationPillClick(cert)}
              />
            ))}
            {showMore && (
              <button
                onClick={() => onCertificationPillClick(null)}
                className="flex flex-col justify-center items-center px-3 py-1.5 rounded-xl border border-border bg-muted text-sm font-medium shadow-sm transition hover:bg-accent hover:text-accent-foreground min-w-[72px]"
              >
                <span>Show more</span>
                <span className="text-lg">→</span>
              </button>
            )}
          </div>
        )}
        <div className="bg-card border border-border rounded-xl p-6 min-h-[120px]">
          {loading ? (
            <Skeleton className="h-6 w-3/4 mb-2 bg-muted" />
          ) : (
            <p className="text-foreground leading-relaxed mb-4">
              {answer || <span className="text-muted-foreground">Ask a question to get started...</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnswerContent;