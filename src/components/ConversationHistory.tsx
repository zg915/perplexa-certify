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
      {/* Session Navigation Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{session.title}</h2>
            <p className="text-sm text-muted-foreground">
              {formatDate(session.date)} • Conversation {currentConversationIndex + 1} of {totalConversations}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              disabled={currentConversationIndex === 0}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              disabled={currentConversationIndex === totalConversations - 1}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={onContinueChat}
              size="sm"
            >
              Continue Chat
            </Button>
          </div>
        </div>
      </div>

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