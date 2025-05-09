
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const DiagnosticsPartners = () => {
  return (
    <DashboardPageLayout
      title="Partner Physicians"
      description="Manage referring physician network"
      role="diagnostics"
    >
      <div>
        <h2 className="text-lg font-medium">Partner Network</h2>
        <p className="mt-2">This page will help you manage relationships with referring physicians.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default DiagnosticsPartners;
