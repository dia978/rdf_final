import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import connectDB from '../../utils/db';
import User from '../../Models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB.connect();
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: 'Token and password are required' });
  }

  try {
  

    const user = await User.findOne({ resetToken: token });

    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired token' });
    }

    if (user.resetTokenExpiration && user.resetTokenExpiration < new Date()) {
      return res.status(200).json({ success: true, message: 'Token has expired. No action required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = null;

    await user.save();

    return res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
