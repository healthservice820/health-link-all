
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FilePresentation, MapPin, CalendarCheck, Clock, ArrowRight } from "lucide-react";

const LabTestFinder = () => {
  // Mock lab test data
  const labTests = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      type: "Blood Test",
      price: "$45.00",
      lab: "HealthLink Diagnostics",
      distance: "1.5 miles away",
      nextSlot: "Today, 2:00 PM",
      duration: "15 min",
    },
    {
      id: 2,
      name: "Chest X-Ray",
      type: "Imaging",
      price: "$120.00",
      lab: "MedScan Imaging Center",
      distance: "2.2 miles away",
      nextSlot: "Tomorrow, 10:30 AM",
      duration: "30 min",
    },
    {
      id: 3,
      name: "Thyroid Function Test",
      type: "Blood Test",
      price: "$85.00",
      lab: "City Lab Services",
      distance: "0.8 miles away",
      nextSlot: "Today, 4:15 PM",
      duration: "20 min",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-healthcare-light">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find <span className="text-healthcare-primary">Diagnostic Tests</span> Near You
          </h2>
          <p className="text-muted-foreground">
            Locate available slots for MRIs, X-rays, CT scans, blood work, and more at diagnostic centers in your area.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {labTests.map((test) => (
              <Card key={test.id} className="overflow-hidden border-healthcare-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-healthcare-light">
                      <FilePresentation className="h-5 w-5 text-healthcare-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{test.name}</h3>
                      <p className="text-xs text-muted-foreground">{test.type}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <p className="text-xl font-semibold text-healthcare-primary">{test.price}</p>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{test.lab}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{test.distance}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Next available: {test.nextSlot}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Duration: {test.duration}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-healthcare-primary hover:bg-healthcare-accent"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button variant="outline" className="gap-2">
              View All Tests <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabTestFinder;
