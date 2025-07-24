import React from "react";

interface MiniCertificationCardProps {
  cert: {
    name: string;
    mandatory: boolean;
    region: string;
    description: string;
    official_link?: string;
  };
  showLink?: boolean;
  onClick?: () => void;
}

const MiniCertificationCard = ({ cert, showLink = false, onClick }: MiniCertificationCardProps) => (
  <div
    className={
      "flex flex-col p-4 rounded-xl border border-border bg-card shadow-sm max-w-xs min-w-[220px] cursor-pointer transition hover:shadow-md hover:border-primary/60 hover:bg-accent/10"
    }
    onClick={onClick}
    title={cert.name}
  >
    <div className="flex items-center gap-2 mb-1">
      <span className="font-semibold truncate">{cert.name}</span>
      {cert.mandatory && (
        <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-semibold">Required</span>
      )}
    </div>
    <span className="text-xs text-muted-foreground border border-border rounded px-2 py-0.5 bg-muted w-fit mb-1">{cert.region}</span>
    <span className="text-xs text-muted-foreground line-clamp-2 mb-1">{cert.description}</span>
    {showLink && cert.official_link && (
      <a
        href={cert.official_link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-xs mt-2 self-end break-all"
      >
        Source
      </a>
    )}
  </div>
);

export default MiniCertificationCard; 