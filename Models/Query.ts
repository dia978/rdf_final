import mongoose from 'mongoose';

const QuerySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    replied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Query || mongoose.model('Query', QuerySchema);
