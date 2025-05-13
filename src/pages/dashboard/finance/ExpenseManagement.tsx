
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatNaira } from "@/utils/currency";
import { Search, Plus, FileText, ChartBar, Wallet, Filter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample data
const expensesByCategory = [
  { name: 'Staff Salaries', value: 3500000 },
  { name: 'Medical Supplies', value: 1800000 },
  { name: 'Equipment', value: 1200000 },
  { name: 'Facility Costs', value: 950000 },
  { name: 'Medications', value: 780000 },
  { name: 'Administrative', value: 550000 },
  { name: 'Others', value: 420000 },
];

const monthlyExpenses = [
  { month: 'Jan', amount: 650000 },
  { month: 'Feb', amount: 680000 },
  { month: 'Mar', amount: 710000 },
  { month: 'Apr', amount: 690000 },
  { month: 'May', amount: 720000 },
  { month: 'Jun', amount: 750000 },
  { month: 'Jul', amount: 770000 },
  { month: 'Aug', amount: 790000 },
  { month: 'Sep', amount: 810000 },
  { month: 'Oct', amount: 830000 },
  { month: 'Nov', amount: 850000 },
  { month: 'Dec', amount: 880000 },
];

const departmentExpenses = [
  { department: 'Medical', scheduled: 2800000, actual: 2750000 },
  { department: 'Surgical', scheduled: 1950000, actual: 2100000 },
  { department: 'Pharmacy', scheduled: 980000, actual: 950000 },
  { department: 'Radiology', scheduled: 750000, actual: 720000 },
  { department: 'Laboratory', scheduled: 680000, actual: 650000 },
  { department: 'Administration', scheduled: 540000, actual: 590000 },
];

const recentExpenses = [
  { id: 1, date: '2023-05-10', description: 'Medical Equipment Purchase', category: 'Equipment', amount: 185000, status: 'Approved' },
  { id: 2, date: '2023-05-08', description: 'Pharmaceutical Supplies', category: 'Medical Supplies', amount: 92500, status: 'Approved' },
  { id: 3, date: '2023-05-05', description: 'Staff Training Program', category: 'Administrative', amount: 45000, status: 'Approved' },
  { id: 4, date: '2023-05-03', description: 'Laboratory Reagents', category: 'Medical Supplies', amount: 37800, status: 'Approved' },
  { id: 5, date: '2023-05-02', description: 'Facility Maintenance', category: 'Facility Costs', amount: 28500, status: 'Pending' },
  { id: 6, date: '2023-04-29', description: 'IT System Upgrade', category: 'Administrative', amount: 120000, status: 'Approved' },
  { id: 7, date: '2023-04-28', description: 'Patient Monitoring Devices', category: 'Equipment', amount: 75000, status: 'Pending' },
  { id: 8, date: '2023-04-25', description: 'Office Supplies', category: 'Administrative', amount: 18500, status: 'Approved' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const ExpenseManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewExpenseDialog, setShowNewExpenseDialog] = useState(false);

  const filteredExpenses = recentExpenses.filter(expense => 
    expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardPageLayout
      title="Expense Management"
      description="Track, analyze, and control organizational expenses"
      role="finance"
    >
      {/* Expense Summary */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Expense Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyExpenses}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₦${value / 1000000}M`} />
                <Tooltip formatter={(value) => formatNaira(Number(value))} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  name="Expenses" 
                  stroke="#FF8042" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        {/* Expense by Category */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Expense by Category</CardTitle>
              <ChartBar className="text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatNaira(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Budget vs Actual */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Department Budget vs Actual</CardTitle>
              <Wallet className="text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentExpenses}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis tickFormatter={(value) => `₦${value / 1000000}M`} />
                  <Tooltip formatter={(value) => formatNaira(Number(value))} />
                  <Legend />
                  <Bar dataKey="scheduled" name="Budgeted" fill="#8884d8" />
                  <Bar dataKey="actual" name="Actual" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-lg">Recent Expenses</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search expenses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
              <Dialog open={showNewExpenseDialog} onOpenChange={setShowNewExpenseDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-1 h-4 w-4" />
                    New Expense
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Add New Expense</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new expense record.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Input id="description" placeholder="Enter expense description" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="staff">Staff Salaries</SelectItem>
                            <SelectItem value="supplies">Medical Supplies</SelectItem>
                            <SelectItem value="equipment">Equipment</SelectItem>
                            <SelectItem value="facility">Facility Costs</SelectItem>
                            <SelectItem value="medications">Medications</SelectItem>
                            <SelectItem value="administrative">Administrative</SelectItem>
                            <SelectItem value="other">Others</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="amount">Amount (₦)</Label>
                        <Input id="amount" type="number" placeholder="Enter amount" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="department">Department</Label>
                        <Select>
                          <SelectTrigger id="department">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="medical">Medical</SelectItem>
                            <SelectItem value="surgical">Surgical</SelectItem>
                            <SelectItem value="pharmacy">Pharmacy</SelectItem>
                            <SelectItem value="radiology">Radiology</SelectItem>
                            <SelectItem value="laboratory">Laboratory</SelectItem>
                            <SelectItem value="administration">Administration</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Input id="notes" placeholder="Optional notes" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowNewExpenseDialog(false)}>Cancel</Button>
                    <Button type="submit" onClick={() => setShowNewExpenseDialog(false)}>Save Expense</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">No expenses found</TableCell>
                </TableRow>
              ) : (
                filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell className="font-medium">{expense.description}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell className="text-right">{formatNaira(expense.amount)}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        expense.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {expense.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardPageLayout>
  );
};

export default ExpenseManagement;
