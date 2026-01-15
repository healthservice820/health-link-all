
import React from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Activity, Database, User, Receipt } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const DiagnosticsDashboard = () => {
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

  if (!user || !profile || profile.role !== "diagnostics") {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Diagnostics Center Dashboard</h1>
            <p className="text-gray-600">Welcome, {profile.first_name || "Center Manager"}!</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild className="bg-healthcare-primary hover:bg-healthcare-accent">
              <Link to="/diagnostics/urgent-tests">Urgent Tests</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-600" />
                Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-sm text-gray-500">Today's bookings</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-green-600" />
                Tests Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">185</div>
              <p className="text-sm text-gray-500">This week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="mr-2 h-5 w-5 text-purple-600" />
                Sample Collection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-sm text-gray-500">Home visits scheduled</p>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <User className="mr-2 h-5 w-5 text-yellow-600" />
                Results Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-sm text-gray-500">Awaiting processing</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-healthcare-primary" />
                Test Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">View and manage scheduled diagnostic tests</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/diagnostics/appointments">Manage Schedule</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-healthcare-primary" />
                Test Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Upload and manage patient test results</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/diagnostics/results">Process Results</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <User className="mr-2 h-5 w-5 text-healthcare-primary" />
                Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Access patient testing history</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/diagnostics/patients">Manage Patients</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="mr-2 h-5 w-5 text-healthcare-primary" />
                Sample Collection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Schedule home collection services</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/diagnostics/sample-collection">Manage Collection</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-healthcare-primary" />
                Partner Doctors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Manage referring physician network</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/diagnostics/partners">Manage Partners</Link>
              </Button>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="mr-2 h-5 w-5 text-healthcare-primary" />
                Business Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">View analytics and financial reports</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/diagnostics/reports">View Reports</Link>
              </Button>
            </CardContent>
          </Card> */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Receipt className="mr-2 h-5 w-5 text-healthcare-primary" />
                Billing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Manage customer bills and payments</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/pharmacy/billing">Manage Billing</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DiagnosticsDashboard;
