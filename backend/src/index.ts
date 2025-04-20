import express from 'express';
import mongoose from 'mongoose';
import supplierRoutes from './routes/supplierRoutes';
import manufacturerRoutes from './routes/manufacturerRoutes';
import mroRoutes from './routes/mroRoutes';
import airlineRoutes from './routes/airlineRoutes';
import regulatoryAuthorityRoutes from './routes/regulatoryAuthorityRoutes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/supplychain', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any).then(() => console.log('Connected to MongoDB'));

app.use('/api/supplier', supplierRoutes);
app.use('/api/manufacturer', manufacturerRoutes);
app.use('/api/mro', mroRoutes);
app.use('/api/airline', airlineRoutes);
app.use('/api/regulatory-authority', regulatoryAuthorityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));