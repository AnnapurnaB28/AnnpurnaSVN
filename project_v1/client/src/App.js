import React from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import AIPrompt from "./components/AIPrompt";

export default function App() {
  const [resumeData, setResumeData] = React.useState({});
  const [aiFeedback, setAIFeedback] = React.useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Smart Resume Builder</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form on left, preview on right */}
        <ResumeForm setResumeData={setResumeData} setAIFeedback={setAIFeedback} />
        <ResumePreview data={resumeData} aiFeedback={aiFeedback} />
      </div>

      {/* Show "Get AI Suggestions" button if resume is filled but no feedback yet */}
      {Object.keys(resumeData).length > 0 && !aiFeedback && (
        <AIPrompt resumeData={resumeData} setAIFeedback={setAIFeedback} />
      )}

      {/* Show AI feedback below if available */}
      {aiFeedback && (
        <div className="mt-8 bg-white p-4 rounded shadow text-gray-800 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-2">🤖 AI Suggestions</h2>
          <p>{aiFeedback}</p>
        </div>
      )}
    </div>
  );
}
