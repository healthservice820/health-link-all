
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Phone, Video } from "lucide-react";

const FindDoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for doctors
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15 years",
      rating: 4.8,
      location: "Main Hospital, New York",
      availability: "Available Today",
      image: "https://placekeanu.com/100/100"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      experience: "10 years",
      rating: 4.7,
      location: "Wellness Clinic, New York",
      availability: "Available Tomorrow",
      image: "https://placekeanu.com/100/101"
    },
    {
      id: 3,
      name: "Dr. Emily Wilson",
      specialty: "Pediatrician",
      experience: "12 years",
      rating: 4.9,
      location: "Children's Hospital, New York",
      availability: "Available Today",
      image: "https://placekeanu.com/100/102"
    },
    {
      id: 4,
      name: "Dr. James Taylor",
      specialty: "Orthopedist",
      experience: "20 years",
      rating: 4.6,
      location: "Sports Medicine Clinic, New York",
      availability: "Available in 2 days",
      image: "https://placekeanu.com/100/103"
    },
  ];

  const specialties = [
    "Cardiology", "Dermatology", "Pediatrics", "Orthopedics", "Neurology", 
    "Ophthalmology", "Gynecology", "ENT", "Psychiatry", "Dentistry"
  ];

  return (
    <DashboardPageLayout title="Find Doctors" description="Search for specialists and book consultations" role="patient">
      <div className="mb-8">
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <Input 
            placeholder="Search by doctor name or specialty" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-2/3"
          />
          <Button className="bg-healthcare-primary hover:bg-healthcare-accent md:w-1/3">
            Search
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <h3 className="text-sm font-medium mr-2 flex items-center">Quick Filters:</h3>
          {["Available Today", "Top Rated", "Female Doctors", "Male Doctors"].map((filter) => (
            <Button key={filter} variant="outline" size="sm" className="text-xs">
              {filter}
            </Button>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Doctors</TabsTrigger>
          <TabsTrigger value="specialties">By Specialties</TabsTrigger>
          <TabsTrigger value="nearby">Nearby</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-1/4">
                      <img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="w-3/4 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.specialty} • {doctor.experience}</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-sm flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        {doctor.location}
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          {doctor.availability}
                        </span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="flex items-center">
                            <Phone className="h-4 w-4 mr-2" /> Call
                          </Button>
                          <Button size="sm" className="flex items-center bg-healthcare-primary hover:bg-healthcare-accent">
                            <Video className="h-4 w-4 mr-2" /> Book
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="specialties">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {specialties.map((specialty) => (
              <Card key={specialty} className="text-center p-4 hover:border-healthcare-primary cursor-pointer transition-all">
                <CardContent className="p-4">
                  <div className="mx-auto h-12 w-12 rounded-full bg-healthcare-primary/10 flex items-center justify-center mb-3">
                    <User className="h-6 w-6 text-healthcare-primary" />
                  </div>
                  <h3 className="font-medium">{specialty}</h3>
                  <p className="text-xs text-gray-500 mt-1">Find Specialists</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="nearby">
          <div className="flex justify-center items-center h-64 border rounded-md bg-gray-50">
            <div className="text-center">
              <p className="text-gray-500 mb-4">Allow location access to find doctors near you</p>
              <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
                Enable Location
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default FindDoctorsPage;
