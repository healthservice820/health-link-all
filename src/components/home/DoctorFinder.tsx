import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Stethoscope, Star, MapPin, CalendarCheck } from "lucide-react";

const DoctorFinder = () => {
  // Mock doctor data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.9,
      reviews: 124,
      distance: "1.2 miles away",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      availability: "Available today",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      rating: 4.8,
      reviews: 98,
      distance: "2.5 miles away",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      availability: "Available tomorrow",
    },
    {
      id: 3,
      name: "Dr. Lisa Rodriguez",
      specialty: "Pediatrician",
      rating: 4.9,
      reviews: 156,
      distance: "0.8 miles away",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      availability: "Available today",
    },
  ];

  // Mock specialties
  const specialties = [
    "All Specialists",
    "Cardiologist",
    "Neurologist",
    "Pediatrician",
    "Dermatologist",
    "Orthopedic",
    "Gynecologist",
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find the <span className="text-healthcare-primary">Right Doctor</span> Near You
          </h2>
          <p className="text-muted-foreground">
            Connect with top healthcare professionals in your area based on your location and needs.
          </p>
        </div>

        <Tabs defaultValue="all" className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <TabsList className="grid grid-cols-4 overflow-auto sm:grid-cols-7">
              {specialties.map((specialty, index) => (
                <TabsTrigger 
                  key={index} 
                  value={index === 0 ? "all" : specialty.toLowerCase()}
                  className="px-3 py-1.5 text-xs sm:text-sm whitespace-nowrap"
                >
                  {specialty}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={doctor.image} 
                        alt={doctor.name} 
                        className="w-full h-48 object-cover object-center" 
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="flex justify-between items-end">
                          <h3 className="text-white font-semibold">
                            {doctor.name}
                          </h3>
                          <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-0.5 text-xs font-medium">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{doctor.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Stethoscope className="h-4 w-4 text-healthcare-primary" />
                        <span className="text-sm">{doctor.specialty}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-healthcare-primary" />
                        <span className="text-sm">{doctor.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <CalendarCheck className="h-4 w-4 text-healthcare-primary" />
                        <span className="text-sm">{doctor.availability}</span>
                      </div>
                      <Button 
                        className="w-full bg-healthcare-primary hover:bg-healthcare-accent"
                      >
                        Book Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" className="gap-2">
                View All Doctors <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>

          {/* We'd repeat similar content for other tabs, but keeping it simple for now */}
          {specialties.slice(1).map((specialty) => (
            <TabsContent key={specialty} value={specialty.toLowerCase()} className="mt-0">
              <div className="text-center py-12">
                <p>Showing {specialty} specialists near you</p>
                {/* Would populate with filtered doctors */}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

// Import at the top level so we don't forget
import { ArrowRight } from "lucide-react";

export default DoctorFinder;
