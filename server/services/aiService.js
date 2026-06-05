const OpenAI = require("openai");

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

/**
 * Generate content using Groq
 * @param {string} prompt
 * @param {boolean} jsonMode
 * @returns {Promise<string>}
 */
const generateContent = async (prompt, jsonMode = false) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content:
            "You are an expert ATS Resume Analyzer and Career Assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: jsonMode
        ? { type: "json_object" }
        : undefined,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq AI Error:", error);

    if (error.status === 429) {
      throw new Error(
        "Rate limit reached. Please wait a moment and try again."
      );
    }

    if (error.status >= 500) {
      throw new Error(
        "AI service is temporarily unavailable. Please try again later."
      );
    }

    throw new Error(
      error.message || "Failed to generate AI response."
    );
  }
};

module.exports = {
  generateContent,
};