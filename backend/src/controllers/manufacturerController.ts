import { Request, Response } from 'express';
import Order from '../models/Order';
import { ethers } from 'ethers';
import SupplyChain from '../../artifacts/contracts/SupplyChain.sol/SupplyChain.json';

const contractAddress = process.env.CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ manufacturer: req.query.walletAddress });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const placeOrder = async (req: Request, res: Response) => {
  const { id, materialName, quantity, deliveryAddress, price, supplier } = req.body;

  try {
    const order = new Order({
      id,
      materialName,
      quantity,
      manufacturer: req.body.walletAddress,
      deliveryAddress,
      price,
      supplier,
    });
    await order.save();

    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || 'YOUR_PRIVATE_KEY', provider);
    const contract = new ethers.Contract(contractAddress, SupplyChain.abi, wallet);
    await contract.placeOrder(id, materialName, quantity, deliveryAddress, price, supplier);

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};

export const makePayment = async (req: Request, res: Response) => {
  const { orderId, toAddress, amount } = req.body;

  try {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || 'YOUR_PRIVATE_KEY', provider);
    const contract = new ethers.Contract(contractAddress, SupplyChain.abi, wallet);
    const tx = await contract.makePayment(orderId, toAddress, { value: ethers.utils.parseEther(amount) });

    res.json({ transactionHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: 'Failed to make payment' });
  }
};