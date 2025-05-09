
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const PharmacyEmergencyStock = () => {
  return (
    <DashboardPageLayout
      title="Emergency Stock"
      description="Manage critical medication supplies"
      role="pharmacy"
    >
      <div>
        <h2 className="text-lg font-medium">Emergency Medication Inventory</h2>
        <p className="mt-2">This page will help you monitor and maintain critical medication supplies.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default PharmacyEmergencyStock;
