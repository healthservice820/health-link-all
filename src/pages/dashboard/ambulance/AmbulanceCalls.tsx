
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const AmbulanceCalls = () => {
  return (
    <DashboardPageLayout
      title="Emergency Calls"
      description="Manage emergency service requests"
      role="ambulance"
    >
      <div>
        <h2 className="text-lg font-medium">Emergency Call Center</h2>
        <p className="mt-2">This page will display and manage emergency service requests.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default AmbulanceCalls;
