'use client';
import { useState, useEffect } from 'react';
import Header from './Header';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Service {
  aircraft: string;
  serviceType: string;
  workOrder: string;
  details: string;
  date: string;
}

interface Inventory {
  part: string;
  quantity: string;
  serial: string;
}

const MRODashboard: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [inventory, setInventory] = useState<Inventory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const walletAddress = localStorage.getItem('walletAddress');
      const resServices = await fetch(`/api/mro/services?walletAddress=${walletAddress}`);
      const resInventory = await fetch(`/api/inventory?walletAddress=${walletAddress}`);
      setServices(await resServices.json());
      setInventory(await resInventory.json());
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-4">
        <TableContainer component={Paper} className="mb-4">
          <h2 className="text-lg font-bold p-4">Active Services</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Aircraft/Component</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Work Order</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.workOrder}>
                  <TableCell>{service.aircraft}</TableCell>
                  <TableCell>{service.serviceType}</TableCell>
                  <TableCell>{service.workOrder}</TableCell>
                  <TableCell>{service.details}</TableCell>
                  <TableCell>{service.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <h2 className="text-lg font-bold p-4">Inventory</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Part Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Serial Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.serial}>
                  <TableCell>{item.part}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.serial}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default MRODashboard;