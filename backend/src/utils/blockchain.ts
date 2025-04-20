import { ethers } from 'ethers';
import SupplyChain from '../../../artifacts/contracts/SupplyChain.sol/SupplyChain.json';

const contractAddress = process.env.CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS';

export const getContract = (privateKey: string) => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
  const wallet = new ethers.Wallet(privateKey, provider);
  return new ethers.Contract(contractAddress, SupplyChain.abi, wallet);
};