
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar, Download } from "lucide-react";
import { formatCurrency } from "@/utils/currency";
import { Navigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Bill {
  id: string;
  patientName: string;
  prescriptionId: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  insuranceClaim: boolean;
  paymentMethod?: string;
}

const mockBills: Bill[] = [
  {
    id: "BILL-001",
    patientName: "John Smith",
    prescriptionId: "RX-12345",
    date: "2025-05-10",
    amount: 85.50,
    status: "paid",
    insuranceClaim: false,
    paymentMethod: "Credit Card"
  },
  {
    id: "BILL-002",
    patientName: "Emily Johnson",
    prescriptionId: "RX-12346",
    date: "2025-05-11",
    amount: 125.75,
    status: "pending",
    insuranceClaim: true
  },
  {
    id: "BILL-003",
    patientName: "Michael Brown",
    prescriptionId: "RX-12347",
    date: "2025-05-08",
    amount: 67.20,
    status: "overdue",
    insuranceClaim: false
  },
  {
    id: "BILL-004",
    patientName: "Sarah Wilson",
    prescriptionId: "RX-12348",
    date: "2025-05-12",
    amount: 42.99,
    status: "pending",
    insuranceClaim: false
  },
  {
    id: "BILL-005",
    patientName: "David Lee",
    prescriptionId: "RX-12349",
    date: "2025-05-09",
    amount: 153.80,
    status: "paid",
    insuranceClaim: true,
    paymentMethod: "Insurance"
  }
];

const PharmacyBilling = () => {
  const { user, profile, isLoading } = useAuth();
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="flex justify-center items-center h-64">
            <p>Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !profile || profile.role !== "pharmacy") {
    return <Navigate to="/login" />;
  }

  const filteredBills = bills.filter((bill) => {
    // Apply search filter
    const matchesSearch = bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bill.prescriptionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = statusFilter === "all" || bill.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const markAsPaid = (billId: string) => {
    const updatedBills = bills.map(bill => 
      bill.id === billId 
        ? { ...bill, status: "paid" as const, paymentMethod: "Manual Payment" } 
        : bill
    );
    
    setBills(updatedBills);
    toast({
      title: "Payment Recorded",
      description: `Bill ${billId} has been marked as paid.`,
    });
  };

  const sendReminder = (billId: string) => {
    toast({
      title: "Reminder Sent",
      description: `Payment reminder sent for bill ${billId}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500 hover:bg-green-600">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-500 hover:bg-red-600">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Billing Management</h1>
            <p className="text-gray-600">View and manage customer bills and payments</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Filter Bills</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Search by patient name, bill ID or prescription ID"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select onValueChange={(value) => setStatusFilter(value)} defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Bills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bill ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Prescription</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Insurance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBills.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6">
                        No bills found that match your search criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBills.map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell>{bill.id}</TableCell>
                        <TableCell>{bill.patientName}</TableCell>
                        <TableCell>{bill.prescriptionId}</TableCell>
                        <TableCell>{bill.date}</TableCell>
                        <TableCell>{formatCurrency(bill.amount)}</TableCell>
                        <TableCell>{bill.insuranceClaim ? "Yes" : "No"}</TableCell>
                        <TableCell>{getStatusBadge(bill.status)}</TableCell>
                        <TableCell className="text-right">
                          {bill.status === "paid" ? (
                            <Button variant="outline" size="sm" disabled>
                              Paid
                            </Button>
                          ) : (
                            <div className="flex gap-2 justify-end">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => markAsPaid(bill.id)}
                              >
                                Mark as paid
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => sendReminder(bill.id)}
                              >
                                Send reminder
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PharmacyBilling;
