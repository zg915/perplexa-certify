import { Search, Mic, Settings, Send } from "lucide-react";
import { useState } from "react";

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

interface ChatInputProps {
  onStream: (answer: string, certifications: Flashcard[], loading?: boolean, question?: string) => void;
}

const ChatInput = ({ onStream }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    let streamedAnswer = "";
    let streamedCerts: Flashcard[] = [];
    onStream(streamedAnswer, streamedCerts, true, message); // loading true, send question
    try {
      const response = await fetch("http://127.0.0.1:8000/ask/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: "dacbccb3-800f-4110-9f01-145a0efcb21c",
          content: message,
        }),
      });
      if (!response.body) throw new Error("No response body");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.replace("data: ", ""));
              if (json.type === "answer_chunk") {
                streamedAnswer += json.response;
                onStream(streamedAnswer, streamedCerts, true, message);
              }
              if (json.type === "flashcard") {
                streamedCerts = [...streamedCerts, json.response];
                onStream(streamedAnswer, streamedCerts, true, message);
              }
              if (json.type === "completed") {
                // Finalize
                onStream(streamedAnswer, streamedCerts, false, message);
                setLoading(false);
              }
            } catch {}
          }
        }
      }
    } catch (err) {
      setLoading(false);
      onStream(streamedAnswer, streamedCerts, false, message);
    }
    setMessage("");
  };

  return (
    <div className="fixed bottom-0 left-12 right-0  p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-center bg-card border border-border rounded-xl overflow-hidden">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a follow-up..."
              className="flex-1 px-4 py-3 bg-transparent text-foreground placeholder-muted-foreground outline-none"
              disabled={loading}
            />
            <div className="flex items-center pr-2 space-x-1">
              <button
                type="submit"
                className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                disabled={loading}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;