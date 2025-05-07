import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Video, User, Calendar, Clock, Check, Plus } from "lucide-react";

const TelemedicinePage = () => {
  // Mock data for upcoming consultations
  const upcomingConsultations = [
    { 
      id: 1, 
      patient: "John Smith", 
      date: "2025-05-07", 
      time: "11:30 AM", 
      reason: "Follow-up for hypertension",
      status: "Scheduled" 
    },
    { 
      id: 2, 
      patient: "Emily Johnson", 
      date: "2025-05-07", 
      time: "2:00 PM", 
      reason: "Cough and fever",
      status: "Confirmed"
    },
    { 
      id: 3, 
      patient: "Michael Brown", 
      date: "2025-05-08", 
      time: "10:15 AM", 
      reason: "Diabetes management",
      status: "Scheduled"
    },
    { 
      id: 4, 
      patient: "Sarah Wilson", 
      date: "2025-05-08", 
      time: "3:45 PM", 
      reason: "Skin rash follow-up",
      status: "Confirmed"
    },
  ];

  // Mock data for past consultations
  const pastConsultations = [
    { 
      id: 5, 
      patient: "Robert Davis", 
      date: "2025-05-02", 
      time: "1:30 PM", 
      reason: "Post-surgery check",
      duration: "15 minutes"
    },
    { 
      id: 6, 
      patient: "Jennifer Lee", 
      date: "2025-04-28", 
      time: "11:00 AM", 
      reason: "Anxiety management",
      duration: "30 minutes"
    },
    { 
      id: 7, 
      patient: "William Taylor", 
      date: "2025-04-25", 
      time: "9:45 AM", 
      reason: "Back pain consultation",
      duration: "20 minutes"
    },
  ];

  return (
    <DashboardPageLayout title="Telemedicine" description="Conduct virtual consultations with patients" role="doctor">
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">Upcoming Consultations</TabsTrigger>
          <TabsTrigger value="past">Past Consultations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingConsultations.map((consultation) => (
                  <TableRow key={consultation.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {consultation.patient}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {consultation.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          {consultation.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{consultation.reason}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        consultation.status === "Confirmed" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {consultation.status === "Confirmed" && (
                          <Check className="h-3 w-3 mr-1" />
                        )}
                        {consultation.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className={`${
                            new Date(`${consultation.date} ${consultation.time}`) <= new Date()
                              ? "bg-healthcare-primary hover:bg-healthcare-accent"
                              : "bg-gray-100 text-gray-400"
                          }`}
                          disabled={new Date(`${consultation.date} ${consultation.time}`) > new Date()}
                        >
                          <Video className="h-4 w-4 mr-2" /> Join
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
        
        <TabsContent value="past">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastConsultations.map((consultation) => (
                  <TableRow key={consultation.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-400" />
                        {consultation.patient}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {consultation.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          {consultation.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{consultation.reason}</TableCell>
                    <TableCell>{consultation.duration}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Notes</Button>
                        <Button size="sm" variant="outline">Record</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="max-w-2xl">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Telemedicine Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Video Consultation Availability</h4>
                    <div className="grid grid-cols-7 gap-2">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <div key={day} className="text-center">
                          <div className="mb-1 text-sm">{day}</div>
                          <Button 
                            variant="outline" 
                            className={`w-full ${
                              day === "Sat" || day === "Sun" 
                                ? "bg-gray-100" 
                                : "bg-blue-50 border-healthcare-primary text-healthcare-primary"
                            }`}
                          >
                            {day === "Sat" || day === "Sun" ? "Off" : "On"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Time Slots</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"].map((time) => (
                        <Button 
                          key={time}
                          variant="outline" 
                          className="bg-blue-50 border-healthcare-primary text-healthcare-primary"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    <Button variant="outline" className="mt-3">
                      <Plus className="h-4 w-4 mr-2" /> Add Time Slot
                    </Button>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Consultation Duration</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {["15 min", "30 min", "45 min"].map((duration, i) => (
                        <Button 
                          key={duration}
                          variant="outline" 
                          className={i === 1 ? "bg-blue-50 border-healthcare-primary text-healthcare-primary" : ""}
                        >
                          {duration}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="auto-reminders"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-healthcare-primary focus:ring-healthcare-primary"
                    />
                    <label htmlFor="auto-reminders" className="text-sm font-medium">
                      Send automatic reminders to patients
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="test-connection"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-healthcare-primary focus:ring-healthcare-primary"
                    />
                    <label htmlFor="test-connection" className="text-sm font-medium">
                      Test connection before consultation
                    </label>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
                      Save Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default TelemedicinePage;
