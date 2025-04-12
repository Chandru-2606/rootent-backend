const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.generatePdf = async (resume, outputPath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const stream = fs.createWriteStream(outputPath);
      stream.on('error', (error) => { reject(new Error(`Error writing PDF: ${error.message}`)); });
      stream.on('finish', () => { resolve(outputPath); });
      doc.pipe(stream);
      doc.fontSize(24)
         .font('Helvetica-Bold')
         .text(resume.personalDetails.name.toUpperCase(), { align: 'center', characterSpacing: 1 });
      doc.moveDown(0.5);
      const contactInfo = [
        resume.personalDetails.email,
        resume.personalDetails.linkedin ? 'LinkedIn' : null,
        resume.personalDetails.github ? 'Github' : null,
        resume.personalDetails.phone,
        resume.personalDetails.location
      ].filter(Boolean).join(' | ');
      doc.fontSize(10)
         .font('Helvetica')
         .fillColor('#000000')
         .text(contactInfo, { align: 'center' });
      doc.moveDown(1.5);
      if (resume.summary) {
        doc.fontSize(14)
           .font('Helvetica-Bold')
           .text('SUMMARY', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(11)
           .font('Helvetica')
           .text(resume.summary, { align: 'justify', width: 500 });
        doc.moveDown(1);
      }
      if (resume.skills) {
        const { htmlToText } = require('html-to-text');
        const skillsText = htmlToText(resume.skills, { wordwrap: 130 });
        doc.fontSize(14)
           .font('Helvetica-Bold')
           .text('SKILLS', { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(11)
           .font('Helvetica')
           .text(skillsText, { align: 'left', width: 500 });
        doc.moveDown(1);
      }
      if (resume.experience && resume.experience.length > 0) {
        doc.fontSize(14)
           .font('Helvetica-Bold')
           .text('EXPERIENCE', { underline: true });
        doc.moveDown(0.5);
        resume.experience.forEach((exp) => {
          doc.fontSize(12)
             .font('Helvetica-Bold')
             .text(`${exp.jobTitle} - ${exp.company}`);
          doc.fontSize(11)
             .font('Helvetica-Oblique')
             .text(`(${exp.startDate} - ${exp.endDate})`);
          doc.moveDown(0.5);
          if (exp.project) {
            const { htmlToText } = require('html-to-text');
            const projectText = htmlToText(exp.project, { wordwrap: 130 });
            doc.fontSize(11)
               .font('Helvetica')
               .text(projectText, { align: 'justify', width: 500 });
          }
          doc.moveDown(1);
        });
      }
      if (resume.education && resume.education.length > 0) {
        doc.fontSize(14)
           .font('Helvetica-Bold')
           .text('EDUCATION', { underline: true });
        doc.moveDown(0.5);
        resume.education.forEach((edu) => {
          doc.fontSize(11)
             .font('Helvetica-Bold')
             .text(edu.degree);
          doc.fontSize(11)
             .font('Helvetica')
             .text(`${edu.institution} - ${edu.month} ${edu.year}`);
          doc.moveDown(0.5);
        });
      }
      if (resume.certifications && resume.certifications.length > 0) {
        doc.fontSize(14)
           .font('Helvetica-Bold')
           .text('CERTIFICATIONS', { underline: true });
        doc.moveDown(0.5);
        resume.certifications.forEach((cert) => {
          doc.fontSize(11)
             .font('Helvetica')
             .text(`${cert.name} | ${cert.provider} (${cert.date})`);
          doc.moveDown(0.5);
        });
      }
      doc.end();
    } catch (error) {
      reject(new Error(`Error generating PDF: ${error.message}`));
    }
  });
};
