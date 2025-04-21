// supply-chain-management/backend/src/utils/blockchain.ts
import { ethers } from 'ethers';
import SupplyChain from '../../artifacts/contracts/SupplyChain.sol/SupplyChain.json';
import dotenv from 'dotenv';

dotenv.config();

const getContract = (walletAddress?: string) => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');
  let signerOrProvider: ethers.Signer | ethers.providers.Provider;

  if (walletAddress) {
    signerOrProvider = provider.getSigner(walletAddress);
  } else {
    signerOrProvider = provider;
  }

  const contractAddress = process.env.CONTRACT_ADDRESS || '';
  if (!contractAddress) {
    throw new Error('CONTRACT_ADDRESS is not set in .env');
  }

  return new ethers.Contract(contractAddress, SupplyChain.abi, signerOrProvider);
};

export const callContractMethod = async (
  method: string,
  args: any[],
  walletAddress?: string,
  value?: ethers.BigNumberish
) => {
  try {
    const contract = getContract(walletAddress);
    const methodFn = (contract as any)[method] as (...args: any[]) => Promise<any>;
    if (!methodFn) {
      throw new Error(`Method ${method} not found on contract`);
    }

    const tx = await methodFn(...args, { value });
    await tx.wait();
    return tx;
  } catch (error) {
    console.error(`Blockchain error in ${method}:`, error);
    throw error;
  }
};

export const getContractData = async (method: string, args: any[], walletAddress?: string) => {
  try {
    const contract = getContract(walletAddress);
    const methodFn = (contract as any)[method] as (...args: any[]) => Promise<any>;
    if (!methodFn) {
      throw new Error(`Method ${method} not found on contract`);
    }
    return await methodFn(...args);
  } catch (error) {
    console.error(`Data fetch error in ${method}:`, error);
    throw error;
  }
};