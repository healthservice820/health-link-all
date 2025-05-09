
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const PharmacySuppliers = () => {
  return (
    <DashboardPageLayout
      title="Supplier Management"
      description="Manage suppliers and place orders"
      role="pharmacy"
    >
      <div>
        <h2 className="text-lg font-medium">Supplier Directory</h2>
        <p className="mt-2">This page will help you manage medication suppliers and place orders.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default PharmacySuppliers;
