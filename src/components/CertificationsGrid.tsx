import CertificationCard from "./CertificationCard";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface Certification {
  certificate_name: string;
  certificate_description: string;
  legal_regulation: string;
  legal_text_excerpt: string;
  legal_text_meaning: string;
  registration_fee: string;
  is_required: boolean;
}

interface CertificationsGridProps {
  streamedCertifications?: any[];
  loading?: boolean;
}

const CertificationsGrid = ({ streamedCertifications = [], loading = false }: CertificationsGridProps) => {
  const [filter, setFilter] = useState<'all' | 'required' | 'optional'>('all');
  const [selectedCertification, setSelectedCertification] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Only use streamedCertifications
  const filteredCertifications = streamedCertifications.filter(cert => {
    if (filter === 'all') return true;
    if (filter === 'required') return cert.mandatory !== undefined ? cert.mandatory : cert.is_required;
    if (filter === 'optional') return cert.mandatory !== undefined ? !cert.mandatory : !cert.is_required;
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Filter Pills */}
      
      <div className="flex gap-3 mb-6 sticky top-0 bg-background z-10">
        <button
          className={`px-4 py-2 rounded-full border border-border text-sm font-medium transition shadow-sm focus:outline-none ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-accent hover:text-accent-foreground'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-full border border-border text-sm font-medium transition shadow-sm focus:outline-none ${filter === 'required' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-accent hover:text-accent-foreground'}`}
          onClick={() => setFilter('required')}
        >
          Required
        </button>
        <button
          className={`px-4 py-2 rounded-full border border-border text-sm font-medium transition shadow-sm focus:outline-none ${filter === 'optional' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-accent hover:text-accent-foreground'}`}
          onClick={() => setFilter('optional')}
        >
          Optional
        </button>
      </div>
      {/* Certification Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-xl bg-muted" />
            ))
          : filteredCertifications.map((certification, index) => (
              <CertificationCard
                key={index}
                certification={certification}
                onClick={() => { setSelectedCertification(certification); setDialogOpen(true); }}
              />
            ))}
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          {selectedCertification && (
            <div className="space-y-2">
              <DialogHeader>
                <DialogTitle>{selectedCertification.name}</DialogTitle>
                <DialogDescription>{selectedCertification.description}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2"> {selectedCertification.classifications?.map((tag: string, i: number) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-secondary text-xs">{tag}</span>
              ))}</div>
              <div><strong>Issuing Body:</strong> {selectedCertification.issuing_body}</div>
              <div><strong>Region:</strong> {selectedCertification.region}</div>
              <div><strong>Mandatory:</strong> {selectedCertification.mandatory ? 'Yes' : 'No'}</div>
              <div><strong>Validity:</strong> {selectedCertification.validity}</div>
              
              <div><strong>Source: </strong>
              { 
                <a className="text-blue-600 underline" href={selectedCertification.official_link} target="_blank" rel="noopener noreferrer">{selectedCertification.official_link}</a>
              }
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificationsGrid;