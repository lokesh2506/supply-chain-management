import mongoose, { Schema } from 'mongoose';

const serviceSchema = new Schema({
  aircraft: { type: String, required: true },
  serviceType: { type: String, required: true },
  workOrder: { type: String, required: true },
  details: { type: String, required: true },
  date: { type: Date, required: true },
  mro: { type: String, required: true },
});

export default mongoose.model('Service', serviceSchema);