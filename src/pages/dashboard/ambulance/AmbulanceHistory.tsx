
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const AmbulanceHistory = () => {
  return (
    <DashboardPageLayout
      title="Service History"
      description="View emergency service records"
      role="ambulance"
    >
      <div>
        <h2 className="text-lg font-medium">Service Records</h2>
        <p className="mt-2">This page will display historical records of emergency services provided.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default AmbulanceHistory;
