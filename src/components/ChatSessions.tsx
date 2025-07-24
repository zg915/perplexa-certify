import { useState } from "react";
import { MessageSquare, ChevronDown, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  question: string;
  answer: string;
  certifications: any[];
  timestamp: Date;
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
        answer: "For nursing positions, you typically need several key certifications depending on your role and location. The primary certification is your RN (Registered Nurse) license, which requires completing an accredited nursing program and passing the NCLEX-RN exam. Additional specialized certifications may include BLS (Basic Life Support), ACLS (Advanced Cardiovascular Life Support), and PALS (Pediatric Advanced Life Support).",
        certifications: [
          {
            name: "Registered Nurse (RN) License",
            issuing_body: "State Board of Nursing",
            region: "State-specific",
            description: "Primary license required to practice as a registered nurse",
            classifications: ["Healthcare", "Nursing"],
            mandatory: true,
            validity: "2-3 years (renewal required)",
            official_link: "https://www.ncsbn.org/"
          }
        ],
        timestamp: new Date("2024-01-15T10:30:00")
      },
      {
        id: "1-2",
        question: "How long does RN certification take?",
        answer: "RN certification typically takes 2-4 years depending on the educational path you choose. An Associate Degree in Nursing (ADN) takes about 2-3 years, while a Bachelor of Science in Nursing (BSN) takes 4 years. After graduation, you must pass the NCLEX-RN exam to obtain your license.",
        certifications: [],
        timestamp: new Date("2024-01-15T11:00:00")
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
        answer: "AWS offers several certification paths for cloud engineers. The most common starting point is the AWS Certified Solutions Architect - Associate, followed by Professional level certifications. For hands-on roles, consider the AWS Certified SysOps Administrator or DevOps Engineer certifications.",
        certifications: [
          {
            name: "AWS Certified Solutions Architect - Associate",
            issuing_body: "Amazon Web Services",
            region: "Global",
            description: "Validates ability to design distributed systems on AWS",
            classifications: ["Cloud Computing", "IT"],
            mandatory: false,
            validity: "3 years",
            official_link: "https://aws.amazon.com/certification/"
          }
        ],
        timestamp: new Date("2024-01-10T14:20:00")
      }
    ]
  }
];

interface ChatSessionsProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionSelect: (session: Session) => void;
}

const ChatSessions = ({ isOpen, onClose, onSessionSelect }: ChatSessionsProps) => {
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

  const handleSessionClick = (session: Session) => {
    onSessionSelect(session);
    onClose();
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
              onClick={() => handleSessionClick(session)}
              className="w-full p-4 text-left hover:bg-accent transition-colors flex items-center justify-between"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{session.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(session.date)} • {session.conversations.length} conversations
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSessions;
export { mockSessions };
export type { Session, Conversation };