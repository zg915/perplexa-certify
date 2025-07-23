const AnswerContent = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-foreground leading-relaxed mb-4">
            The field of artificial intelligence continues to evolve rapidly with several groundbreaking developments:
          </p>
          
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold mb-2">Large Language Models</h3>
              <p className="text-muted-foreground">
                Advanced language models are becoming more capable, with improvements in reasoning, 
                multimodal understanding, and specialized domain knowledge.
              </p>
            </div>
            
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold mb-2">AI Safety & Alignment</h3>
              <p className="text-muted-foreground">
                Significant progress in ensuring AI systems behave safely and align with human values, 
                including constitutional AI and reinforcement learning from human feedback.
              </p>
            </div>
            
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold mb-2">Multimodal AI</h3>
              <p className="text-muted-foreground">
                Integration of vision, language, and audio capabilities in unified models that can 
                understand and generate content across multiple modalities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerContent;