
import React from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Activity, Database, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PharmacyDashboard = () => {
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

  if (!user || !profile || profile.role !== "pharmacy") {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Pharmacy Dashboard</h1>
            <p className="text-gray-600">Welcome, {profile.first_name || "Pharmacy Manager"}!</p>
          </div>
          {/* <div className="mt-4 md:mt-0">
            <Button asChild className="bg-healthcare-primary hover:bg-healthcare-accent">
              <Link to="/pharmacy/emergency-stock">Emergency Stock</Link>
            </Button>
          </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-blue-600" />
                Prescriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18</div>
              <p className="text-sm text-gray-500">New orders today</p>
            </CardContent>
          </Card>
          
          {/* <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="mr-2 h-5 w-5 text-green-600" />
                Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">524</div>
              <p className="text-sm text-gray-500">Items in stock</p>
            </CardContent>
          </Card> */}
          
          <Card className="bg-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-purple-600" />
                Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">7</div>
              <p className="text-sm text-gray-500">Pending deliveries</p>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <User className="mr-2 h-5 w-5 text-yellow-600" />
                Doctors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42</div>
              <p className="text-sm text-gray-500">Connected practitioners</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-healthcare-primary" />
                Prescriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Manage incoming prescription orders</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/pharmacy/prescriptions">Process Orders</Link>
              </Button>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="mr-2 h-5 w-5 text-healthcare-primary" />
                Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Check and update medicine inventory</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/pharmacy/inventory">Manage Inventory</Link>
              </Button>
            </CardContent>
          </Card> */}

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <User className="mr-2 h-5 w-5 text-healthcare-primary" />
                Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">View and manage patient records</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/pharmacy/customers">Manage Customers</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-healthcare-primary" />
                Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Schedule and track medicine deliveries</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/pharmacy/deliveries">Manage Deliveries</Link>
              </Button>
            </CardContent>
          </Card>

          {/* <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-healthcare-primary" />
                Suppliers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Manage medicine suppliers and orders</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/pharmacy/suppliers">Manage Suppliers</Link>
              </Button>
            </CardContent>
          </Card> */}

          {/* <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Database className="mr-2 h-5 w-5 text-healthcare-primary" />
                Financial Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">View sales and financial analytics</p>
              <Button asChild className="mt-4 w-full bg-healthcare-primary hover:bg-healthcare-accent">
                <Link to="/pharmacy/reports">View Reports</Link>
              </Button>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </Layout>
  );
};

export default PharmacyDashboard;
