import { Request, Response } from 'express';
import Service from '../models/Service';
import { ethers } from 'ethers';
import SupplyChain from '../../artifacts/contracts/SupplyChain.sol/SupplyChain.json';

const contractAddress = process.env.CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS';

export const logService = async (req: Request, res: Response) => {
  const { aircraft, serviceType, workOrder, details, date } = req.body;

  try {
    const service = new Service({
      aircraft,
      serviceType,
      workOrder,
      details,
      date,
      mro: req.body.walletAddress,
    });
    await service.save();

    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || 'YOUR_PRIVATE_KEY', provider);
    const contract = new ethers.Contract(contractAddress, SupplyChain.abi, wallet);
    await contract.logService(aircraft, serviceType, workOrder, details, date);

    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to log service' });
  }
};