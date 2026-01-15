
import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="rounded-2xl bg-healthcare-primary p-8 md:p-12 lg:p-16 overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white"></div>
            <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-white"></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <Heart className="h-6 w-6 text-white" />
                <span className="text-white font-medium">HealthLink</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your Health Journey Starts Here
              </h2>
              <p className="text-white/90 max-w-lg mb-6">
                Sign up now to access our AI-powered symptom checker, find doctors near you, book diagnostic tests, and more.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button 
                  size="lg" 
                  className="bg-white text-healthcare-primary hover:bg-white/90"
                >
                  Get Started
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-healthcare-primary hover:bg-white/10"
                >
                  Learn More <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full bg-white/10 p-4">
                <Heart className="h-10 w-10 text-white animate-pulse-slow" />
              </div>
              
              <div className="text-center">
                <p className="text-white font-bold text-xl md:text-2xl">24/7</p>
                <p className="text-white/90 text-sm">Healthcare Access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
