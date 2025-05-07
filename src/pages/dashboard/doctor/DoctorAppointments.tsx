
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";

const DoctorAppointmentsPage = () => {
  // Mock data for today's appointments
  const todayAppointments = [
    { 
      id: 1, 
      patient: "John Smith", 
      age: 45, 
      time: "10:00 AM", 
      type: "Follow-up", 
      status: "Confirmed",
      notes: "Blood pressure check"
    },
    { 
      id: 2, 
      patient: "Emily Johnson", 
      age: 32, 
      time: "11:30 AM", 
      type: "New Patient", 
      status: "Checked In",
      notes: "Complaining of persistent cough"
    },
    { 
      id: 3, 
      patient: "Michael Brown", 
      age: 58, 
      time: "1:15 PM", 
      type: "Follow-up", 
      status: "Confirmed",
      notes: "Diabetes management"
    },
    { 
      id: 4, 
      patient: "Sarah Wilson", 
      age: 28, 
      time: "2:45 PM", 
      type: "New Patient", 
      status: "Confirmed",
      notes: "Skin rash examination"
    },
    { 
      id: 5, 
      patient: "Robert Davis", 
      age: 62, 
      time: "4:00 PM", 
      type: "Follow-up", 
      status: "Confirmed",
      notes: "Post-surgery check"
    },
  ];

  // Mock data for upcoming appointments
  const upcomingAppointments = [
    { 
      id: 6, 
      patient: "Jennifer Lee", 
      age: 35, 
      date: "2025-05-08", 
      time: "11:00 AM", 
      type: "Follow-up", 
      notes: "Anxiety management"
    },
    { 
      id: 7, 
      patient: "William Taylor", 
      age: 50, 
      date: "2025-05-08", 
      time: "3:30 PM", 
      type: "New Patient", 
      notes: "Chronic back pain"
    },
    { 
      id: 8, 
      patient: "Emma Martinez", 
      age: 42, 
      date: "2025-05-09", 
      time: "9:15 AM", 
      type: "Follow-up", 
      notes: "Thyroid condition review"
    },
    { 
      id: 9, 
      patient: "James Anderson", 
      age: 55, 
      date: "2025-05-09", 
      time: "2:00 PM", 
      type: "Follow-up", 
      notes: "Cardiovascular check"
    },
  ];

  return (
    <DashboardPageLayout title="Appointments" description="Manage your patient appointments" role="doctor">
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="today">Today's Schedule</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-healthcare-primary" />
              <h3 className="text-lg font-medium">May 7, 2025</h3>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Previous Day</Button>
              <Button variant="outline">Next Day</Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {appointment.time}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {appointment.patient}
                      </div>
                    </TableCell>
                    <TableCell>{appointment.age}</TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell className="max-w-xs truncate">{appointment.notes}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        appointment.status === "Checked In" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {appointment.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-healthcare-primary hover:bg-healthcare-accent">
                          Start Consultation
                        </Button>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {appointment.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {appointment.time}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {appointment.patient}
                      </div>
                    </TableCell>
                    <TableCell>{appointment.age}</TableCell>
                    <TableCell>{appointment.type}</TableCell>
                    <TableCell className="max-w-xs truncate">{appointment.notes}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="destructive">Cancel</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="calendar">
          <div className="flex justify-center items-center h-96 border rounded-md bg-gray-50">
            <div className="text-center">
              <p className="text-gray-500 mb-4">Calendar view integration</p>
              <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
                Set Availability
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default DoctorAppointmentsPage;
