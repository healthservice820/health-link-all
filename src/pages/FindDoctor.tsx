
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/shared/SearchInput";
import { MapPin, Calendar, Clock, Stethoscope } from "lucide-react";

const FindDoctor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

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
      availability: "Next available: Tomorrow",
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

  const specialties = [
    "All Specialists",
    "Cardiologist",
    "Neurologist",
    "Pediatrician",
    "Dermatologist",
    "Orthopedic",
  ];

  return (
    <Layout>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Find the Right Doctor</h1>
          <p className="text-muted-foreground mb-8">
            Search from our network of qualified healthcare professionals near you
          </p>
          <SearchInput
            placeholder="Search by doctor name or specialty..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        <div className="flex gap-8">
          <div className="w-64 shrink-0">
            <div className="sticky top-24">
              <h3 className="font-semibold mb-4">Specialties</h3>
              <div className="space-y-2">
                {specialties.map((specialty) => (
                  <Button
                    key={specialty}
                    variant={selectedSpecialty === specialty.toLowerCase() ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedSpecialty(specialty.toLowerCase())}
                  >
                    {specialty}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 gap-6">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                            <div className="flex items-center gap-2 text-muted-foreground mb-4">
                              <Stethoscope className="h-4 w-4" />
                              <span>{doctor.specialty}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{doctor.rating} ⭐</div>
                            <div className="text-sm text-muted-foreground">
                              {doctor.reviews} reviews
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-healthcare-primary" />
                            <span className="text-sm">{doctor.distance}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-healthcare-primary" />
                            <span className="text-sm">{doctor.availability}</span>
                          </div>
                        </div>

                        <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
                          Book Appointment
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FindDoctor;
