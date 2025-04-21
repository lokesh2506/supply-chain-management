// supply-chain-management/backend/src/controllers/manufacturerController.ts
import { Request, Response } from 'express';
import { callContractMethod, getContractData } from '../utils/blockchain';
import { ethers } from 'ethers'; // Add this import for parseEther

export const placeOrder = async (req: Request, res: Response) => {
  const { id, materialName, quantity, deliveryAddress, price, supplier } = req.body;
  const walletAddress = req.query.walletAddress as string;

  try {
    await callContractMethod('placeOrder', [id, materialName, quantity, deliveryAddress, price, supplier], walletAddress);
    res.status(201).json({ message: 'Order placed', orderId: id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const walletAddress = req.query.walletAddress as string;
  try {
    const orders = await getContractData('getOrders', [walletAddress], walletAddress);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const makePayment = async (req: Request, res: Response) => {
  const { orderId, toAddress, amount } = req.body;
  const walletAddress = req.query.walletAddress as string;
  try {
    await callContractMethod('makePayment', [orderId, toAddress], walletAddress, ethers.utils.parseEther(amount));
    res.status(200).json({ message: 'Payment processed', orderId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process payment' });
  }
};