import mongoose, { Schema } from 'mongoose';

const materialSchema = new Schema({
  name: { type: String, required: true },
  materialType: { type: String, required: true },
  quantity: { type: String, required: true },
  serialNumber: { type: String, required: true },
  batchNumber: { type: String, required: true },
  certified: { type: Boolean, required: true },
  certifiedAuthority: { type: String },
  pricePerKg: { type: String, required: true },
  supplier: { type: String, required: true },
});

export default mongoose.model('Material', materialSchema);