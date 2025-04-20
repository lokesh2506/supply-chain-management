'use client';
import { useState, useEffect } from 'react';
import Header from './Header';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

interface Order {
  id: string;
  material: string;
  quantity: string;
  manufacturer: string;
  address: string;
}

interface Material {
  name: string;
  type: string;
  quantity: string;
  serial: string;
  batch: string;
  certified: boolean;
  authority: string;
  price: string;
}

interface Delivery {
  id: string;
  material: string;
  quantity: string;
  manufacturer: string;
  status: string;
  tracking: string;
  date: string;
}

interface Transaction {
  id: string;
  date: string;
  from: string;
  to: string;
  price: string;
}

const SupplierDashboard: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      const walletAddress = localStorage.getItem('walletAddress');
      const resMaterials = await fetch(`/api/supplier/materials?walletAddress=${walletAddress}`);
      const resOrders = await fetch(`/api/manufacturer/orders?walletAddress=${walletAddress}`);
      const resDeliveries = await fetch(`/api/deliveries?walletAddress=${walletAddress}`);
      const resTransactions = await fetch(`/api/transactions?walletAddress=${walletAddress}`);
      setMaterials(await resMaterials.json());
      setOrders(await resOrders.json());
      setDeliveries(await resDeliveries.json());
      setTransactions(await resTransactions.json());
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const walletAddress = localStorage.getItem('walletAddress');
        const res = await fetch(`/api/supplier/materials?walletAddress=${walletAddress}`);
        const data = await res.json();
        setMaterials(data); // Assuming setMaterials is defined in state
      } catch (error) {
        console.error('Error fetching materials:', error);
      }
    };
    fetchMaterials();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Total Materials</h2>
            <p className="text-2xl">{materials.length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Total Orders</h2>
            <p className="text-2xl">{orders.length}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Total Transactions</h2>
            <p className="text-2xl">{transactions.length}</p>
          </div>
        </div>
        <TableContainer component={Paper} className="mb-4">
          <h2 className="text-lg font-bold p-4">Current Orders</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Material Name</TableCell>
                <TableCell>Quantity Ordered</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell>Delivery Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.material}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.manufacturer}</TableCell>
                  <TableCell>{order.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} className="mb-4">
          <h2 className="text-lg font-bold p-4">Materials Catalog</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Material Name</TableCell>
                <TableCell>Material Type</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Serial Number</TableCell>
                <TableCell>Batch Number</TableCell>
                <TableCell>Certification</TableCell>
                <TableCell>Certified Authority</TableCell>
                <TableCell>Price per kg</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materials.map((material) => (
                <TableRow key={material.serial}>
                  <TableCell>{material.name}</TableCell>
                  <TableCell>{material.type}</TableCell>
                  <TableCell>{material.quantity}</TableCell>
                  <TableCell>{material.serial}</TableCell>
                  <TableCell>{material.batch}</TableCell>
                  <TableCell>{material.certified ? '✅ Certified' : '❌ Not Certified'}</TableCell>
                  <TableCell>{material.authority}</TableCell>
                  <TableCell>{material.price}</TableCell>
                  <TableCell>
                    <Button color="primary">Edit</Button>
                    <Button color="error">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} className="mb-4">
          <h2 className="text-lg font-bold p-4">Deliveries</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Material Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Tracking Number</TableCell>
                <TableCell>Delivery Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell>{delivery.id}</TableCell>
                  <TableCell>{delivery.material}</TableCell>
                  <TableCell>{delivery.quantity}</TableCell>
                  <TableCell>{delivery.manufacturer}</TableCell>
                  <TableCell>{delivery.status}</TableCell>
                  <TableCell>{delivery.tracking}</TableCell>
                  <TableCell>{delivery.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <h2 className="text-lg font-bold p-4">Transactions</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>From (Supplier)</TableCell>
                <TableCell>To (Manufacturer)</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.from}</TableCell>
                  <TableCell>{transaction.to}</TableCell>
                  <TableCell>{transaction.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default SupplierDashboard;