import { useState } from "react";
import { MessageSquare, ChevronDown, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  question: string;
  timestamp: Date;
  preview: string;
}

interface Session {
  id: string;
  title: string;
  date: Date;
  conversations: Conversation[];
}

// Mock data - replace with real data later
const mockSessions: Session[] = [
  {
    id: "1",
    title: "Medical Certifications",
    date: new Date("2024-01-15"),
    conversations: [
      {
        id: "1-1",
        question: "What certifications do I need for nursing?",
        timestamp: new Date("2024-01-15T10:30:00"),
        preview: "For nursing positions, you typically need..."
      },
      {
        id: "1-2",
        question: "How long does RN certification take?",
        timestamp: new Date("2024-01-15T11:00:00"),
        preview: "RN certification typically takes 2-4 years..."
      }
    ]
  },
  {
    id: "2",
    title: "Tech Certifications",
    date: new Date("2024-01-10"),
    conversations: [
      {
        id: "2-1",
        question: "AWS certifications for cloud engineer?",
        timestamp: new Date("2024-01-10T14:20:00"),
        preview: "AWS offers several certification paths..."
      }
    ]
  },
  {
    id: "3",
    title: "Finance Certifications",
    date: new Date("2024-01-08"),
    conversations: [
      {
        id: "3-1",
        question: "CFA vs CPA certification differences?",
        timestamp: new Date("2024-01-08T09:15:00"),
        preview: "CFA focuses on investment analysis while CPA..."
      },
      {
        id: "3-2",
        question: "How to prepare for CFA Level 1?",
        timestamp: new Date("2024-01-08T09:45:00"),
        preview: "CFA Level 1 preparation typically requires..."
      }
    ]
  }
];

interface ChatSessionsProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatSessions = ({ isOpen, onClose }: ChatSessionsProps) => {
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());

  const toggleSession = (sessionId: string) => {
    const newExpanded = new Set(expandedSessions);
    if (newExpanded.has(sessionId)) {
      newExpanded.delete(sessionId);
    } else {
      newExpanded.add(sessionId);
    }
    setExpandedSessions(newExpanded);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-12 top-0 h-full w-80 bg-card border-r border-border shadow-lg z-50">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Chat Sessions
          </h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ×
          </button>
        </div>
      </div>
      
      <div className="overflow-y-auto h-full pb-16">
        {mockSessions.map((session) => (
          <div key={session.id} className="border-b border-border">
            <button
              onClick={() => toggleSession(session.id)}
              className="w-full p-4 text-left hover:bg-accent transition-colors flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{session.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(session.date)} • {session.conversations.length} conversations
                </p>
              </div>
              {expandedSessions.has(session.id) ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            
            {expandedSessions.has(session.id) && (
              <div className="bg-accent/50">
                {session.conversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className="p-3 mx-4 mb-2 bg-background rounded border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <Clock className="w-3 h-3 text-muted-foreground mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-2">
                          {conversation.question}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {conversation.preview}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatTime(conversation.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSessions;