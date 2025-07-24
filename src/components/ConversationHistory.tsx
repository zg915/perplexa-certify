import { Clock, User, Bot } from "lucide-react";
import { type Session, type Conversation } from "./ChatSessions";
import { Button } from "./ui/button";

interface ConversationHistoryProps {
  session: Session;
  onContinueChat: () => void;
}

const ConversationHistory = ({ session, onContinueChat }: ConversationHistoryProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Session Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-foreground">{session.title}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {formatDate(session.date)} • {session.conversations.length} conversations
        </p>
      </div>

      {/* Conversation Thread */}
      <div className="space-y-6">
        {session.conversations.map((conversation, index) => (
          <div key={conversation.id} className="space-y-4">
            {/* User Question */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="bg-accent/50 rounded-lg p-4">
                  <p className="text-foreground">{conversation.question}</p>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {formatTime(conversation.timestamp)}
                </div>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-foreground whitespace-pre-wrap">{conversation.answer}</p>
                  
                  {/* Certifications */}
                  {conversation.certifications.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="text-sm font-semibold text-foreground">Related Certifications:</h4>
                      {conversation.certifications.map((cert, certIndex) => (
                        <div key={certIndex} className="bg-accent/30 rounded-lg p-3 border border-border">
                          <h5 className="font-medium text-foreground">{cert.name}</h5>
                          <p className="text-sm text-muted-foreground mt-1">{cert.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              {cert.issuing_body}
                            </span>
                            <span className="text-xs bg-secondary/10 text-secondary-foreground px-2 py-1 rounded">
                              {cert.region}
                            </span>
                            {cert.mandatory && (
                              <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">
                                Mandatory
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Divider between conversations */}
            {index < session.conversations.length - 1 && (
              <div className="my-6 border-t border-border/50"></div>
            )}
          </div>
        ))}
      </div>

      {/* Continue Chat Button */}
      <div className="flex justify-center pt-6 border-t border-border">
        <Button onClick={onContinueChat} className="px-6">
          Continue this conversation
        </Button>
      </div>
    </div>
  );
};

export default ConversationHistory;