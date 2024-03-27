import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    department: { type: String, required: true },
    profilePicture: { type: String },
    password: { type: String, required: true },
    permissions: { type: [String], default: [] },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    resetToken: { type: String, default: '' }, // Set default value to empty string
    resetTokenExpiration: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
