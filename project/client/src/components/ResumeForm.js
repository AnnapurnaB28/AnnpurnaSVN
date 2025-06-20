import React from "react";
import "./ResumeForm.css"; // 👈 Import your CSS

export default function ResumeForm({ setResumeData, setAIFeedback }) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📝 Submitting resume form...");
    console.log("📦 Form Data:", form);

    setResumeData(form);
    setAIFeedback(""); // Clear old feedback

    try {
      const response = await fetch("http://localhost:8080/api/saveResume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      console.log("📨 Response status:", response.status);

      if (response.ok) {
        console.log("✅ Resume saved successfully!");
        alert("✅ Resume saved successfully!");

        // Automatically fetch AI suggestion after saving
        const suggestionResponse = await fetch("http://localhost:8080/api/suggest", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (!suggestionResponse.ok) {
          throw new Error("❌ Failed to fetch AI suggestion");
        }

        const data = await suggestionResponse.json();
        console.log("🤖 AI Suggestion:", data.suggestion);
        setAIFeedback(data.suggestion);

      } else {
        const errorText = await response.text();
        console.error("❌ Failed to save resume. Server response:", errorText);
        alert("❌ Failed to save resume. Check console for details.");
      }
    } catch (error) {
      console.error("❌ Network or fetch error:", error.message);
      alert("🌐 Network error: could not connect to the server.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="resume-form">
      <h2 className="form-title">Resume Details</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="form-input"
        required
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="form-input"
        required
      />

      <textarea
        name="skills"
        value={form.skills}
        onChange={handleChange}
        placeholder="Skills"
        className="form-textarea"
        required
      />

      <textarea
        name="experience"
        value={form.experience}
        onChange={handleChange}
        placeholder="Experience"
        className="form-textarea"
        required
      />

      <button type="submit" className="submit-btn">Save Resume & Get Suggestions</button>
    </form>
  );
}
