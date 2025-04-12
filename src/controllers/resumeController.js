const resumeService = require('../services/resumeService');

exports.createResume = async (req, res) => {
  try {
    const resumeData = {
      ...req.body,
      userId: req.user.id
    };

    const resume = await resumeService.createResume(resumeData);
    res.status(201).json({
      status: 'success',
      data: resume
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};



exports.getResumeById = async (req, res) => {
  try {
    const resume = await resumeService.getResumeById(req.params.id);
    res.status(200).json(resume);
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getResumeByUserId = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        status: 'error',
        message: 'User not authenticated'
      });
    }

    
    const resumes = await resumeService.getResumeByUserId(req.user.id);
    if (!resumes || resumes.length === 0) {
      return res.status(200).json({
        status: 'success',
        message: 'No resumes found for this user'
      });
    }

    res.status(200).json(resumes);
  } catch (error) {
    if (error.message.includes('Resume not found')) {
      return res.status(200).json({
        status: 'success',
        data: [],
        message: 'No resumes found for this user'
      });
    }
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.updateResume = async (req, res) => {
  try {
    const resume = await resumeService.updateResume(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      data: resume
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    await resumeService.deleteResume(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    });
  }
}; 