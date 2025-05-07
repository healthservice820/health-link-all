
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PatientDashboard from "@/pages/dashboard/PatientDashboard";
import DoctorDashboard from "@/pages/dashboard/DoctorDashboard";
import PharmacyDashboard from "@/pages/dashboard/PharmacyDashboard";
import DiagnosticsDashboard from "@/pages/dashboard/DiagnosticsDashboard";
import AmbulanceDashboard from "@/pages/dashboard/AmbulanceDashboard";

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
    default:
      return <Navigate to="/" />;
  }
};

export default DashboardRouter;
