
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";

const DiagnosticsAppointments = () => {
  return (
    <DashboardPageLayout
      title="Test Appointments"
      description="Manage diagnostic test appointments"
      role="diagnostics"
    >
      <div>
        <h2 className="text-lg font-medium">Appointment Schedule</h2>
        <p className="mt-2">This page will display and manage diagnostic test appointments.</p>
      </div>
    </DashboardPageLayout>
  );
};

export default DiagnosticsAppointments;
