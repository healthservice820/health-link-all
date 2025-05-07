
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Search, User, Calendar, Check, Clock, AlertTriangle } from "lucide-react";

const DoctorLabOrdersPage = () => {
  // Mock data for lab orders
  const labOrders = [
    { 
      id: 1, 
      patient: "John Smith", 
      test: "Complete Blood Count", 
      date: "2025-05-05", 
      lab: "MediLab Diagnostics",
      status: "Completed",
      urgent: false
    },
    { 
      id: 2, 
      patient: "Emily Johnson", 
      test: "Chest X-Ray", 
      date: "2025-05-04", 
      lab: "RadiologyPlus",
      status: "In Progress",
      urgent: true
    },
    { 
      id: 3, 
      patient: "Michael Brown", 
      test: "HbA1c", 
      date: "2025-05-03", 
      lab: "Diabetes Care Lab",
      status: "Completed",
      urgent: false
    },
    { 
      id: 4, 
      patient: "Sarah Wilson", 
      test: "Skin Biopsy", 
      date: "2025-05-02", 
      lab: "Dermatology Pathology",
      status: "Pending",
      urgent: false
    },
    { 
      id: 5, 
      patient: "Robert Davis", 
      test: "MRI - Knee", 
      date: "2025-04-28", 
      lab: "Advanced Imaging",
      status: "Completed",
      urgent: false
    },
  ];

  // Mock data for popular tests
  const popularTests = [
    { id: 1, name: "Complete Blood Count (CBC)", category: "Hematology" },
    { id: 2, name: "Comprehensive Metabolic Panel", category: "Chemistry" },
    { id: 3, name: "Lipid Panel", category: "Chemistry" },
    { id: 4, name: "Thyroid Function Test", category: "Endocrinology" },
    { id: 5, name: "Hemoglobin A1C", category: "Diabetes" },
    { id: 6, name: "Urinalysis", category: "Urology" },
    { id: 7, name: "Liver Function Test", category: "Hepatology" },
    { id: 8, name: "Chest X-Ray", category: "Radiology" },
    { id: 9, name: "Electrocardiogram (ECG)", category: "Cardiology" },
  ];

  return (
    <DashboardPageLayout title="Lab Orders" description="Order tests and view diagnostic results" role="doctor">
      <Tabs defaultValue="all-orders" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all-orders">All Orders</TabsTrigger>
          <TabsTrigger value="create-order">Create New Order</TabsTrigger>
          <TabsTrigger value="test-results">Test Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-orders">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative md:w-2/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search orders by patient name or test type" 
                className="pl-10"
              />
            </div>
            <Button className="bg-healthcare-primary hover:bg-healthcare-accent md:w-1/3">
              Create New Order
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Lab</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {labOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {order.patient}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {order.test}
                        {order.urgent && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Urgent
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {order.date}
                      </div>
                    </TableCell>
                    <TableCell>{order.lab}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === "Completed" 
                          ? "bg-green-100 text-green-800" 
                          : order.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.status === "Completed" ? (
                          <Check className="h-3 w-3 mr-1" />
                        ) : order.status === "In Progress" ? (
                          <Clock className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {order.status === "Completed" ? (
                          <Button size="sm" className="bg-healthcare-primary hover:bg-healthcare-accent">
                            View Results
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline">
                            Track Status
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="create-order">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-6">Create Lab Order</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="patient" className="text-sm font-medium">
                      Patient
                    </label>
                    <Input id="patient" placeholder="Search and select patient" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium">
                      Order Date
                    </label>
                    <Input id="date" type="date" defaultValue="2025-05-07" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-sm font-medium">
                    Select Tests
                  </label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {popularTests.map((test) => (
                      <div key={test.id} className="flex items-center space-x-2 border rounded-md p-3 hover:border-healthcare-primary hover:bg-gray-50 cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          id={`test-${test.id}`}
                          className="h-4 w-4 rounded border-gray-300 text-healthcare-primary focus:ring-healthcare-primary"
                        />
                        <label htmlFor={`test-${test.id}`} className="flex-1 cursor-pointer">
                          <div className="text-sm font-medium">{test.name}</div>
                          <div className="text-xs text-gray-500">{test.category}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  <Button type="button" variant="outline" className="mt-2">
                    Add Custom Test
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="lab" className="text-sm font-medium">
                    Laboratory
                  </label>
                  <Input id="lab" placeholder="Select preferred laboratory" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="urgent"
                    className="h-4 w-4 rounded border-gray-300 text-healthcare-primary focus:ring-healthcare-primary"
                  />
                  <label htmlFor="urgent" className="text-sm font-medium">
                    Mark as Urgent
                  </label>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium">
                    Clinical Notes (Optional)
                  </label>
                  <Input id="notes" placeholder="Add any relevant clinical information" />
                </div>
                
                <div className="pt-4 flex justify-end gap-3">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-healthcare-primary hover:bg-healthcare-accent">
                    Submit Order
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="test-results">
          <div className="mb-6">
            <Input placeholder="Search test results" />
          </div>
          
          <div className="space-y-6">
            {labOrders
              .filter(order => order.status === "Completed")
              .map(result => (
                <Card key={result.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-medium">
                          {result.test} - {result.patient}
                        </h4>
                        <p className="text-sm text-gray-600">{result.lab} • {result.date}</p>
                      </div>
                      <Button size="sm" variant="outline">Download PDF</Button>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600 mb-2">Test results would be displayed here...</p>
                      <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
                        View Complete Results
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            
            {labOrders.filter(order => order.status === "Completed").length === 0 && (
              <div className="text-center py-12 border rounded-md">
                <p className="text-gray-500">No completed test results available</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default DoctorLabOrdersPage;
