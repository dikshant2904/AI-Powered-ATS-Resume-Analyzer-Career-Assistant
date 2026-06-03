require('dotenv').config();
const { generateContent } = require('./services/aiService');
const { buildATSScorePrompt } = require('./utils/promptTemplates');

async function test() {
  try {
    const prompt = buildATSScorePrompt("I am a software engineer.", "Looking for a software engineer.");
    console.log("Prompt:", prompt);
    const res = await generateContent(prompt, true);
    console.log("Success:", res);
  } catch (e) {
    console.error("Caught error in script:", e);
  }
}

test();
