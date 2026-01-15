
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Map, Calendar, AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for ambulance fleet
const mockAmbulances = [
  { id: "AMB-101", type: "Advanced Life Support", model: "Mercedes Sprinter", year: 2023, status: "active", location: "Central Station", assignedStaff: "Davis, Miller", lastMaintenance: "2025-04-10", nextMaintenance: "2025-07-10" },
  { id: "AMB-102", type: "Basic Life Support", model: "Ford Transit", year: 2022, status: "active", location: "Central Station", assignedStaff: "Johnson, Martinez", lastMaintenance: "2025-03-15", nextMaintenance: "2025-06-15" },
  { id: "AMB-103", type: "Advanced Life Support", model: "Mercedes Sprinter", year: 2023, status: "on-call", location: "Downtown District", assignedStaff: "Wilson, Garcia", lastMaintenance: "2025-04-05", nextMaintenance: "2025-07-05" },
  { id: "AMB-104", type: "Basic Life Support", model: "Ford Transit", year: 2022, status: "active", location: "East District", assignedStaff: "Brown, Wilson", lastMaintenance: "2025-05-01", nextMaintenance: "2025-08-01" },
  { id: "AMB-105", type: "Critical Care", model: "Mercedes Sprinter", year: 2024, status: "on-call", location: "West District", assignedStaff: "Smith, Jones", lastMaintenance: "2025-03-22", nextMaintenance: "2025-06-22" },
  { id: "AMB-106", type: "Basic Life Support", model: "Ford Transit", year: 2022, status: "active", location: "South District", assignedStaff: "Taylor, Anderson", lastMaintenance: "2025-04-15", nextMaintenance: "2025-07-15" },
  { id: "AMB-107", type: "Advanced Life Support", model: "Mercedes Sprinter", year: 2023, status: "maintenance", location: "Maintenance Facility", assignedStaff: "Unassigned", lastMaintenance: "2025-05-10", nextMaintenance: "2025-05-17" },
  { id: "AMB-108", type: "Neonatal", model: "Mercedes Sprinter", year: 2024, status: "active", location: "North District", assignedStaff: "Rodriguez, Lee", lastMaintenance: "2025-04-20", nextMaintenance: "2025-07-20" },
];

// Mock statistics
const fleetStats = {
  totalAmbulances: 8,
  activeAmbulances: 5,
  onCallAmbulances: 2,
  maintenanceAmbulances: 1,
  avgResponseTime: "7 mins",
  avgAmbulanceAge: "1.8 years",
  scheduledMaintenance: 3,
  upcomingInspections: 2
};

const AmbulanceFleet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  
  // Filter ambulances based on search, status, and type
  const filteredAmbulances = mockAmbulances.filter(ambulance => {
    const matchesSearch = 
      ambulance.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      ambulance.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ambulance.assignedStaff.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ambulance.status === statusFilter;
    const matchesType = typeFilter === "all" || ambulance.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "on-call":
        return <Badge className="bg-blue-100 text-blue-800">On Call</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <DashboardPageLayout
      title="Fleet Management"
      description="Track ambulance vehicles and maintenance"
      role="ambulance"
    >
      <div className="space-y-6">
        {/* Fleet statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Ambulances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{fleetStats.totalAmbulances}</div>
              <div className="text-sm text-muted-foreground mt-2">
                <span className="inline-flex items-center mr-3 text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                  Active: {fleetStats.activeAmbulances}
                </span>
                <span className="inline-flex items-center mr-3 text-blue-600">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mr-1"></span>
                  On Call: {fleetStats.onCallAmbulances}
                </span>
                <span className="inline-flex items-center text-yellow-600">
                  <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></span>
                  Maintenance: {fleetStats.maintenanceAmbulances}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{fleetStats.avgResponseTime}</div>
              <p className="text-sm text-muted-foreground">Average response time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Fleet Age</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{fleetStats.avgAmbulanceAge}</div>
              <p className="text-sm text-muted-foreground">Average vehicle age</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Maintenance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{fleetStats.scheduledMaintenance}</div>
              <p className="text-sm text-muted-foreground">Scheduled in next 30 days</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Fleet actions and filtering */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-1 gap-2 items-center">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search ambulances..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-call">On Call</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Advanced Life Support">Advanced Life Support</SelectItem>
                <SelectItem value="Basic Life Support">Basic Life Support</SelectItem>
                <SelectItem value="Critical Care">Critical Care</SelectItem>
                <SelectItem value="Neonatal">Neonatal</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
              <Plus className="mr-2 h-4 w-4" /> Add Ambulance
            </Button>
          </div>
        </div>
        
        {/* Fleet table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Assigned Staff</TableHead>
                <TableHead>Model/Year</TableHead>
                <TableHead>Last Maintenance</TableHead>
                <TableHead>Next Maintenance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAmbulances.length > 0 ? (
                filteredAmbulances.map((ambulance) => (
                  <TableRow key={ambulance.id}>
                    <TableCell className="font-medium">{ambulance.id}</TableCell>
                    <TableCell>{ambulance.type}</TableCell>
                    <TableCell>{ambulance.location}</TableCell>
                    <TableCell>{ambulance.assignedStaff}</TableCell>
                    <TableCell>{ambulance.model} ({ambulance.year})</TableCell>
                    <TableCell>{new Date(ambulance.lastMaintenance).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(ambulance.nextMaintenance).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(ambulance.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Map className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">No ambulances found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardPageLayout>
  );
};

export default AmbulanceFleet;
