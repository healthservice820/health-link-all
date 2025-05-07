
import React from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Activity, Database, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const AmbulanceDashboard = () => {
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

  if (!user || !profile || profile.role !== "ambulance") {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Ambulance Service Dashboard</h1>
            <p className="text-gray-600">Welcome, {profile.first_name || "Service Manager"}!</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-red-600 hover:bg-red-700 mr-2">
              Emergency Mode
            </Button>
            <Button asChild className="bg-healthcare-primary hover:bg-healthcare-accent">
              <Link to="/ambulance/active-calls">Active Calls</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-blue-600" />
                Emergency Calls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-sm text-gray-500">Active emergencies</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <User className="mr-2 h-5 w-5 text-green-600" />
                Ambulances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-sm text-gray-500">Available vehicles</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-purple-600" />
                Staff on Duty
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">16</div>
              <p className="text-sm text-gray-500">Paramedics & drivers</p>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-yellow-600" />
                Services Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-sm text-gray-500">Emergency transports</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-healthcare-primary" />
                Emergency Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">View and respond to emergency service requests</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/ambulance/calls">Manage Calls</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-healthcare-primary" />
                Fleet Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Manage ambulance fleet and driver assignments</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/ambulance/fleet">Manage Fleet</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-healthcare-primary" />
                Service History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">View completed emergency service records</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/ambulance/history">View History</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <User className="mr-2 h-5 w-5 text-healthcare-primary" />
                Staff Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Manage paramedics and driver schedules</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/ambulance/staff">Manage Staff</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="mr-2 h-5 w-5 text-healthcare-primary" />
                Hospital Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">View and manage partner hospital network</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/ambulance/hospitals">Manage Network</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="mr-2 h-5 w-5 text-healthcare-primary" />
                Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Schedule and track vehicle maintenance</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/ambulance/maintenance">Manage Maintenance</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AmbulanceDashboard;
