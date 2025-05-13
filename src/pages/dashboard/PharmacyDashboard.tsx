
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  Activity, 
  Database, 
  User, 
  Receipt 
} from "lucide-react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  lastPrescription: string;
  status: "active" | "inactive";
}

const mockDoctors: Doctor[] = [
  {
    id: "DOC-001",
    name: "Dr. Sarah Wilson",
    specialty: "Cardiology",
    hospital: "City Medical Center",
    lastPrescription: "2 days ago",
    status: "active"
  },
  {
    id: "DOC-002",
    name: "Dr. Michael Chen",
    specialty: "Endocrinology",
    hospital: "Central Hospital",
    lastPrescription: "1 day ago",
    status: "active"
  },
  {
    id: "DOC-003",
    name: "Dr. James Rodriguez",
    specialty: "General Medicine",
    hospital: "Westside Health Center",
    lastPrescription: "5 days ago",
    status: "active"
  },
  {
    id: "DOC-004",
    name: "Dr. Linda Thompson",
    specialty: "Allergy & Immunology",
    hospital: "University Medical Center",
    lastPrescription: "1 week ago",
    status: "inactive"
  },
  {
    id: "DOC-005",
    name: "Dr. Robert Smith",
    specialty: "Rheumatology",
    hospital: "Memorial Hospital",
    lastPrescription: "3 days ago",
    status: "active"
  }
];

const PharmacyDashboard = () => {
  const { user, profile, isLoading } = useAuth();
  const [showAllDoctors, setShowAllDoctors] = useState(false);
  
  const displayedDoctors = showAllDoctors ? mockDoctors : mockDoctors.slice(0, 3);

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
          
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Receipt className="mr-2 h-5 w-5 text-green-600" />
                Billing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-sm text-gray-500">Pending payments</p>
            </CardContent>
          </Card>
        </div>

        {/* Connected Practitioners Section */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5 text-healthcare-primary" />
              Connected Practitioners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Hospital</TableHead>
                    <TableHead>Last Prescription</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedDoctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell className="font-medium">{doctor.name}</TableCell>
                      <TableCell>{doctor.specialty}</TableCell>
                      <TableCell>{doctor.hospital}</TableCell>
                      <TableCell>{doctor.lastPrescription}</TableCell>
                      <TableCell>
                        <Badge 
                          className={doctor.status === "active" 
                            ? "bg-green-500 hover:bg-green-600" 
                            : "bg-gray-400 hover:bg-gray-500"
                          }
                        >
                          {doctor.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {!showAllDoctors && mockDoctors.length > 3 && (
              <div className="mt-4 text-center">
                <Button variant="outline" onClick={() => setShowAllDoctors(true)}>
                  View all practitioners
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

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
