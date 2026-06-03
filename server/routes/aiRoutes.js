const express = require('express');
const router = express.Router();
const { analyzeATS, generateCoverLetter, generateProposal } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const { checkCredits, deductCredit } = require('../middleware/creditMiddleware');
const { aiGenerationsLimiter } = require('../middleware/rateLimiter');

// Protect all AI routes
router.use(protect);
router.use(aiGenerationsLimiter);

router.post('/ats', checkCredits, analyzeATS, deductCredit);
router.post('/cover-letter', checkCredits, generateCoverLetter, deductCredit);
router.post('/proposal', checkCredits, generateProposal, deductCredit);

module.exports = router;
