const Groq = require("groq-sdk");
require("dotenv").config();

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function generateSummary(data) {
  const preview = JSON.stringify(data.slice(0, 20));

  const chat = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: `Analyze this sales dataset and give executive summary:\n${preview}`,
      },
    ],
  });

  return chat.choices[0].message.content;
}

module.exports = generateSummary;