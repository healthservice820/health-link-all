
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Search, User, Calendar, Plus, X } from "lucide-react";

const DoctorPrescriptionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for prescriptions
  const prescriptions = [
    { 
      id: 1, 
      patient: "John Smith", 
      date: "2025-05-05", 
      medications: ["Amoxicillin 500mg", "Ibuprofen 400mg"],
      status: "Active"
    },
    { 
      id: 2, 
      patient: "Emily Johnson", 
      date: "2025-05-04", 
      medications: ["Azithromycin 250mg", "Paracetamol 500mg"],
      status: "Active"
    },
    { 
      id: 3, 
      patient: "Michael Brown", 
      date: "2025-05-03", 
      medications: ["Metformin 500mg", "Lisinopril 10mg"],
      status: "Active"
    },
    { 
      id: 4, 
      patient: "Sarah Wilson", 
      date: "2025-04-28", 
      medications: ["Fluticasone Propionate Cream 0.05%"],
      status: "Active"
    },
    { 
      id: 5, 
      patient: "Robert Davis", 
      date: "2025-04-25", 
      medications: ["Diclofenac 50mg", "Acetaminophen 500mg"],
      status: "Expired"
    },
  ];

  // Mock data for new prescription
  const [medications, setMedications] = useState([
    { name: "", dosage: "", frequency: "", duration: "" }
  ]);

  const addMedication = () => {
    setMedications([...medications, { name: "", dosage: "", frequency: "", duration: "" }]);
  };

  const removeMedication = (index: number) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
  };

  return (
    <DashboardPageLayout title="Prescriptions" description="Create and manage patient prescriptions" role="doctor">
      <Tabs defaultValue="all-prescriptions" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all-prescriptions">All Prescriptions</TabsTrigger>
          <TabsTrigger value="create-prescription">Create Prescription</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-prescriptions">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative md:w-2/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search prescriptions by patient name or medication" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-healthcare-primary hover:bg-healthcare-accent md:w-1/3">
              Create New Prescription
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Medications</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {prescription.patient}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {prescription.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {prescription.medications.map((med, index) => (
                          <div key={index} className="text-sm">
                            {med}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        prescription.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {prescription.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" className="bg-healthcare-primary hover:bg-healthcare-accent">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="create-prescription">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-6 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-healthcare-primary" />
                New Prescription
              </h3>
              
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
                      Date
                    </label>
                    <Input id="date" type="date" defaultValue="2025-05-07" />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">
                      Medications
                    </label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={addMedication}
                      className="flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add Medication
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {medications.map((med, index) => (
                      <div key={index} className="border rounded-md p-4 relative">
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMedication(index)}
                            className="absolute right-2 top-2 text-gray-400 hover:text-red-500 p-0 h-auto"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">
                              Medication Name
                            </label>
                            <Input 
                              placeholder="e.g., Amoxicillin" 
                              value={med.name}
                              onChange={(e) => {
                                const newMeds = [...medications];
                                newMeds[index].name = e.target.value;
                                setMedications(newMeds);
                              }}
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">
                              Dosage
                            </label>
                            <Input 
                              placeholder="e.g., 500mg" 
                              value={med.dosage}
                              onChange={(e) => {
                                const newMeds = [...medications];
                                newMeds[index].dosage = e.target.value;
                                setMedications(newMeds);
                              }}
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">
                              Frequency
                            </label>
                            <Input 
                              placeholder="e.g., Twice daily" 
                              value={med.frequency}
                              onChange={(e) => {
                                const newMeds = [...medications];
                                newMeds[index].frequency = e.target.value;
                                setMedications(newMeds);
                              }}
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">
                              Duration
                            </label>
                            <Input 
                              placeholder="e.g., 7 days" 
                              value={med.duration}
                              onChange={(e) => {
                                const newMeds = [...medications];
                                newMeds[index].duration = e.target.value;
                                setMedications(newMeds);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium">
                    Additional Notes
                  </label>
                  <Input id="notes" placeholder="Any special instructions or notes" />
                </div>
                
                <div className="pt-4 flex justify-end gap-3">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-healthcare-primary hover:bg-healthcare-accent">
                    Create Prescription
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default DoctorPrescriptionsPage;
