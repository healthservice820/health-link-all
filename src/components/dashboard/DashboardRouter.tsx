
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const DashboardRouter = () => {
  const { profile, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!profile) {
    return <Navigate to="/login" />;
  }

  // Direct users to their specific dashboard based on role
  switch (profile.role) {
    case "patient":
      return <Navigate to="/dashboard/patient" />;
    case "doctor":
      return <Navigate to="/dashboard/doctor" />;
    case "pharmacy":
      return <Navigate to="/dashboard/pharmacy" />;
    case "diagnostics":
      return <Navigate to="/dashboard/diagnostics" />;
    case "ambulance":
      return <Navigate to="/dashboard/ambulance" />;
    case "admin":
      return <Navigate to="/dashboard/admin" />;
    case "finance":
    case "financial_controller":
      return <Navigate to="/dashboard/finance" />;
    case "customer_care":
      return <Navigate to="/dashboard/customer-care" />;
    default:
      return <Navigate to="/" />;
  }
};

export default DashboardRouter;
