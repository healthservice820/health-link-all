
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, User, Check, X, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Navigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDoctors = () => {
  const { user, profile, isLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

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

  const doctors = [
    { id: 1, name: "Dr. Sarah Williams", email: "sarah.w@example.com", specialty: "Cardiology", hospital: "General Hospital", experience: "8 years", rating: 4.8, status: "active", verified: true, patients: 124 },
    { id: 2, name: "Dr. Michael Brown", email: "michael.b@example.com", specialty: "Neurology", hospital: "Medical Center", experience: "12 years", rating: 4.9, status: "active", verified: true, patients: 156 },
    { id: 3, name: "Dr. Lisa Taylor", email: "lisa.t@example.com", specialty: "Oncology", hospital: "Cancer Institute", experience: "15 years", rating: 4.7, status: "active", verified: true, patients: 98 },
    { id: 4, name: "Dr. James Anderson", email: "james.a@example.com", specialty: "Orthopedics", hospital: "Sports Medicine Center", experience: "10 years", rating: 4.5, status: "pending", verified: false, patients: 0 },
    { id: 5, name: "Dr. Robert Miller", email: "robert.m@example.com", specialty: "Pulmonology", hospital: "Respiratory Center", experience: "7 years", rating: 4.6, status: "active", verified: true, patients: 87 },
    { id: 6, name: "Dr. Jennifer White", email: "jennifer.w@example.com", specialty: "Internal Medicine", hospital: "Community Hospital", experience: "5 years", rating: 4.3, status: "active", verified: true, patients: 112 },
    { id: 7, name: "Dr. David Johnson", email: "david.j@example.com", specialty: "Dermatology", hospital: "Skin Care Clinic", experience: "9 years", rating: 4.7, status: "inactive", verified: true, patients: 45 },
    { id: 8, name: "Dr. Amanda Clark", email: "amanda.c@example.com", specialty: "Pediatrics", hospital: "Children's Hospital", experience: "6 years", rating: 4.8, status: "pending", verified: false, patients: 0 },
  ];

  const filteredDoctors = doctors.filter(
    doctor => 
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Doctor Management</h1>
            <p className="text-gray-600">Manage healthcare providers and verify credentials</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
              <User className="mr-2 h-4 w-4" />
              Add New Doctor
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Doctor Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">Total Doctors</p>
                <p className="text-2xl font-bold">{doctors.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700">Active Doctors</p>
                <p className="text-2xl font-bold">{doctors.filter(d => d.status === "active").length}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-red-700">Verification Pending</p>
                <p className="text-2xl font-bold">{doctors.filter(d => d.status === "pending").length}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-700">Average Rating</p>
                <p className="text-2xl font-bold">{(doctors.reduce((acc, doc) => acc + doc.rating, 0) / doctors.length).toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Doctors</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending Verification</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            
            <div className="relative w-full max-w-xs mt-2 sm:mt-0">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <TabsContent value="all">
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Specialty</th>
                        <th className="px-4 py-2 text-left">Hospital</th>
                        <th className="px-4 py-2 text-left">Experience</th>
                        <th className="px-4 py-2 text-left">Rating</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Verified</th>
                        <th className="px-4 py-2 text-left">Patients</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDoctors.map((doctor) => (
                        <tr key={doctor.id} className="border-b">
                          <td className="px-4 py-3 font-medium">{doctor.name}</td>
                          <td className="px-4 py-3">{doctor.specialty}</td>
                          <td className="px-4 py-3">{doctor.hospital}</td>
                          <td className="px-4 py-3">{doctor.experience}</td>
                          <td className="px-4 py-3">{doctor.rating}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              doctor.status === "active" ? "bg-green-100 text-green-800" :
                              doctor.status === "inactive" ? "bg-gray-100 text-gray-800" :
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {doctor.verified ? 
                              <Check className="h-5 w-5 text-green-500" /> : 
                              <X className="h-5 w-5 text-red-500" />
                            }
                          </td>
                          <td className="px-4 py-3">{doctor.patients}</td>
                          <td className="px-4 py-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {doctor.status === "pending" ? (
                                  <DropdownMenuItem className="text-green-600">Verify Doctor</DropdownMenuItem>
                                ) : doctor.status === "active" ? (
                                  <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Delete Doctor</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {["active", "pending", "inactive"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Specialty</th>
                          <th className="px-4 py-2 text-left">Hospital</th>
                          <th className="px-4 py-2 text-left">Experience</th>
                          <th className="px-4 py-2 text-left">Rating</th>
                          <th className="px-4 py-2 text-left">Verified</th>
                          <th className="px-4 py-2 text-left">Patients</th>
                          <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDoctors
                          .filter(doctor => doctor.status === tab)
                          .map((doctor) => (
                            <tr key={doctor.id} className="border-b">
                              <td className="px-4 py-3 font-medium">{doctor.name}</td>
                              <td className="px-4 py-3">{doctor.specialty}</td>
                              <td className="px-4 py-3">{doctor.hospital}</td>
                              <td className="px-4 py-3">{doctor.experience}</td>
                              <td className="px-4 py-3">{doctor.rating}</td>
                              <td className="px-4 py-3">
                                {doctor.verified ? 
                                  <Check className="h-5 w-5 text-green-500" /> : 
                                  <X className="h-5 w-5 text-red-500" />
                                }
                              </td>
                              <td className="px-4 py-3">{doctor.patients}</td>
                              <td className="px-4 py-3">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    {tab === "pending" ? (
                                      <DropdownMenuItem className="text-green-600">Verify Doctor</DropdownMenuItem>
                                    ) : tab === "active" ? (
                                      <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                                    ) : (
                                      <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDoctors;
