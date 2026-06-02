import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    level: { type: String, enum: ['SSC', 'HSC', 'Diploma', 'Bachelor', 'Masters'], required: true },
    institution: String,
    board: String,
    passingYear: Number,
    result: String
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    organization: String,
    position: String,
    duration: String,
    description: String
  },
  { _id: false }
);

const candidateSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    fatherName: String,
    motherName: String,
    dateOfBirth: Date,
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    religion: String,
    nationality: { type: String, default: 'Bangladeshi' },
    nidNumber: { type: String, index: true },
    mobileNumber: String,
    permanentAddress: String,
    presentAddress: String,
    education: [educationSchema],
    experience: [experienceSchema],
    documents: {
      profilePhoto: String,
      signature: String,
      cv: String
    }
  },
  { timestamps: true }
);

export default mongoose.model('Candidate', candidateSchema);
