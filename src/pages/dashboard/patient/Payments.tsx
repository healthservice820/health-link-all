
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, FileText, Check } from "lucide-react";

const PaymentsPage = () => {
  // Mock data for bills
  const bills = [
    { 
      id: 1, 
      title: "Doctor Consultation", 
      provider: "Dr. Sarah Johnson", 
      date: "2025-05-01", 
      amount: "$150", 
      status: "Paid",
      dueDate: "2025-05-01"
    },
    { 
      id: 2, 
      title: "Lab Tests", 
      provider: "MediLab Diagnostics", 
      date: "2025-05-03", 
      amount: "$85", 
      status: "Pending",
      dueDate: "2025-05-15"
    },
    { 
      id: 3, 
      title: "Medication", 
      provider: "City Pharmacy", 
      date: "2025-05-05", 
      amount: "$45", 
      status: "Paid",
      dueDate: "2025-05-05"
    },
  ];

  // Mock data for payment methods
  const paymentMethods = [
    { id: 1, type: "Credit Card", last4: "4242", expiry: "05/26", default: true },
    { id: 2, type: "Credit Card", last4: "5678", expiry: "08/25", default: false },
  ];

  return (
    <DashboardPageLayout title="Payments" description="Manage bills and payment history" role="patient">
      <Tabs defaultValue="bills" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="bills">Bills</TabsTrigger>
          <TabsTrigger value="payment-history">Payment History</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        </TabsList>
        
        <TabsContent value="bills">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Provider</TableHead>
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
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {bill.title}
                      </div>
                    </TableCell>
                    <TableCell>{bill.provider}</TableCell>
                    <TableCell>{bill.date}</TableCell>
                    <TableCell>{bill.dueDate}</TableCell>
                    <TableCell className="font-medium">{bill.amount}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        bill.status === "Paid" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {bill.status === "Paid" && <Check className="h-3 w-3 mr-1" />}
                        {bill.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        {bill.status === "Pending" && (
                          <Button size="sm" className="bg-healthcare-primary hover:bg-healthcare-accent">
                            Pay Now
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="payment-history">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.filter(bill => bill.status === "Paid").map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.title}</TableCell>
                    <TableCell>{payment.provider}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell className="font-medium">{payment.amount}</TableCell>
                    <TableCell>Visa •••• 4242</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        <Check className="h-3 w-3 mr-1" />
                        Completed
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">Receipt</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="payment-methods">
          <div className="max-w-2xl">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Saved Payment Methods</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <Card key={method.id} className={`${method.default ? 'border-healthcare-primary' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-healthcare-primary" />
                          <div>
                            <p className="font-medium">
                              {method.type} ending in {method.last4}
                            </p>
                            <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                          </div>
                        </div>
                        {method.default && (
                          <span className="text-xs bg-healthcare-primary/10 text-healthcare-primary px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-2 mt-4">
                        {!method.default && (
                          <Button size="sm" variant="outline">Set as Default</Button>
                        )}
                        <Button size="sm" variant="destructive">Remove</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
              Add New Payment Method
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default PaymentsPage;
