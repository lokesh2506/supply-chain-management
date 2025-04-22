"use client";
import { useState, useEffect } from "react";
import Header from "./Header";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const walletAddress = localStorage.getItem("walletAddress") || "0xDummyWallet123";
      try {
        // Simulate API calls with dummy data
        const dummyMaterials: Material[] = [
          {
            name: "Aluminum Alloy",
            type: "Metal",
            quantity: "500 kg",
            serial: "MAT001",
            batch: "BATCH2025A",
            certified: true,
            authority: "ISO Certified",
            price: "$10/kg",
          },
          {
            name: "Steel Rods",
            type: "Metal",
            quantity: "300 kg",
            serial: "MAT002",
            batch: "BATCH2025B",
            certified: false,
            authority: "Pending",
            price: "$15/kg",
          },
        ];
        const dummyOrders: Order[] = [
          { id: "ORD001", material: "Aluminum Alloy", quantity: "200 kg", manufacturer: "MFG Inc.", address: "123 Main St" },
          { id: "ORD002", material: "Steel Rods", quantity: "150 kg", manufacturer: "Steel Co.", address: "456 Oak Ave" },
        ];
        const dummyDeliveries: Delivery[] = [
          {
            id: "DEL001",
            material: "Aluminum Alloy",
            quantity: "200 kg",
            manufacturer: "MFG Inc.",
            status: "In Transit",
            tracking: "TRK123456",
            date: "2025-04-20",
          },
          {
            id: "DEL002",
            material: "Steel Rods",
            quantity: "150 kg",
            manufacturer: "Steel Co.",
            status: "Delivered",
            tracking: "TRK789101",
            date: "2025-04-19",
          },
        ];
        const dummyTransactions: Transaction[] = [
          { id: "TXN001", date: "2025-04-18", from: "0xDummyWallet123", to: "MFG Inc.", price: "$2000" },
          { id: "TXN002", date: "2025-04-17", from: "0xDummyWallet123", to: "Steel Co.", price: "$2250" },
        ];

        setMaterials(dummyMaterials);
        setOrders(dummyOrders);
        setDeliveries(dummyDeliveries);
        setTransactions(dummyTransactions);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error occurred");
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-600 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Supplier Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-blue-600">Total Materials</h2>
            <p className="text-4xl font-bold text-gray-900">{materials.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-green-600">Total Orders</h2>
            <p className="text-4xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-purple-600">Total Transactions</h2>
            <p className="text-4xl font-bold text-gray-900">{transactions.length}</p>
          </div>
        </div>
        <TableContainer component={Paper} className="mb-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 p-4">Current Orders</h2>
          <Table>
            <TableHead>
              <TableRow className="bg-blue-100">
                <TableCell className="font-bold text-gray-700">Order ID</TableCell>
                <TableCell className="font-bold text-gray-700">Material Name</TableCell>
                <TableCell className="font-bold text-gray-700">Quantity</TableCell>
                <TableCell className="font-bold text-gray-700">Manufacturer</TableCell>
                <TableCell className="font-bold text-gray-700">Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-gray-50">
                  <TableCell className="py-3">{order.id}</TableCell>
                  <TableCell>{order.material}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.manufacturer}</TableCell>
                  <TableCell>{order.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} className="mb-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 p-4">Materials Catalog</h2>
          <Table>
            <TableHead>
              <TableRow className="bg-green-100">
                <TableCell className="font-bold text-gray-700">Name</TableCell>
                <TableCell className="font-bold text-gray-700">Type</TableCell>
                <TableCell className="font-bold text-gray-700">Quantity</TableCell>
                <TableCell className="font-bold text-gray-700">Serial</TableCell>
                <TableCell className="font-bold text-gray-700">Batch</TableCell>
                <TableCell className="font-bold text-gray-700">Certified</TableCell>
                <TableCell className="font-bold text-gray-700">Authority</TableCell>
                <TableCell className="font-bold text-gray-700">Price</TableCell>
                <TableCell className="font-bold text-gray-700">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materials.map((material) => (
                <TableRow key={material.serial} className="hover:bg-gray-50">
                  <TableCell className="py-3">{material.name}</TableCell>
                  <TableCell>{material.type}</TableCell>
                  <TableCell>{material.quantity}</TableCell>
                  <TableCell>{material.serial}</TableCell>
                  <TableCell>{material.batch}</TableCell>
                  <TableCell>{material.certified ? "✅ Certified" : "❌ Not Certified"}</TableCell>
                  <TableCell>{material.authority}</TableCell>
                  <TableCell>{material.price}</TableCell>
                  <TableCell>
                    <Button color="primary" className="mr-2">Edit</Button>
                    <Button color="error">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper} className="mb-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 p-4">Deliveries</h2>
          <Table>
            <TableHead>
              <TableRow className="bg-purple-100">
                <TableCell className="font-bold text-gray-700">Order ID</TableCell>
                <TableCell className="font-bold text-gray-700">Material</TableCell>
                <TableCell className="font-bold text-gray-700">Quantity</TableCell>
                <TableCell className="font-bold text-gray-700">Manufacturer</TableCell>
                <TableCell className="font-bold text-gray-700">Status</TableCell>
                <TableCell className="font-bold text-gray-700">Tracking</TableCell>
                <TableCell className="font-bold text-gray-700">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries.map((delivery) => (
                <TableRow key={delivery.id} className="hover:bg-gray-50">
                  <TableCell className="py-3">{delivery.id}</TableCell>
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
        <TableContainer component={Paper} className="shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 p-4">Transactions</h2>
          <Table>
            <TableHead>
              <TableRow className="bg-yellow-100">
                <TableCell className="font-bold text-gray-700">Order ID</TableCell>
                <TableCell className="font-bold text-gray-700">Date</TableCell>
                <TableCell className="font-bold text-gray-700">From</TableCell>
                <TableCell className="font-bold text-gray-700">To</TableCell>
                <TableCell className="font-bold text-gray-700">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-gray-50">
                  <TableCell className="py-3">{transaction.id}</TableCell>
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