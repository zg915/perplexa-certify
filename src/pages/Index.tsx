import { useState } from "react";
import SearchHeader from "@/components/SearchHeader";
import TabBar from "@/components/TabBar";
import AnswerContent from "@/components/AnswerContent";
import CertificationsGrid from "@/components/CertificationsGrid";

const Index = () => {
  const [activeTab, setActiveTab] = useState("answer");

  return (
    <div className="min-h-screen bg-background">
      <SearchHeader />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="transition-all duration-300">
        {activeTab === "answer" && (
          <AnswerContent onNavigateToCertifications={() => setActiveTab("certifications")} />
        )}
        {activeTab === "certifications" && <CertificationsGrid />}
      </div>
    </div>
  );
};

export default Index;
