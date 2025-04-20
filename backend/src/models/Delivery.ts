import mongoose, { Schema } from 'mongoose';

const deliverySchema = new Schema({
  orderId: { type: String, required: true },
  status: { type: String, required: true },
  trackingNumber: { type: String },
  deliveryDate: { type: Date, required: true },
  manufacturer: { type: String },
});

export default mongoose.model('Delivery', deliverySchema);