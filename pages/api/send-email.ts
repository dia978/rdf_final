// pages/api/send-email.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import sendEmail from '../../utils/sendEmail';

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string; // Ensure html property is mandatory
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { to, subject, text, html } = req.body;
    try {
      const emailOptions: EmailOptions = {
        to,
        subject,
        text,
        html
      };
      await sendEmail(emailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
