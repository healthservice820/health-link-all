
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const PharmacyPrescriptions = () => {
  return (
    <DashboardPageLayout
      title="Prescriptions"
      description="Manage and process prescriptions"
      role="pharmacy"
    >
      <div>
        <h2 className="text-lg font-medium">Prescription Management</h2>
        <p className="mt-2">This page will allow you to process and track prescription orders.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default PharmacyPrescriptions;
