import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import SearchHeader from "@/components/SearchHeader";
import TabBar from "@/components/TabBar";
import AnswerContent from "@/components/AnswerContent";
import CertificationsGrid from "@/components/CertificationsGrid";
import ChatInput from "@/components/ChatInput";
import ChatSessions from "@/components/ChatSessions";

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

const Index = () => {
  const [activeTab, setActiveTab] = useState("answer");
  const [answer, setAnswer] = useState("");
  const [certifications, setCertifications] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [showChatSessions, setShowChatSessions] = useState(false);

  const handleStream = (ans: string, certs: Flashcard[], isLoading?: boolean, question?: string) => {
    setAnswer(ans);
    setCertifications(certs);
    if (typeof isLoading === 'boolean') setLoading(isLoading);
    if (question) setUserQuestion(question);
  };

  const handleChatClick = () => {
    setShowChatSessions(!showChatSessions);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar onChatClick={handleChatClick} />
      <ChatSessions isOpen={showChatSessions} onClose={() => setShowChatSessions(false)} />

      <div className="flex-1 ml-12">
        <SearchHeader userQuestion={userQuestion} />

        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="transition-all duration-300">
          {activeTab === "certifications" && <CertificationsGrid streamedCertifications={certifications} loading={loading} />}
          {activeTab === "answer" && (
            <AnswerContent
              onNavigateToCertifications={() => setActiveTab("certifications")}
              answer={answer}
              certifications={certifications}
              loading={loading}
            />
          )}
          
        </div>
      </div>
      
      <ChatInput onStream={(ans, certs, isLoading, question) => handleStream(ans, certs, isLoading, question)} />
    </div>
  );
};

export default Index;
