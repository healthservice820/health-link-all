
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const DiagnosticsSampleCollection = () => {
  return (
    <DashboardPageLayout
      title="Sample Collection"
      description="Manage home collection services"
      role="diagnostics"
    >
      <div>
        <h2 className="text-lg font-medium">Sample Collection Service</h2>
        <p className="mt-2">This page will help you schedule and track home sample collection services.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default DiagnosticsSampleCollection;
