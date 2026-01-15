
import React from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Activity, Database, User, CreditCard, Heart, Ambulance } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PatientDashboard = () => {
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

  if (!user || !profile || profile.role !== "patient") {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Patient Dashboard</h1>
            <p className="text-gray-600">Welcome, {profile.first_name || "Patient"}!</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
              <Link to="/emergency">
                <Ambulance className="mr-2 h-4 w-4" />
                Emergency Services
              </Link>
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
              <div className="text-3xl font-bold">2</div>
              <p className="text-sm text-gray-500">Upcoming appointments</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-green-600" />
                Prescriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-sm text-gray-500">Active prescriptions</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="mr-2 h-5 w-5 text-purple-600" />
                Test Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-sm text-gray-500">Recent lab reports</p>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-yellow-600" />
                Doctors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <p className="text-sm text-gray-500">My healthcare providers</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-healthcare-primary" />
                Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Schedule and manage your medical appointments</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/dashboard/patient/appointments">Manage Appointments</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <User className="mr-2 h-5 w-5 text-healthcare-primary" />
                Find Doctors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Search for specialists and book consultations</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/dashboard/patient/find-doctors">Find Doctors</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-healthcare-primary" />
                Medical Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Access your medical history and test results</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/dashboard/patient/medical-records">View Records</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Heart className="mr-2 h-5 w-5 text-healthcare-primary" />
                Pharmacy Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Order medications and track deliveries</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/dashboard/patient/pharmacy-services">Order Medications</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="mr-2 h-5 w-5 text-healthcare-primary" />
                Diagnostics Tests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Book lab tests and view results</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/dashboard/patient/diagnostic-services">Book Tests</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-healthcare-primary" />
                Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Manage bills and payment history</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/dashboard/patient/payments">Manage Payments</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
