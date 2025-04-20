import { Request, Response } from 'express';
import Certification from '../models/Certification';
import { ethers } from 'ethers';
import SupplyChain from '../../artifacts/contracts/SupplyChain.sol/SupplyChain.json';

const contractAddress = process.env.CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS';

export const issueCertification = async (req: Request, res: Response) => {
  const { id, entity, status, date } = req.body;

  try {
    const certification = new Certification({
      id,
      entity,
      status,
      date,
      authority: req.body.walletAddress,
    });
    await certification.save();

    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || 'YOUR_PRIVATE_KEY', provider);
    const contract = new ethers.Contract(contractAddress, SupplyChain.abi, wallet);
    await contract.issueCertification(id, entity, status, date);

    res.json(certification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to issue certification' });
  }
};