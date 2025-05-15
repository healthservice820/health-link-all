import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, MapPin, MapPinPlus } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const LocationServices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("Lekki");
  
  // Mock data for areas in Lagos
  const areasInLagos = [
    { id: "1", name: "Lekki", facilities: 42 },
    { id: "2", name: "Victoria Island", facilities: 38 },
    { id: "3", name: "Ikeja", facilities: 35 },
    { id: "4", name: "Ikoyi", facilities: 30 },
    { id: "5", name: "Surulere", facilities: 25 },
    { id: "6", name: "Yaba", facilities: 22 },
    { id: "7", name: "Ajah", facilities: 18 },
    { id: "8", name: "Gbagada", facilities: 15 },
  ];
  
  // Mock emergency facilities
  const emergencyFacilities = [
    { id: "1", name: "Lagos University Teaching Hospital", type: "Hospital", address: "Idi-Araba, Surulere, Lagos", distance: "4.5 km", emergency: true },
    { id: "2", name: "Lagoon Hospital", type: "Hospital", address: "Alfred Rewane Rd, Ikoyi, Lagos", distance: "2.8 km", emergency: true },
    { id: "3", name: "St. Nicholas Hospital", type: "Hospital", address: "57 Campbell St, Lagos Island", distance: "5.2 km", emergency: true },
    { id: "4", name: "Reddington Hospital", type: "Hospital", address: "12 Idowu Martins St, VI, Lagos", distance: "3.1 km", emergency: true },
    { id: "5", name: "First Consultants Hospital", type: "Hospital", address: "Nahco Bldg, Rotimi Williams Ave, Obalende, Lagos", distance: "6.3 km", emergency: true },
  ];
  
  // Filter areas based on search
  const filteredAreas = areasInLagos.filter(area => 
    searchQuery === "" || area.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardPageLayout
      title="Location Services"
      description="Find healthcare facilities based on patient location"
      role="customer_care"
    >
      <div className="space-y-6">
        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-9"
                  placeholder="Search areas in Lagos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button>
                <MapPinPlus className="mr-2 h-4 w-4" />
                Use Patient's Location
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Areas List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Areas in Lagos</CardTitle>
              <CardDescription>Select an area to view healthcare facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredAreas.length > 0 ? (
                  filteredAreas.map((area) => (
                    <div 
                      key={area.id}
                      className={`p-3 rounded-md cursor-pointer flex justify-between items-center ${selectedArea === area.name ? 'bg-healthcare-primary text-white' : 'hover:bg-gray-100'}`}
                      onClick={() => setSelectedArea(area.name)}
                    >
                      <div className="flex items-center">
                        <MapPin className={`mr-2 h-4 w-4 ${selectedArea === area.name ? 'text-white' : 'text-gray-500'}`} />
                        <span>{area.name}</span>
                      </div>
                      <Badge variant={selectedArea === area.name ? "outline" : "secondary"}>
                        {area.facilities} facilities
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No areas found matching your search
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Map and Facilities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Healthcare Facilities in {selectedArea}</span>
                <Badge variant="outline">24 facilities</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <AspectRatio ratio={16/9}>
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-healthcare-primary mx-auto mb-2" />
                        <p className="font-medium">Map of {selectedArea}</p>
                        <p className="text-sm text-gray-500">Map visualization would appear here</p>
                      </div>
                    </div>
                  </AspectRatio>
                </CardContent>
              </Card>

              {/* Facilities Tabs */}
              <Tabs defaultValue="all">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
                  <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
                  <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
                  <TabsTrigger value="emergency" className="text-red-500">Emergency</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <div className="text-sm text-gray-500 mb-4">
                    Showing all healthcare facilities in {selectedArea}
                  </div>
                  <div className="space-y-2">
                    {filteredAreas.some(area => area.name === selectedArea) ? (
                      [...Array(3)].map((_, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <div>
                                <h3 className="font-semibold">Sample Hospital {index + 1}</h3>
                                <div className="text-sm text-gray-500">Hospital • {(index + 1) * 1.2} km away</div>
                                <div className="text-sm flex items-center mt-1">
                                  <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                                  Sample Address, {selectedArea}, Lagos
                                </div>
                              </div>
                              <div className="mt-2 sm:mt-0 sm:text-right">
                                <Button size="sm" className="mb-2 sm:mb-0 sm:ml-2">Get Directions</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No facilities found in this area
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="emergency" className="mt-4">
                  <div className="flex items-center bg-red-50 p-3 rounded-md mb-4">
                    <div className="text-red-600 font-medium flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      Emergency Facilities Available 24/7
                    </div>
                  </div>
                  <div className="space-y-2">
                    {emergencyFacilities.map((facility) => (
                      <Card key={facility.id} className="border-red-200">
                        <CardContent className="p-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="font-semibold flex items-center">
                                {facility.name}
                                <Badge variant="destructive" className="ml-2">Emergency</Badge>
                              </h3>
                              <div className="text-sm text-gray-500">{facility.type} • {facility.distance} away</div>
                              <div className="text-sm flex items-center mt-1">
                                <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                                {facility.address}
                              </div>
                            </div>
                            <div className="mt-2 sm:mt-0 flex flex-wrap sm:flex-nowrap gap-2">
                              <Button size="sm" variant="destructive">Call Now</Button>
                              <Button size="sm" variant="outline">Get Directions</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Other tabs would follow the same pattern */}
                <TabsContent value="hospitals" className="mt-4">
                  <div className="text-sm text-gray-500 mb-4">
                    Showing hospitals in {selectedArea}
                  </div>
                  {/* Hospital content would go here */}
                </TabsContent>
                
                <TabsContent value="pharmacies" className="mt-4">
                  <div className="text-sm text-gray-500 mb-4">
                    Showing pharmacies in {selectedArea}
                  </div>
                  {/* Pharmacies content would go here */}
                </TabsContent>
                
                <TabsContent value="diagnostics" className="mt-4">
                  <div className="text-sm text-gray-500 mb-4">
                    Showing diagnostic centers in {selectedArea}
                  </div>
                  {/* Diagnostics content would go here */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
};

export default LocationServices;
