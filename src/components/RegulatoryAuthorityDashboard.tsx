'use client';
import { useState, useEffect } from 'react';
import Header from './Header';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Certification {
  id: string;
  entity: string;
  status: string;
  date: string;
}

const RegulatoryAuthorityDashboard: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const walletAddress = localStorage.getItem('walletAddress');
      const res = await fetch(`/api/regulatory-authority/certifications?walletAddress=${walletAddress}`);
      setCertifications(await res.json());
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-4">
        <TableContainer component={Paper}>
          <h2 className="text-lg font-bold p-4">Certifications</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Certification ID</TableCell>
                <TableCell>Entity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certifications.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>{cert.id}</TableCell>
                  <TableCell>{cert.entity}</TableCell>
                  <TableCell>{cert.status}</TableCell>
                  <TableCell>{cert.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RegulatoryAuthorityDashboard;