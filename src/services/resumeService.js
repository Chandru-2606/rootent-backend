const Resume = require('../models/Resume');
const mongoose = require('mongoose');

const createResume = async (resumeData) => {
  try {
    const resume = await Resume.create(resumeData);
    return resume;
  } catch (error) {
    throw new Error(`Error creating resume: ${error.message}`);
  }
};



const getResumeById = async (resumeId) => {
    
  try {
    const resume = await Resume.findById(resumeId)
      .populate('userId', 'name email role');
    
    if (!resume) {
      throw new Error('Resume not found');
    }
    return resume;
  } catch (error) {
    throw new Error(`Error fetching resume: ${error.message}`);
  }
};

const getResumeByUserId = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const resumes = await Resume.find({ userId })
      .populate('userId', 'name email role');
    
    return resumes;
  } catch (error) {
    throw new Error(`Error fetching resume: ${error.message}`);
  }
};

const updateResume = async (resumeId, updateData) => {
  try {
    const resume = await Resume.findByIdAndUpdate(
      resumeId,
      updateData,
      { new: true, runValidators: true }
    ).populate('userId', 'name email role');

    if (!resume) {
      throw new Error('Resume not found');
    }
    return resume;
  } catch (error) {
    throw new Error(`Error updating resume: ${error.message}`);
  }
};

const deleteResume = async (resumeId) => {
  try {
    const resume = await Resume.findByIdAndDelete(resumeId);
    if (!resume) {
      throw new Error('Resume not found');
    }
    return resume;
  } catch (error) {
    throw new Error(`Error deleting resume: ${error.message}`);
  }
};

module.exports = {
  createResume,
  getResumeById,
  getResumeByUserId,
  updateResume,
  deleteResume
}; 