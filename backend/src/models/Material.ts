import mongoose, { Schema, Document } from 'mongoose';

export interface IMaterial extends Document {
  name: string;
  materialType: string;
  quantity: string;
  serialNumber: string;
  batchNumber: string;
  certified: boolean;
  certifiedAuthority: string;
  pricePerKg: string;
  supplier: string;
}

const MaterialSchema: Schema = new Schema({
  name: { type: String, required: true },
  materialType: { type: String, required: true },
  quantity: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  batchNumber: { type: String, required: true },
  certified: { type: Boolean, required: true },
  certifiedAuthority: { type: String, required: true },
  pricePerKg: { type: String, required: true },
  supplier: { type: String, required: true },
});

export default mongoose.model<IMaterial>('Material', MaterialSchema);