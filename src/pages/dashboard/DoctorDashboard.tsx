
import React from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Activity, Database, User, Video, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const DoctorDashboard = () => {
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

  if (!user || !profile || profile.role !== "doctor") {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
            <p className="text-gray-600">Welcome, Dr. {profile.first_name || "Doctor"}!</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button asChild className="bg-healthcare-primary hover:bg-healthcare-accent">
              <Link to="/dashboard/doctor/emergency-cases">Emergency Cases</Link>
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
              <div className="text-3xl font-bold">12</div>
              <p className="text-sm text-gray-500">Today's schedule</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-600" />
                Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">48</div>
              <p className="text-sm text-gray-500">Active patients</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-purple-600" />
                Consultations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">128</div>
              <p className="text-sm text-gray-500">This month</p>
            </CardContent>
          </Card>
{/*           
          <Card className="bg-yellow-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="mr-2 h-5 w-5 text-yellow-600" />
                Pending Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-sm text-gray-500">Awaiting review</p>
            </CardContent>
          </Card> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-healthcare-primary" />
                Today's Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">View and manage your scheduled appointments</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/dashboard/doctor/appointments">Manage Schedule</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-healthcare-primary" />
                Patient Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Access and update patient medical records</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/dashboard/doctor/patients">Manage Patients</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <User className="mr-2 h-5 w-5 text-healthcare-primary" />
                Prescriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Create and manage patient prescriptions</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/dashboard/doctor/prescriptions">Manage Prescriptions</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="mr-2 h-5 w-5 text-healthcare-primary" />
                Lab Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Order tests and view diagnostic results</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/dashboard/doctor/lab-orders">Manage Lab Orders</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Video className="mr-2 h-5 w-5 text-healthcare-primary" />
                Telemedicine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Conduct virtual consultations with patients</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/dashboard/doctor/telemedicine">Start Consultation</Link>
              </Button>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-healthcare-primary" />
                Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">View payments and financial reports</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/dashboard/doctor/earnings">Financial Overview</Link>
              </Button>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
