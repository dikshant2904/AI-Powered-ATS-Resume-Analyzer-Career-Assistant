require('dotenv').config();
const { generateContent } = require('./services/aiService');

async function test() {
  try {
    const res = await generateContent('return {"a": 1}', true);
    console.log("Success:", res);
  } catch (e) {
    console.error("Caught error:", e);
  }
}

test();
