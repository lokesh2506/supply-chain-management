import mongoose, { Schema } from 'mongoose';

const orderSchema = new Schema({
  id: { type: String, required: true },
  materialName: { type: String, required: true },
  quantity: { type: String, required: true },
  manufacturer: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  price: { type: String, required: true },
  supplier: { type: String },
  paid: { type: Boolean, default: false },
});

export default mongoose.model('Order', orderSchema);