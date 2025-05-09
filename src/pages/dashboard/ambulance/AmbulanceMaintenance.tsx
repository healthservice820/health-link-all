
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const AmbulanceMaintenance = () => {
  return (
    <DashboardPageLayout
      title="Maintenance Management"
      description="Schedule and track vehicle maintenance"
      role="ambulance"
    >
      <div>
        <h2 className="text-lg font-medium">Vehicle Maintenance</h2>
        <p className="mt-2">This page will help you schedule and track maintenance for ambulance vehicles.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default AmbulanceMaintenance;
