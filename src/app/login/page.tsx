'use client';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';
import { Select, MenuItem, Button, FormControl, InputLabel, Box, Typography } from '@mui/material';

export default function Login() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>('');

  if (!authContext) return null;

  const { connectWallet } = authContext;

  const handleLogin = async () => {
    if (!selectedRole) {
      alert('Please select a role');
      return;
    }
    const success = await connectWallet(selectedRole);
    if (success) {
      router.push('/vineet');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Box sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Role</InputLabel>
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            label="Select Role"
          >
            <MenuItem value="">Select Role</MenuItem>
            <MenuItem value="Supplier">Supplier</MenuItem>
            <MenuItem value="Manufacturer">Manufacturer</MenuItem>
            <MenuItem value="MRO">MRO</MenuItem>
            <MenuItem value="Airline">Airline</MenuItem>
            <MenuItem value="Regulatory Authority">Regulatory Authority</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
          Connect with MetaMask
        </Button>
      </Box>
    </div>
  );
}