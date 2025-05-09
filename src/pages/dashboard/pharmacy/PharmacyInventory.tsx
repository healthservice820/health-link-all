
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const PharmacyInventory = () => {
  return (
    <DashboardPageLayout
      title="Inventory Management"
      description="Track medication stock and supplies"
      role="pharmacy"
    >
      <div>
        <h2 className="text-lg font-medium">Medication Inventory</h2>
        <p className="mt-2">This page will allow you to manage your medication inventory.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default PharmacyInventory;
