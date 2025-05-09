
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const AmbulanceStaff = () => {
  return (
    <DashboardPageLayout
      title="Staff Management"
      description="Manage paramedics and driver schedules"
      role="ambulance"
    >
      <div>
        <h2 className="text-lg font-medium">Staff Directory</h2>
        <p className="mt-2">This page will help you manage paramedics and driver schedules.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default AmbulanceStaff;
