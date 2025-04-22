import { Request, Response } from 'express';
import Material from '../models/Material';
import dotenv from 'dotenv';

dotenv.config();

export const addMaterial = async (req: Request, res: Response) => {
  const { name, materialType, quantity, serialNumber, batchNumber, certified, certifiedAuthority, pricePerKg } = req.body;
  const walletAddress = req.query.walletAddress as string;

  try {
    const newMaterial = new Material({
      name,
      materialType,
      quantity,
      serialNumber,
      batchNumber,
      certified,
      certifiedAuthority,
      pricePerKg,
      supplier: walletAddress,
    });
    await newMaterial.save();
    res.status(201).json({ message: 'Material added', material: newMaterial });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add material' });
  }
};

export const getMaterials = async (req: Request, res: Response) => {
  try {
    const materials = await Material.find({ supplier: req.query.walletAddress }) || [];
    if (materials.length === 0) {
      // Return dummy data if no real data
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
          supplier: req.query.walletAddress,
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
          supplier: req.query.walletAddress,
        },
      ];
      return res.json(dummyMaterials);
    }
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const walletAddress = req.query.walletAddress as string;
  try {
    // Simulate dummy orders since no blockchain data
    const dummyOrders = [
      { id: "ORD001", material: "Aluminum Alloy", quantity: "200 kg", manufacturer: "MFG Inc.", address: "123 Main St" },
      { id: "ORD002", material: "Steel Rods", quantity: "150 kg", manufacturer: "Steel Co.", address: "456 Oak Ave" },
    ];
    res.json(dummyOrders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const getDeliveries = async (req: Request, res: Response) => {
  const walletAddress = req.query.walletAddress as string;
  try {
    // Simulate dummy deliveries
    const dummyDeliveries = [
      {
        id: "DEL001",
        material: "Aluminum Alloy",
        quantity: "200 kg",
        manufacturer: "MFG Inc.",
        status: "In Transit",
        tracking: "TRK123456",
        date: "2025-04-20",
      },
      {
        id: "DEL002",
        material: "Steel Rods",
        quantity: "150 kg",
        manufacturer: "Steel Co.",
        status: "Delivered",
        tracking: "TRK789101",
        date: "2025-04-19",
      },
    ];
    res.json(dummyDeliveries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deliveries' });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  const walletAddress = req.query.walletAddress as string;
  try {
    // Simulate dummy transactions
    const dummyTransactions = [
      { id: "TXN001", date: "2025-04-18", from: walletAddress, to: "MFG Inc.", price: "$2000" },
      { id: "TXN002", date: "2025-04-17", from: walletAddress, to: "Steel Co.", price: "$2250" },
    ];
    res.json(dummyTransactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};