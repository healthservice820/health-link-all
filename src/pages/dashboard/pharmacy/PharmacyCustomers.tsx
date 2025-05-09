
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const PharmacyCustomers = () => {
  return (
    <DashboardPageLayout
      title="Customer Management"
      description="View and manage customer records"
      role="pharmacy"
    >
      <div>
        <h2 className="text-lg font-medium">Customer Records</h2>
        <p className="mt-2">This page will display customer information and prescription history.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default PharmacyCustomers;
