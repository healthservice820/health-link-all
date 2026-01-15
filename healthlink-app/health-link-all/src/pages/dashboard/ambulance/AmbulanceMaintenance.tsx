
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
import { Search, Plus, Calendar, AlertTriangle } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for maintenance records
const mockMaintenanceRecords = [
  { id: 1, ambulanceId: "AMB-101", type: "Regular", service: "Oil Change", date: "2025-04-10", nextDate: "2025-07-10", mileage: 25400, technician: "John Smith", notes: "Normal oil change and filter replacement", status: "completed" },
  { id: 2, ambulanceId: "AMB-102", type: "Regular", service: "Brake Inspection", date: "2025-03-15", nextDate: "2025-06-15", mileage: 22800, technician: "Maria Rodriguez", notes: "Brake pads at 60%, will need replacement soon", status: "completed" },
  { id: 3, ambulanceId: "AMB-103", type: "Regular", service: "Tire Rotation", date: "2025-04-05", nextDate: "2025-07-05", mileage: 23900, technician: "Robert Johnson", notes: "All tires rotated, pressure adjusted", status: "completed" },
  { id: 4, ambulanceId: "AMB-104", type: "Inspection", service: "Annual Inspection", date: "2025-05-01", nextDate: "2026-05-01", mileage: 21500, technician: "Emily Davis", notes: "All systems passed inspection", status: "completed" },
  { id: 5, ambulanceId: "AMB-105", type: "Repair", service: "Oxygen System", date: "2025-03-22", nextDate: null, mileage: 27800, technician: "Michael Brown", notes: "Replaced faulty oxygen regulator", status: "completed" },
  { id: 6, ambulanceId: "AMB-106", type: "Regular", service: "Oil Change", date: "2025-04-15", nextDate: "2025-07-15", mileage: 20100, technician: "John Smith", notes: "Normal oil change and filter replacement", status: "completed" },
  { id: 7, ambulanceId: "AMB-107", type: "Repair", service: "Transmission", date: "2025-05-10", nextDate: "2025-05-17", mileage: 29500, technician: "David Wilson", notes: "Major transmission repair needed", status: "in-progress" },
  { id: 8, ambulanceId: "AMB-108", type: "Regular", service: "Full Service", date: "2025-04-20", nextDate: "2025-07-20", mileage: 18700, technician: "Sarah Thompson", notes: "Complete service including fluids, filters and systems check", status: "completed" },
];

// Mock data for scheduled maintenance
const mockScheduledMaintenance = [
  { id: 1, ambulanceId: "AMB-101", type: "Regular", service: "Oil Change", scheduledDate: "2025-07-10", estimatedTime: "2 hours", technician: "John Smith", notes: "Regular maintenance" },
  { id: 2, ambulanceId: "AMB-102", type: "Regular", service: "Brake Service", scheduledDate: "2025-06-15", estimatedTime: "3 hours", technician: "Maria Rodriguez", notes: "Replace brake pads" },
  { id: 3, ambulanceId: "AMB-103", type: "Regular", service: "Tire Rotation", scheduledDate: "2025-07-05", estimatedTime: "1 hour", technician: "Robert Johnson", notes: "Regular maintenance" },
  { id: 4, ambulanceId: "AMB-105", type: "Inspection", service: "Equipment Check", scheduledDate: "2025-05-25", estimatedTime: "4 hours", technician: "Emily Davis", notes: "Quarterly equipment inspection" },
  { id: 5, ambulanceId: "AMB-106", type: "Regular", service: "Oil Change", scheduledDate: "2025-07-15", estimatedTime: "2 hours", technician: "John Smith", notes: "Regular maintenance" },
  { id: 6, ambulanceId: "AMB-107", type: "Repair", service: "Transmission", scheduledDate: "2025-05-17", estimatedTime: "8 hours", technician: "David Wilson", notes: "Complete transmission replacement" },
];

// Maintenance statistics
const maintenanceStats = {
  totalAmbulances: 8,
  inService: 7,
  inMaintenance: 1,
  upcomingServices: 6,
  overdue: 0,
  totalMileage: 189700,
  averageMileage: 23712,
  maintenanceCosts: {
    thisMonth: 12500,
    thisYear: 45800,
    projected: 78000
  }
};

const AmbulanceMaintenance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ambulanceFilter, setAmbulanceFilter] = useState("all");
  
  // Filter maintenance records based on search, type, status, and ambulance
  const filteredRecords = mockMaintenanceRecords.filter(record => {
    const matchesSearch = 
      record.service.toLowerCase().includes(searchTerm.toLowerCase()) || 
      record.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || record.type === typeFilter;
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesAmbulance = ambulanceFilter === "all" || record.ambulanceId === ambulanceFilter;
    
    return matchesSearch && matchesType && matchesStatus && matchesAmbulance;
  });

  // Get unique ambulance IDs for filter
  const ambulanceIds = [...new Set(mockMaintenanceRecords.map(record => record.ambulanceId))];
  
  const getStatusBadge = (status) => {
    switch(status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "scheduled":
        return <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <DashboardPageLayout
      title="Maintenance Management"
      description="Schedule and track vehicle maintenance"
      role="ambulance"
    >
      <Tabs defaultValue="maintenance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="maintenance">Maintenance Records</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Maintenance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="maintenance" className="space-y-6">
          {/* Maintenance statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Fleet Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{maintenanceStats.totalAmbulances}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  <span className="inline-flex items-center mr-3 text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                    In Service: {maintenanceStats.inService}
                  </span>
                  <span className="inline-flex items-center text-yellow-600">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></span>
                    In Maintenance: {maintenanceStats.inMaintenance}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Upcoming Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{maintenanceStats.upcomingServices}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  <span className="inline-flex items-center mr-3 text-yellow-600">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></span>
                    Next 30 days
                  </span>
                  {maintenanceStats.overdue > 0 && (
                    <span className="inline-flex items-center text-red-600">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Overdue: {maintenanceStats.overdue}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Mileage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{maintenanceStats.averageMileage.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Miles per vehicle</p>
                <Progress className="mt-2" value={70} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Maintenance Costs</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>This Month:</span>
                    <span className="font-bold">${maintenanceStats.maintenanceCosts.thisMonth.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Year:</span>
                    <span className="font-bold">${maintenanceStats.maintenanceCosts.thisYear.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Projected:</span>
                    <span className="font-bold">${maintenanceStats.maintenanceCosts.projected.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Maintenance filtering and search */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-1 gap-2 items-center">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search maintenance records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={ambulanceFilter} onValueChange={setAmbulanceFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Ambulance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ambulances</SelectItem>
                  {ambulanceIds.map((id, index) => (
                    <SelectItem key={index} value={id}>{id}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Regular">Regular</SelectItem>
                  <SelectItem value="Inspection">Inspection</SelectItem>
                  <SelectItem value="Repair">Repair</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
                <Plus className="mr-2 h-4 w-4" /> Add Record
              </Button>
            </div>
          </div>
          
          {/* Maintenance records table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ambulance ID</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Next Service</TableHead>
                  <TableHead>Mileage</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.ambulanceId}</TableCell>
                      <TableCell>{record.service} ({record.type})</TableCell>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {record.nextDate ? new Date(record.nextDate).toLocaleDateString() : "N/A"}
                      </TableCell>
                      <TableCell>{record.mileage.toLocaleString()} mi</TableCell>
                      <TableCell>{record.technician}</TableCell>
                      <TableCell className="max-w-xs truncate">{record.notes}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">No maintenance records found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="scheduled" className="space-y-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-medium">Upcoming Maintenance</h3>
            <div className="flex gap-2">
              <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
                <Calendar className="h-4 w-4 mr-2" /> Schedule Maintenance
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ambulance ID</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Estimated Time</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockScheduledMaintenance.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell className="font-medium">{schedule.ambulanceId}</TableCell>
                    <TableCell>{schedule.service} ({schedule.type})</TableCell>
                    <TableCell>
                      {new Date(schedule.scheduledDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{schedule.estimatedTime}</TableCell>
                    <TableCell>{schedule.technician}</TableCell>
                    <TableCell className="max-w-xs truncate">{schedule.notes}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Cancel</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default AmbulanceMaintenance;
