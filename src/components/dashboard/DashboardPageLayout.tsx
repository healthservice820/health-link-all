
import React, { ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface DashboardPageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  role: "patient" | "doctor" | "pharmacy" | "diagnostics" | "ambulance" | "admin";
}

const DashboardPageLayout = ({
  children,
  title,
  description,
  role,
}: DashboardPageLayoutProps) => {
  const { user, profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="flex justify-center items-center h-64">
            <p>Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !profile || profile.role !== role) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          {description && <p className="text-gray-600">{description}</p>}
        </div>
        <Card className="p-6">
          {children}
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardPageLayout;
