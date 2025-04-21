"use client"; // Add this at the top to enable Client Component behavior

import { useContext } from "react";
import { useRouter } from "next/navigation"; // Change to next/navigation
import { AuthContext } from "../../context/AuthContext";
import SupplierDashboard from "../../components/SupplierDashboard";
import ManufacturerDashboard from "../../components/ManufacturerDashboard";
import MRODashboard from "../../components/MRODashboard";
import AirlineDashboard from "../../components/AirlineDashboard";
import RegulatoryAuthorityDashboard from "../../components/RegulatoryAuthorityDashboard";

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) return null;

  const { isLoggedIn, role } = authContext;

  if (!isLoggedIn) {
    router.push("/login"); // Use push from next/navigation
    return null;
  }

  switch (role) {
    case "Supplier":
      return <SupplierDashboard />;
    case "Manufacturer":
      return <ManufacturerDashboard />;
    case "MRO":
      return <MRODashboard />;
    case "Airline":
      return <AirlineDashboard />;
    case "Regulatory Authority":
      return <RegulatoryAuthorityDashboard />;
    default:
      router.push("/login");
      return null;
  }
}