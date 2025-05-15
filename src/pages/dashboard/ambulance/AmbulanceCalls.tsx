
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Phone, MapPin, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for emergency calls
const mockEmergencyCalls = [
  { id: 1, callerName: "John Smith", phone: "555-1234", location: "123 Oak St, Central City", nature: "Heart Attack", priority: "high", status: "dispatched", timestamp: "2025-05-15T09:45:00", ambulanceId: "AMB-103" },
  { id: 2, callerName: "Maria Garcia", phone: "555-9876", location: "456 Elm Ave, Downtown", nature: "Traffic Accident", priority: "high", status: "pending", timestamp: "2025-05-15T10:12:00", ambulanceId: null },
  { id: 3, callerName: "Robert Johnson", phone: "555-4567", location: "789 Pine Rd, Westside", nature: "Breathing Difficulty", priority: "medium", status: "en-route", timestamp: "2025-05-15T10:05:00", ambulanceId: "AMB-105" },
  { id: 4, callerName: "Sarah Williams", phone: "555-7890", location: "321 Maple Dr, Northside", nature: "Fall Injury", priority: "low", status: "completed", timestamp: "2025-05-15T08:30:00", ambulanceId: "AMB-101" },
  { id: 5, callerName: "David Chen", phone: "555-2468", location: "654 Cedar Ln, Eastside", nature: "Chest Pain", priority: "medium", status: "pending", timestamp: "2025-05-15T10:20:00", ambulanceId: null },
];

// Mock data for available ambulances
const mockAvailableAmbulances = [
  { id: "AMB-102", location: "Central Station", staff: "Johnson, Martinez", status: "available" },
  { id: "AMB-104", location: "East District", staff: "Brown, Wilson", status: "available" },
  { id: "AMB-106", location: "South District", staff: "Taylor, Anderson", status: "available" },
];

const AmbulanceCalls = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedCall, setSelectedCall] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Filter emergency calls based on search, status, and priority
  const filteredCalls = mockEmergencyCalls.filter(call => {
    const matchesSearch = 
      call.callerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      call.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.nature.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || call.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || call.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleDispatchAmbulance = (callId, ambulanceId) => {
    // In a real app, this would make an API call to update the database
    toast({
      title: "Ambulance Dispatched",
      description: `Ambulance ${ambulanceId} dispatched to call #${callId}`,
    });
    setIsDetailsOpen(false);
  };
  
  const getStatusBadge = (status) => {
    switch(status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "dispatched":
        return <Badge className="bg-blue-100 text-blue-800">Dispatched</Badge>;
      case "en-route":
        return <Badge className="bg-purple-100 text-purple-800">En Route</Badge>;
      case "on-scene":
        return <Badge className="bg-indigo-100 text-indigo-800">On Scene</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority) => {
    switch(priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };
  
  return (
    <DashboardPageLayout
      title="Emergency Calls"
      description="Manage emergency service requests"
      role="ambulance"
    >
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Calls</TabsTrigger>
          <TabsTrigger value="completed">Completed Calls</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-1 gap-2 items-center">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search calls..."
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
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="dispatched">Dispatched</SelectItem>
                  <SelectItem value="en-route">En Route</SelectItem>
                  <SelectItem value="on-scene">On Scene</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="bg-red-600 hover:bg-red-700">
                <AlertTriangle className="mr-2 h-4 w-4" /> Emergency Mode
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Priority</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Caller</TableHead>
                  <TableHead>Nature</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls.filter(call => call.status !== 'completed').length > 0 ? (
                  filteredCalls.filter(call => call.status !== 'completed').map((call) => (
                    <TableRow key={call.id} className={call.priority === 'high' ? 'bg-red-50' : ''}>
                      <TableCell>{getPriorityBadge(call.priority)}</TableCell>
                      <TableCell>{new Date(call.timestamp).toLocaleTimeString()}</TableCell>
                      <TableCell>{call.callerName}</TableCell>
                      <TableCell>{call.nature}</TableCell>
                      <TableCell className="max-w-xs truncate">{call.location}</TableCell>
                      <TableCell>{getStatusBadge(call.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => { setSelectedCall(call); setIsDetailsOpen(true); }}
                          >
                            Details
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">No active emergency calls</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-1 gap-2 items-center">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search completed calls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Priority</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Caller</TableHead>
                  <TableHead>Nature</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls.filter(call => call.status === 'completed').length > 0 ? (
                  filteredCalls.filter(call => call.status === 'completed').map((call) => (
                    <TableRow key={call.id}>
                      <TableCell>{getPriorityBadge(call.priority)}</TableCell>
                      <TableCell>{new Date(call.timestamp).toLocaleTimeString()}</TableCell>
                      <TableCell>{call.callerName}</TableCell>
                      <TableCell>{call.nature}</TableCell>
                      <TableCell className="max-w-xs truncate">{call.location}</TableCell>
                      <TableCell>{getStatusBadge(call.status)}</TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => { setSelectedCall(call); setIsDetailsOpen(true); }}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">No completed emergency calls</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      
      {selectedCall && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Emergency Call Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Caller</p>
                  <p>{selectedCall.callerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <div className="flex items-center">
                    <Phone className="mr-1 h-4 w-4 text-muted-foreground" />
                    <p>{selectedCall.phone}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium">Location</p>
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                    <p>{selectedCall.location}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Emergency Type</p>
                  <p>{selectedCall.nature}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Priority</p>
                  <p>{getPriorityBadge(selectedCall.priority)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p>{getStatusBadge(selectedCall.status)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Time Reported</p>
                  <p>{new Date(selectedCall.timestamp).toLocaleString()}</p>
                </div>
              </div>
              
              {(selectedCall.status === 'pending') && (
                <div>
                  <p className="text-sm font-medium mb-2">Available Ambulances</p>
                  <div className="space-y-2">
                    {mockAvailableAmbulances.map(ambulance => (
                      <div key={ambulance.id} className="flex justify-between items-center p-2 border rounded-md">
                        <div>
                          <p className="font-medium">{ambulance.id}</p>
                          <p className="text-sm text-muted-foreground">{ambulance.location} - {ambulance.staff}</p>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleDispatchAmbulance(selectedCall.id, ambulance.id)}
                          className="bg-healthcare-primary hover:bg-healthcare-accent"
                        >
                          Dispatch
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter className="sm:justify-start">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsDetailsOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardPageLayout>
  );
};

export default AmbulanceCalls;
