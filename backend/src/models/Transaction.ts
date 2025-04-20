import mongoose, { Schema } from 'mongoose';

const transactionSchema = new Schema({
  orderId: { type: String, required: true },
  timestamp: { type: Date, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: String, required: true },
});

export default mongoose.model('Transaction', transactionSchema);