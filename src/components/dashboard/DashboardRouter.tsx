
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

  switch (profile.role) {
    case "patient":
      return <PatientDashboard />;
    case "doctor":
      return <DoctorDashboard />;
    case "pharmacy":
      return <PharmacyDashboard />;
    case "diagnostics":
      return <DiagnosticsDashboard />;
    case "ambulance":
      return <AmbulanceDashboard />;
    default:
      return <Navigate to="/" />;
  }
};

export default DashboardRouter;
