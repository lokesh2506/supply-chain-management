'use client';
import { useState, useEffect } from 'react';
import Header from './Header';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Aircraft {
  id: string;
  flight: string;
  parts: string;
  hours: string;
}

const AirlineDashboard: React.FC = () => {
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const walletAddress = localStorage.getItem('walletAddress');
      const res = await fetch(`/api/airline/aircrafts?walletAddress=${walletAddress}`);
      setAircrafts(await res.json());
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-4">
        <TableContainer component={Paper}>
          <h2 className="text-lg font-bold p-4">Aircraft Operations</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Aircraft ID</TableCell>
                <TableCell>Flight Info</TableCell>
                <TableCell>Parts Installed</TableCell>
                <TableCell>Flight Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {aircrafts.map((aircraft) => (
                <TableRow key={aircraft.id}>
                  <TableCell>{aircraft.id}</TableCell>
                  <TableCell>{aircraft.flight}</TableCell>
                  <TableCell>{aircraft.parts}</TableCell>
                  <TableCell>{aircraft.hours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AirlineDashboard;