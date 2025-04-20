import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.0',
  networks: {
    hardhat: {},
    // sepolia: {
    //   url: process.env.SEPOLIA_URL || 'YOUR_SEPOLIA_URL',
    //   accounts: [process.env.PRIVATE_KEY || 'YOUR_PRIVATE_KEY'],
    // },
  },
};

export default config;