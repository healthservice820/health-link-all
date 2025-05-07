
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { User, Search, Phone, Mail, Calendar, FileText } from "lucide-react";

const DoctorPatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for patients
  const patients = [
    { 
      id: 1, 
      name: "John Smith", 
      age: 45, 
      gender: "Male",
      contact: "+1 (555) 123-4567",
      email: "john.smith@example.com",
      lastVisit: "2025-04-30",
      condition: "Hypertension"
    },
    { 
      id: 2, 
      name: "Emily Johnson", 
      age: 32, 
      gender: "Female",
      contact: "+1 (555) 234-5678",
      email: "emily.johnson@example.com",
      lastVisit: "2025-05-03",
      condition: "Respiratory infection"
    },
    { 
      id: 3, 
      name: "Michael Brown", 
      age: 58, 
      gender: "Male",
      contact: "+1 (555) 345-6789",
      email: "michael.brown@example.com",
      lastVisit: "2025-04-25",
      condition: "Diabetes Type 2"
    },
    { 
      id: 4, 
      name: "Sarah Wilson", 
      age: 28, 
      gender: "Female",
      contact: "+1 (555) 456-7890",
      email: "sarah.wilson@example.com",
      lastVisit: "2025-05-05",
      condition: "Dermatitis"
    },
    { 
      id: 5, 
      name: "Robert Davis", 
      age: 62, 
      gender: "Male",
      contact: "+1 (555) 567-8901",
      email: "robert.davis@example.com",
      lastVisit: "2025-04-20",
      condition: "Post-surgery recovery"
    },
  ];

  // Mock data for selected patient details
  const selectedPatient = {
    id: 3,
    name: "Michael Brown",
    age: 58,
    gender: "Male",
    dob: "1967-03-15",
    contact: "+1 (555) 345-6789",
    email: "michael.brown@example.com",
    address: "456 Maple Street, Anytown, CA 12345",
    bloodGroup: "O+",
    allergies: ["Penicillin", "Shellfish"],
    chronicConditions: ["Diabetes Type 2", "Hypertension"],
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" }
    ],
    visits: [
      { date: "2025-04-25", reason: "Diabetes follow-up", diagnosis: "Well-controlled diabetes", notes: "HbA1c levels improved" },
      { date: "2025-03-20", reason: "Blood pressure check", diagnosis: "Hypertension - stable", notes: "Maintaining current medication regimen" },
      { date: "2025-02-15", reason: "Annual physical", diagnosis: "General check-up", notes: "Overall health stable, recommended increased physical activity" }
    ]
  };

  return (
    <DashboardPageLayout title="Patient Records" description="Access and manage patient medical records" role="doctor">
      <Tabs defaultValue="all-patients" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all-patients">All Patients</TabsTrigger>
          <TabsTrigger value="patient-details">Patient Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-patients">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative md:w-2/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search patients by name, email, or condition" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-healthcare-primary hover:bg-healthcare-accent md:w-1/3">
              Add New Patient
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {patient.name}
                      </div>
                    </TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-xs">
                          <Phone className="h-3 w-3 mr-1" />
                          {patient.contact}
                        </div>
                        <div className="flex items-center text-xs">
                          <Mail className="h-3 w-3 mr-1" />
                          {patient.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {patient.lastVisit}
                      </div>
                    </TableCell>
                    <TableCell>{patient.condition}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-healthcare-primary hover:bg-healthcare-accent">
                          View Record
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="patient-details">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-bold">{selectedPatient.name}</h3>
                  <p className="text-gray-600">{selectedPatient.age} years • {selectedPatient.gender}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{selectedPatient.dob}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Contact</p>
                    <p className="font-medium">{selectedPatient.contact}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedPatient.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{selectedPatient.address}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Blood Group</p>
                    <p className="font-medium">{selectedPatient.bloodGroup}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Allergies</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedPatient.allergies.map((allergy, index) => (
                        <span key={index} className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Chronic Conditions</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedPatient.chronicConditions.map((condition, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col space-y-3">
                  <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
                    Schedule Appointment
                  </Button>
                  <Button variant="outline">
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-medium mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-healthcare-primary" />
                    Current Medications
                  </h4>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medication</TableHead>
                        <TableHead>Dosage</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedPatient.medications.map((medication, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{medication.name}</TableCell>
                          <TableCell>{medication.dosage}</TableCell>
                          <TableCell>{medication.frequency}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">Update</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <Button variant="outline" className="mt-4">
                    Add Medication
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-lg font-medium mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-healthcare-primary" />
                    Visit History
                  </h4>
                  
                  <div className="space-y-4">
                    {selectedPatient.visits.map((visit, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-healthcare-primary" />
                            <span className="font-medium">{visit.date}</span>
                          </div>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                        <p className="text-sm text-gray-500">Reason for visit: <span className="text-gray-700">{visit.reason}</span></p>
                        <p className="text-sm text-gray-500">Diagnosis: <span className="text-gray-700">{visit.diagnosis}</span></p>
                        <p className="text-sm text-gray-500">Notes: <span className="text-gray-700">{visit.notes}</span></p>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="mt-4 bg-healthcare-primary hover:bg-healthcare-accent">
                    Add Visit Notes
                  </Button>
                </CardContent>
              </Card>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  View Test Results
                </Button>
                <Button variant="outline" className="flex-1">
                  Create Prescription
                </Button>
                <Button variant="outline" className="flex-1">
                  Request Tests
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default DoctorPatientsPage;
