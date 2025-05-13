
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Calendar, Phone, FileText, Mail, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DiagnosticsPatients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock patient data
  const patients = [
    {
      id: "P-1234",
      name: "John Smith",
      dob: "1985-06-14",
      gender: "Male",
      phone: "+1 555-123-4567",
      email: "john.smith@example.com",
      address: "123 Main St, Springfield",
      bloodGroup: "O+",
      lastVisit: "2025-05-12",
      testCount: 8,
      recentTests: ["Complete Blood Count", "Lipid Profile", "Kidney Function Test"],
      referringDoctor: "Dr. Robert Chen"
    },
    {
      id: "P-2345",
      name: "Alice Johnson",
      dob: "1990-02-23",
      gender: "Female",
      phone: "+1 555-234-5678",
      email: "alice.johnson@example.com",
      address: "456 Oak St, Springfield",
      bloodGroup: "A+",
      lastVisit: "2025-05-12",
      testCount: 5,
      recentTests: ["Lipid Profile", "Thyroid Function Test"],
      referringDoctor: "Dr. Sarah Williams"
    },
    {
      id: "P-3456",
      name: "Robert Brown",
      dob: "1978-11-08",
      gender: "Male",
      phone: "+1 555-345-6789",
      email: "robert.brown@example.com",
      address: "789 Pine St, Springfield",
      bloodGroup: "B-",
      lastVisit: "2025-05-12",
      testCount: 3,
      recentTests: ["Liver Function Test", "Vitamin D Test"],
      referringDoctor: "Dr. James Johnson"
    },
    {
      id: "P-4567",
      name: "Emily Davis",
      dob: "1995-04-17",
      gender: "Female",
      phone: "+1 555-456-7890",
      email: "emily.davis@example.com",
      address: "101 Elm St, Springfield",
      bloodGroup: "AB+",
      lastVisit: "2025-05-13",
      testCount: 2,
      recentTests: ["Blood Glucose", "Complete Urine Analysis"],
      referringDoctor: "Dr. Elizabeth Brown"
    },
    {
      id: "P-5678",
      name: "Michael Wilson",
      dob: "1982-09-30",
      gender: "Male",
      phone: "+1 555-567-8901",
      email: "michael.wilson@example.com",
      address: "202 Maple St, Springfield",
      bloodGroup: "O-",
      lastVisit: "2025-05-13",
      testCount: 4,
      recentTests: ["Thyroid Profile", "HbA1c"],
      referringDoctor: "Dr. David Miller"
    }
  ];
  
  // Mock test history data
  const testHistory = [
    {
      patientId: "P-1234",
      tests: [
        {
          id: "TR-001",
          date: "2025-05-12",
          testName: "Complete Blood Count",
          status: "Completed",
          doctor: "Dr. Robert Chen",
          abnormal: false
        },
        {
          id: "TR-006",
          date: "2025-04-15",
          testName: "Lipid Profile",
          status: "Completed",
          doctor: "Dr. Robert Chen",
          abnormal: true
        },
        {
          id: "TR-012",
          date: "2025-03-22",
          testName: "Kidney Function Test",
          status: "Completed",
          doctor: "Dr. Robert Chen",
          abnormal: false
        }
      ]
    },
    {
      patientId: "P-2345",
      tests: [
        {
          id: "TR-002",
          date: "2025-05-12",
          testName: "Lipid Profile",
          status: "Completed",
          doctor: "Dr. Sarah Williams",
          abnormal: false
        },
        {
          id: "TR-007",
          date: "2025-04-02",
          testName: "Thyroid Function Test",
          status: "Completed",
          doctor: "Dr. Sarah Williams",
          abnormal: true
        }
      ]
    },
    {
      patientId: "P-3456",
      tests: [
        {
          id: "TR-003",
          date: "2025-05-12",
          testName: "Liver Function Test",
          status: "In Progress",
          doctor: "Dr. James Johnson",
          abnormal: null
        },
        {
          id: "TR-008",
          date: "2025-04-10",
          testName: "Vitamin D Test",
          status: "Completed",
          doctor: "Dr. James Johnson",
          abnormal: true
        }
      ]
    },
    {
      patientId: "P-4567",
      tests: [
        {
          id: "TR-004",
          date: "2025-05-13",
          testName: "Blood Glucose",
          status: "Completed",
          doctor: "Dr. Elizabeth Brown",
          abnormal: true
        },
        {
          id: "TR-009",
          date: "2025-04-28",
          testName: "Complete Urine Analysis",
          status: "Completed",
          doctor: "Dr. Elizabeth Brown",
          abnormal: false
        }
      ]
    },
    {
      patientId: "P-5678",
      tests: [
        {
          id: "TR-005",
          date: "2025-05-13",
          testName: "Thyroid Profile",
          status: "Pending",
          doctor: "Dr. David Miller",
          abnormal: null
        },
        {
          id: "TR-010",
          date: "2025-04-20",
          testName: "HbA1c",
          status: "Completed",
          doctor: "Dr. David Miller",
          abnormal: false
        }
      ]
    }
  ];
  
  const recentPatients = patients.filter(patient => 
    patient.lastVisit === "2025-05-12" || patient.lastVisit === "2025-05-13"
  );
  
  const filteredPatients = patients.filter(
    patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
              patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              patient.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  return (
    <DashboardPageLayout
      title="Patient Records"
      description="Access and manage patient records"
      role="diagnostics"
    >
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Patients</TabsTrigger>
            <TabsTrigger value="recent">Recent Patients</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search patients..." 
              className="max-w-xs" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button>
              <User className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Blood Group</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Tests</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          <div>
                            <div>{patient.name}</div>
                            <div className="text-xs text-gray-500">
                              <span className="mr-2">{patient.gender}</span>
                              <span>
                                <Calendar className="h-3 w-3 inline mr-1" />
                                {new Date(patient.dob).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-2 text-gray-400" />
                            {patient.phone}
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-2 text-gray-400" />
                            {patient.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{patient.bloodGroup}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {patient.lastVisit}
                        </div>
                      </TableCell>
                      <TableCell>{patient.testCount} tests</TableCell>
                      <TableCell className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline"
                              onClick={() => setSelectedPatient(patient)}
                            >
                              View Record
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Patient Records: {selectedPatient?.name}</DialogTitle>
                            </DialogHeader>
                            {selectedPatient && (
                              <div className="py-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-lg">Patient Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div>
                                        <p className="text-sm text-gray-500">Patient ID:</p>
                                        <p className="font-medium">{selectedPatient.id}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Name:</p>
                                        <p>{selectedPatient.name}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Date of Birth:</p>
                                        <p>{new Date(selectedPatient.dob).toLocaleDateString()}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Gender:</p>
                                        <p>{selectedPatient.gender}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Blood Group:</p>
                                        <p className="font-medium">{selectedPatient.bloodGroup}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Referring Doctor:</p>
                                        <p>{selectedPatient.referringDoctor}</p>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-lg">Contact Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div>
                                        <p className="text-sm text-gray-500">Phone:</p>
                                        <p className="flex items-center">
                                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                          {selectedPatient.phone}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Email:</p>
                                        <p className="flex items-center">
                                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                          {selectedPatient.email}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Address:</p>
                                        <p className="flex items-center">
                                          <Globe className="h-4 w-4 mr-2 text-gray-400" />
                                          {selectedPatient.address}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-lg">Test Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div>
                                        <p className="text-sm text-gray-500">Last Visit:</p>
                                        <p className="flex items-center">
                                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                          {selectedPatient.lastVisit}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Total Tests:</p>
                                        <p className="font-medium">{selectedPatient.testCount}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Recent Tests:</p>
                                        <ul className="list-disc pl-5 mt-1">
                                          {selectedPatient.recentTests.map((test, index) => (
                                            <li key={index} className="text-sm">{test}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                <div className="mt-6">
                                  <h3 className="font-medium text-lg mb-4">Test History</h3>
                                  <div className="rounded-md border">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>Test ID</TableHead>
                                          <TableHead>Date</TableHead>
                                          <TableHead>Test Name</TableHead>
                                          <TableHead>Doctor</TableHead>
                                          <TableHead>Status</TableHead>
                                          <TableHead>Results</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {testHistory
                                          .find(history => history.patientId === selectedPatient.id)
                                          ?.tests.map(test => (
                                            <TableRow key={test.id}>
                                              <TableCell className="font-medium">{test.id}</TableCell>
                                              <TableCell>{test.date}</TableCell>
                                              <TableCell>{test.testName}</TableCell>
                                              <TableCell>{test.doctor}</TableCell>
                                              <TableCell>
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                  test.status === "Completed" 
                                                    ? "bg-green-100 text-green-800"
                                                    : test.status === "In Progress"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                }`}>
                                                  {test.status}
                                                </span>
                                              </TableCell>
                                              <TableCell>
                                                {test.status === "Completed" && (
                                                  <Button size="sm" variant="outline">
                                                    <FileText className="h-4 w-4 mr-2" /> 
                                                    {test.abnormal === true ? "Abnormal" : "Normal"}
                                                  </Button>
                                                )}
                                                {test.status !== "Completed" && "-"}
                                              </TableCell>
                                            </TableRow>
                                          ))
                                        }
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-2">
                                  <Button>
                                    Schedule New Test
                                  </Button>
                                  <Button variant="outline">
                                    <FileText className="h-4 w-4 mr-2" /> 
                                    Export Records
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button size="sm">
                          Book Test
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No patients found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Blood Group</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Tests</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPatients.length > 0 ? (
                  recentPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          <div>
                            <div>{patient.name}</div>
                            <div className="text-xs text-gray-500">
                              <span className="mr-2">{patient.gender}</span>
                              <span>
                                <Calendar className="h-3 w-3 inline mr-1" />
                                {new Date(patient.dob).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-2 text-gray-400" />
                            {patient.phone}
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-3 w-3 mr-2 text-gray-400" />
                            {patient.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{patient.bloodGroup}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {patient.lastVisit}
                        </div>
                      </TableCell>
                      <TableCell>{patient.testCount} tests</TableCell>
                      <TableCell className="flex space-x-2">
                        <Button size="sm" variant="outline"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          View Record
                        </Button>
                        <Button size="sm">
                          Book Test
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No recent patients
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default DiagnosticsPatients;
