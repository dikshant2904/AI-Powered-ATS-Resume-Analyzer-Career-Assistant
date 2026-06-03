const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate content using Gemini 2.5 Flash
 * @param {string} prompt - The prompt to send
 * @param {boolean} jsonMode - Whether to force JSON output structure
 * @returns {Promise<string>} - The generated text
 */
const generateContent = async (prompt, jsonMode = false) => {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      generationConfig: {
        temperature: 0.7,
        responseMimeType: jsonMode ? 'application/json' : 'text/plain',
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('AI Generation Error:', error.message);
    if (error.message.includes('429')) {
      throw new Error('API Rate Limit Reached: Please wait 30 seconds before generating again.');
    }
    throw new Error('Failed to generate content. The AI service may be experiencing high demand.');
  }
};

module.exports = {
  generateContent,
};
