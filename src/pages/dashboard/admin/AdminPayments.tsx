
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, CreditCard, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for payment gateways
const mockPaymentGateways = [
  { id: 1, name: "Stripe", status: "active", transactionFee: "2.9% + $0.30", features: ["Credit Cards", "ACH", "Wallets"] },
  { id: 2, name: "PayPal", status: "active", transactionFee: "3.49% + $0.49", features: ["Credit Cards", "PayPal Account"] },
  { id: 3, name: "Razorpay", status: "inactive", transactionFee: "2.0% + ₹2", features: ["UPI", "Credit Cards", "Wallets"] },
  { id: 4, name: "Square", status: "active", transactionFee: "2.6% + $0.10", features: ["POS", "Credit Cards"] }
];

// Mock data for payment methods
const mockPaymentMethods = [
  { id: 1, name: "Credit Card", enabled: true, processingFee: "2.9% + $0.30" },
  { id: 2, name: "Bank Transfer", enabled: true, processingFee: "1.0% (max $10)" },
  { id: 3, name: "Mobile Wallets", enabled: true, processingFee: "2.5%" },
  { id: 4, name: "UPI", enabled: false, processingFee: "0.8%" }
];

const AdminPayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("gateways");
  
  // Filter payment gateways based on search
  const filteredGateways = mockPaymentGateways.filter(gateway => 
    gateway.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter payment methods based on search
  const filteredMethods = mockPaymentMethods.filter(method => 
    method.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <DashboardPageLayout
      title="Payment Configuration"
      description="Manage payment gateways, methods, and settings"
      role="admin"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-blue-600" />
                Transaction Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$124,582</div>
              <p className="text-sm text-gray-500">Last 30 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-green-600" />
                Successful Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,284</div>
              <p className="text-sm text-gray-500">Last 30 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-red-600" />
                Failed Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42</div>
              <p className="text-sm text-gray-500">Last 30 days</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="gateways" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="gateways">Payment Gateways</TabsTrigger>
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col md:flex-row gap-4 justify-between mt-4">
            <div className="flex flex-1 gap-2 items-center">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab === 'gateways' ? 'payment gateways' : 'payment methods'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
              <Plus className="mr-2 h-4 w-4" /> 
              {activeTab === 'gateways' ? 'Add Gateway' : 'Add Method'}
            </Button>
          </div>
          
          <TabsContent value="gateways" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Gateway Name</TableHead>
                    <TableHead>Transaction Fee</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGateways.length > 0 ? (
                    filteredGateways.map((gateway) => (
                      <TableRow key={gateway.id}>
                        <TableCell className="font-medium">{gateway.name}</TableCell>
                        <TableCell>{gateway.transactionFee}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {gateway.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="bg-gray-50">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={gateway.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {gateway.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">No payment gateways found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="methods" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Processing Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMethods.length > 0 ? (
                    filteredMethods.map((method) => (
                      <TableRow key={method.id}>
                        <TableCell className="font-medium">{method.name}</TableCell>
                        <TableCell>{method.processingFee}</TableCell>
                        <TableCell>
                          <Badge className={method.enabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {method.enabled ? "Enabled" : "Disabled"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">No payment methods found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
};

export default AdminPayments;
