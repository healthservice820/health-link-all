
import React, { useState, useEffect } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Search, User, Calendar, Plus, X, MapPin } from "lucide-react";
import SearchInput from "@/components/shared/SearchInput";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const DoctorPrescriptionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all-prescriptions");
  const [nearbyPharmacies, setNearbyPharmacies] = useState([
    { id: 1, name: "HealthPlus Pharmacy", distance: "0.5 km", address: "123 Main St" },
    { id: 2, name: "MedExpress Pharmacy", distance: "1.2 km", address: "456 Oak Ave" },
    { id: 3, name: "WellCare Pharmacy", distance: "2.3 km", address: "789 Pine Rd" },
    { id: 4, name: "QuickMeds Pharmacy", distance: "3.5 km", address: "101 Elm St" },
  ]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [patientList, setPatientList] = useState([
    { id: 1, name: "John Smith" },
    { id: 2, name: "Emily Johnson" },
    { id: 3, name: "Michael Brown" },
    { id: 4, name: "Sarah Wilson" },
  ]);
  const { toast } = useToast();
  
  // Mock data for prescriptions
  const prescriptions = [
    { 
      id: 1, 
      patient: "John Smith", 
      date: "2025-05-05", 
      medications: ["Amoxicillin 500mg", "Ibuprofen 400mg"],
      status: "Active",
      pharmacy: "HealthPlus Pharmacy"
    },
    { 
      id: 2, 
      patient: "Emily Johnson", 
      date: "2025-05-04", 
      medications: ["Azithromycin 250mg", "Paracetamol 500mg"],
      status: "Active",
      pharmacy: "MedExpress Pharmacy"
    },
    { 
      id: 3, 
      patient: "Michael Brown", 
      date: "2025-05-03", 
      medications: ["Metformin 500mg", "Lisinopril 10mg"],
      status: "Active",
      pharmacy: "WellCare Pharmacy"
    },
    { 
      id: 4, 
      patient: "Sarah Wilson", 
      date: "2025-04-28", 
      medications: ["Fluticasone Propionate Cream 0.05%"],
      status: "Active",
      pharmacy: "QuickMeds Pharmacy"
    },
    { 
      id: 5, 
      patient: "Robert Davis", 
      date: "2025-04-25", 
      medications: ["Diclofenac 50mg", "Acetaminophen 500mg"],
      status: "Expired",
      pharmacy: "HealthPlus Pharmacy"
    },
  ];

  // Mock data for new prescription
  const [medications, setMedications] = useState([
    { name: "", dosage: "", frequency: "", duration: "" }
  ]);

  const form = useForm({
    defaultValues: {
      patient: "",
      date: new Date().toISOString().split('T')[0],
      pharmacy: "",
      notes: ""
    }
  });

  const addMedication = () => {
    setMedications([...medications, { name: "", dosage: "", frequency: "", duration: "" }]);
  };

  const removeMedication = (index) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleSearchPharmacies = (patientAddress) => {
    // In a real implementation, this would use the patient's address to find nearby pharmacies
    console.log("Searching pharmacies near:", patientAddress);
    // For now, we're using mock data
  };

  const handleSubmitPrescription = (data) => {
    if (medications[0].name === "") {
      toast({
        title: "Missing medication",
        description: "Please add at least one medication to the prescription",
        variant: "destructive"
      });
      return;
    }

    if (!data.pharmacy) {
      toast({
        title: "Missing pharmacy",
        description: "Please select a pharmacy for the prescription",
        variant: "destructive"
      });
      return;
    }

    // In a real implementation, this would submit the prescription to the backend
    console.log("Prescription data:", {
      ...data,
      medications
    });

    toast({
      title: "Prescription created",
      description: `Prescription for ${data.patient} has been sent to ${data.pharmacy}`,
    });

    // Reset form and medications
    form.reset();
    setMedications([{ name: "", dosage: "", frequency: "", duration: "" }]);
    setActiveTab("all-prescriptions");
  };

  // Filter prescriptions based on search term
  const filteredPrescriptions = prescriptions.filter(prescription => 
    prescription.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.medications.some(med => med.toLowerCase().includes(searchTerm.toLowerCase())) ||
    prescription.pharmacy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardPageLayout title="Prescriptions" description="Create and manage patient prescriptions" role="doctor">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all-prescriptions">All Prescriptions</TabsTrigger>
          <TabsTrigger value="create-prescription">Create Prescription</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-prescriptions">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative md:w-2/3">
              <SearchInput 
                placeholder="Search prescriptions by patient name, medication or pharmacy" 
                value={searchTerm}
                onChange={setSearchTerm}
              />
            </div>
            <Button 
              className="bg-healthcare-primary hover:bg-healthcare-accent md:w-1/3"
              onClick={() => setActiveTab("create-prescription")}
            >
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
                  <TableHead>Pharmacy</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrescriptions.map((prescription) => (
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
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {prescription.pharmacy}
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
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitPrescription)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="patient"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Patient</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              // In a real app, this would fetch the patient's address
                              handleSearchPharmacies("Patient's address");
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select patient" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {patientList.map(patient => (
                                <SelectItem key={patient.id} value={patient.name}>
                                  {patient.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
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

                  <FormField
                    control={form.control}
                    name="pharmacy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pharmacy</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select nearby pharmacy" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {nearbyPharmacies.map(pharmacy => (
                              <SelectItem key={pharmacy.id} value={pharmacy.name}>
                                {pharmacy.name} - {pharmacy.distance} - {pharmacy.address}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Any special instructions or notes" 
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4 flex justify-end gap-3">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        form.reset();
                        setMedications([{ name: "", dosage: "", frequency: "", duration: "" }]);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-healthcare-primary hover:bg-healthcare-accent">
                      Create Prescription
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default DoctorPrescriptionsPage;
