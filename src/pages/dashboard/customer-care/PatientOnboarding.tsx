
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const PatientOnboarding = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    medicalHistory: "",
  });

  const [formProgress, setFormProgress] = useState(0); // 0 = basic info, 1 = medical info, 2 = review
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Patient registered successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        bloodGroup: "",
        address: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        medicalHistory: "",
      });
      setFormProgress(0);
      setIsSubmitting(false);
    }, 1500);
  };

  const goToNext = () => {
    if (formProgress < 2) {
      setFormProgress(formProgress + 1);
    }
  };

  const goToPrevious = () => {
    if (formProgress > 0) {
      setFormProgress(formProgress - 1);
    }
  };

  const getProgressPercentage = () => {
    return ((formProgress + 1) / 3) * 100;
  };

  const recentPatients = [
    { id: "1", name: "Folake Adeyemi", age: 42, phone: "+234-703-456-7890", date: "Today, 09:45 AM" },
    { id: "2", name: "Tunde Bakare", age: 35, phone: "+234-803-234-5678", date: "Today, 08:30 AM" },
    { id: "3", name: "Amina Ibrahim", age: 28, phone: "+234-909-876-5432", date: "Yesterday, 04:15 PM" },
  ];

  return (
    <DashboardPageLayout
      title="Patient Onboarding"
      description="Register new patients via phone calls"
      role="customer_care"
    >
      <Tabs defaultValue="new-patient" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="new-patient">New Patient</TabsTrigger>
          <TabsTrigger value="recent-patients">Recent Patients</TabsTrigger>
        </TabsList>
        <div className="mt-6"></div>
        
        <TabsContent value="new-patient">
          <Card>
            <CardHeader>
              <CardTitle>Register New Patient</CardTitle>
              <CardDescription>
                Enter patient details as provided over the phone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="h-2 w-full bg-gray-100 rounded-full">
                  <div 
                    className="h-2 bg-healthcare-primary rounded-full transition-all" 
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className={formProgress >= 0 ? "text-healthcare-primary font-medium" : ""}>
                    Basic Info
                  </span>
                  <span className={formProgress >= 1 ? "text-healthcare-primary font-medium" : ""}>
                    Medical Info
                  </span>
                  <span className={formProgress >= 2 ? "text-healthcare-primary font-medium" : ""}>
                    Review
                  </span>
                </div>
              </div>

              <form onSubmit={handleFormSubmit}>
                {formProgress === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          value={formData.firstName}
                          onChange={(e) => handleChange("firstName", e.target.value)}
                          placeholder="Enter first name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleChange("lastName", e.target.value)}
                          placeholder="Enter last name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email (Optional)</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder="Enter phone number"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select 
                          onValueChange={(value) => handleChange("gender", value)}
                          value={formData.gender}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input 
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleChange("address", e.target.value)}
                        placeholder="Enter patient address"
                      />
                    </div>
                  </div>
                )}

                {formProgress === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select 
                        onValueChange={(value) => handleChange("bloodGroup", value)}
                        value={formData.bloodGroup}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="medicalHistory">Medical History</Label>
                      <Input 
                        id="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={(e) => handleChange("medicalHistory", e.target.value)}
                        placeholder="Enter any relevant medical history"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                        <Input 
                          id="emergencyContactName"
                          value={formData.emergencyContactName}
                          onChange={(e) => handleChange("emergencyContactName", e.target.value)}
                          placeholder="Enter emergency contact name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                        <Input 
                          id="emergencyContactPhone"
                          value={formData.emergencyContactPhone}
                          onChange={(e) => handleChange("emergencyContactPhone", e.target.value)}
                          placeholder="Enter emergency contact phone"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formProgress === 2 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Review Patient Information</h3>
                      <p className="text-sm text-gray-500 mb-4">Please verify the information before submitting</p>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p>{formData.firstName} {formData.lastName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Contact Info</p>
                            <p>{formData.phone}</p>
                            <p>{formData.email || "No email provided"}</p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Gender</p>
                            <p>{formData.gender || "Not specified"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date of Birth</p>
                            <p>{formData.dateOfBirth || "Not specified"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Blood Group</p>
                            <p>{formData.bloodGroup || "Not specified"}</p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <p className="text-sm text-gray-500">Address</p>
                          <p>{formData.address || "Not specified"}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Medical History</p>
                          <p>{formData.medicalHistory || "None provided"}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Emergency Contact</p>
                            <p>{formData.emergencyContactName || "Not specified"}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Emergency Phone</p>
                            <p>{formData.emergencyContactPhone || "Not specified"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  {formProgress > 0 && (
                    <Button type="button" variant="outline" onClick={goToPrevious}>
                      Previous
                    </Button>
                  )}
                  <div className="ml-auto">
                    {formProgress < 2 ? (
                      <Button type="button" onClick={goToNext}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Registering..." : "Register Patient"}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent-patients">
          <Card>
            <CardHeader>
              <CardTitle>Recently Onboarded Patients</CardTitle>
              <CardDescription>
                Patients you've recently registered through the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <Card key={patient.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                          <h3 className="font-semibold">{patient.name}</h3>
                          <div className="flex flex-wrap gap-x-4 text-sm text-gray-500">
                            <span>Age: {patient.age}</span>
                            <span>Phone: {patient.phone}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{patient.date}</span>
                          <Button size="sm" variant="outline">View Profile</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default PatientOnboarding;
