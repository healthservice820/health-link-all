
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ambulance, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

const Emergency = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isRequesting, setIsRequesting] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [currentLocation, setCurrentLocation] = useState<{lat: number; lng: number} | null>(null);

  const requestEmergencyService = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to request emergency services",
        variant: "destructive",
      });
      return;
    }

    if (!location) {
      toast({
        title: "Location required",
        description: "Please enter your current location or use the auto-detect feature",
        variant: "destructive",
      });
      return;
    }

    setIsRequesting(true);

    try {
      // In a real application, this would connect to an emergency service API
      // For now, we'll simulate a request
      
      // Wait to simulate processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Emergency service requested",
        description: "An ambulance has been dispatched to your location. Please stay where you are.",
      });

      // Log the emergency request in the database (if connected to Supabase)
      if (user) {
        try {
          // This would be implemented when the emergency_requests table is created
          // await supabase.from("emergency_requests").insert({
          //   user_id: user.id,
          //   location: location,
          //   description: description,
          //   coordinates: currentLocation,
          //   status: "dispatched"
          // });
        } catch (error) {
          console.error("Failed to log emergency request:", error);
        }
      }

    } catch (error) {
      console.error("Error requesting emergency service:", error);
      toast({
        title: "Request failed",
        description: "Failed to request emergency service. Please try again or call emergency directly.",
        variant: "destructive",
      });
    } finally {
      setIsRequesting(false);
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setLocation(`Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`);
          
          toast({
            title: "Location detected",
            description: "Your current location has been detected successfully.",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location detection failed",
            description: "Could not detect your location. Please enter it manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation. Please enter your location manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-red-600 flex items-center">
          <Ambulance className="mr-2 h-8 w-8" /> Emergency Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-red-500">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-xl text-red-600 flex items-center">
                <Ambulance className="mr-2 h-5 w-5" /> Request Ambulance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="location" className="block text-sm font-medium">
                  Your Current Location
                </label>
                <div className="flex space-x-2">
                  <Input 
                    id="location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your address or current location"
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" onClick={detectLocation}>
                    <MapPin className="h-4 w-4 mr-1" /> Detect
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium">
                  Emergency Description (Optional)
                </label>
                <Textarea 
                  id="description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the emergency situation"
                  rows={3}
                />
              </div>

              <Button 
                className="w-full bg-red-600 hover:bg-red-700 text-white" 
                onClick={requestEmergencyService}
                disabled={isRequesting}
              >
                {isRequesting ? "Requesting..." : "Request Emergency Ambulance"}
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">
                  This service is for demonstration purposes only.
                </p>
                <p className="text-sm font-bold text-red-600 mt-2">
                  For real emergencies, please call your local emergency number immediately.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Phone className="mr-2 h-5 w-5" /> Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="p-4 rounded-md bg-red-50 border border-red-200">
                  <h4 className="font-bold text-red-600">Emergency Number</h4>
                  <p className="text-2xl font-bold">911</p>
                  <p className="text-sm text-gray-600">United States Emergency Services</p>
                </div>

                <div className="p-4 rounded-md bg-blue-50 border border-blue-200">
                  <h4 className="font-bold text-blue-600">Poison Control</h4>
                  <p className="text-lg font-bold">(800) 222-1222</p>
                  <p className="text-sm text-gray-600">National Poison Control Center</p>
                </div>

                <div className="p-4 rounded-md bg-green-50 border border-green-200">
                  <h4 className="font-bold text-green-600">Non-Emergency Medical Advice</h4>
                  <p className="text-lg font-bold">(800) 555-0123</p>
                  <p className="text-sm text-gray-600">24/7 Nurse Helpline</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Emergency;
