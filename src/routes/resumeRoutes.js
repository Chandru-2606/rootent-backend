const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const pdfController = require('../controllers/pdfController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, resumeController.createResume);

router.get('/by-id/:id', protect,  resumeController.getResumeById);

router.put('/:id', protect,  resumeController.updateResume);

router.delete('/:id', protect,  resumeController.deleteResume);

router.get('/user', protect, resumeController.getResumeByUserId);

router.get('/:id/pdf', protect,  pdfController.generateAndDownloadPdf);

module.exports = router; 