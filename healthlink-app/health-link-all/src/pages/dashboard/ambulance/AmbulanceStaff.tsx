
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
import { Search, Plus, Calendar, Phone, UserPlus } from "lucide-react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for staff
const mockStaff = [
  { id: 1, name: "John Davis", role: "Paramedic", status: "active", shift: "Morning", phone: "555-1234", email: "john.davis@example.com", certification: "Advanced Cardiac Life Support", expires: "2026-03-15", assignedUnit: "AMB-101" },
  { id: 2, name: "Sarah Miller", role: "EMT", status: "active", shift: "Morning", phone: "555-2345", email: "sarah.miller@example.com", certification: "Basic Life Support", expires: "2026-05-20", assignedUnit: "AMB-101" },
  { id: 3, name: "Robert Johnson", role: "Driver", status: "active", shift: "Morning", phone: "555-3456", email: "robert.johnson@example.com", certification: "Emergency Vehicle Operator", expires: "2025-11-10", assignedUnit: "AMB-102" },
  { id: 4, name: "Maria Martinez", role: "Paramedic", status: "active", shift: "Evening", phone: "555-4567", email: "maria.martinez@example.com", certification: "Advanced Cardiac Life Support", expires: "2026-02-25", assignedUnit: "AMB-102" },
  { id: 5, name: "David Wilson", role: "EMT", status: "active", shift: "Evening", phone: "555-5678", email: "david.wilson@example.com", certification: "Basic Life Support", expires: "2025-12-05", assignedUnit: "AMB-103" },
  { id: 6, name: "Emily Garcia", role: "Paramedic", status: "active", shift: "Evening", phone: "555-6789", email: "emily.garcia@example.com", certification: "Advanced Cardiac Life Support", expires: "2026-04-15", assignedUnit: "AMB-103" },
  { id: 7, name: "James Smith", role: "Paramedic", status: "on-leave", shift: "Night", phone: "555-7890", email: "james.smith@example.com", certification: "Critical Care", expires: "2026-01-10", assignedUnit: "AMB-105" },
  { id: 8, name: "Linda Jones", role: "Driver", status: "active", shift: "Night", phone: "555-8901", email: "linda.jones@example.com", certification: "Emergency Vehicle Operator", expires: "2025-10-20", assignedUnit: "AMB-105" },
];

// Mock data for schedule
const mockSchedule = [
  { id: 1, date: "2025-05-16", shift: "Morning (6AM-2PM)", staff: ["John Davis", "Sarah Miller", "Robert Johnson", "Anna Thompson"], ambulances: ["AMB-101", "AMB-102"] },
  { id: 2, date: "2025-05-16", shift: "Evening (2PM-10PM)", staff: ["Maria Martinez", "David Wilson", "Emily Garcia", "Michael Brown"], ambulances: ["AMB-103", "AMB-104"] },
  { id: 3, date: "2025-05-16", shift: "Night (10PM-6AM)", staff: ["Linda Jones", "Thomas Lee", "Patricia Wright", "Richard Evans"], ambulances: ["AMB-105", "AMB-108"] },
  { id: 4, date: "2025-05-17", shift: "Morning (6AM-2PM)", staff: ["John Davis", "Sarah Miller", "Robert Johnson", "Anna Thompson"], ambulances: ["AMB-101", "AMB-102"] },
  { id: 5, date: "2025-05-17", shift: "Evening (2PM-10PM)", staff: ["Maria Martinez", "David Wilson", "Emily Garcia", "Michael Brown"], ambulances: ["AMB-103", "AMB-104"] },
  { id: 6, date: "2025-05-17", shift: "Night (10PM-6AM)", staff: ["Linda Jones", "Thomas Lee", "Patricia Wright", "Richard Evans"], ambulances: ["AMB-105", "AMB-108"] },
];

// Staff statistics
const staffStats = {
  totalStaff: 15,
  activeStaff: 14,
  onLeave: 1,
  certification: {
    current: 15,
    expiringSoon: 3
  },
  roles: {
    paramedics: 7,
    emts: 5,
    drivers: 3
  }
};

const AmbulanceStaff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [shiftFilter, setShiftFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter staff based on search, role, shift, and status
  const filteredStaff = mockStaff.filter(staff => {
    const matchesSearch = 
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || staff.role === roleFilter;
    const matchesShift = shiftFilter === "all" || staff.shift === shiftFilter;
    const matchesStatus = statusFilter === "all" || staff.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesShift && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "on-leave":
        return <Badge className="bg-yellow-100 text-yellow-800">On Leave</Badge>;
      case "training":
        return <Badge className="bg-blue-100 text-blue-800">Training</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <DashboardPageLayout
      title="Staff Management"
      description="Manage paramedics and driver schedules"
      role="ambulance"
    >
      <Tabs defaultValue="staff" className="space-y-6">
        <TabsList>
          <TabsTrigger value="staff">Staff Directory</TabsTrigger>
          <TabsTrigger value="schedule">Shift Schedule</TabsTrigger>
        </TabsList>
        
        <TabsContent value="staff" className="space-y-6">
          {/* Staff statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{staffStats.totalStaff}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  <span className="inline-flex items-center mr-3 text-green-600">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                    Active: {staffStats.activeStaff}
                  </span>
                  <span className="inline-flex items-center text-yellow-600">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></span>
                    On Leave: {staffStats.onLeave}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{staffStats.certification.current}</div>
                <div className="text-sm text-muted-foreground mt-2">
                  <span className="inline-flex items-center text-yellow-600">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></span>
                    Expiring Soon: {staffStats.certification.expiringSoon}
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm mt-2">
                  <div className="flex justify-between">
                    <span>Paramedics:</span>
                    <span className="font-bold">{staffStats.roles.paramedics}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EMTs:</span>
                    <span className="font-bold">{staffStats.roles.emts}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Drivers:</span>
                    <span className="font-bold">{staffStats.roles.drivers}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Staff filtering and search */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-1 gap-2 items-center">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Paramedic">Paramedic</SelectItem>
                  <SelectItem value="EMT">EMT</SelectItem>
                  <SelectItem value="Driver">Driver</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={shiftFilter} onValueChange={setShiftFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Shifts</SelectItem>
                  <SelectItem value="Morning">Morning</SelectItem>
                  <SelectItem value="Evening">Evening</SelectItem>
                  <SelectItem value="Night">Night</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
                <UserPlus className="mr-2 h-4 w-4" /> Add Staff
              </Button>
            </div>
          </div>
          
          {/* Staff table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Certification</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Assigned Unit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">{staff.name}</TableCell>
                      <TableCell>{staff.role}</TableCell>
                      <TableCell>{staff.shift}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                          {staff.phone}
                        </div>
                      </TableCell>
                      <TableCell>{staff.certification}</TableCell>
                      <TableCell>
                        {new Date(staff.expires) < new Date(new Date().setMonth(new Date().getMonth() + 3))
                          ? <span className="text-amber-600">{new Date(staff.expires).toLocaleDateString()}</span>
                          : new Date(staff.expires).toLocaleDateString()
                        }
                      </TableCell>
                      <TableCell>{staff.assignedUnit}</TableCell>
                      <TableCell>{getStatusBadge(staff.status)}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">No staff found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule" className="space-y-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-medium">Staff Schedule - Current Week</h3>
            <div className="flex gap-2">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" /> Previous Week
              </Button>
              <Button variant="outline">
                Next Week <Calendar className="h-4 w-4 ml-2" />
              </Button>
              <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
                <Plus className="h-4 w-4 mr-2" /> Schedule Shift
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Staff</TableHead>
                  <TableHead>Ambulances</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSchedule.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell>
                      {new Date(schedule.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </TableCell>
                    <TableCell>{schedule.shift}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {schedule.staff.map((name, i) => (
                          <Badge key={i} variant="outline" className="bg-gray-100">
                            {name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {schedule.ambulances.map((unit, i) => (
                          <Badge key={i} className="bg-blue-100 text-blue-800">
                            {unit}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
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

export default AmbulanceStaff;
