import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Session, type Conversation } from "./ChatSessions";
import { Button } from "./ui/button";
import SearchHeader from "./SearchHeader";
import AnswerContent from "./AnswerContent";

interface ConversationHistoryProps {
  session: Session;
  onContinueChat: () => void;
  onNavigateToCertifications: () => void;
}

const ConversationHistory = ({ session, onContinueChat, onNavigateToCertifications }: ConversationHistoryProps) => {
  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  
  const currentConversation = session.conversations[currentConversationIndex];
  const totalConversations = session.conversations.length;

  const goToPrevious = () => {
    if (currentConversationIndex > 0) {
      setCurrentConversationIndex(currentConversationIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentConversationIndex < totalConversations - 1) {
      setCurrentConversationIndex(currentConversationIndex + 1);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full">
      {/* Display current conversation using existing components */}
      <SearchHeader userQuestion={currentConversation.question} />
      
      <AnswerContent
        onNavigateToCertifications={onNavigateToCertifications}
        answer={currentConversation.answer}
        certifications={currentConversation.certifications}
        loading={false}
      />
    </div>
  );
};

export default ConversationHistory;