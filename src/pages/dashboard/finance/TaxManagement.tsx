
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { formatNaira } from "@/utils/currency";
import { FileText, CalendarClock, Download, Check, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data
const taxFilings = [
  { 
    id: 1, 
    type: 'Value Added Tax (VAT)', 
    period: 'Q1 2023', 
    dueDate: '2023-04-21', 
    amount: 385000, 
    status: 'Filed',
    filedDate: '2023-04-15'
  },
  { 
    id: 2, 
    type: 'Corporate Income Tax', 
    period: 'FY 2022', 
    dueDate: '2023-06-30', 
    amount: 1250000, 
    status: 'Pending',
    filedDate: null
  },
  { 
    id: 3, 
    type: 'Employee Withholding Tax', 
    period: 'March 2023', 
    dueDate: '2023-04-14', 
    amount: 178500, 
    status: 'Filed',
    filedDate: '2023-04-10'
  },
  { 
    id: 4, 
    type: 'Value Added Tax (VAT)', 
    period: 'Q4 2022', 
    dueDate: '2023-01-21', 
    amount: 350000, 
    status: 'Filed',
    filedDate: '2023-01-18'
  },
  { 
    id: 5, 
    type: 'Pay-As-You-Earn (PAYE)', 
    period: 'March 2023', 
    dueDate: '2023-04-14', 
    amount: 420000, 
    status: 'Filed',
    filedDate: '2023-04-12'
  },
  { 
    id: 6, 
    type: 'Withholding Tax', 
    period: 'Q1 2023', 
    dueDate: '2023-04-21', 
    amount: 165000, 
    status: 'Pending',
    filedDate: null
  },
];

const upcomingTaxes = [
  { 
    id: 1, 
    type: 'Value Added Tax (VAT)', 
    period: 'Q2 2023', 
    dueDate: '2023-07-21', 
    estimatedAmount: 410000, 
    daysRemaining: 45
  },
  { 
    id: 2, 
    type: 'Corporate Income Tax', 
    period: 'FY 2022', 
    dueDate: '2023-06-30', 
    estimatedAmount: 1250000, 
    daysRemaining: 24
  },
  { 
    id: 3, 
    type: 'Pay-As-You-Earn (PAYE)', 
    period: 'April 2023', 
    dueDate: '2023-05-14', 
    estimatedAmount: 435000, 
    daysRemaining: 8
  },
  { 
    id: 4, 
    type: 'Withholding Tax', 
    period: 'Q1 2023', 
    dueDate: '2023-04-21', 
    estimatedAmount: 165000, 
    daysRemaining: 0
  }
];

const taxBreakdown = [
  { name: 'Corporate Income Tax', value: 1250000 },
  { name: 'Value Added Tax', value: 735000 },
  { name: 'Pay-As-You-Earn', value: 420000 },
  { name: 'Withholding Tax', value: 343500 },
  { name: 'Other Taxes', value: 180000 },
];

const taxByPeriod = [
  { period: 'Jan', amount: 250000 },
  { period: 'Feb', amount: 280000 },
  { period: 'Mar', amount: 320000 },
  { period: 'Apr', amount: 340000 },
  { period: 'May', amount: 360000 },
  { period: 'Jun', amount: 390000 },
  { period: 'Jul', amount: 410000 },
  { period: 'Aug', amount: 430000 },
  { period: 'Sep', amount: 450000 },
  { period: 'Oct', amount: 470000 },
  { period: 'Nov', amount: 490000 },
  { period: 'Dec', amount: 510000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const TaxManagement = () => {
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [showTaxDialog, setShowTaxDialog] = useState(false);
  
  // Sort upcoming taxes by days remaining (ascending)
  const sortedUpcomingTaxes = [...upcomingTaxes].sort((a, b) => a.daysRemaining - b.daysRemaining);

  return (
    <DashboardPageLayout
      title="Tax Management"
      description="Manage tax filings, reminders, and compliance"
      role="finance"
    >
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        {/* Tax Summary */}
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Annual Tax Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={taxByPeriod}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis tickFormatter={(value) => `₦${value / 1000}k`} />
                  <Tooltip formatter={(value) => formatNaira(Number(value))} />
                  <Bar dataKey="amount" name="Tax Amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tax Breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tax Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taxBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {taxBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatNaira(Number(value))} />
                  <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tax Management Tabs */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Tax Filings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming Tax Filings</TabsTrigger>
              <TabsTrigger value="history">Filing History</TabsTrigger>
            </TabsList>
            
            {/* Upcoming Taxes */}
            <TabsContent value="upcoming" className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {sortedUpcomingTaxes.length} upcoming tax filings
                </p>
                <Dialog open={showTaxDialog} onOpenChange={setShowTaxDialog}>
                  <DialogTrigger asChild>
                    <Button>Record Tax Filing</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Record Tax Filing</DialogTitle>
                      <DialogDescription>
                        Enter details of your tax filing record.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="taxType">Tax Type</Label>
                        <Select>
                          <SelectTrigger id="taxType">
                            <SelectValue placeholder="Select tax type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vat">Value Added Tax (VAT)</SelectItem>
                            <SelectItem value="cit">Corporate Income Tax</SelectItem>
                            <SelectItem value="paye">Pay-As-You-Earn (PAYE)</SelectItem>
                            <SelectItem value="wht">Withholding Tax</SelectItem>
                            <SelectItem value="other">Other Tax</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="period">Period</Label>
                          <Select>
                            <SelectTrigger id="period">
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="q22023">Q2 2023</SelectItem>
                              <SelectItem value="apr2023">April 2023</SelectItem>
                              <SelectItem value="fy2022">FY 2022</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="filingDate">Filing Date</Label>
                          <Input type="date" id="filingDate" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="amount">Amount (₦)</Label>
                          <Input type="number" id="amount" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="referenceNo">Reference Number</Label>
                          <Input type="text" id="referenceNo" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Input id="notes" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setShowTaxDialog(false)}>Cancel</Button>
                      <Button type="submit" onClick={() => setShowTaxDialog(false)}>Save Filing</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tax Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Estimated Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedUpcomingTaxes.map((tax) => (
                    <TableRow key={tax.id}>
                      <TableCell className="font-medium">{tax.type}</TableCell>
                      <TableCell>{tax.period}</TableCell>
                      <TableCell>{tax.dueDate}</TableCell>
                      <TableCell className="text-right">{formatNaira(tax.estimatedAmount)}</TableCell>
                      <TableCell>
                        {tax.daysRemaining <= 7 ? (
                          <div className="flex items-center">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              tax.daysRemaining === 0 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {tax.daysRemaining === 0 ? 'Due Today' : `${tax.daysRemaining} days left`}
                            </span>
                            {tax.daysRemaining <= 3 && (
                              <AlertCircle className="ml-1 h-4 w-4 text-red-500" />
                            )}
                          </div>
                        ) : (
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {tax.daysRemaining} days left
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Record Filing
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            {/* Filing History */}
            <TabsContent value="history">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tax Types</SelectItem>
                      <SelectItem value="vat">VAT</SelectItem>
                      <SelectItem value="cit">Corporate Income Tax</SelectItem>
                      <SelectItem value="paye">PAYE</SelectItem>
                      <SelectItem value="wht">Withholding Tax</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="filed">Filed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tax Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Filed Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxFilings.map((filing) => (
                    <TableRow key={filing.id}>
                      <TableCell className="font-medium">{filing.type}</TableCell>
                      <TableCell>{filing.period}</TableCell>
                      <TableCell>{filing.dueDate}</TableCell>
                      <TableCell>{filing.filedDate || '-'}</TableCell>
                      <TableCell className="text-right">{formatNaira(filing.amount)}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          filing.status === 'Filed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {filing.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardPageLayout>
  );
};

export default TaxManagement;
