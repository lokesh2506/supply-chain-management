
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

export default function Page() {
  return (
   <Login/>
  )
}
declare global {
  interface Window {
    ethereum?: any;
  }
}

 function Login() {
  const [isConnected, setIsConnected] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
          
        }, 1500);
      } catch (err) {
        console.error("User rejected the connection:", err);
      }
    } else {
      alert("MetaMask not detected. Please install the extension.");
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    console.log("Wallet disconnected");
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setIsConnected(true);
        }
      }
    };
    checkConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {!isConnected ? (
        <button
          onClick={connectMetaMask}
          className="absolute top-6 left-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          LOGIN
        </button>
      ) : (
        <button
          onClick={disconnectWallet}
          className="absolute top-6 left-6 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
        >
          LOGOUT
        </button>
      )}

      {/* Simple MUI Alert */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <Collapse in={showAlert}>
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            Wallet connected successfully
          </Alert>
        </Collapse>
      </div>
    </div>
  );
}
