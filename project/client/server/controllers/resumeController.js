const { Pool } = require("pg");
const openai = require("../openai/suggest");
const db = require("../db/db");

const saveResume = async (req, res) => {
  const { name, email, skills, experience } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO resumes (name, email, skills, experience) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, skills, experience]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error saving resume:", err);
    res.status(500).json({ error: "Database error" });
  }
};

const getAISuggestion = async (req, res) => {
  const { name, skills, experience } = req.body;
  try {
    const prompt = `Given the resume for ${name} with skills: ${skills} and experience: ${experience}, suggest improvements.`;
    const suggestion = await openai.getSuggestion(prompt);
    res.json({ suggestion });
  } catch (err) {
    console.error("Error with AI Suggestion:", err);
    res.status(500).json({ error: "OpenAI error" });
  }
};

module.exports = { saveResume, getAISuggestion };
