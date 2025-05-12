
import React, { useState, useEffect } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, User, File, Clock, Calendar, Pill } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateJoined: string;
  lastActivity: string;
  prescriptionCount: number;
  status: "active" | "inactive";
  allergies?: string[];
}

interface CustomerPrescription {
  id: string;
  medication: string;
  prescribedBy: string;
  date: string;
  status: "active" | "completed" | "expired";
  refillsLeft: number;
  instructions: string;
}

const mockCustomers: Customer[] = [
  {
    id: "PT-12345",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "212-555-1234",
    address: "123 Main St, Apt 4B, New York, NY 10001",
    dateJoined: "2023-03-15",
    lastActivity: "2025-05-10",
    prescriptionCount: 5,
    status: "active",
    allergies: ["Penicillin", "Sulfa drugs"]
  },
  {
    id: "PT-12346",
    name: "Robert Chen",
    email: "robert.chen@example.com",
    phone: "212-555-5678",
    address: "456 Park Ave, New York, NY 10022",
    dateJoined: "2024-01-22",
    lastActivity: "2025-05-12",
    prescriptionCount: 2,
    status: "active"
  },
  {
    id: "PT-12347",
    name: "Amelia Rodriguez",
    email: "amelia.rodriguez@example.com",
    phone: "212-555-9012",
    address: "789 Broadway, Apt 12C, New York, NY 10003",
    dateJoined: "2023-09-08",
    lastActivity: "2025-05-01",
    prescriptionCount: 8,
    status: "active",
    allergies: ["Codeine", "Aspirin"]
  },
  {
    id: "PT-12348",
    name: "David Smith",
    email: "david.smith@example.com",
    phone: "212-555-3456",
    address: "101 5th Ave, New York, NY 10011",
    dateJoined: "2023-07-19",
    lastActivity: "2025-04-15",
    prescriptionCount: 3,
    status: "inactive"
  },
  {
    id: "PT-12349",
    name: "Emily Wilson",
    email: "emily.wilson@example.com",
    phone: "212-555-7890",
    address: "222 East 44th St, New York, NY 10017",
    dateJoined: "2024-02-03",
    lastActivity: "2025-05-09",
    prescriptionCount: 1,
    status: "active"
  }
];

const mockPrescriptions: Record<string, CustomerPrescription[]> = {
  "PT-12345": [
    {
      id: "RX-78293",
      medication: "Amoxicillin 500mg",
      prescribedBy: "Dr. Sarah Johnson",
      date: "2025-04-15",
      status: "active",
      refillsLeft: 2,
      instructions: "Take one capsule three times daily for 10 days."
    },
    {
      id: "RX-78294",
      medication: "Lisinopril 10mg",
      prescribedBy: "Dr. Michael Chen",
      date: "2025-03-30",
      status: "active",
      refillsLeft: 5,
      instructions: "Take one tablet daily in the morning."
    },
    {
      id: "RX-78295",
      medication: "Ibuprofen 400mg",
      prescribedBy: "Dr. James Taylor",
      date: "2025-02-12",
      status: "expired",
      refillsLeft: 0,
      instructions: "Take one tablet every 6 hours as needed for pain."
    }
  ],
  "PT-12346": [
    {
      id: "RX-78296",
      medication: "Atorvastatin 20mg",
      prescribedBy: "Dr. Emily Wilson",
      date: "2025-05-01",
      status: "active",
      refillsLeft: 3,
      instructions: "Take one tablet at bedtime."
    }
  ],
  "PT-12347": [
    {
      id: "RX-78297",
      medication: "Metformin 500mg",
      prescribedBy: "Dr. David Smith",
      date: "2025-04-28",
      status: "active",
      refillsLeft: 4,
      instructions: "Take one tablet twice daily with meals."
    },
    {
      id: "RX-78298",
      medication: "Levothyroxine 50mcg",
      prescribedBy: "Dr. David Smith",
      date: "2025-04-28",
      status: "active",
      refillsLeft: 4,
      instructions: "Take one tablet daily in the morning on an empty stomach."
    }
  ]
};

const PharmacyCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerPrescriptions, setCustomerPrescriptions] = useState<CustomerPrescription[]>([]);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Simulate API call to fetch customers
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setCustomers(mockCustomers);
        setFilteredCustomers(mockCustomers);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load customer data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    let results = customers;
    
    if (activeTab === "active") {
      results = results.filter(c => c.status === "active");
    } else if (activeTab === "inactive") {
      results = results.filter(c => c.status === "inactive");
    }
    
    if (statusFilter !== "all") {
      results = results.filter(c => c.status === statusFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(c => 
        c.name.toLowerCase().includes(term) || 
        c.id.toLowerCase().includes(term) || 
        c.email.toLowerCase().includes(term) ||
        c.phone.includes(term)
      );
    }
    
    setFilteredCustomers(results);
  }, [searchTerm, statusFilter, activeTab, customers]);

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    
    // Get customer prescriptions
    const prescriptions = mockPrescriptions[customer.id] || [];
    setCustomerPrescriptions(prescriptions);
    
    setShowDetailsDialog(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <DashboardPageLayout
      title="Customer Management"
      description="View and manage customer records"
      role="pharmacy"
    >
      <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="all">All Customers</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search customers..."
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
                onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <TabsContent value="all">
          <CustomerTable 
            customers={filteredCustomers} 
            isLoading={isLoading} 
            onCustomerSelect={handleCustomerSelect}
            formatDate={formatDate}
          />
        </TabsContent>
        
        <TabsContent value="active">
          <CustomerTable 
            customers={filteredCustomers} 
            isLoading={isLoading} 
            onCustomerSelect={handleCustomerSelect}
            formatDate={formatDate}
          />
        </TabsContent>

        <TabsContent value="inactive">
          <CustomerTable 
            customers={filteredCustomers} 
            isLoading={isLoading} 
            onCustomerSelect={handleCustomerSelect}
            formatDate={formatDate}
          />
        </TabsContent>
      </Tabs>

      {/* Customer Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Customer Details
            </DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="prescriptions">
                  Prescriptions ({customerPrescriptions.length})
                </TabsTrigger>
                <TabsTrigger value="history">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Customer ID</p>
                    <p className="font-medium">{selectedCustomer.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedCustomer.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {selectedCustomer.status === 'active' ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p>{selectedCustomer.name}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p>{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p>{selectedCustomer.phone}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p>{selectedCustomer.address}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date Joined</p>
                    <p>{formatDate(selectedCustomer.dateJoined)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Last Activity</p>
                    <p>{formatDate(selectedCustomer.lastActivity)}</p>
                  </div>
                </div>

                {selectedCustomer.allergies && selectedCustomer.allergies.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Allergies</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedCustomer.allergies.map((allergy, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="prescriptions">
                {customerPrescriptions.length === 0 ? (
                  <div className="text-center py-8">
                    <File className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-gray-500">No prescriptions found for this customer</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customerPrescriptions.map((prescription) => (
                      <Card key={prescription.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-base flex items-center">
                                <Pill className="mr-2 h-4 w-4 text-healthcare-primary" />
                                {prescription.medication}
                              </CardTitle>
                              <p className="text-xs text-gray-500">
                                {prescription.id} · {formatDate(prescription.date)}
                              </p>
                            </div>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              prescription.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : prescription.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-sm text-gray-500 mb-2">
                            <span className="font-medium">Prescribed by:</span> {prescription.prescribedBy}
                          </p>
                          <p className="text-sm text-gray-500 mb-2">
                            <span className="font-medium">Instructions:</span> {prescription.instructions}
                          </p>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">Refills left:</span> {prescription.refillsLeft}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history">
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-5 border-l border-gray-200"></div>
                  <ul className="space-y-6 ml-4">
                    <li className="relative pl-6">
                      <span className="absolute left-0 top-1 -translate-x-1/2 h-3 w-3 rounded-full bg-green-500"></span>
                      <p className="text-sm font-medium">Prescription Refill</p>
                      <p className="text-xs text-gray-500">Refilled Amoxicillin 500mg</p>
                      <p className="text-xs text-gray-400">May 10, 2025, 2:30 PM</p>
                    </li>
                    <li className="relative pl-6">
                      <span className="absolute left-0 top-1 -translate-x-1/2 h-3 w-3 rounded-full bg-blue-500"></span>
                      <p className="text-sm font-medium">New Prescription</p>
                      <p className="text-xs text-gray-500">Added Lisinopril 10mg prescription</p>
                      <p className="text-xs text-gray-400">Mar 30, 2025, 11:15 AM</p>
                    </li>
                    <li className="relative pl-6">
                      <span className="absolute left-0 top-1 -translate-x-1/2 h-3 w-3 rounded-full bg-purple-500"></span>
                      <p className="text-sm font-medium">Profile Update</p>
                      <p className="text-xs text-gray-500">Updated contact information</p>
                      <p className="text-xs text-gray-400">Feb 15, 2025, 9:45 AM</p>
                    </li>
                    <li className="relative pl-6">
                      <span className="absolute left-0 top-1 -translate-x-1/2 h-3 w-3 rounded-full bg-gray-500"></span>
                      <p className="text-sm font-medium">Account Created</p>
                      <p className="text-xs text-gray-500">New customer account registered</p>
                      <p className="text-xs text-gray-400">{formatDate(selectedCustomer.dateJoined)}, 10:00 AM</p>
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter className="mt-6">
            <div className="flex justify-between w-full">
              <div className="space-x-2">
                <Button variant="outline">
                  <File className="mr-1 h-4 w-4" />
                  Export Data
                </Button>
              </div>
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardPageLayout>
  );
};

// Customer Table Component
const CustomerTable = ({ 
  customers, 
  isLoading, 
  onCustomerSelect,
  formatDate,
}: { 
  customers: Customer[], 
  isLoading: boolean,
  onCustomerSelect: (customer: Customer) => void,
  formatDate: (dateString: string) => string,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-healthcare-primary"></div>
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No customers found</h3>
        <p className="mt-1 text-sm text-gray-500">No customers match your current search criteria.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Phone</TableHead>
            <TableHead className="hidden lg:table-cell">Date Joined</TableHead>
            <TableHead className="hidden lg:table-cell">Prescriptions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.id}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2 text-gray-700">
                    {customer.name.charAt(0)}
                  </div>
                  <span>{customer.name}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
              <TableCell className="hidden md:table-cell">{customer.phone}</TableCell>
              <TableCell className="hidden lg:table-cell">{formatDate(customer.dateJoined)}</TableCell>
              <TableCell className="hidden lg:table-cell">{customer.prescriptionCount}</TableCell>
              <TableCell>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onCustomerSelect(customer)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PharmacyCustomers;
