
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const PharmacyReports = () => {
  return (
    <DashboardPageLayout
      title="Financial Reports"
      description="View sales and inventory reports"
      role="pharmacy"
    >
      <div>
        <h2 className="text-lg font-medium">Pharmacy Analytics</h2>
        <p className="mt-2">This page will display financial and inventory reports.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default PharmacyReports;
