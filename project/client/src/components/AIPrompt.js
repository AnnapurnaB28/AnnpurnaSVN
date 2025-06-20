import React from "react";

export default function AIPrompt({ resumeData, setAIFeedback }) {
  const getSuggestions = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(resumeData)
      });

      if (!response.ok) {
        throw new Error("Something went wrong while fetching suggestions");
      }

      const data = await response.json();
      setAIFeedback(data.suggestion);
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      setAIFeedback("Failed to get AI suggestions. Please try again.");
    }
  };

  return (
    <div className="mt-8 text-center">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={getSuggestions}
      >
        Get AI Suggestions Again
      </button>
    </div>
  );
}
