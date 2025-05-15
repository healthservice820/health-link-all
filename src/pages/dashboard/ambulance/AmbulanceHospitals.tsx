
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
import { Search, Plus, Phone, Map, MapPin } from "lucide-react";
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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Mock data for hospitals
const mockHospitals = [
  { id: 1, name: "City General Hospital", type: "General", distance: 2.5, address: "123 Medical Center Blvd, Central City", phone: "555-1000", emergencyContact: "Dr. Sarah Johnson", specialties: ["Trauma Center", "Cardiac Center"], capacity: "High", status: "active" },
  { id: 2, name: "University Medical Center", type: "Teaching", distance: 4.8, address: "456 University Ave, Downtown", phone: "555-2000", emergencyContact: "Dr. Michael Brown", specialties: ["Trauma Center", "Burn Center", "Stroke Center"], capacity: "High", status: "active" },
  { id: 3, name: "Memorial Hospital", type: "General", distance: 3.2, address: "789 Memorial Dr, Eastside", phone: "555-3000", emergencyContact: "Dr. Emily Davis", specialties: ["Pediatric Center", "Neonatal ICU"], capacity: "Medium", status: "active" },
  { id: 4, name: "St. Mary's Medical Center", type: "Religious", distance: 5.1, address: "321 Faith St, Westside", phone: "555-4000", emergencyContact: "Dr. Robert Wilson", specialties: ["Cardiac Center"], capacity: "Medium", status: "active" },
  { id: 5, name: "Central Emergency Hospital", type: "Emergency", distance: 1.8, address: "654 Emergency Rd, Central City", phone: "555-5000", emergencyContact: "Dr. Jennifer Smith", specialties: ["Trauma Center", "Burn Center"], capacity: "Medium", status: "limited" },
  { id: 6, name: "Children's Hospital", type: "Pediatric", distance: 6.2, address: "987 Children's Way, Northside", phone: "555-6000", emergencyContact: "Dr. David Chen", specialties: ["Pediatric Center", "Neonatal ICU"], capacity: "High", status: "active" },
  { id: 7, name: "Veterans Medical Center", type: "Veterans", distance: 7.5, address: "246 Veterans Blvd, Southside", phone: "555-7000", emergencyContact: "Dr. Lisa Rodriguez", specialties: ["Trauma Center"], capacity: "Medium", status: "active" },
  { id: 8, name: "Riverside Community Hospital", type: "Community", distance: 4.5, address: "135 Riverside Ave, Riverside", phone: "555-8000", emergencyContact: "Dr. Thomas Lee", specialties: ["Cardiac Center"], capacity: "Low", status: "limited" },
];

// Emergency department statistics
const edStats = {
  totalHospitals: 8,
  availableTraumaCenters: 5,
  availableBurnCenters: 2,
  availableCardiacCenters: 3,
  availableStrokeCenters: 1,
  availablePediatricCenters: 2,
  highCapacity: 3,
  mediumCapacity: 4,
  lowCapacity: 1,
  limitedStatus: 2
};

const AmbulanceHospitals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [capacityFilter, setCapacityFilter] = useState("all");
  
  // Filter hospitals based on search, type, specialty, and capacity
  const filteredHospitals = mockHospitals.filter(hospital => {
    const matchesSearch = 
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || hospital.type === typeFilter;
    const matchesSpecialty = specialtyFilter === "all" || hospital.specialties.includes(specialtyFilter);
    const matchesCapacity = capacityFilter === "all" || hospital.capacity === capacityFilter;
    
    return matchesSearch && matchesType && matchesSpecialty && matchesCapacity;
  });

  // Get unique hospital types and specialties for filters
  const hospitalTypes = [...new Set(mockHospitals.map(hospital => hospital.type))];
  const specialties = [...new Set(mockHospitals.flatMap(hospital => hospital.specialties))];
  
  const getStatusBadge = (status) => {
    switch(status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "limited":
        return <Badge className="bg-yellow-100 text-yellow-800">Limited</Badge>;
      case "divert":
        return <Badge className="bg-red-100 text-red-800">Divert</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getCapacityBadge = (capacity) => {
    switch(capacity) {
      case "High":
        return <Badge className="bg-green-100 text-green-800">High</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "Low":
        return <Badge className="bg-red-100 text-red-800">Low</Badge>;
      default:
        return <Badge>{capacity}</Badge>;
    }
  };
  
  return (
    <DashboardPageLayout
      title="Hospital Network"
      description="View partner hospitals and emergency contacts"
      role="ambulance"
    >
      <div className="space-y-6">
        {/* Hospital statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Emergency Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{edStats.totalHospitals}</div>
              <div className="text-sm text-muted-foreground mt-2">
                <span className="inline-flex items-center mr-3 text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                  Active: {edStats.totalHospitals - edStats.limitedStatus}
                </span>
                <span className="inline-flex items-center text-yellow-600">
                  <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></span>
                  Limited: {edStats.limitedStatus}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Trauma Centers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{edStats.availableTraumaCenters}</div>
              <div className="text-sm text-muted-foreground">Available centers</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Specialty Centers</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Cardiac:</span>
                  <span className="font-bold">{edStats.availableCardiacCenters}</span>
                </div>
                <div className="flex justify-between">
                  <span>Burn:</span>
                  <span className="font-bold">{edStats.availableBurnCenters}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stroke:</span>
                  <span className="font-bold">{edStats.availableStrokeCenters}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pediatric:</span>
                  <span className="font-bold">{edStats.availablePediatricCenters}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">ED Capacity</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="inline-flex items-center text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                    High:
                  </span>
                  <span className="font-bold">{edStats.highCapacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="inline-flex items-center text-yellow-600">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></span>
                    Medium:
                  </span>
                  <span className="font-bold">{edStats.mediumCapacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="inline-flex items-center text-red-600">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                    Low:
                  </span>
                  <span className="font-bold">{edStats.lowCapacity}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Hospital filtering and search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-1 gap-2 items-center">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {hospitalTypes.map((type, index) => (
                  <SelectItem key={index} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                {specialties.map((specialty, index) => (
                  <SelectItem key={index} value={specialty}>{specialty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={capacityFilter} onValueChange={setCapacityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Capacity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Capacities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
              <Plus className="mr-2 h-4 w-4" /> Add Hospital
            </Button>
          </div>
        </div>
        
        {/* Hospitals table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hospital</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Emergency Contact</TableHead>
                <TableHead>Specialties</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHospitals.length > 0 ? (
                filteredHospitals.map((hospital) => (
                  <TableRow key={hospital.id}>
                    <TableCell className="font-medium">{hospital.name}</TableCell>
                    <TableCell>{hospital.type}</TableCell>
                    <TableCell>{hospital.distance} km</TableCell>
                    <TableCell className="max-w-xs truncate">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        {hospital.address}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {hospital.emergencyContact}
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="h-3 w-3 mr-1" />
                          {hospital.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {hospital.specialties.map((specialty, i) => (
                          <Badge key={i} variant="outline" className="bg-blue-50">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getCapacityBadge(hospital.capacity)}</TableCell>
                    <TableCell>{getStatusBadge(hospital.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Map className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">No hospitals found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardPageLayout>
  );
};

export default AmbulanceHospitals;
