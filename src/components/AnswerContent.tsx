import SimplifiedCertification from "./SimplifiedCertification";
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
  onNavigateToCertifications: () => void;
  answer: string;
  certifications: Flashcard[];
  loading?: boolean;
}

const AnswerContent = ({ onNavigateToCertifications, answer, certifications, loading }: AnswerContentProps) => {
  const maxPills = 3;
  const showMore = certifications.length > maxPills;
  const visibleCerts = certifications.slice(0, maxPills);
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 pb-24">
      <div className="space-y-6">
        {/* Certification Pills Row */}
        {loading ? (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-32 rounded-full bg-muted" />
            ))}
          </div>
        ) : certifications.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {visibleCerts.map((cert, index) => (
              <div
                key={index}
                className={
                  "flex items-center px-4 py-2 rounded-full border border-border bg-card text-foreground text-sm font-medium whitespace-nowrap shadow-sm transition hover:bg-accent hover:text-accent-foreground" +
                  (cert.mandatory ? " border-red-400" : "")
                }
                onClick={onNavigateToCertifications}
                style={{ cursor: 'pointer' }}
              >
                {cert.name}
                {cert.mandatory && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold">Required</span>
                )}
              </div>
            ))}
            {showMore && (
              <button
                onClick={onNavigateToCertifications}
                className="px-4 py-2 rounded-full border border-border bg-muted text-sm font-medium hover:bg-accent transition"
              >
                Show more
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