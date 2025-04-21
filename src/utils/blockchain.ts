// supply-chain-management/src/utils/blockchain.ts
import { ethers } from 'ethers';
import { SupplyChain } from './SupplyChain';

export const connectWallet = async () => {
  if (!window.ethereum) throw new Error('MetaMask not detected');
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    return { provider, signer, address };
  } catch (error) {
    console.error('Wallet connection error:', error);
    throw error;
  }
};

export const getContract = (signer: ethers.Signer) => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  if (!contractAddress) throw new Error('Contract address not set');
  return new ethers.Contract(contractAddress, SupplyChain.abi, signer);
};

export const callContractMethod = async (
  method: string,
  args: any[],
  signer: ethers.Signer,
  value?: ethers.BigNumberish
) => {
  try {
    const contract = getContract(signer);
    const methodFn = (contract as any)[method] as (...args: any[]) => Promise<any>;
    if (!methodFn) throw new Error(`Method ${method} not found on contract`);
    const tx = await methodFn(...args, { value });
    await tx.wait();
    return tx;
  } catch (error) {
    console.error(`Blockchain error in ${method}:`, error);
    throw error;
  }
};

export const getContractData = async (method: string, args: any[], provider: ethers.providers.Provider) => {
  try {
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, SupplyChain.abi, provider);
    const methodFn = (contract as any)[method] as (...args: any[]) => Promise<any>;
    if (!methodFn) throw new Error(`Method ${method} not found on contract`);
    return await methodFn(...args);
  } catch (error) {
    console.error(`Data fetch error in ${method}:`, error);
    throw error;
  }
};