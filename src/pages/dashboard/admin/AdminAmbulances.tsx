
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";

// Mock data for ambulance services
const mockAmbulances = [
  { id: 1, name: "City Emergency Response", fleet: 15, coverage: "Central City", manager: "Robert Johnson", contact: "555-1234", response_time: "5-8 mins", status: "active" },
  { id: 2, name: "Rapid Medical Transport", fleet: 8, coverage: "North District", manager: "Linda Carter", contact: "555-5678", response_time: "6-10 mins", status: "active" },
  { id: 3, name: "Life Support Ambulance", fleet: 12, coverage: "East & South Districts", manager: "David Smith", contact: "555-9012", response_time: "4-7 mins", status: "active" },
  { id: 4, name: "Quick Response Medical", fleet: 6, coverage: "West District", manager: "Sarah Williams", contact: "555-3456", response_time: "7-12 mins", status: "inactive" },
  { id: 5, name: "Metro Emergency Services", fleet: 10, coverage: "Downtown & Suburbs", manager: "Michael Brown", contact: "555-7890", response_time: "5-9 mins", status: "active" },
];

const AdminAmbulances = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter ambulance services based on search
  const filteredAmbulances = mockAmbulances.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.coverage.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <DashboardPageLayout
      title="Ambulance Services Management"
      description="Manage emergency medical transport services"
      role="admin"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-1 gap-2 items-center">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search ambulance services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
            <Plus className="mr-2 h-4 w-4" /> Add Service
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Fleet Size</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Coverage Area</TableHead>
                <TableHead>Avg Response Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAmbulances.length > 0 ? (
                filteredAmbulances.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.fleet} vehicles</TableCell>
                    <TableCell>{service.manager}</TableCell>
                    <TableCell>{service.contact}</TableCell>
                    <TableCell>{service.coverage}</TableCell>
                    <TableCell>{service.response_time}</TableCell>
                    <TableCell>
                      <Badge className={service.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {service.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">No ambulance services found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardPageLayout>
  );
};

export default AdminAmbulances;
