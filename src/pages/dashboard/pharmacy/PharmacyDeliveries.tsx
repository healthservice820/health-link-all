
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const PharmacyDeliveries = () => {
  return (
    <DashboardPageLayout
      title="Delivery Management"
      description="Schedule and track medication deliveries"
      role="pharmacy"
    >
      <div>
        <h2 className="text-lg font-medium">Medication Deliveries</h2>
        <p className="mt-2">This page will help you schedule and track medication deliveries.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default PharmacyDeliveries;
