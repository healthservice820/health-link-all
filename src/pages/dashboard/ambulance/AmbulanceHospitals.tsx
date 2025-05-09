
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const AmbulanceHospitals = () => {
  return (
    <DashboardPageLayout
      title="Hospital Network"
      description="View partner hospitals and emergency contacts"
      role="ambulance"
    >
      <div>
        <h2 className="text-lg font-medium">Hospital Directory</h2>
        <p className="mt-2">This page will display information about partner hospitals and emergency contacts.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default AmbulanceHospitals;
