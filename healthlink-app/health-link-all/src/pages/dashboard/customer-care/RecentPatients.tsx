
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Phone } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  lastInteraction: string;
  reason: string;
}

const RecentPatients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const patients: Patient[] = [
    { 
      id: "P1001", 
      name: "John Adebayo", 
      age: 45, 
      gender: "Male", 
      phone: "+234-803-456-7890", 
      email: "john.adebayo@example.com", 
      lastInteraction: "Today, 10:23 AM", 
      reason: "Booking appointment with cardiologist"
    },
    { 
      id: "P1002", 
      name: "Mary Okonkwo", 
      age: 32, 
      gender: "Female", 
      phone: "+234-705-123-4567", 
      email: "mary.okonkwo@example.com", 
      lastInteraction: "Today, 09:15 AM", 
      reason: "Finding nearby pharmacy for prescription"
    },
    { 
      id: "P1003", 
      name: "Ibrahim Musa", 
      age: 28, 
      gender: "Male", 
      phone: "+234-813-789-0123", 
      email: "ibrahim.m@example.com", 
      lastInteraction: "Yesterday, 04:30 PM", 
      reason: "Scheduling lab test"
    },
    { 
      id: "P1004", 
      name: "Chioma Eze", 
      age: 39, 
      gender: "Female", 
      phone: "+234-907-345-6789", 
      email: "chioma.eze@example.com", 
      lastInteraction: "Yesterday, 02:15 PM", 
      reason: "General inquiry about health insurance"
    },
    { 
      id: "P1005", 
      name: "David Olamide", 
      age: 52, 
      gender: "Male", 
      phone: "+234-809-234-5678", 
      email: "d.olamide@example.com", 
      lastInteraction: "Jun 14, 2023", 
      reason: "Booking follow-up appointment"
    },
    { 
      id: "P1006", 
      name: "Fatima Ahmed", 
      age: 27, 
      gender: "Female", 
      phone: "+234-812-987-6543", 
      email: "fatima.ahmed@example.com", 
      lastInteraction: "Jun 13, 2023", 
      reason: "Finding specialist doctor"
    },
    { 
      id: "P1007", 
      name: "Emmanuel Nwosu", 
      age: 41, 
      gender: "Male", 
      phone: "+234-703-876-5432", 
      email: "e.nwosu@example.com", 
      lastInteraction: "Jun 12, 2023", 
      reason: "Emergency contact information"
    }
  ];

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailsOpen(true);
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery) ||
    patient.email.toLowerCase().includes(searchQuery) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardPageLayout
      title="Recent Patients"
      description="View and manage recently helped patients"
      role="customer_care"
    >
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                className="pl-9" 
                placeholder="Search by name, ID, phone or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Filter</Button>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Patient
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recently Assisted Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Patient ID</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead className="hidden lg:table-cell">Last Interaction</TableHead>
                <TableHead className="hidden lg:table-cell">Reason</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <div className="bg-healthcare-primary rounded-full text-white flex items-center justify-center h-full">
                            {patient.name.charAt(0)}
                          </div>
                        </Avatar>
                        <div>
                          <div className="font-medium">{patient.name}</div>
                          <div className="text-xs text-gray-500">{patient.age} yrs, {patient.gender}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell className="hidden md:table-cell">{patient.phone}</TableCell>
                    <TableCell className="hidden lg:table-cell">{patient.lastInteraction}</TableCell>
                    <TableCell className="hidden lg:table-cell max-w-[200px] truncate">
                      {patient.reason}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Phone className="h-4 w-4" />
                          <span className="sr-only">Call</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewDetails(patient)}
                        >
                          View
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                    No patients found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedPatient && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Patient Details</DialogTitle>
              <DialogDescription>
                Complete information about the patient
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <div className="bg-healthcare-primary rounded-full text-white flex items-center justify-center h-full text-xl">
                    {selectedPatient.name.charAt(0)}
                  </div>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-xl">{selectedPatient.name}</h3>
                  <p className="text-gray-500">{selectedPatient.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p>{selectedPatient.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p>{selectedPatient.gender}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Contact Information</p>
                <div className="grid gap-1">
                  <p>{selectedPatient.phone}</p>
                  <p>{selectedPatient.email}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Last Interaction</p>
                <p>{selectedPatient.lastInteraction}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Reason for Contact</p>
                <p>{selectedPatient.reason}</p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Phone className="mr-2 h-4 w-4" /> Contact Patient
                </Button>
                <Button variant="outline" className="flex-1">
                  View Full Profile
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </DashboardPageLayout>
  );
};

export default RecentPatients;
