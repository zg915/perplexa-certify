import SimplifiedCertification from "./SimplifiedCertification";
  interface AnswerContentProps {
  onNavigateToCertifications: () => void;
}

const sampleCertifications = [
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

const AnswerContent = ({ onNavigateToCertifications }: AnswerContentProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 pb-24">
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-foreground leading-relaxed mb-4">
            The field of artificial intelligence continues to evolve rapidly with several groundbreaking developments:
          </p>
          
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold mb-2">Large Language Models</h3>
              <p className="text-muted-foreground">
                Advanced language models are becoming more capable, with improvements in reasoning, 
                multimodal understanding, and specialized domain knowledge.
              </p>
            </div>
            
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold mb-2">AI Safety & Alignment</h3>
              <p className="text-muted-foreground">
                Significant progress in ensuring AI systems behave safely and align with human values, 
                including constitutional AI and reinforcement learning from human feedback.
              </p>
            </div>
            
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold mb-2">Multimodal AI</h3>
              <p className="text-muted-foreground">
                Integration of vision, language, and audio capabilities in unified models that can 
                understand and generate content across multiple modalities.
              </p>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">Certifications</h2>
          <div className="space-y-3">
            {sampleCertifications.map((certification, index) => (
              <SimplifiedCertification
                key={index}
                name={certification.certificate_name}
                isRequired={certification.is_required}
                onClick={onNavigateToCertifications}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerContent;