"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";
import { Select, MenuItem, Button, FormControl, InputLabel, Box, Typography } from "@mui/material";
import { FaLock } from "react-icons/fa";

export default function Login() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>("");

  if (!authContext) return null;

  const { connectWallet } = authContext;

  const handleLogin = async () => {
    if (!selectedRole) {
      alert("Please select a role");
      return;
    }
    // Simulate successful MetaMask connection with dummy wallet
    const success = await connectWallet(selectedRole);
    if (success) {

      router.push("/vineet");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center p-4">
      <Box className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md transform transition duration-300 hover:scale-105">
        <div className="text-center mb-6">
          <FaLock className="text-4xl text-blue-600 mx-auto mb-2" />
          <Typography variant="h4" className="text-gray-800 font-bold">
            Supply Chain Login
          </Typography>
        </div>
        <FormControl fullWidth className="mb-6">
          <InputLabel>Select Role</InputLabel>
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            label="Select Role"
            className="rounded"
          >
            <MenuItem value="">Select Role</MenuItem>
            <MenuItem value="Supplier">Supplier</MenuItem>
            <MenuItem value="Manufacturer">Manufacturer</MenuItem>
            <MenuItem value="MRO">MRO</MenuItem>
            <MenuItem value="Airline">Airline</MenuItem>
            <MenuItem value="Regulatory Authority">Regulatory Authority</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="py-3 text-lg rounded-lg bg-blue-600 hover:bg-blue-700"
          onClick={handleLogin}
        >
          Connect with MetaMask
        </Button>
      </Box>
    </div>
  );
}