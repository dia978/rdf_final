import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import connectDB from '../../utils/db';
import User from '../../Models/User';
import sendEmail from '../../utils/sendEmail'; // Import your email sending utility function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  try {
    await connectDB.connect();

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a random token
    const resetToken = crypto.randomBytes(20).toString('hex');

    const expirationTime = Date.now() + 3600000;

    user.resetToken = resetToken;
    user.resetTokenExpiration = new Date(expirationTime);
    await user.save();

    const resetLink = `https://rdf-final.vercel.app/reset-password?token=${resetToken}`;
    const userName = user.name;


    await sendEmail({
      to: email,
      subject: 'Password Reset Instructions',
      text: `Dear ${userName},\n\nTo reset your password, please click on the following link within 1 hour:\n${resetLink}\n\nBest Regards,\nRDF Recruitment Team`,
      html: `
        <div style="text-align: center;">
          <p>Dear ${userName},</p>
          <p>To reset your password, please click on the following link within 1 hour:</p>
          <p><a href="${resetLink}">${resetLink}</a></p>
          <p>Best Regards,<br>RDF Recruitment Team</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Password reset instructions sent successfully' });
  } catch (error) {
    console.error('Error sending reset instructions:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
