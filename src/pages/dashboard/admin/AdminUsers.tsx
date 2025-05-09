
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const AdminUsers = () => {
  return (
    <DashboardPageLayout
      title="User Management"
      description="Manage system users and permissions"
      role="admin"
    >
      <div>
        <h2 className="text-lg font-medium">System Users</h2>
        <p className="mt-2">This page will help you manage system users and their permissions.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default AdminUsers;
