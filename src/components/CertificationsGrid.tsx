import CertificationCard from "./CertificationCard";

interface Certification {
  certificate_name: string;
  certificate_description: string;
  legal_regulation: string;
  legal_text_excerpt: string;
  legal_text_meaning: string;
  registration_fee: string;
  is_required: boolean;
}

const sampleCertifications: Certification[] = [
  {
    certificate_name: "Health Certificate",
    certificate_description: "A certificate issued by the Export Inspection Council (EIC) of India for food products, including honey, to certify that the consignment meets health and safety standards required by the importing country.",
    legal_regulation: "Export (Quality Control and Inspection) Act, 1963, Section 3",
    legal_text_excerpt: "The EIC is authority to issue Health certificate for notified food products.",
    legal_text_meaning: "EIC is officially empowered to issue health certificates for food products, which may be required by the importing country for customs clearance.",
    registration_fee: "Not specified in the provided sources.",
    is_required: true
  },
  {
    certificate_name: "Organic Certificate",
    certificate_description: "Certification that verifies organic production methods and compliance with organic standards for agricultural products.",
    legal_regulation: "National Programme for Organic Production (NPOP), 2001",
    legal_text_excerpt: "Organic products shall be certified by accredited certification bodies.",
    legal_text_meaning: "All organic products must undergo certification through recognized bodies to ensure compliance with organic farming standards.",
    registration_fee: "₹15,000 - ₹25,000",
    is_required: false
  },
  {
    certificate_name: "Phytosanitary Certificate",
    certificate_description: "Official document issued by plant protection organizations to certify that plants and plant products are free from quarantine pests.",
    legal_regulation: "Plant Quarantine (Regulation of Import into India) Order, 2003",
    legal_text_excerpt: "Import of plants shall be subject to phytosanitary requirements.",
    legal_text_meaning: "All plant imports must meet specific health standards and be accompanied by valid phytosanitary documentation.",
    registration_fee: "₹500 - ₹2,000",
    is_required: true
  }
];

const CertificationsGrid = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleCertifications.map((certification, index) => (
          <CertificationCard
            key={index}
            certification={certification}
          />
        ))}
      </div>
    </div>
  );
};

export default CertificationsGrid;