// models/Staff.ts

import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    department: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Staff || mongoose.model('Staff', staffSchema);
