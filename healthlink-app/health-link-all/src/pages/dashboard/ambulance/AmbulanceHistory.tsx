
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
import { Search, FileDown, Calendar, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for service history
const mockServiceHistory = [
  { id: 1, date: "2025-05-14", ambulanceId: "AMB-101", time: "09:30", patient: "John Smith", condition: "Heart Attack", origin: "123 Oak St", destination: "City Hospital", staff: "Davis, Miller", status: "completed" },
  { id: 2, date: "2025-05-14", ambulanceId: "AMB-103", time: "11:15", patient: "Maria Garcia", condition: "Traffic Accident", origin: "I-95 Mile 32", destination: "Metro Medical", staff: "Wilson, Garcia", status: "completed" },
  { id: 3, date: "2025-05-13", ambulanceId: "AMB-105", time: "15:45", patient: "Robert Johnson", condition: "Stroke", origin: "789 Pine Rd", destination: "University Hospital", staff: "Smith, Jones", status: "completed" },
  { id: 4, date: "2025-05-13", ambulanceId: "AMB-102", time: "08:20", patient: "Sarah Williams", condition: "Fall Injury", origin: "321 Maple Dr", destination: "City Hospital", staff: "Johnson, Martinez", status: "completed" },
  { id: 5, date: "2025-05-12", ambulanceId: "AMB-108", time: "14:10", patient: "David Chen", condition: "Seizure", origin: "654 Cedar Ln", destination: "Memorial Hospital", staff: "Rodriguez, Lee", status: "completed" },
  { id: 6, date: "2025-05-12", ambulanceId: "AMB-104", time: "10:30", patient: "Emily Taylor", condition: "Allergic Reaction", origin: "987 Birch Ave", destination: "Central Medical", staff: "Brown, Wilson", status: "completed" },
  { id: 7, date: "2025-05-11", ambulanceId: "AMB-106", time: "17:20", patient: "Michael Brown", condition: "Chest Pain", origin: "246 Willow St", destination: "St. Mary's Hospital", staff: "Taylor, Anderson", status: "completed" },
  { id: 8, date: "2025-05-11", ambulanceId: "AMB-103", time: "09:45", patient: "James Wilson", condition: "Breathing Difficulty", origin: "543 Spruce Rd", destination: "University Hospital", staff: "Wilson, Garcia", status: "completed" },
];

const AmbulanceHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ambulanceFilter, setAmbulanceFilter] = useState("all");
  const [date, setDate] = useState(null);
  
  // Filter service history based on search, ambulance, and date
  const filteredHistory = mockServiceHistory.filter(record => {
    const matchesSearch = 
      record.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
      record.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAmbulance = ambulanceFilter === "all" || record.ambulanceId === ambulanceFilter;
    const matchesDate = !date || record.date === format(date, 'yyyy-MM-dd');
    
    return matchesSearch && matchesAmbulance && matchesDate;
  });

  // Get unique ambulance IDs for filter
  const ambulanceIds = [...new Set(mockServiceHistory.map(record => record.ambulanceId))];
  
  return (
    <DashboardPageLayout
      title="Service History"
      description="View emergency service records"
      role="ambulance"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-1 gap-2 items-center">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by patient, condition, or location..."
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
                {ambulanceIds.map(id => (
                  <SelectItem key={id} value={id}>{id}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "MMM dd, yyyy") : "Filter by date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            
            {date && (
              <Button variant="outline" onClick={() => setDate(null)} size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            )}
            
            <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
              <FileDown className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Ambulance</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                    <TableCell>{record.time}</TableCell>
                    <TableCell>{record.ambulanceId}</TableCell>
                    <TableCell>{record.patient}</TableCell>
                    <TableCell>{record.condition}</TableCell>
                    <TableCell className="max-w-xs truncate">{record.origin}</TableCell>
                    <TableCell className="max-w-xs truncate">{record.destination}</TableCell>
                    <TableCell>{record.staff}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">No service records found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardPageLayout>
  );
};

export default AmbulanceHistory;
