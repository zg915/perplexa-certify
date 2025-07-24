import { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import SearchHeader from "@/components/SearchHeader";
import TabBar from "@/components/TabBar";
import AnswerContent from "@/components/AnswerContent";
import CertificationsGrid from "@/components/CertificationsGrid";
import ChatInput from "@/components/ChatInput";
import ChatSessions, { type Session } from "@/components/ChatSessions";
import ConversationHistory from "@/components/ConversationHistory";

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

interface QA {
  question: string;
  answer: string;
  certifications: Flashcard[];
}

const Index = () => {
  const [activeTab, setActiveTab] = useState("answer");
  const [answer, setAnswer] = useState("");
  const [certifications, setCertifications] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");

  const [selectedCertification, setSelectedCertification] = useState<Flashcard | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);


  const handleStream = (ans: string, certs: Flashcard[], isLoading?: boolean, question?: string) => {
    setAnswer(ans);
    setCertifications(certs);
    if (typeof isLoading === 'boolean') setLoading(isLoading);
    if (question) setUserQuestion(question);
    setViewMode("chat"); // Switch back to chat mode when new response comes
  };

  const handleChatClick = () => {
    setShowChatSessions(!showChatSessions);
  };

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
    setViewMode("history");
    setActiveTab("answer"); // Switch to answer tab to show conversation
  };

  const handleContinueChat = () => {
    setViewMode("chat");
    setSelectedSession(null);
  };

  // Handler for clicking a certification pill in AnswerContent
  const handlePillClick = (cert: Flashcard | null) => {
    setActiveTab("certifications");
    if (cert) {
      setSelectedCertification(cert);
      setDialogOpen(true);
    }
  };

  // Auto-scroll to bottom on new Q&A
  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [certifications, answer, loading]);

  return (
    <div className="min-h-screen bg-background flex">

      <Sidebar />
      <div className="flex-1 ml-12 flex flex-col h-screen">
        <SearchHeader userQuestion={userQuestion} />
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="transition-all duration-300">
          {activeTab === "certifications" && (
            <CertificationsGrid
              streamedCertifications={certifications}
              loading={loading}
              selectedCertification={selectedCertification}
              setSelectedCertification={setSelectedCertification}
              dialogOpen={dialogOpen}
              setDialogOpen={setDialogOpen}
            />
          )}
          {activeTab === "answer" && (
            <AnswerContent
              onCertificationPillClick={handlePillClick}
              answer={answer}
              certifications={certifications}
              loading={loading}

            />
          ) : (
            <>
              {activeTab === "certifications" && <CertificationsGrid streamedCertifications={certifications} loading={loading} />}
              {activeTab === "answer" && (
                <AnswerContent
                  onNavigateToCertifications={() => setActiveTab("certifications")}
                  answer={answer}
                  certifications={certifications}
                  loading={loading}
                />
              )}
            </>
          )}
        </div>
      </div>
      <ChatInput onStream={(ans, certs, isLoading, question) => handleStream(ans, certs, isLoading, question)} />
    </div>
  );
};

export default Index;
