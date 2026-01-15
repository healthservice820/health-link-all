
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

const MedicalRecordsPage = () => {
  // Mock data
  const testResults = [
    { id: 1, name: "Complete Blood Count", date: "2025-04-15", requestedBy: "Dr. Sarah Johnson", status: "Completed" },
    { id: 2, name: "Lipid Panel", date: "2025-04-10", requestedBy: "Dr. Michael Chen", status: "Completed" },
    { id: 3, name: "Liver Function Test", date: "2025-04-05", requestedBy: "Dr. Sarah Johnson", status: "Completed" },
  ];

  const prescriptions = [
    { id: 1, medication: "Amoxicillin 500mg", prescribedBy: "Dr. Sarah Johnson", date: "2025-04-15", duration: "7 days", instructions: "Take twice daily with food" },
    { id: 2, medication: "Loratadine 10mg", prescribedBy: "Dr. Michael Chen", date: "2025-04-10", duration: "30 days", instructions: "Take once daily" },
    { id: 3, medication: "Ibuprofen 400mg", prescribedBy: "Dr. James Taylor", date: "2025-04-05", duration: "As needed", instructions: "Take with food when needed for pain" },
  ];

  const medicalHistory = [
    { id: 1, condition: "Asthma", diagnosedDate: "2020-06-12", status: "Ongoing" },
    { id: 2, condition: "Appendectomy", diagnosedDate: "2018-03-24", status: "Resolved" },
    { id: 3, condition: "Allergic Rhinitis", diagnosedDate: "2019-09-08", status: "Ongoing" },
  ];

  return (
    <DashboardPageLayout title="Medical Records" description="Access your complete medical history" role="patient">
      <Tabs defaultValue="test-results" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="test-results">Lab Results</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="medical-history">Medical History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="test-results">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testResults.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {test.name}
                      </div>
                    </TableCell>
                    <TableCell>{test.date}</TableCell>
                    <TableCell>{test.requestedBy}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {test.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="prescriptions">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Prescribed By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Instructions</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell className="font-medium">{prescription.medication}</TableCell>
                    <TableCell>{prescription.prescribedBy}</TableCell>
                    <TableCell>{prescription.date}</TableCell>
                    <TableCell>{prescription.duration}</TableCell>
                    <TableCell>{prescription.instructions}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">Renew</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="medical-history">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Condition</TableHead>
                  <TableHead>Diagnosed Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicalHistory.map((condition) => (
                  <TableRow key={condition.id}>
                    <TableCell className="font-medium">{condition.condition}</TableCell>
                    <TableCell>{condition.diagnosedDate}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        condition.status === "Ongoing" 
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {condition.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default MedicalRecordsPage;
