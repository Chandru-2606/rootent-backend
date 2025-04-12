const resumeService = require('../services/resumeService');

exports.checkResumeOwner = async (req, res, next) => {
  try {
    const resume = await resumeService.getResumeById(req.user.id);
    
    
    if (!resume) {
      return res.status(404).json({
        status: 'error',
        message: 'Resume not found'
      });
    }

    if (resume.userId.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to perform this action'
      });
    }

    req.resume = resume;
    next();
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
}; 