
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const AdminSettings = () => {
  return (
    <DashboardPageLayout
      title="System Settings"
      description="Configure application settings"
      role="admin"
    >
      <div>
        <h2 className="text-lg font-medium">Application Settings</h2>
        <p className="mt-2">This page will allow you to configure system-wide settings.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default AdminSettings;
