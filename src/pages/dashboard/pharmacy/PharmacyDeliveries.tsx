
import React, { useState, useEffect } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  TruckIcon, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  Calendar 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type DeliveryStatus = "pending" | "in_transit" | "delivered" | "failed" | "scheduled";

interface Delivery {
  id: string;
  prescriptionId: string;
  patientName: string;
  patientId: string;
  address: string;
  phone: string;
  status: DeliveryStatus;
  scheduledTime: string;
  estimatedArrival: string;
  assignedTo?: string;
  notes?: string;
}

const mockDeliveries: Delivery[] = [
  {
    id: "DEL-001",
    prescriptionId: "RX-78293",
    patientName: "Sarah Johnson",
    patientId: "PT-12345",
    address: "123 Main St, Apt 4B, New York, NY 10001",
    phone: "212-555-1234",
    status: "pending",
    scheduledTime: "2025-05-13T14:00:00",
    estimatedArrival: "2025-05-13T15:30:00"
  },
  {
    id: "DEL-002",
    prescriptionId: "RX-78294",
    patientName: "Robert Chen",
    patientId: "PT-12346",
    address: "456 Park Ave, New York, NY 10022",
    phone: "212-555-5678",
    status: "in_transit",
    scheduledTime: "2025-05-13T10:30:00",
    estimatedArrival: "2025-05-13T11:45:00",
    assignedTo: "John D.",
    notes: "Customer requested delivery to doorman"
  },
  {
    id: "DEL-003",
    prescriptionId: "RX-78295",
    patientName: "Amelia Rodriguez",
    patientId: "PT-12347",
    address: "789 Broadway, Apt 12C, New York, NY 10003",
    phone: "212-555-9012",
    status: "delivered",
    scheduledTime: "2025-05-12T15:00:00",
    estimatedArrival: "2025-05-12T16:15:00",
    assignedTo: "Maria S."
  },
  {
    id: "DEL-004",
    prescriptionId: "RX-78296",
    patientName: "David Smith",
    patientId: "PT-12348",
    address: "101 5th Ave, New York, NY 10011",
    phone: "212-555-3456",
    status: "failed",
    scheduledTime: "2025-05-12T13:00:00",
    estimatedArrival: "2025-05-12T14:30:00",
    assignedTo: "Chris T.",
    notes: "Customer wasn't available"
  },
  {
    id: "DEL-005",
    prescriptionId: "RX-78297",
    patientName: "Emily Wilson",
    patientId: "PT-12349",
    address: "222 East 44th St, New York, NY 10017",
    phone: "212-555-7890",
    status: "scheduled",
    scheduledTime: "2025-05-14T09:00:00",
    estimatedArrival: "2025-05-14T10:30:00"
  }
];

const PharmacyDeliveries = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [filteredDeliveries, setFilteredDeliveries] = useState<Delivery[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | "all">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch deliveries
    const fetchDeliveries = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setDeliveries(mockDeliveries);
        setFilteredDeliveries(mockDeliveries);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load deliveries",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  useEffect(() => {
    let results = deliveries;
    
    if (statusFilter !== "all") {
      results = results.filter(d => d.status === statusFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(d => 
        d.patientName.toLowerCase().includes(term) || 
        d.id.toLowerCase().includes(term) || 
        d.prescriptionId.toLowerCase().includes(term) ||
        d.address.toLowerCase().includes(term)
      );
    }
    
    setFilteredDeliveries(results);
  }, [searchTerm, statusFilter, deliveries]);

  const handleUpdateStatus = (deliveryId: string, newStatus: DeliveryStatus) => {
    setDeliveries(prev => 
      prev.map(d => 
        d.id === deliveryId ? { ...d, status: newStatus } : d
      )
    );
    setShowStatusDialog(false);
    toast({
      title: "Status Updated",
      description: `Delivery status updated to ${newStatus.replace('_', ' ')}`,
    });
  };

  const getStatusBadge = (status: DeliveryStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case "in_transit":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">In Transit</Badge>;
      case "delivered":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Delivered</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Failed</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">Scheduled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <DashboardPageLayout
      title="Delivery Management"
      description="Schedule and track medication deliveries"
      role="pharmacy"
    >
      <Tabs defaultValue="active" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="active">Active Deliveries</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search deliveries..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as DeliveryStatus | "all")}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in_transit">In Transit</option>
                <option value="scheduled">Scheduled</option>
                <option value="delivered">Delivered</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-healthcare-primary"></div>
          </div>
        ) : (
          <>
            <TabsContent value="active" className="space-y-4">
              {filteredDeliveries.filter(d => d.status === "pending" || d.status === "in_transit").length === 0 ? (
                <div className="text-center py-12">
                  <TruckIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No active deliveries</h3>
                  <p className="mt-1 text-sm text-gray-500">There are no pending or in-transit deliveries at the moment.</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Scheduled</TableHead>
                        <TableHead className="hidden md:table-cell">Est. Arrival</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDeliveries
                        .filter(d => d.status === "pending" || d.status === "in_transit")
                        .map((delivery) => (
                          <TableRow key={delivery.id}>
                            <TableCell className="font-medium">{delivery.id}</TableCell>
                            <TableCell>{delivery.patientName}</TableCell>
                            <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {formatDateTime(delivery.scheduledTime)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {formatDateTime(delivery.estimatedArrival)}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedDelivery(delivery);
                                    setShowDetailsDialog(true);
                                  }}
                                >
                                  Details
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedDelivery(delivery);
                                    setShowStatusDialog(true);
                                  }}
                                >
                                  Update
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="scheduled" className="space-y-4">
              {filteredDeliveries.filter(d => d.status === "scheduled").length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No scheduled deliveries</h3>
                  <p className="mt-1 text-sm text-gray-500">There are no future scheduled deliveries at the moment.</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Scheduled</TableHead>
                        <TableHead className="hidden md:table-cell">Est. Arrival</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDeliveries
                        .filter(d => d.status === "scheduled")
                        .map((delivery) => (
                          <TableRow key={delivery.id}>
                            <TableCell className="font-medium">{delivery.id}</TableCell>
                            <TableCell>{delivery.patientName}</TableCell>
                            <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {formatDateTime(delivery.scheduledTime)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {formatDateTime(delivery.estimatedArrival)}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedDelivery(delivery);
                                    setShowDetailsDialog(true);
                                  }}
                                >
                                  Details
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedDelivery(delivery);
                                    setShowStatusDialog(true);
                                  }}
                                >
                                  Update
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {filteredDeliveries.filter(d => d.status === "delivered" || d.status === "failed").length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No delivery history</h3>
                  <p className="mt-1 text-sm text-gray-500">There are no completed or failed deliveries in the system.</p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Prescription</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Completed</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDeliveries
                        .filter(d => d.status === "delivered" || d.status === "failed")
                        .map((delivery) => (
                          <TableRow key={delivery.id}>
                            <TableCell className="font-medium">{delivery.id}</TableCell>
                            <TableCell>{delivery.patientName}</TableCell>
                            <TableCell>{delivery.prescriptionId}</TableCell>
                            <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {formatDateTime(delivery.scheduledTime)}
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedDelivery(delivery);
                                  setShowDetailsDialog(true);
                                }}
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </>
        )}
      </Tabs>

      {/* Delivery Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <TruckIcon className="mr-2 h-5 w-5" />
              Delivery Details
            </DialogTitle>
          </DialogHeader>
          {selectedDelivery && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Delivery ID</p>
                  <p>{selectedDelivery.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedDelivery.status)}</div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Prescription</p>
                <p className="text-healthcare-primary font-medium">{selectedDelivery.prescriptionId}</p>
              </div>

              <div>
                <div className="flex items-center mb-1">
                  <User className="h-4 w-4 text-gray-500 mr-1" />
                  <p className="text-sm font-medium text-gray-500">Patient Information</p>
                </div>
                <p>{selectedDelivery.patientName} (ID: {selectedDelivery.patientId})</p>
              </div>

              <div>
                <div className="flex items-center mb-1">
                  <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                  <p className="text-sm font-medium text-gray-500">Delivery Address</p>
                </div>
                <p>{selectedDelivery.address}</p>
              </div>

              <div>
                <div className="flex items-center mb-1">
                  <Phone className="h-4 w-4 text-gray-500 mr-1" />
                  <p className="text-sm font-medium text-gray-500">Contact Number</p>
                </div>
                <p>{selectedDelivery.phone}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-1">
                    <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                    <p className="text-sm font-medium text-gray-500">Scheduled</p>
                  </div>
                  <p>{formatDateTime(selectedDelivery.scheduledTime)}</p>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <Clock className="h-4 w-4 text-gray-500 mr-1" />
                    <p className="text-sm font-medium text-gray-500">Est. Arrival</p>
                  </div>
                  <p>{formatDateTime(selectedDelivery.estimatedArrival)}</p>
                </div>
              </div>

              {selectedDelivery.assignedTo && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Assigned To</p>
                  <p>{selectedDelivery.assignedTo}</p>
                </div>
              )}

              {selectedDelivery.notes && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Notes</p>
                  <p>{selectedDelivery.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <TruckIcon className="mr-2 h-5 w-5" />
              Update Delivery Status
            </DialogTitle>
            <DialogDescription>
              {selectedDelivery && (
                <>
                  Update status for delivery {selectedDelivery.id} to {selectedDelivery.patientName}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          {selectedDelivery && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleUpdateStatus(selectedDelivery.id, "pending")}>
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <Clock className="h-8 w-8 text-yellow-500 mb-2" />
                    <p className="font-medium">Pending</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleUpdateStatus(selectedDelivery.id, "in_transit")}>
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <TruckIcon className="h-8 w-8 text-blue-500 mb-2" />
                    <p className="font-medium">In Transit</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleUpdateStatus(selectedDelivery.id, "delivered")}>
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                    <p className="font-medium">Delivered</p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-gray-50" onClick={() => handleUpdateStatus(selectedDelivery.id, "failed")}>
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <XCircle className="h-8 w-8 text-red-500 mb-2" />
                    <p className="font-medium">Failed</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStatusDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardPageLayout>
  );
};

export default PharmacyDeliveries;
