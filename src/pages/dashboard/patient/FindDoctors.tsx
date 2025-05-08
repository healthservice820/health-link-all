
import React, { useState, useMemo, useEffect } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Star, 
  Phone, 
  Video, 
  User, 
  Loader2, 
  FilterX, 
  Filter 
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  location: string;
  availability: string;
  image: string;
  distance?: string;
  gender: 'male' | 'female';
}

const FindDoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Mock data for doctors
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15 years",
      rating: 4.8,
      location: "Main Hospital, New York",
      availability: "Available Today",
      image: "https://placekeanu.com/100/100",
      gender: "female"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      experience: "10 years",
      rating: 4.7,
      location: "Wellness Clinic, New York",
      availability: "Available Tomorrow",
      image: "https://placekeanu.com/100/101",
      gender: "male"
    },
    {
      id: 3,
      name: "Dr. Emily Wilson",
      specialty: "Pediatrician",
      experience: "12 years",
      rating: 4.9,
      location: "Children's Hospital, New York",
      availability: "Available Today",
      image: "https://placekeanu.com/100/102",
      gender: "female"
    },
    {
      id: 4,
      name: "Dr. James Taylor",
      specialty: "Orthopedist",
      experience: "20 years",
      rating: 4.6,
      location: "Sports Medicine Clinic, New York",
      availability: "Available in 2 days",
      image: "https://placekeanu.com/100/103",
      gender: "male"
    },
  ]);

  const specialties = [
    "Cardiology", "Dermatology", "Pediatrics", "Orthopedics", "Neurology", 
    "Ophthalmology", "Gynecology", "ENT", "Psychiatry", "Dentistry"
  ];

  // Quick filters definitions
  const quickFilters = [
    { key: "Available Today", filterFn: (doc: Doctor) => doc.availability === "Available Today" },
    { key: "Top Rated", filterFn: (doc: Doctor) => doc.rating >= 4.8 },
    { key: "Female Doctors", filterFn: (doc: Doctor) => doc.gender === "female" },
    { key: "Male Doctors", filterFn: (doc: Doctor) => doc.gender === "male" }
  ];

  // Handle location access
  const handleLocationAccess = () => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive"
      });
      setIsLocating(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation(position.coords);
        toast({
          title: "Location Found",
          description: "Showing doctors near your location",
        });
        
        // Simulate calculating distances to doctors
        const doctorsWithDistance = doctors.map(doctor => {
          // In a real app, you would calculate actual distance using the Haversine formula
          // For this demo, we'll just assign random distances
          const distance = (Math.random() * 10).toFixed(1);
          return {
            ...doctor,
            distance: `${distance} miles away`
          };
        });
        
        // Sort by distance
        const sortedDoctors = [...doctorsWithDistance].sort((a, b) => {
          const distA = parseFloat((a.distance || "0").split(" ")[0]);
          const distB = parseFloat((b.distance || "0").split(" ")[0]);
          return distA - distB;
        });
        
        setDoctors(sortedDoctors);
        setIsLocating(false);
      },
      (error) => {
        let errorMessage = "Failed to get your location";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "You denied the request for geolocation";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get your location timed out";
            break;
        }
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive"
        });
        
        setIsLocating(false);
      }
    );
  };

  // Handle quick filter toggle
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters([]);
    setSearchTerm("");
  };

  // Filter doctors based on search, specialty, and active filters
  const filteredDoctors = useMemo(() => {
    let filtered = doctors;
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter((doctor) => {
        return doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
               doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
    
    // Apply quick filters if any are active
    if (activeFilters.length > 0) {
      filtered = filtered.filter(doctor => {
        return activeFilters.every(filterName => {
          const filter = quickFilters.find(f => f.key === filterName);
          return filter ? filter.filterFn(doctor) : true;
        });
      });
    }
    
    return filtered;
  }, [doctors, searchTerm, activeFilters]);

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
          <div className="flex gap-2 md:w-1/3">
            <Button 
              className="bg-healthcare-primary hover:bg-healthcare-accent flex-1" 
              onClick={() => searchTerm ? {} : {}}
            >
              Search
            </Button>
            {(activeFilters.length > 0 || searchTerm) && (
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="px-3"
                title="Clear all filters"
              >
                <FilterX className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <div className="flex items-center mr-2">
            <Filter className="h-4 w-4 mr-1" />
            <h3 className="text-sm font-medium">Quick Filters:</h3>
          </div>
          {quickFilters.map((filter) => (
            <Button 
              key={filter.key} 
              variant={activeFilters.includes(filter.key) ? "default" : "outline"} 
              size="sm" 
              className={`text-xs ${activeFilters.includes(filter.key) ? 'bg-healthcare-primary hover:bg-healthcare-accent' : ''}`}
              onClick={() => toggleFilter(filter.key)}
            >
              {filter.key}
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
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-2">No doctors found matching your criteria</p>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDoctors.map((doctor) => (
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
                          {doctor.distance && (
                            <span className="ml-2 text-healthcare-primary font-medium">
                              ({doctor.distance})
                            </span>
                          )}
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
          )}
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
              {userLocation ? (
                <div>
                  <div className="mb-4 text-green-600 flex flex-col items-center">
                    <MapPin className="h-8 w-8 mb-2" />
                    <p>Location access granted!</p>
                    <p className="text-sm text-gray-500">Showing doctors near your location</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="bg-healthcare-primary hover:bg-healthcare-accent text-white"
                    onClick={() => setUserLocation(null)}
                  >
                    Reset Location
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-gray-500 mb-4">Allow location access to find doctors near you</p>
                  <Button 
                    className="bg-healthcare-primary hover:bg-healthcare-accent"
                    onClick={handleLocationAccess}
                    disabled={isLocating}
                  >
                    {isLocating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Getting Location...
                      </>
                    ) : (
                      "Enable Location"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default FindDoctorsPage;
