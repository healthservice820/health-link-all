
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Users, Pill, File, Presentation } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-healthcare-light py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-healthcare-primary shadow-sm">
              <Heart className="h-4 w-4" />
              <span>Integrated Healthcare</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Your Health, <span className="text-healthcare-primary">Connected</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              HealthLink brings patients, doctors, labs, and pharmacies together in one seamless platform, available 24/7 through your smartphone.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-healthcare-primary hover:bg-healthcare-accent text-white px-6"
                size="lg"
                asChild
              >
                <Link to="/symptoms">Check Symptoms</Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                asChild
              >
                <Link to="/find-doctor">Find a Doctor</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-healthcare-light border border-healthcare-primary/20">
                  <Users className="h-6 w-6 text-healthcare-primary" />
                </div>
                <p className="mt-2 text-sm font-medium">5000+ Doctors</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-healthcare-light border border-healthcare-primary/20">
                  <Presentation className="h-6 w-6 text-healthcare-primary" />
                </div>
                <p className="mt-2 text-sm font-medium">1000+ Labs</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-healthcare-light border border-healthcare-primary/20">
                  <Pill className="h-6 w-6 text-healthcare-primary" />
                </div>
                <p className="mt-2 text-sm font-medium">2000+ Pharmacies</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-healthcare-light border border-healthcare-primary/20">
                  <Heart className="h-6 w-6 text-healthcare-primary" />
                </div>
                <p className="mt-2 text-sm font-medium">24/7 Support</p>
              </div>
            </div>
          </div>
          
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Healthcare professionals" 
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 rounded-lg bg-white p-4 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-healthcare-light">
                    <File className="h-5 w-5 text-healthcare-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI-Powered</p>
                    <p className="text-xs text-muted-foreground">Health Assessment</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 rounded-lg bg-white p-4 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-healthcare-light">
                    <Heart className="h-5 w-5 text-healthcare-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">GPS-Enabled</p>
                    <p className="text-xs text-muted-foreground">Find Nearby Care</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
