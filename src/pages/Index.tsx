import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import SearchHeader from "@/components/SearchHeader";
import TabBar from "@/components/TabBar";
import AnswerContent from "@/components/AnswerContent";
import CertificationsGrid from "@/components/CertificationsGrid";
import ChatInput from "@/components/ChatInput";

const Index = () => {
  const [activeTab, setActiveTab] = useState("answer");

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
       <div className="flex-1 ml-12">
        <SearchHeader />
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="transition-all duration-300">
          {activeTab === "answer" && (
            <AnswerContent onNavigateToCertifications={() => setActiveTab("certifications")} />
          )}
          {activeTab === "certifications" && <CertificationsGrid />}
        </div>
      </div>
      
      <ChatInput />
    </div>
  );
};

export default Index;
