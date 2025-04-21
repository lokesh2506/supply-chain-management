import { Request, Response } from 'express';
import Material from '../models/Material';
import { ethers } from 'ethers';
import SupplyChain from '../../artifacts/contracts/SupplyChain.sol/SupplyChain.json';
import { getContractData, callContractMethod } from '../utils/blockchain';
import dotenv from 'dotenv';

dotenv.config();

export const addMaterial = async (req: Request, res: Response) => {
  const { name, materialType, quantity, serialNumber, batchNumber, certified, certifiedAuthority, pricePerKg } = req.body;
  const walletAddress = req.query.walletAddress as string;

  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    return res.status(500).json({ error: 'Contract address not configured' });
  }

  try {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
    const signer = provider.getSigner(walletAddress);
    const contract = new ethers.Contract(contractAddress, SupplyChain.abi, signer);

    const tx = await contract.addMaterial(
      name,
      materialType,
      quantity,
      serialNumber,
      batchNumber,
      certified,
      certifiedAuthority,
      pricePerKg
    );
    await tx.wait();

    // Save to MongoDB (optional, depending on your design)
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

    res.status(201).json({ message: 'Material added', txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add material' });
  }
};

export const getMaterials = async (req: Request, res: Response) => {
  try {
    const materials = await Material.find({ supplier: req.query.walletAddress });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const walletAddress = req.query.walletAddress as string;
  try {
    const orders = await getContractData('getOrders', [walletAddress], walletAddress); // Adjust contract method
    res.json(orders || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const getDeliveries = async (req: Request, res: Response) => {
  const walletAddress = req.query.walletAddress as string;
  try {
    const deliveries = await getContractData('getDeliveries', [walletAddress], walletAddress); // Adjust contract method
    res.json(deliveries || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deliveries' });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  const walletAddress = req.query.walletAddress as string;
  try {
    const transactions = await getContractData('getTransactions', [walletAddress], walletAddress); // Adjust contract method
    res.json(transactions || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};