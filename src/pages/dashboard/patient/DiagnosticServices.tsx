
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileText, Calendar, Clock, MapPin, Check, Home } from "lucide-react";

const DiagnosticServicesPage = () => {
  // Mock data for booked tests
  const bookedTests = [
    { 
      id: 1, 
      testName: "Complete Blood Count", 
      facility: "MediLab Diagnostics", 
      date: "2025-05-15", 
      time: "10:00 AM", 
      location: "123 Medical Ave, New York", 
      status: "Confirmed",
      homeCollection: false
    },
    { 
      id: 2, 
      testName: "Lipid Panel", 
      facility: "Health Testing Center", 
      date: "2025-05-20", 
      time: "2:30 PM", 
      location: "Home Collection", 
      status: "Pending",
      homeCollection: true
    },
  ];

  // Mock data for test results
  const testResults = [
    { id: 1, testName: "Complete Blood Count", date: "2025-04-15", status: "Completed", resultDate: "2025-04-16" },
    { id: 2, testName: "Blood Glucose Test", date: "2025-04-10", status: "Completed", resultDate: "2025-04-11" },
    { id: 3, testName: "Thyroid Function Test", date: "2025-04-05", status: "Completed", resultDate: "2025-04-07" },
  ];

  // Mock data for popular tests
  const popularTests = [
    { id: 1, name: "Complete Blood Count (CBC)", price: "$45", description: "Evaluates overall health and detects various disorders" },
    { id: 2, name: "Comprehensive Metabolic Panel", price: "$65", description: "Checks kidney and liver function, electrolyte levels" },
    { id: 3, name: "Lipid Panel", price: "$55", description: "Measures cholesterol levels and risk factors for heart disease" },
    { id: 4, name: "Thyroid Function Test", price: "$75", description: "Evaluates how well your thyroid is working" },
    { id: 5, name: "Hemoglobin A1C", price: "$60", description: "Measures average blood sugar levels over past 3 months" },
    { id: 6, name: "Vitamin D Test", price: "$50", description: "Determines if you have a vitamin D deficiency" },
  ];

  return (
    <DashboardPageLayout title="Diagnostic Services" description="Book lab tests and view results" role="patient">
      <Tabs defaultValue="booked-tests" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="booked-tests">Booked Tests</TabsTrigger>
          <TabsTrigger value="test-results">Test Results</TabsTrigger>
          <TabsTrigger value="book-test">Book New Test</TabsTrigger>
        </TabsList>
        
        <TabsContent value="booked-tests">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Facility</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookedTests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {test.testName}
                      </div>
                    </TableCell>
                    <TableCell>{test.facility}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {test.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          {test.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {test.homeCollection ? (
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-2 text-healthcare-primary" />
                          Home Collection
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {test.location}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        test.status === "Confirmed" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {test.status === "Confirmed" ? (
                          <Check className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {test.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="destructive">Cancel</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="test-results">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Test Date</TableHead>
                  <TableHead>Result Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {result.testName}
                      </div>
                    </TableCell>
                    <TableCell>{result.date}</TableCell>
                    <TableCell>{result.resultDate}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        <Check className="h-3 w-3 mr-1" />
                        {result.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Report</Button>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="book-test">
          <div>
            <div className="mb-6">
              <Input placeholder="Search for tests..." className="max-w-md" />
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Popular Tests</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularTests.map((test) => (
                  <Card key={test.id} className="hover:border-healthcare-primary cursor-pointer transition-all">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{test.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{test.description}</p>
                        </div>
                        <div className="text-healthcare-primary font-medium">
                          {test.price}
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-healthcare-primary hover:bg-healthcare-accent">
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Health Packages</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="hover:border-healthcare-primary cursor-pointer transition-all">
                  <CardContent className="p-4">
                    <h4 className="font-medium">Basic Health Checkup</h4>
                    <p className="text-healthcare-primary font-medium my-2">$99</p>
                    <p className="text-sm text-gray-600">Includes CBC, liver function, kidney function, lipid profile</p>
                    <Button className="w-full mt-4 bg-healthcare-primary hover:bg-healthcare-accent">
                      View Package
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-healthcare-primary hover:shadow-md cursor-pointer transition-all">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Comprehensive Health Checkup</h4>
                      <span className="bg-healthcare-primary text-white text-xs rounded-full px-2 py-1">Popular</span>
                    </div>
                    <p className="text-healthcare-primary font-medium my-2">$199</p>
                    <p className="text-sm text-gray-600">Includes 40+ tests covering all essential health parameters</p>
                    <Button className="w-full mt-4 bg-healthcare-primary hover:bg-healthcare-accent">
                      View Package
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="hover:border-healthcare-primary cursor-pointer transition-all">
                  <CardContent className="p-4">
                    <h4 className="font-medium">Advanced Health Checkup</h4>
                    <p className="text-healthcare-primary font-medium my-2">$299</p>
                    <p className="text-sm text-gray-600">Includes 60+ tests with doctor consultation and follow-up</p>
                    <Button className="w-full mt-4 bg-healthcare-primary hover:bg-healthcare-accent">
                      View Package
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default DiagnosticServicesPage;
