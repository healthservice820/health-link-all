
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  Clock,
  Search, 
  User, 
  MapPin, 
  Phone, 
  FileText,
  Check,
  Droplet,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DiagnosticsSampleCollection = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock sample collection requests
  const collections = [
    {
      id: "SC-001",
      patientName: "John Smith",
      patientId: "P-1234",
      testType: "Complete Blood Count",
      address: "123 Main St, Apt 4B, Springfield",
      date: "2025-05-14",
      time: "09:30 AM - 11:30 AM",
      phone: "+1 555-123-4567",
      status: "Scheduled",
      collectorName: "David Thompson",
      specialInstructions: "Patient prefers morning visits. Fasting required.",
      paymentStatus: "Paid"
    },
    {
      id: "SC-002",
      patientName: "Alice Johnson",
      patientId: "P-2345",
      testType: "Lipid Profile, Blood Glucose",
      address: "456 Oak St, Springfield",
      date: "2025-05-14",
      time: "01:00 PM - 03:00 PM",
      phone: "+1 555-234-5678",
      status: "In Transit",
      collectorName: "Maria Rodriguez",
      specialInstructions: "Fasting required. Patient has a dog.",
      paymentStatus: "Paid"
    },
    {
      id: "SC-003",
      patientName: "Robert Brown",
      patientId: "P-3456",
      testType: "Liver Function Test",
      address: "789 Pine St, Springfield",
      date: "2025-05-14",
      time: "04:00 PM - 06:00 PM",
      phone: "+1 555-345-6789",
      status: "Completed",
      collectorName: "James Wilson",
      specialInstructions: "",
      paymentStatus: "Paid",
      completedAt: "05:15 PM"
    },
    {
      id: "SC-004",
      patientName: "Emily Davis",
      patientId: "P-4567",
      testType: "Complete Blood Count, Vitamin D",
      address: "101 Elm St, Springfield",
      date: "2025-05-15",
      time: "09:00 AM - 11:00 AM",
      phone: "+1 555-456-7890",
      status: "Scheduled",
      collectorName: "David Thompson",
      specialInstructions: "Patient has difficulty with blood draws. Use butterfly needle.",
      paymentStatus: "Pending"
    },
    {
      id: "SC-005",
      patientName: "Michael Wilson",
      patientId: "P-5678",
      testType: "Thyroid Profile, HbA1c",
      address: "202 Maple St, Springfield",
      date: "2025-05-15",
      time: "01:30 PM - 03:30 PM",
      phone: "+1 555-567-8901",
      status: "Cancelled",
      collectorName: "",
      specialInstructions: "Reschedule required",
      paymentStatus: "Refunded"
    }
  ];

  const todayCollections = collections.filter(
    collection => collection.date === "2025-05-14" && collection.status !== "Cancelled"
  );
  
  const upcomingCollections = collections.filter(
    collection => collection.date !== "2025-05-14" && collection.status !== "Cancelled"
  );
  
  const filteredCollections = collections.filter(
    collection => collection.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                collection.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                collection.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                collection.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Collection ${id} status changed to ${newStatus}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Scheduled":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{status}</Badge>;
      case "In Transit":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">{status}</Badge>;
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200"><Check className="h-3 w-3 mr-1" /> {status}</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-800 border-red-200">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch(status) {
      case "Paid":
        return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">{status}</Badge>;
      case "Pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">{status}</Badge>;
      case "Refunded":
        return <Badge variant="outline" className="bg-gray-50 text-gray-800 border-gray-200">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardPageLayout
      title="Sample Collection"
      description="Manage home collection services"
      role="diagnostics"
    >
      <Tabs defaultValue="today">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="today">Today's Collections</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="all">All Requests</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search collections..." 
              className="max-w-xs" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button>
              <Droplet className="h-4 w-4 mr-2" />
              New Collection
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
                  <TableHead>Test Type</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Time Slot</TableHead>
                  <TableHead>Collector</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayCollections.length > 0 ? (
                  todayCollections.map((collection) => (
                    <TableRow key={collection.id}>
                      <TableCell className="font-medium">{collection.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            {collection.patientName}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1 text-gray-400" />
                              {collection.phone}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{collection.testType}</TableCell>
                      <TableCell>
                        <div className="flex items-center max-w-[200px]">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                          <span className="line-clamp-2">{collection.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          {collection.time}
                        </div>
                      </TableCell>
                      <TableCell>{collection.collectorName}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {getStatusBadge(collection.status)}
                          <div className="mt-1">
                            {getPaymentBadge(collection.paymentStatus)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                          
                          {collection.status === "Scheduled" && (
                            <Button size="sm" onClick={() => handleStatusChange(collection.id, "In Transit")}>
                              Mark In Transit
                            </Button>
                          )}
                          
                          {collection.status === "In Transit" && (
                            <Button size="sm" onClick={() => handleStatusChange(collection.id, "Completed")}>
                              Mark Completed
                            </Button>
                          )}
                          
                          {collection.status !== "Completed" && collection.status !== "Cancelled" && (
                            <Button size="sm" variant="destructive" onClick={() => handleStatusChange(collection.id, "Cancelled")}>
                              Cancel
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No collections scheduled for today
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
                  <TableHead>Test Type</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Collector</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingCollections.length > 0 ? (
                  upcomingCollections.map((collection) => (
                    <TableRow key={collection.id}>
                      <TableCell className="font-medium">{collection.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            {collection.patientName}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1 text-gray-400" />
                              {collection.phone}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{collection.testType}</TableCell>
                      <TableCell>
                        <div className="flex items-center max-w-[200px]">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                          <span className="line-clamp-2">{collection.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            {collection.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            {collection.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{collection.collectorName}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {getStatusBadge(collection.status)}
                          <div className="mt-1">
                            {getPaymentBadge(collection.paymentStatus)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Reassign
                          </Button>
                          {collection.status !== "Completed" && collection.status !== "Cancelled" && (
                            <Button size="sm" variant="destructive" onClick={() => handleStatusChange(collection.id, "Cancelled")}>
                              Cancel
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No upcoming collections
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
                  <TableHead>Test Type</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCollections.length > 0 ? (
                  filteredCollections.map((collection) => (
                    <TableRow key={collection.id}>
                      <TableCell className="font-medium">{collection.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            {collection.patientName}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{collection.testType}</TableCell>
                      <TableCell>
                        <div className="flex items-center max-w-[200px]">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                          <span className="line-clamp-2">{collection.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            {collection.date}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(collection.status)}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No collections found
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

export default DiagnosticsSampleCollection;
