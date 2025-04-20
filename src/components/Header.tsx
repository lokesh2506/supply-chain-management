'use client';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@mui/material';

const Header: React.FC = () => {
  const { walletAddress, logout } = useContext(AuthContext) || {};

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-2xl font-bold">Supply Chain Dashboard</h1>
      {walletAddress && (
        <div className="flex items-center">
          <span className="mr-4">
            Wallet: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
          <Button variant="contained" color="error" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;