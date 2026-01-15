
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User } from "lucide-react";

const AppointmentsPage = () => {
  // Mock data for appointments
  const upcomingAppointments = [
    { id: 1, doctor: "Dr. Sarah Johnson", specialty: "Cardiologist", date: "2025-05-15", time: "10:00 AM", location: "Main Hospital, Room 305" },
    { id: 2, doctor: "Dr. Michael Chen", specialty: "Dermatologist", date: "2025-05-20", time: "2:30 PM", location: "Wellness Clinic, Room 12" },
  ];

  const pastAppointments = [
    { id: 3, doctor: "Dr. Robert Davis", specialty: "Neurologist", date: "2025-04-30", time: "11:15 AM", location: "Medical Center, Room 208" },
    { id: 4, doctor: "Dr. Emily Wilson", specialty: "Pediatrician", date: "2025-04-25", time: "9:00 AM", location: "Children's Hospital, Room 114" },
    { id: 5, doctor: "Dr. James Taylor", specialty: "Orthopedist", date: "2025-04-10", time: "3:45 PM", location: "Sports Medicine Clinic, Room 7" },
  ];

  return (
    <DashboardPageLayout title="Appointments" description="Manage your medical appointments" role="patient">
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="past">Past Appointments</TabsTrigger>
          <TabsTrigger value="book">Book New Appointment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.doctor}</TableCell>
                    <TableCell>{appointment.specialty}</TableCell>
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
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {appointment.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Reschedule</Button>
                        <Button size="sm" variant="destructive">Cancel</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {upcomingAppointments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">No upcoming appointments</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{appointment.doctor}</TableCell>
                    <TableCell>{appointment.specialty}</TableCell>
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
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {appointment.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="book">
          <div className="max-w-lg mx-auto">
            <p className="mb-6 text-gray-600">Search for doctors and book a new appointment.</p>
            <Button className="w-full bg-healthcare-primary hover:bg-healthcare-accent">
              Find and Book Doctor
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default AppointmentsPage;
