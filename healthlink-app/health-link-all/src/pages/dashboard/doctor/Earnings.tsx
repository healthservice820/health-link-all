
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CreditCard, Download, TrendingUp, Users } from "lucide-react";

const EarningsPage = () => {
  // Mock data for earnings
  const recentPayments = [
    { 
      id: 1, 
      patient: "John Smith", 
      service: "Consultation", 
      date: "2025-05-05", 
      amount: "$150", 
      status: "Paid" 
    },
    { 
      id: 2, 
      patient: "Emily Johnson", 
      service: "Follow-up", 
      date: "2025-05-04", 
      amount: "$100", 
      status: "Paid"
    },
    { 
      id: 3, 
      patient: "Michael Brown", 
      service: "Consultation", 
      date: "2025-05-03", 
      amount: "$150", 
      status: "Paid"
    },
    { 
      id: 4, 
      patient: "Sarah Wilson", 
      service: "Procedure", 
      date: "2025-05-02", 
      amount: "$300", 
      status: "Paid"
    },
    { 
      id: 5, 
      patient: "Robert Davis", 
      service: "Follow-up", 
      date: "2025-04-30", 
      amount: "$100", 
      status: "Pending"
    },
  ];

  // Mock summary data
  const summaryData = {
    thisMonth: "$4,200",
    lastMonth: "$3,800",
    pending: "$350",
    consultations: 48,
    percentChange: "+10.5%"
  };

  return (
    <DashboardPageLayout title="Earnings" description="View payments and financial reports" role="doctor">
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">This Month</p>
                    <h3 className="text-2xl font-bold mt-1">{summaryData.thisMonth}</h3>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-green-600 font-medium">
                  {summaryData.percentChange} from last month
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Last Month</p>
                    <h3 className="text-2xl font-bold mt-1">{summaryData.lastMonth}</h3>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Pending Payments</p>
                    <h3 className="text-2xl font-bold mt-1">{summaryData.pending}</h3>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-full">
                    <CreditCard className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Consultations</p>
                    <h3 className="text-2xl font-bold mt-1">{summaryData.consultations}</h3>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  This month
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Recent Payments</h3>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.patient}</TableCell>
                        <TableCell>{payment.service}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            payment.status === "Paid" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {payment.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <Button variant="link" className="mt-4 text-healthcare-primary">
                View All Payments
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Payment History</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...recentPayments, 
                      { id: 6, patient: "Jennifer Lee", service: "Consultation", date: "2025-04-28", amount: "$150", status: "Paid" },
                      { id: 7, patient: "William Taylor", service: "Follow-up", date: "2025-04-25", amount: "$100", status: "Paid" },
                      { id: 8, patient: "Emma Martinez", service: "Procedure", date: "2025-04-20", amount: "$250", status: "Paid" },
                      { id: 9, patient: "James Anderson", service: "Consultation", date: "2025-04-18", amount: "$150", status: "Paid" },
                      { id: 10, patient: "Lisa Wilson", service: "Consultation", date: "2025-04-15", amount: "$150", status: "Paid" },
                    ].map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.patient}</TableCell>
                        <TableCell>{payment.service}</TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.amount}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            payment.status === "Paid" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {payment.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {payment.status === "Paid" ? "Credit Card" : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline" className="mx-1">Previous</Button>
                <Button variant="outline" className="mx-1 bg-gray-100">1</Button>
                <Button variant="outline" className="mx-1">2</Button>
                <Button variant="outline" className="mx-1">3</Button>
                <Button variant="outline" className="mx-1">Next</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Monthly Reports</h3>
                
                <div className="space-y-4">
                  {["May 2025", "April 2025", "March 2025", "February 2025", "January 2025"].map((month, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3 last:border-b-0 last:pb-0">
                      <div>
                        <h4 className="font-medium">{month}</h4>
                        <p className="text-sm text-gray-500">
                          {index === 0 ? "Partial" : "Complete"}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Tax Documents</h3>
                
                <div className="space-y-4">
                  {["Annual Summary 2024", "Q1 2025 Statement", "Q2 2025 Statement", "Payment History 2024", "1099 Form 2024"].map((doc, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3 last:border-b-0 last:pb-0">
                      <div>
                        <h4 className="font-medium">{doc}</h4>
                        <p className="text-sm text-gray-500">
                          PDF
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default EarningsPage;
