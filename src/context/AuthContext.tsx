"use client";
import { createContext, useState, ReactNode, useContext } from "react";
import { ethers } from "ethers";

interface AuthContextType {
  walletAddress: string | null;
  isLoggedIn: boolean;
  role: string | null;
  connectWallet: (role: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);

  const connectWallet = async (selectedRole: string): Promise<boolean> => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setWalletAddress(accounts[0]);
        setRole(selectedRole);
        setIsLoggedIn(true);
        localStorage.setItem("walletAddress", accounts[0]);
        return true;
      } catch (error) {
        console.error("Wallet connection failed:", error);
        return false;
      }
    } else {
      alert("Please install MetaMask!");
      return false;
    }
  };

  const logout = () => {
    setWalletAddress(null);
    setRole(null);
    setIsLoggedIn(false);
    localStorage.removeItem("walletAddress");
  };

  return (
    <AuthContext.Provider value={{ walletAddress, isLoggedIn, role, connectWallet, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);