
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const DiagnosticsPatients = () => {
  return (
    <DashboardPageLayout
      title="Patient Records"
      description="Access and manage patient records"
      role="diagnostics"
    >
      <div>
        <h2 className="text-lg font-medium">Patient Database</h2>
        <p className="mt-2">This page will display patient information and testing history.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default DiagnosticsPatients;
