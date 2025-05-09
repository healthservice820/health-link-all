
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const AmbulanceFleet = () => {
  return (
    <DashboardPageLayout
      title="Fleet Management"
      description="Track ambulance vehicles and maintenance"
      role="ambulance"
    >
      <div>
        <h2 className="text-lg font-medium">Ambulance Fleet</h2>
        <p className="mt-2">This page will help you manage ambulance vehicles and their status.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default AmbulanceFleet;
