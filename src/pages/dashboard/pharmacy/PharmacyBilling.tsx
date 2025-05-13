
import React, { useState, useEffect } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Download, Receipt, CreditCard, Users, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { formatNaira } from "@/utils/currency";

interface Bill {
  id: string;
  customer: {
    id: string;
    name: string;
  };
  date: string;
  dueDate: string;
  items: BillItem[];
  totalAmount: number;
  status: "paid" | "pending" | "overdue";
  paymentMethod?: string;
  paymentDate?: string;
  invoiceNumber: string;
}

interface BillItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Mock data for bills
const mockBills: Bill[] = [
  {
    id: "bill-001",
    customer: {
      id: "PT-12345",
      name: "Sarah Johnson"
    },
    date: "2025-05-01",
    dueDate: "2025-05-15",
    items: [
      {
        id: "item-001",
        description: "Amoxicillin 500mg (30 tablets)",
        quantity: 1,
        unitPrice: 2500,
        totalPrice: 2500
      },
      {
        id: "item-002",
        description: "Ibuprofen 400mg (20 tablets)",
        quantity: 2,
        unitPrice: 1200,
        totalPrice: 2400
      }
    ],
    totalAmount: 4900,
    status: "paid",
    paymentMethod: "Credit Card",
    paymentDate: "2025-05-02",
    invoiceNumber: "INV-2025-0001"
  },
  {
    id: "bill-002",
    customer: {
      id: "PT-12346",
      name: "Robert Chen"
    },
    date: "2025-05-03",
    dueDate: "2025-05-17",
    items: [
      {
        id: "item-003",
        description: "Atorvastatin 20mg (90 tablets)",
        quantity: 1,
        unitPrice: 4500,
        totalPrice: 4500
      }
    ],
    totalAmount: 4500,
    status: "pending",
    invoiceNumber: "INV-2025-0002"
  },
  {
    id: "bill-003",
    customer: {
      id: "PT-12347",
      name: "Amelia Rodriguez"
    },
    date: "2025-04-15",
    dueDate: "2025-04-29",
    items: [
      {
        id: "item-004",
        description: "Metformin 500mg (60 tablets)",
        quantity: 1,
        unitPrice: 1800,
        totalPrice: 1800
      },
      {
        id: "item-005",
        description: "Levothyroxine 50mcg (30 tablets)",
        quantity: 1,
        unitPrice: 2100,
        totalPrice: 2100
      },
      {
        id: "item-006",
        description: "Blood Glucose Test Strips (50 count)",
        quantity: 1,
        unitPrice: 3500,
        totalPrice: 3500
      }
    ],
    totalAmount: 7400,
    status: "overdue",
    invoiceNumber: "INV-2025-0003"
  },
  {
    id: "bill-004",
    customer: {
      id: "PT-12348",
      name: "David Smith"
    },
    date: "2025-05-05",
    dueDate: "2025-05-19",
    items: [
      {
        id: "item-007",
        description: "Lisinopril 10mg (30 tablets)",
        quantity: 1,
        unitPrice: 1600,
        totalPrice: 1600
      }
    ],
    totalAmount: 1600,
    status: "paid",
    paymentMethod: "Cash",
    paymentDate: "2025-05-05",
    invoiceNumber: "INV-2025-0004"
  },
  {
    id: "bill-005",
    customer: {
      id: "PT-12349",
      name: "Emily Wilson"
    },
    date: "2025-05-08",
    dueDate: "2025-05-22",
    items: [
      {
        id: "item-008",
        description: "Vitamin D3 1000IU (90 capsules)",
        quantity: 1,
        unitPrice: 2200,
        totalPrice: 2200
      },
      {
        id: "item-009",
        description: "Calcium + Vitamin D (60 tablets)",
        quantity: 1,
        unitPrice: 1800,
        totalPrice: 1800
      }
    ],
    totalAmount: 4000,
    status: "pending",
    invoiceNumber: "INV-2025-0005"
  }
];

const PharmacyBilling = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [filteredBills, setFilteredBills] = useState<Bill[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending" | "overdue">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [showBillDialog, setShowBillDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Simulate API call to fetch bills
    const fetchBills = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setBills(mockBills);
        setFilteredBills(mockBills);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load billing data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBills();
  }, []);

  useEffect(() => {
    let results = bills;
    
    if (activeTab === "paid") {
      results = results.filter(b => b.status === "paid");
    } else if (activeTab === "pending") {
      results = results.filter(b => b.status === "pending");
    } else if (activeTab === "overdue") {
      results = results.filter(b => b.status === "overdue");
    }
    
    if (statusFilter !== "all") {
      results = results.filter(b => b.status === statusFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(b => 
        b.customer.name.toLowerCase().includes(term) || 
        b.invoiceNumber.toLowerCase().includes(term)
      );
    }
    
    setFilteredBills(results);
  }, [searchTerm, statusFilter, activeTab, bills]);

  const handleBillSelect = (bill: Bill) => {
    setSelectedBill(bill);
    setShowBillDialog(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  const handleMarkAsPaid = (billId: string) => {
    // In a real app, this would make an API call to update the bill status
    const updatedBills = bills.map(bill => {
      if (bill.id === billId) {
        return {
          ...bill,
          status: "paid" as const,
          paymentDate: new Date().toISOString().split('T')[0],
          paymentMethod: "Cash" // Default payment method
        };
      }
      return bill;
    });
    
    setBills(updatedBills);
    
    // Also update the selected bill if it's open
    if (selectedBill && selectedBill.id === billId) {
      setSelectedBill({
        ...selectedBill,
        status: "paid",
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: "Cash"
      });
    }
    
    toast({
      title: "Success",
      description: "Bill has been marked as paid",
      variant: "default",
    });
  };

  return (
    <DashboardPageLayout
      title="Billing Management"
      description="View and manage customer bills and payments"
      role="pharmacy"
    >
      <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="all">All Bills</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search bills..."
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
                onChange={(e) => setStatusFilter(e.target.value as "all" | "paid" | "pending" | "overdue")}
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>

        <TabsContent value="all">
          <BillsTable 
            bills={filteredBills} 
            isLoading={isLoading} 
            onBillSelect={handleBillSelect}
            formatDate={formatDate}
            onMarkAsPaid={handleMarkAsPaid}
          />
        </TabsContent>
        
        <TabsContent value="pending">
          <BillsTable 
            bills={filteredBills} 
            isLoading={isLoading} 
            onBillSelect={handleBillSelect}
            formatDate={formatDate}
            onMarkAsPaid={handleMarkAsPaid}
          />
        </TabsContent>

        <TabsContent value="paid">
          <BillsTable 
            bills={filteredBills} 
            isLoading={isLoading} 
            onBillSelect={handleBillSelect}
            formatDate={formatDate}
            onMarkAsPaid={handleMarkAsPaid}
          />
        </TabsContent>
        
        <TabsContent value="overdue">
          <BillsTable 
            bills={filteredBills} 
            isLoading={isLoading} 
            onBillSelect={handleBillSelect}
            formatDate={formatDate}
            onMarkAsPaid={handleMarkAsPaid}
          />
        </TabsContent>
      </Tabs>

      {/* Bill Details Dialog */}
      <Dialog open={showBillDialog} onOpenChange={setShowBillDialog}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Receipt className="mr-2 h-5 w-5" />
              Invoice Details
            </DialogTitle>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Invoice</h2>
                    <p className="text-sm text-gray-500">{selectedBill.invoiceNumber}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedBill.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : selectedBill.status === 'pending'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedBill.status === 'paid' 
                        ? 'Paid' 
                        : selectedBill.status === 'pending'
                        ? 'Pending'
                        : 'Overdue'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Bill To</h3>
                  <p className="font-medium">{selectedBill.customer.name}</p>
                  <p className="text-sm text-gray-500">Customer ID: {selectedBill.customer.id}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Invoice Date:</span>
                    <span>{formatDate(selectedBill.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-gray-500">Due Date:</span>
                    <span>{formatDate(selectedBill.dueDate)}</span>
                  </div>
                  {selectedBill.status === 'paid' && selectedBill.paymentDate && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Payment Date:</span>
                      <span>{formatDate(selectedBill.paymentDate)}</span>
                    </div>
                  )}
                  {selectedBill.status === 'paid' && selectedBill.paymentMethod && (
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Payment Method:</span>
                      <span>{selectedBill.paymentMethod}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedBill.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">{formatNaira(item.unitPrice)}</TableCell>
                        <TableCell className="text-right">{formatNaira(item.totalPrice)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end">
                <div className="w-full md:w-64">
                  <div className="flex justify-between py-2 font-bold text-lg">
                    <span>Total:</span>
                    <span>{formatNaira(selectedBill.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {selectedBill.status !== 'paid' && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">Payment Options</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                      onClick={() => handleMarkAsPaid(selectedBill.id)}
                    >
                      <CreditCard className="mr-1 h-4 w-4" />
                      Mark as Paid
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <Users className="mr-1 h-4 w-4" />
                      Send Reminder
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="mt-6">
            <div className="flex justify-between w-full">
              <Button variant="outline" className="flex items-center">
                <Download className="mr-1 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="outline" onClick={() => setShowBillDialog(false)}>
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardPageLayout>
  );
};

// Bills Table Component
const BillsTable = ({ 
  bills, 
  isLoading, 
  onBillSelect,
  formatDate,
  onMarkAsPaid,
}: { 
  bills: Bill[], 
  isLoading: boolean,
  onBillSelect: (bill: Bill) => void,
  formatDate: (dateString: string) => string,
  onMarkAsPaid: (billId: string) => void,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-healthcare-primary"></div>
      </div>
    );
  }

  if (bills.length === 0) {
    return (
      <div className="text-center py-12">
        <Receipt className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No bills found</h3>
        <p className="mt-1 text-sm text-gray-500">No bills match your current search criteria.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell className="font-medium">{bill.invoiceNumber}</TableCell>
              <TableCell>{bill.customer.name}</TableCell>
              <TableCell>{formatDate(bill.date)}</TableCell>
              <TableCell>{formatDate(bill.dueDate)}</TableCell>
              <TableCell>{formatNaira(bill.totalAmount)}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  bill.status === 'paid' 
                    ? 'bg-green-100 text-green-800' 
                    : bill.status === 'pending'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {bill.status === 'paid' 
                    ? 'Paid' 
                    : bill.status === 'pending'
                    ? 'Pending'
                    : 'Overdue'}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onBillSelect(bill)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  {bill.status !== 'paid' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onMarkAsPaid(bill.id)}
                    >
                      <CreditCard className="h-4 w-4 mr-1" />
                      Pay
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PharmacyBilling;
