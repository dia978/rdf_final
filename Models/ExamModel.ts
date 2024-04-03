import mongoose from 'mongoose';

const ExamRecruitmentSchema = new mongoose.Schema(
    {
        email: {
          type: String,
          required: true
        },
        attempts: {
          type: Number,
          required: true
        },
        answers: {
          type: Object,
          required: true
        },
        scores: {
          type: Array,
          required: true
        },
        passed: {
          type: Boolean,
          required: true
        }
      },
  { timestamps: true }
);

export default mongoose.models.ExamRecruitment || mongoose.model('ExamRecruitment', ExamRecruitmentSchema);
