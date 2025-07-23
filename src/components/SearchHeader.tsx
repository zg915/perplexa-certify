import { Search } from "lucide-react";

const SearchHeader = ({ userQuestion }: { userQuestion: string }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground font-medium text-lg">
          {userQuestion || <span className="text-muted-foreground">Ask a question...</span>}
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;