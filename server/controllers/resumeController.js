const Resume = require('../models/Resume');
const pdf = require('pdf-parse');

// @desc    Upload and parse resume
// @route   POST /api/resume/upload
// @access  Private
const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    // Since we are not using Cloudinary yet, we will just parse it and save text
    // In Phase 2 we can upload the buffer to S3/Cloudinary and save the URL.
    
    let parsedText = '';
    
    if (req.file.mimetype === 'application/pdf') {
      const data = await pdf(req.file.buffer);
      parsedText = data.text;
    } else {
      return res.status(400).json({ success: false, message: 'Only PDF files are supported currently' });
    }

    // Clean up parsed text
    parsedText = parsedText.replace(/\n\s*\n/g, '\n').trim();

    // Call Gemini to generate Resume Knowledge Graph
    const { buildResumeIntelligencePrompt } = require('../utils/promptTemplates');
    const { generateContent } = require('../services/aiService');
    
    const prompt = buildResumeIntelligencePrompt(parsedText);
    const jsonResponse = await generateContent(prompt, true);
    let intelligenceData;
    
    const cleanJSON = (str) => {
      let cleaned = str.replace(/```json/g, '').replace(/```/g, '').trim();
      return cleaned;
    };

    try {
      intelligenceData = JSON.parse(cleanJSON(jsonResponse));
    } catch (e) {
      console.error("Failed to parse Resume Intelligence JSON:", e);
      intelligenceData = { error: "Failed to parse intelligence" };
    }

    // Save to DB (Optional for Phase 2, but let's update parsedData or add intelligence field later. For now, just return it)
    const resume = await Resume.create({
      user: req.user._id,
      parsedData: parsedText,
    });

    res.status(201).json({
      success: true,
      message: 'Resume parsed and analyzed successfully',
      data: {
        id: resume._id,
        rawText: resume.parsedData,
        intelligence: intelligenceData
      }
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadResume,
};
