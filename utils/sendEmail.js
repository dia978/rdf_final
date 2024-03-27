// utils/sendEmail.js

import nodemailer from 'nodemailer';

// Function to send email using nodemailer
const sendEmail = async ({ to, subject, text }) => {
  try {
    // Create a nodemailer transporter using your Gmail account
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.KEYPASS,
      },
    });

    // Define email options
    const mailOptions = {
      from: 'it@greenhillsacademy.rw',
      to,
      subject,
      text,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Error sending email');
  }
};

export default sendEmail;
