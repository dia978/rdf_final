import mongoose from "mongoose";

const UserApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
    contactDetails: { type: String, required: true },
    educationalBackground: { type: String, required: true },
    examToken: { type: String, default: '' },
    examTokenExpiration: { type: Date },
    sentExam:{type:Boolean,default:false},
  },
  { timestamps: true }
);

export default mongoose.models.UserApplication || mongoose.model("UserApplication", UserApplicationSchema);
