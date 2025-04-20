import mongoose, { Schema } from 'mongoose';

const certificationSchema = new Schema({
  id: { type: String, required: true },
  entity: { type: String, required: true },
  status: { type: Boolean, required: true },
  date: { type: Date, required: true },
  authority: { type: String, required: true },
});

export default mongoose.model('Certification', certificationSchema);