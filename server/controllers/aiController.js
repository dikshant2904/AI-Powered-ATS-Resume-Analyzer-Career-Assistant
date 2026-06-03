const { generateContent } = require('../services/aiService');
const { buildATSScorePrompt, buildCoverLetterPrompt, buildProposalPrompt } = require('../utils/promptTemplates');
const Usage = require('../models/Usage');

// Helper to log usage
const logUsage = async (userId, tool, inputLength, outputLength) => {
  try {
    await Usage.create({
      user: userId,
      tool,
      // Rough token estimation: 1 token ~= 4 chars
      inputTokens: Math.ceil(inputLength / 4),
      outputTokens: Math.ceil(outputLength / 4),
    });
  } catch (error) {
    console.error('Failed to log usage:', error);
  }
};

// @desc    Analyze ATS Score
// @route   POST /api/ai/ats
// @access  Private
const analyzeATS = async (req, res, next) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({ success: false, message: 'Please provide both resumeText and jobDescription' });
    }

    const prompt = buildATSScorePrompt(resumeText, jobDescription);
    // Request JSON mode
    const resultText = await generateContent(prompt, true);
    
    // Parse the JSON response safely by cleaning markdown
    const cleanJSON = (str) => {
      let cleaned = str.replace(/```json/g, '').replace(/```/g, '').trim();
      return cleaned;
    };

    let parsedResult;
    try {
      parsedResult = JSON.parse(cleanJSON(resultText));
    } catch (e) {
      console.error('Failed to parse ATS JSON output:', resultText);
      return res.status(500).json({ success: false, message: 'Failed to generate ATS score format. Please try again.' });
    }

    // Log usage
    await logUsage(req.user._id, 'ats', prompt.length, resultText.length);

    res.json({
      success: true,
      data: parsedResult,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate Cover Letter
// @route   POST /api/ai/cover-letter
// @access  Private
const generateCoverLetter = async (req, res, next) => {
  try {
    const { resumeText, jobDescription, companyName, role, tone, length } = req.body;

    if (!resumeText || !companyName || !role) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const prompt = buildCoverLetterPrompt(resumeText, jobDescription || '', companyName, role, tone, length);
    const resultText = await generateContent(prompt, false);

    await logUsage(req.user._id, 'cover_letter', prompt.length, resultText.length);

    res.json({
      success: true,
      data: resultText,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate Proposal
// @route   POST /api/ai/proposal
// @access  Private
const generateProposal = async (req, res, next) => {
  try {
    const { clientRequirements, userSkills, experienceLevel, tone } = req.body;

    if (!clientRequirements || !userSkills) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const prompt = buildProposalPrompt(clientRequirements, userSkills, experienceLevel, tone);
    const resultText = await generateContent(prompt, false);

    await logUsage(req.user._id, 'proposal', prompt.length, resultText.length);

    res.json({
      success: true,
      data: resultText,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeATS,
  generateCoverLetter,
  generateProposal,
};
