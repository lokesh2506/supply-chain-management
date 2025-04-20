import { Request, Response } from 'express';
import Material from '../models/Material';
import { ethers } from 'ethers';
import SupplyChain from '../../artifacts/contracts/SupplyChain.sol/SupplyChain.json';

const contractAddress = process.env.CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS'; // Set in .env

export const getMaterials = async (req: Request, res: Response) => {
  try {
    const materials = await Material.find({ supplier: req.query.walletAddress });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
};

export const addMaterial = async (req: Request, res: Response) => {
  const { name, materialType, quantity, serialNumber, batchNumber, certified, certifiedAuthority, pricePerKg } = req.body;

  try {
    const material = new Material({
      name,
      materialType,
      quantity,
      serialNumber,
      batchNumber,
      certified,
      certifiedAuthority,
      pricePerKg,
      supplier: req.body.walletAddress,
    });
    await material.save();

    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || 'YOUR_PRIVATE_KEY', provider);
    const contract = new ethers.Contract(contractAddress, SupplyChain.abi, wallet);
    await contract.addMaterial(name, materialType, quantity, serialNumber, batchNumber, certified, certifiedAuthority, pricePerKg);

    res.json(material);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add material' });
  }
};