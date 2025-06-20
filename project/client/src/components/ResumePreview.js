import React from "react";
import "./ResumePreview.css"; // 👈 Import this CSS file

export default function ResumePreview({ data, aiFeedback }) {
  return (
    <div className="resume-preview">
      <h2 className="preview-title">Resume Preview</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Skills:</strong> {data.skills}</p>
      <p><strong>Experience:</strong> {data.experience}</p>
      {aiFeedback && (
        <div className="ai-feedback">
          <strong>AI Suggestions:</strong>
          <p>{aiFeedback}</p>
        </div>
      )}
    </div>
  );
}
