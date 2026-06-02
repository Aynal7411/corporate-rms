import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

export const createAdmitCard = async (application) => {
  if (!application.rollNumber) {
    application.rollNumber = `R${Date.now().toString().slice(-8)}`;
  }

  const qrPayload = JSON.stringify({
    applicationId: application._id,
    rollNumber: application.rollNumber
  });

  const qrCode = await QRCode.toDataURL(qrPayload);
  const doc = new PDFDocument({ size: 'A4', margin: 48 });
  const chunks = [];

  doc.on('data', (chunk) => chunks.push(chunk));
  doc.fontSize(20).text('Admit Card', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Roll Number: ${application.rollNumber}`);
  doc.text(`Job Title: ${application.job?.title || ''}`);
  doc.text(`Exam Date: ${application.examDate || 'To be announced'}`);
  doc.text(`Exam Center: ${application.examCenter || 'To be announced'}`);
  doc.image(qrCode, 420, 120, { width: 100 });
  doc.moveDown(4).text('Candidate Signature: ____________________');
  doc.end();

  await new Promise((resolve) => doc.on('end', resolve));
  application.admitCardUrl = `generated://${application.rollNumber}.pdf`;
  await application.save();

  return Buffer.concat(chunks);
};
