import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import connectDB from '../../utils/db';
import User from '../../Models/UserApplication';
import sendEmail from '../../utils/sendEmail'; // Import your email sending utility function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Handle GET request for validating token
    return handleTokenValidation(req, res);
  } else if (req.method === 'POST') {
    // Handle POST request for sending exam instructions
    return handleSendExamInstructions(req, res);
  } else {
    // Handle other HTTP methods
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function handleTokenValidation(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB.connect();

    // Retrieve the token from the query parameters
    const { token } = req.query;

    // Find the user by the exam token
    const user = await User.findOne({ examToken: token });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    // Check if the token expiration time has passed
    if (user.examTokenExpiration < new Date()) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    // Token is valid, return success response
    return res.status(200).json({ valid: true, email: user.email });
  } catch (error) {
    console.error('Error validating exam token:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function handleSendExamInstructions(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    await connectDB.connect();

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a random token
    const examToken = crypto.randomBytes(20).toString('hex');
    const expirationTime = Date.now() + 3600000;

    user.examToken = examToken;
    user.examTokenExpiration = new Date(expirationTime);
    user.sentExam=true;
    await user.save();

    const examLink = `http://greenhillsacademy.rw:8082/exam?token=${examToken}`;
    const userName = user.name;

    await sendEmail({
      to: email,
      subject: 'Exam Instructions',
      text: `Dear ${userName},\n\nTo do your exams, please click on the following link within 1 hour:\n${examLink}\n\nBest Regards,\nRDF Recruitment Team`,
      html: `
        <div style="text-align: center;">
          <p>Dear ${userName},</p>
          <p>To do your exams, please click on the following link within 1 hour:</p>
          <p><a href="${examLink}">${examLink}</a></p>
          <p>Best Regards,<br>RDF Recruitment Team</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Exam instructions sent successfully' });
  } catch (error) {
    console.error('Error sending exam instructions:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
