
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatNaira } from "@/utils/currency";
import { Search, Plus, FileText, Mail, Download, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data
const invoices = [
  { 
    id: 'INV-2023-001', 
    customerName: 'John Doe', 
    date: '2023-05-10', 
    amount: 185000, 
    status: 'Paid',
    dueDate: '2023-05-24',
    services: [
      { name: 'Consultation', qty: 1, price: 35000 },
      { name: 'Laboratory Tests', qty: 2, price: 75000 }
    ] 
  },
  { 
    id: 'INV-2023-002', 
    customerName: 'Jane Smith', 
    date: '2023-05-08', 
    amount: 92500, 
    status: 'Unpaid',
    dueDate: '2023-05-22',
    services: [
      { name: 'Ultrasound', qty: 1, price: 50000 },
      { name: 'Consultation', qty: 1, price: 35000 },
      { name: 'Prescription', qty: 1, price: 7500 }
    ] 
  },
  { 
    id: 'INV-2023-003', 
    customerName: 'Robert Williams', 
    date: '2023-05-05', 
    amount: 45000, 
    status: 'Overdue',
    dueDate: '2023-05-19',
    services: [
      { name: 'Emergency Care', qty: 1, price: 45000 }
    ] 
  },
  { 
    id: 'INV-2023-004', 
    customerName: 'Mary Johnson', 
    date: '2023-05-03', 
    amount: 137800, 
    status: 'Paid',
    dueDate: '2023-05-17',
    services: [
      { name: 'Surgical Procedure', qty: 1, price: 95000 },
      { name: 'Hospital Stay', qty: 2, price: 15000 },
      { name: 'Medication', qty: 1, price: 12800 }
    ] 
  },
  { 
    id: 'INV-2023-005', 
    customerName: 'David Brown', 
    date: '2023-05-02', 
    amount: 28500, 
    status: 'Unpaid',
    dueDate: '2023-05-16',
    services: [
      { name: 'Physical Therapy', qty: 3, price: 9500 }
    ] 
  },
  { 
    id: 'INV-2023-006', 
    customerName: 'Sarah Wilson', 
    date: '2023-04-29', 
    amount: 120000, 
    status: 'Paid',
    dueDate: '2023-05-13',
    services: [
      { name: 'MRI Scan', qty: 1, price: 85000 },
      { name: 'Consultation', qty: 1, price: 35000 }
    ] 
  },
];

const invoiceStatusData = [
  { name: 'Paid', value: 442800 },
  { name: 'Unpaid', value: 121000 },
  { name: 'Overdue', value: 45000 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const InvoiceManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
  const [showNewInvoiceDialog, setShowNewInvoiceDialog] = useState(false);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || invoice.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const viewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDialog(true);
  };

  return (
    <DashboardPageLayout
      title="Invoice Management"
      description="Create, manage, and track invoices and payments"
      role="finance"
    >
      <Tabs defaultValue="all" className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>All Invoices</TabsTrigger>
            <TabsTrigger value="unpaid" onClick={() => setStatusFilter("unpaid")}>Unpaid</TabsTrigger>
            <TabsTrigger value="paid" onClick={() => setStatusFilter("paid")}>Paid</TabsTrigger>
            <TabsTrigger value="overdue" onClick={() => setStatusFilter("overdue")}>Overdue</TabsTrigger>
          </TabsList>
          <Dialog open={showNewInvoiceDialog} onOpenChange={setShowNewInvoiceDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-1 h-4 w-4" />
                Create Invoice
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new invoice.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="customer">Customer Name</label>
                    <Input id="customer" placeholder="Customer name" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="invoiceDate">Invoice Date</label>
                    <Input id="invoiceDate" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="dueDate">Due Date</label>
                    <Input id="dueDate" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="paymentTerms">Payment Terms</label>
                    <Select>
                      <SelectTrigger id="paymentTerms">
                        <SelectValue placeholder="Select terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Due Immediately</SelectItem>
                        <SelectItem value="15days">Net 15 Days</SelectItem>
                        <SelectItem value="30days">Net 30 Days</SelectItem>
                        <SelectItem value="60days">Net 60 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <h3 className="font-medium">Invoice Items</h3>
                  <div className="border rounded-md p-3 space-y-3">
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-6">
                        <label className="text-sm">Item/Service</label>
                        <Input placeholder="Service name" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm">Qty</label>
                        <Input type="number" placeholder="1" />
                      </div>
                      <div className="col-span-3">
                        <label className="text-sm">Price (₦)</label>
                        <Input type="number" placeholder="0.00" />
                      </div>
                      <div className="col-span-1 flex items-end">
                        <Button variant="ghost" size="sm" className="px-1">+</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <label htmlFor="notes">Notes</label>
                  <Input id="notes" placeholder="Additional notes" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNewInvoiceDialog(false)}>Cancel</Button>
                <Button type="submit" onClick={() => setShowNewInvoiceDialog(false)}>Create Invoice</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Invoice Status Chart */}
        <div className="grid gap-6 md:grid-cols-4 mb-6">
          <Card className="md:col-span-1 flex flex-col">
            <CardHeader className="pb-0">
              <CardTitle className="text-lg mb-1">Invoice Status</CardTitle>
              <CardDescription>Current billing summary</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center py-6">
              <div className="h-[200px] w-full max-w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={invoiceStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {invoiceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatNaira(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <CardTitle className="text-lg">Invoices</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-full md:w-[250px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">No invoices found</TableCell>
                    </TableRow>
                  ) : (
                    filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.customerName}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell className="text-right">{formatNaira(invoice.amount)}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                            invoice.status === 'Unpaid' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {invoice.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => viewInvoice(invoice)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Details Dialog */}
        <Dialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedInvoice && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex justify-between items-center">
                    <span>Invoice {selectedInvoice.id}</span>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      selectedInvoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                      selectedInvoice.status === 'Unpaid' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedInvoice.status}
                    </span>
                  </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <div className="flex justify-between mb-6">
                    <div>
                      <p className="font-medium">Customer</p>
                      <p>{selectedInvoice.customerName}</p>
                    </div>
                    <div>
                      <p className="font-medium">Date</p>
                      <p>{selectedInvoice.date}</p>
                      <p className="font-medium mt-2">Due Date</p>
                      <p>{selectedInvoice.dueDate}</p>
                    </div>
                  </div>
                  
                  <h4 className="font-medium mb-2">Services</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead className="text-center">Qty</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedInvoice.services.map((service: any, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell>{service.name}</TableCell>
                          <TableCell className="text-center">{service.qty}</TableCell>
                          <TableCell className="text-right">{formatNaira(service.price)}</TableCell>
                          <TableCell className="text-right">{formatNaira(service.price * service.qty)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
                        <TableCell className="text-right font-bold">{formatNaira(selectedInvoice.amount)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <DialogFooter>
                  <Button variant="outline" className="mr-auto" onClick={() => setShowInvoiceDialog(false)}>
                    Close
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  {selectedInvoice.status !== 'Paid' && (
                    <Button>
                      Mark as Paid
                    </Button>
                  )}
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default InvoiceManagement;
