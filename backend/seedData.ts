import mongoose from 'mongoose';
import Material from './src/models/Material';

const uri = 'mongodb://localhost:27017/supplyChainDB'; // Adjust to your MongoDB URI

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedData = async () => {
  const dummyMaterials = [
    {
      name: "Aluminum Alloy",
      materialType: "Metal",
      quantity: "500 kg",
      serialNumber: "MAT001",
      batchNumber: "BATCH2025A",
      certified: true,
      certifiedAuthority: "ISO Certified",
      pricePerKg: "$10/kg",
      supplier: "0xDummyWallet123",
    },
    {
      name: "Steel Rods",
      materialType: "Metal",
      quantity: "300 kg",
      serialNumber: "MAT002",
      batchNumber: "BATCH2025B",
      certified: false,
      certifiedAuthority: "Pending",
      pricePerKg: "$15/kg",
      supplier: "0xDummyWallet123",
    },
  ];

  try {
    await Material.insertMany(dummyMaterials);
    console.log('Dummy data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();