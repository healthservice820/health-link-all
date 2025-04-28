
import React, { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/shared/SearchInput";
import { MapPin, Calendar, Clock } from "lucide-react";

const Diagnostics = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all tests");

  const tests = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      category: "Blood Test",
      price: "$45.00",
      lab: "HealthLink Diagnostics",
      distance: "1.5 miles away",
      nextSlot: "Today, 2:00 PM",
      duration: "15 min",
    },
    {
      id: 2,
      name: "Chest X-Ray",
      category: "Imaging",
      price: "$120.00",
      lab: "MedScan Imaging Center",
      distance: "2.2 miles away",
      nextSlot: "Tomorrow, 10:30 AM",
      duration: "30 min",
    },
    {
      id: 3,
      name: "MRI Brain Scan",
      category: "Imaging",
      price: "$350.00",
      lab: "Advanced Imaging Solutions",
      distance: "3.0 miles away",
      nextSlot: "Today, 4:30 PM",
      duration: "45 min",
    },
  ];

  const categories = [
    "All Tests",
    "Blood Tests",
    "Imaging",
    "Cardiology",
    "Neurology",
    "Pathology",
  ];

  // Filter tests based on search query and selected category
  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      // Filter by search query
      const matchesSearch = 
        searchQuery === "" || 
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.lab.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by category
      const matchesCategory = 
        selectedCategory === "all tests" || 
        test.category.toLowerCase() === selectedCategory.toLowerCase();
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, tests]);

  return (
    <Layout>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Book Diagnostic Tests</h1>
          <p className="text-muted-foreground mb-8">
            Find and book diagnostic tests at labs near you
          </p>
          <SearchInput
            placeholder="Search for tests, labs, or services..."
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        <div className="flex gap-8">
          <div className="w-64 shrink-0">
            <div className="sticky top-24">
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category.toLowerCase() ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(category.toLowerCase())}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            {filteredTests.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No tests found matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredTests.map((test) => (
                  <Card key={test.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{test.name}</h3>
                          <p className="text-sm text-muted-foreground">{test.category}</p>
                        </div>
                        <div className="text-2xl font-semibold text-healthcare-primary">
                          {test.price}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-healthcare-primary" />
                            <span className="text-sm">{test.lab}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-healthcare-primary" />
                            <span className="text-sm">{test.distance}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-healthcare-primary" />
                            <span className="text-sm">{test.nextSlot}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-healthcare-primary" />
                            <span className="text-sm">Duration: {test.duration}</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-healthcare-primary hover:bg-healthcare-accent">
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Diagnostics;
