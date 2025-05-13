
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Search, User, Check, X, Calendar as CalendarIcon } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DiagnosticsAppointments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock appointment data
  const appointments = [
    {
      id: "AP-001",
      patientName: "John Smith",
      patientId: "P-1234",
      testType: "Complete Blood Count",
      date: "2025-05-14",
      time: "09:30 AM",
      status: "Confirmed",
      phone: "+1 555-123-4567",
      fasting: true
    },
    {
      id: "AP-002",
      patientName: "Alice Johnson",
      patientId: "P-2345",
      testType: "Lipid Profile",
      date: "2025-05-14",
      time: "10:15 AM",
      status: "Confirmed",
      phone: "+1 555-234-5678",
      fasting: true
    },
    {
      id: "AP-003",
      patientName: "Robert Brown",
      patientId: "P-3456",
      testType: "Liver Function Test",
      date: "2025-05-14",
      time: "11:00 AM",
      status: "Pending",
      phone: "+1 555-345-6789",
      fasting: false
    },
    {
      id: "AP-004",
      patientName: "Emily Davis",
      patientId: "P-4567",
      testType: "Blood Glucose",
      date: "2025-05-15",
      time: "09:00 AM",
      status: "Confirmed",
      phone: "+1 555-456-7890",
      fasting: true
    },
    {
      id: "AP-005",
      patientName: "Michael Wilson",
      patientId: "P-5678",
      testType: "Thyroid Profile",
      date: "2025-05-15",
      time: "10:30 AM",
      status: "Cancelled",
      phone: "+1 555-567-8901",
      fasting: false
    }
  ];

  const todayAppointments = appointments.filter(app => app.date === "2025-05-14" && app.status !== "Cancelled");
  const upcomingAppointments = appointments.filter(app => app.date !== "2025-05-14" && app.status !== "Cancelled");
  
  const filteredAppointments = appointments.filter(
    app => app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           app.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
           app.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
           app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id: string, newStatus: string) => {
    toast({
      title: "Appointment Updated",
      description: `Appointment ${id} status changed to ${newStatus}`,
    });
  };

  const handleCheckIn = (id: string) => {
    toast({
      title: "Patient Checked In",
      description: `Patient for appointment ${id} has been checked in`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Confirmed":
        return <Badge className="bg-green-100 text-green-800 border-green-200"><Check className="w-3 h-3 mr-1" /> {status}</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">{status}</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-800 border-red-200"><X className="w-3 h-3 mr-1" /> {status}</Badge>;
      case "Completed":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const AppointmentRow = ({ appointment }: { appointment: any }) => (
    <TableRow key={appointment.id}>
      <TableCell className="font-medium">{appointment.id}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-gray-400" />
          <div>
            <div>{appointment.patientName}</div>
            <div className="text-xs text-gray-500">{appointment.patientId}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>{appointment.testType}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
          {appointment.date}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-gray-400" />
          {appointment.time}
        </div>
      </TableCell>
      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
      <TableCell className="flex space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Appointment Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-gray-500">Appointment ID:</span>
                <span className="col-span-2 font-medium">{appointment.id}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-gray-500">Patient:</span>
                <span className="col-span-2">{appointment.patientName} ({appointment.patientId})</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-gray-500">Test Type:</span>
                <span className="col-span-2">{appointment.testType}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-gray-500">Date & Time:</span>
                <span className="col-span-2">{appointment.date}, {appointment.time}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-gray-500">Status:</span>
                <span className="col-span-2">{getStatusBadge(appointment.status)}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-gray-500">Contact:</span>
                <span className="col-span-2">{appointment.phone}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-gray-500">Fasting Required:</span>
                <span className="col-span-2">{appointment.fasting ? "Yes" : "No"}</span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => toast({ title: "Reminder Sent", description: "SMS reminder sent to patient" })}>
                Send Reminder
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {appointment.status === "Confirmed" && (
          <Button size="sm" onClick={() => handleCheckIn(appointment.id)}>Check In</Button>
        )}
        {appointment.status === "Pending" && (
          <Button size="sm" onClick={() => handleStatusChange(appointment.id, "Confirmed")}>Confirm</Button>
        )}
        {(appointment.status === "Pending" || appointment.status === "Confirmed") && (
          <Button size="sm" variant="destructive" onClick={() => handleStatusChange(appointment.id, "Cancelled")}>
            Cancel
          </Button>
        )}
      </TableCell>
    </TableRow>
  );

  return (
    <DashboardPageLayout
      title="Test Appointments"
      description="Manage diagnostic test appointments"
      role="diagnostics"
    >
      <Tabs defaultValue="today">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="today">Today's Appointments</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="all">All Appointments</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search appointments..." 
              className="max-w-xs" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button>
              <CalendarIcon className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </div>

        <TabsContent value="today">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayAppointments.length > 0 ? (
                  todayAppointments.map(appointment => (
                    <AppointmentRow key={appointment.id} appointment={appointment} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No appointments scheduled for today
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map(appointment => (
                    <AppointmentRow key={appointment.id} appointment={appointment} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No upcoming appointments
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map(appointment => (
                    <AppointmentRow key={appointment.id} appointment={appointment} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No appointments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default DiagnosticsAppointments;
