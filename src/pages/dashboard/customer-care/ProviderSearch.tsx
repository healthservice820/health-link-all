
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Phone, MapPinPlus } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";

const ProviderSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [activeTab, setActiveTab] = useState("doctors");
  
  // Mock data for healthcare providers
  const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiologist", location: "Lekki, Lagos", distance: "1.2 km", available: true, rating: 4.9, image: "/placeholder.svg" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Neurologist", location: "Victoria Island, Lagos", distance: "3.5 km", available: true, rating: 4.8, image: "/placeholder.svg" },
    { id: 3, name: "Dr. Lisa Rodriguez", specialty: "Pediatrician", location: "Ikeja, Lagos", distance: "5.2 km", available: true, rating: 4.9, image: "/placeholder.svg" },
    { id: 4, name: "Dr. Emeka Okafor", specialty: "Orthopedist", location: "Ikoyi, Lagos", distance: "2.8 km", available: false, rating: 4.7, image: "/placeholder.svg" },
    { id: 5, name: "Dr. Funmi Adebayo", specialty: "Gynecologist", location: "Lekki, Lagos", distance: "1.5 km", available: true, rating: 4.6, image: "/placeholder.svg" },
  ];
  
  const pharmacies = [
    { id: 1, name: "MedPlus Pharmacy", location: "Lekki, Lagos", distance: "0.8 km", open: true, rating: 4.5, services: ["Prescription Fill", "OTC", "Delivery"] },
    { id: 2, name: "HealthPlus", location: "Victoria Island, Lagos", distance: "2.2 km", open: true, rating: 4.7, services: ["Prescription Fill", "OTC", "Consultation"] },
    { id: 3, name: "Alpha Pharmacy", location: "Ikoyi, Lagos", distance: "3.4 km", open: true, rating: 4.6, services: ["Prescription Fill", "OTC", "Delivery", "24/7"] },
    { id: 4, name: "Rehmie Pharmacy", location: "Ikeja, Lagos", distance: "6.1 km", open: false, rating: 4.3, services: ["Prescription Fill", "OTC"] },
    { id: 5, name: "Medmark Pharmacy", location: "Lekki, Lagos", distance: "1.2 km", open: true, rating: 4.4, services: ["Prescription Fill", "OTC", "Delivery"] },
  ];
  
  const diagnostics = [
    { id: 1, name: "Synlab Medical Center", location: "Lekki, Lagos", distance: "1.3 km", open: true, services: ["Blood Tests", "X-Ray", "Ultrasound"] },
    { id: 2, name: "Afriglobal Medicare", location: "Victoria Island, Lagos", distance: "2.7 km", open: true, services: ["Full Body Check", "ECG", "MRI", "CT Scan"] },
    { id: 3, name: "Reddington Hospital Lab", location: "Ikeja, Lagos", distance: "5.5 km", open: true, services: ["Blood Tests", "COVID Test", "Fertility Tests"] },
    { id: 4, name: "Meditest Diagnostics", location: "Ikoyi, Lagos", distance: "3.1 km", open: false, services: ["Blood Tests", "Radiology", "Pathology"] },
    { id: 5, name: "Union Diagnostics", location: "Lekki, Lagos", distance: "1.1 km", open: true, services: ["Blood Tests", "Mammography", "Ultrasound"] },
  ];
  
  const locationsInLagos = ["All Locations", "Lekki", "Victoria Island", "Ikeja", "Ikoyi", "Surulere", "Yaba"];
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const filterProviders = (providers: any[]) => {
    return providers.filter(provider => {
      const matchesSearch = searchQuery === "" || 
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (provider.specialty && provider.specialty.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (provider.services && provider.services.some((s: string) => s.toLowerCase().includes(searchQuery.toLowerCase())));
      
      const matchesLocation = locationFilter === "All Locations" || 
        provider.location.includes(locationFilter);
      
      return matchesSearch && matchesLocation;
    });
  };
  
  // Filter providers based on search and location
  const filteredDoctors = filterProviders(doctors);
  const filteredPharmacies = filterProviders(pharmacies);
  const filteredDiagnostics = filterProviders(diagnostics);

  return (
    <DashboardPageLayout
      title="Healthcare Provider Search"
      description="Find nearby doctors, pharmacies and diagnostic centers for patients"
      role="customer_care"
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-9"
                  placeholder="Search by name, specialty or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-64">
                <select
                  className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-healthcare-primary"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  {locationsInLagos.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <Button>
                <MapPinPlus className="mr-2 h-4 w-4" />
                Use Current Location
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
            <TabsTrigger value="diagnostics">Diagnostic Centers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="doctors" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>Available Doctors</div>
                  <Badge variant="outline">{filteredDoctors.length} found</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredDoctors.length > 0 ? (
                  <div className="space-y-4">
                    {filteredDoctors.map((doctor) => (
                      <Card key={doctor.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row gap-4">
                            <Avatar className="w-16 h-16">
                              <img src={doctor.image} alt={doctor.name} />
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <h3 className="font-semibold">{doctor.name}</h3>
                                  <p className="text-gray-500">{doctor.specialty}</p>
                                </div>
                                <Badge variant={doctor.available ? "default" : "outline"}>
                                  {doctor.available ? "Available Now" : "Not Available"}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <MapPin className="mr-1 h-4 w-4" />
                                  {doctor.location} ({doctor.distance})
                                </div>
                                <div className="flex items-center">
                                  ⭐ {doctor.rating}
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-3">
                                <Button size="sm">
                                  Book Appointment
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Phone className="mr-2 h-4 w-4" />
                                  Call Doctor
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No doctors found matching your criteria
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pharmacies" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>Nearby Pharmacies</div>
                  <Badge variant="outline">{filteredPharmacies.length} found</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredPharmacies.length > 0 ? (
                  <div className="space-y-4">
                    {filteredPharmacies.map((pharmacy) => (
                      <Card key={pharmacy.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="font-semibold">{pharmacy.name}</h3>
                              <div className="flex items-center mt-1">
                                <MapPin className="mr-1 h-4 w-4 text-gray-500" />
                                <span className="text-gray-600">{pharmacy.location} ({pharmacy.distance})</span>
                              </div>
                            </div>
                            <div className="flex items-center mt-2 sm:mt-0">
                              <Badge variant={pharmacy.open ? "default" : "outline"} className="mr-2">
                                {pharmacy.open ? "Open Now" : "Closed"}
                              </Badge>
                              <span className="text-sm">⭐ {pharmacy.rating}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-1 mb-3">
                              {pharmacy.services.map((service, i) => (
                                <Badge key={i} variant="secondary">{service}</Badge>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm">
                                Get Directions
                              </Button>
                              <Button size="sm" variant="outline">
                                <Phone className="mr-2 h-4 w-4" />
                                Call Pharmacy
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No pharmacies found matching your criteria
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="diagnostics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>Diagnostic Centers</div>
                  <Badge variant="outline">{filteredDiagnostics.length} found</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredDiagnostics.length > 0 ? (
                  <div className="space-y-4">
                    {filteredDiagnostics.map((center) => (
                      <Card key={center.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="font-semibold">{center.name}</h3>
                              <div className="flex items-center mt-1">
                                <MapPin className="mr-1 h-4 w-4 text-gray-500" />
                                <span className="text-gray-600">{center.location} ({center.distance})</span>
                              </div>
                            </div>
                            <Badge variant={center.open ? "default" : "outline"}>
                              {center.open ? "Open Now" : "Closed"}
                            </Badge>
                          </div>
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-1 mb-3">
                              {center.services.map((service, i) => (
                                <Badge key={i} variant="secondary">{service}</Badge>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm">
                                Book Test
                              </Button>
                              <Button size="sm" variant="outline">
                                <Phone className="mr-2 h-4 w-4" />
                                Call Center
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No diagnostic centers found matching your criteria
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
};

export default ProviderSearch;
