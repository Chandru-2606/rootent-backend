const pdfService = require('../services/pdfService');
const resumeService = require('../services/resumeService');
const fs = require('fs');
const path = require('path');

exports.generateAndDownloadPdf = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const resume = await resumeService.getResumeById(resumeId);
    if (!resume) {
      return res.status(404).json({ status: 'error', message: 'Resume not found' });
    }
    const pdfDir = path.join(__dirname, '../../temp/pdfs');
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }
    const pdfPath = path.join(pdfDir, `resume-${resumeId}.pdf`);
    await pdfService.generatePdf(resume, pdfPath);
    if (!fs.existsSync(pdfPath)) {
      return res.status(500).json({ status: 'error', message: 'Failed to generate PDF' });
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=resume-${resumeId}.pdf`);
    const fileStream = fs.createReadStream(pdfPath);
    fileStream.on('error', (error) => {
      res.status(500).json({ status: 'error', message: 'Error streaming PDF file' });
    });
    fileStream.pipe(res);
    fileStream.on('end', () => {
      fs.unlink(pdfPath, (err) => { if (err) console.error('Error deleting temporary PDF:', err); });
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message || 'Error generating PDF' });
  }
};
