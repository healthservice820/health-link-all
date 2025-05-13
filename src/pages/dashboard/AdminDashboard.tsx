
import React from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Database, 
  LayoutDashboard, 
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const AdminDashboard = () => {
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

  if (!user || !profile || profile.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, {profile.first_name || "Admin"}!</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
              System Status
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2,451</div>
              <p className="text-sm text-gray-500">Total registered users</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <User className="mr-2 h-5 w-5 text-green-600" />
                Doctors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">128</div>
              <p className="text-sm text-gray-500">Active practitioners</p>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="mr-2 h-5 w-5 text-purple-600" />
                Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">857</div>
              <p className="text-sm text-gray-500">This month</p>
            </CardContent>
          </Card>
          
          {/* <Card className="bg-yellow-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <LayoutDashboard className="mr-2 h-5 w-5 text-yellow-600" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$24,500</div>
              <p className="text-sm text-gray-500">Monthly earnings</p>
            </CardContent>
          </Card> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">User Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/users">
                  <span>Manage Users</span>
                  <Users className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/doctors">
                  <span>Manage Doctors</span>
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/pharmacies">
                  <span>Manage Pharmacies</span>
                  <Users className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/diagnostics">
                  <span>Manage Diagnostic Centers</span>
                  <Database className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/ambulances">
                  <span>Manage Ambulance Services</span>
                  <Users className="h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/settings">
                  <span>System Settings</span>
                  <LayoutDashboard className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/payments">
                  <span>Payment Configuration</span>
                  <Database className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/reports">
                  <span>Analytics & Reports</span>
                  <LayoutDashboard className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/logs">
                  <span>System Logs</span>
                  <Database className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/backup">
                  <span>Backup & Recovery</span>
                  <Database className="h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
