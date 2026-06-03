const User = require('../models/User');

const checkCredits = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // If unlimited plan, skip credit check
    if (user.subscriptionPlan === 'monthly' || user.subscriptionPlan === 'yearly') {
      if (user.subscriptionStatus === 'active') {
        return next();
      }
    }

    // Check credits for free plan
    if (user.credits <= 0) {
      return res.status(403).json({ 
        success: false, 
        message: 'Out of credits. Please upgrade your plan to continue generating.' 
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

const deductCredit = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Don't deduct if unlimited
    if ((user.subscriptionPlan === 'monthly' || user.subscriptionPlan === 'yearly') && user.subscriptionStatus === 'active') {
      return; 
    }

    user.credits -= 1;
    await user.save();
  } catch (error) {
    console.error('Error deducting credit:', error);
  }
};

module.exports = { checkCredits, deductCredit };
