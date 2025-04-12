const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    linkedin: { type: String, required: true },
    github: { type: String, required: true }
  },
  summary: { type: String, required: true },
   skills: { type: String },
  experience: [
    {
      jobTitle: { type: String },
      company: { type: String },
      location: { type: String },
      duration: { type: String },
      startDate: { type: String },
      endDate: { type: String },
     project: { type: String },
    }
  ],
  certifications: [
    {
      name: { type: String, required: true },
      provider: { type: String },
      date: { type: String },
    }
  ],
  education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      year: { type: String, required: true },
      month: { type: String, required: true },
    }
  ],
});


module.exports = mongoose.model('Resume', ResumeSchema); 

