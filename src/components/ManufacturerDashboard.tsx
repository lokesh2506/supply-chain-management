'use client';
import { useState, useEffect } from 'react';
import Header from './Header';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { ethers } from 'ethers';

interface Metric {
  metric: string;
  value: string;
}

interface Order {
  id: string;
  mro: string;
  part: string;
  quantity: string;
  date: string;
  delivery: string;
}

interface Material {
  name: string;
  supplier: string;
  qtyReceived: string;
  qtyUsed: string;
  condition: string;
}

const ManufacturerDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';

  useEffect(() => {
    const fetchData = async () => {
      const walletAddress = localStorage.getItem('walletAddress');
      const resOrders = await fetch(`/api/manufacturer/orders?walletAddress=${walletAddress}`);
      const resMaterials = await fetch(`/api/materials?walletAddress=${walletAddress}`);
      setOrders(await resOrders.json());
      setMaterials(await resMaterials.json());
      setMetrics([
        { metric: 'Total Parts Produced', value: '1200' },
        { metric: 'Total Transactions', value: '450' },
        { metric: 'Parts Shipped to MROs', value: '400' },
      ]);
    };
    fetchData();
  }, []);

  const handlePayment = async (orderId: string, toAddress: string, amount: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, [
      'function makePayment(string memory _orderId, address _to) payable',
    ], signer);
    const tx = await contract.makePayment(orderId, toAddress, { value: ethers.utils.parseEther(amount) });
    await tx.wait();
    await fetch('/api/manufacturer/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, toAddress, amount }),
    });
    alert('Payment successful!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-4">
        <TableContainer component={Paper} className="mb-4">
          <h2 className="text-lg font-bold p-4">Overview</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Metric</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {metrics.map((item) => (
                <TableRow key={item.metric}>
                  <TableCell>{item.metric}</TableCell>
                  <TableCell>{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} className="mb-4">
          <h2 className="text-lg font-bold p-4">MRO Orders</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>MRO Name</TableCell>
                <TableCell>Part Name</TableCell>
                <TableCell>Quantity Ordered</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Delivery Time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.mro}</TableCell>
                  <TableCell>{order.part}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.delivery}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePayment(order.id, 'SUPPLIER_ADDRESS', '0.1')}
                    >
                      Pay
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <h2 className="text-lg font-bold p-4">Material Inventory</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Material Name</TableCell>
                <TableCell>Supplier Name</TableCell>
                <TableCell>Qty Received</TableCell>
                <TableCell>Qty Used</TableCell>
                <TableCell>Condition</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materials.map((material) => (
                <TableRow key={material.name}>
                  <TableCell>{material.name}</TableCell>
                  <TableCell>{material.supplier}</TableCell>
                  <TableCell>{material.qtyReceived}</TableCell>
                  <TableCell>{material.qtyUsed}</TableCell>
                  <TableCell>{material.condition}</TableCell>
                  <TableCell>
                    <Button color="primary">Order</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ManufacturerDashboard;