import MiniCertificationCard from "./MiniCertificationCard";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface CertificationsGridProps {
  streamedCertifications?: any[];
  loading?: boolean;
  selectedCertification?: any;
  setSelectedCertification?: (cert: any) => void;
  dialogOpen?: boolean;
  setDialogOpen?: (open: boolean) => void;
}

const CertificationsGrid = ({ streamedCertifications = [], loading = false, selectedCertification, setSelectedCertification, dialogOpen, setDialogOpen }: CertificationsGridProps) => {
  const [filter, setFilter] = useState<'all' | 'required' | 'optional'>('all');
  const [region, setRegion] = useState<string>("");
  const [tag, setTag] = useState<string>("");

  const allCount = streamedCertifications.length;
  const requiredCount = streamedCertifications.filter(cert => cert.mandatory).length;
  const optionalCount = streamedCertifications.filter(cert => !cert.mandatory).length;

  // Only use streamedCertifications
  const filteredCertifications = streamedCertifications.filter(cert => {
    if (filter === 'all') return true;
    if (filter === 'required') return cert.mandatory !== undefined ? cert.mandatory : cert.is_required;
    if (filter === 'optional') return cert.mandatory !== undefined ? !cert.mandatory : !cert.is_required;
    return true;
  }).filter(cert => {
    if (region && cert.region !== region) return false;
    if (tag && !(cert.classifications || []).includes(tag)) return false;
    return true;
  });

  // Collect unique regions and tags for dropdowns
  const uniqueRegions = Array.from(new Set(streamedCertifications.map(cert => cert.region).filter(Boolean)));
  const uniqueTags = Array.from(new Set(streamedCertifications.flatMap(cert => cert.classifications || [])));

  const handleCardClick = (certification: any) => {
    if (setSelectedCertification) setSelectedCertification(certification);
    if (setDialogOpen) setDialogOpen(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Filter Pills and Dropdowns */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        {/* Existing filter buttons with counts */}
        <button
          className={`px-4 py-2 rounded-full border border-border text-sm font-medium transition shadow-sm focus:outline-none ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-accent hover:text-accent-foreground'}`}
          onClick={() => setFilter('all')}
        >
          All ({allCount})
        </button>
        <button
          className={`px-4 py-2 rounded-full border border-border text-sm font-medium transition shadow-sm focus:outline-none ${filter === 'required' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-accent hover:text-accent-foreground'}`}
          onClick={() => setFilter('required')}
        >
          Required ({requiredCount})
        </button>
        <button
          className={`px-4 py-2 rounded-full border border-border text-sm font-medium transition shadow-sm focus:outline-none ${filter === 'optional' ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground hover:bg-accent hover:text-accent-foreground'}`}
          onClick={() => setFilter('optional')}
        >
          Optional ({optionalCount})
        </button>
        {/* Region Dropdown with counts */}
        <select
          className="px-4 py-2 rounded-full border border-border text-sm font-medium bg-card transition shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={region}
          onChange={e => setRegion(e.target.value)}
        >
          <option value="">All Regions ({allCount})</option>
          {uniqueRegions.map(r => (
            <option key={r} value={r}>
              {r} ({streamedCertifications.filter(cert => cert.region === r).length})
            </option>
          ))}
        </select>
        {/* Tag Dropdown with counts */}
        <select
          className="px-4 py-2 rounded-full border border-border text-sm font-medium bg-card transition shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={tag}
          onChange={e => setTag(e.target.value)}
        >
          <option value="">All Tags ({allCount})</option>
          {uniqueTags.map(t => (
            <option key={t} value={t}>
              {t} ({streamedCertifications.filter(cert => (cert.classifications || []).includes(t)).length})
            </option>
          ))}
        </select>
      </div>
      {/* Certification Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertifications.map((certification) => (
          <MiniCertificationCard
            key={certification.name}
            cert={certification}
            showLink={true}
            onClick={() => handleCardClick(certification)}
          />
        ))}
        {loading &&
          Array.from({ length: Math.max(0, 6 - filteredCertifications.length) }).map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="flex flex-col p-4 rounded-xl border border-border bg-card shadow-sm max-w-xs min-w-[220px] h-[140px] space-y-2"
            >
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-4 w-1/3 rounded" />
              <Skeleton className="h-3 w-full rounded" />
            </div>
          ))}
      </div>
      {/* Beautiful Dialog for Certification Details */}
      <Dialog open={dialogOpen && !!selectedCertification} onOpenChange={setDialogOpen}>
        <DialogContent key={selectedCertification ? selectedCertification.name + selectedCertification.region : 'empty'}>
          {selectedCertification && (
            <div className="space-y-4 p-2">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                  {selectedCertification.name}
                  {selectedCertification.mandatory && (
                    <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-semibold ml-2">Required</span>
                  )}
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                  {selectedCertification.description}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2">
                {selectedCertification.classifications?.map((tag: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-secondary text-xs font-normal text-foreground/80">{tag}</span>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div><strong>Issuing Body:</strong> {selectedCertification.issuing_body}</div>
                <div><strong>Region:</strong> {selectedCertification.region}</div>
                <div><strong>Validity:</strong> {selectedCertification.validity}</div>
                {selectedCertification.official_link && (
                  <div className="col-span-2"><strong>Source:</strong> <a href={selectedCertification.official_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">{selectedCertification.official_link}</a></div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificationsGrid;