
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const DiagnosticsResults = () => {
  return (
    <DashboardPageLayout
      title="Test Results"
      description="Manage and deliver test results"
      role="diagnostics"
    >
      <div>
        <h2 className="text-lg font-medium">Test Results Management</h2>
        <p className="mt-2">This page will help you process and deliver test results.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default DiagnosticsResults;
