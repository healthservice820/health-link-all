
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const DiagnosticsReports = () => {
  return (
    <DashboardPageLayout
      title="Business Analytics"
      description="View financial and operational reports"
      role="diagnostics"
    >
      <div>
        <h2 className="text-lg font-medium">Diagnostics Analytics</h2>
        <p className="mt-2">This page will display financial and operational reports for the diagnostic center.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default DiagnosticsReports;
