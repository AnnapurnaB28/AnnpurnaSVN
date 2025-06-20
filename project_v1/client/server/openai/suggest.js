// const OpenAI = require("openai");
// require("dotenv").config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// async function getSuggestion(prompt) {
//   const chatCompletion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: prompt }],
//   });

//   return chatCompletion.choices[0].message.content;
// }

// module.exports = { getSuggestion };


const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getAISuggestion = async (req, res) => {
  const { name, email, skills, experience } = req.body;

  try {
    const prompt = `Give improvement suggestions for this resume data:\n
    Name: ${name}\nEmail: ${email}\nSkills: ${skills}\nExperience: ${experience}`;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const suggestion = completion.data.choices[0].message.content;
    res.json({ suggestion });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "AI suggestion failed." });
  }
};

module.exports = { getAISuggestion };

