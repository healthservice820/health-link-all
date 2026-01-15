
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { formatNaira } from "@/utils/currency";
import { Search, CalendarClock, FileText, Download, Plus, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Sample data
const departmentPayroll = [
  { department: 'Medical Staff', employeeCount: 68, totalSalary: 3500000 },
  { department: 'Nursing', employeeCount: 42, totalSalary: 1850000 },
  { department: 'Administrative', employeeCount: 24, totalSalary: 980000 },
  { department: 'Laboratory', employeeCount: 18, totalSalary: 720000 },
  { department: 'Pharmacy', employeeCount: 15, totalSalary: 580000 },
  { department: 'Radiology', employeeCount: 12, totalSalary: 520000 },
  { department: 'Support Staff', employeeCount: 30, totalSalary: 850000 },
];

const payrollHistory = [
  { id: 1, period: 'April 2023', processedDate: '2023-04-25', totalAmount: 9000000, status: 'Completed', employeeCount: 209 },
  { id: 2, period: 'March 2023', processedDate: '2023-03-25', totalAmount: 8850000, status: 'Completed', employeeCount: 205 },
  { id: 3, period: 'February 2023', processedDate: '2023-02-25', totalAmount: 8750000, status: 'Completed', employeeCount: 203 },
  { id: 4, period: 'January 2023', processedDate: '2023-01-25', totalAmount: 8500000, status: 'Completed', employeeCount: 200 },
  { id: 5, period: 'December 2022', processedDate: '2022-12-23', totalAmount: 8400000, status: 'Completed', employeeCount: 198 },
];

const employees = [
  { id: 1, name: 'Dr. John Smith', department: 'Medical Staff', position: 'Senior Doctor', salary: 120000, status: 'Full-time' },
  { id: 2, name: 'Sarah Johnson', department: 'Nursing', position: 'Head Nurse', salary: 75000, status: 'Full-time' },
  { id: 3, name: 'Michael Brown', department: 'Administrative', position: 'HR Manager', salary: 65000, status: 'Full-time' },
  { id: 4, name: 'Emily Davis', department: 'Laboratory', position: 'Lab Technician', salary: 55000, status: 'Full-time' },
  { id: 5, name: 'Robert Wilson', department: 'Pharmacy', position: 'Pharmacist', salary: 70000, status: 'Full-time' },
  { id: 6, name: 'Jessica Lee', department: 'Nursing', position: 'Registered Nurse', salary: 60000, status: 'Full-time' },
  { id: 7, name: 'David Taylor', department: 'Medical Staff', position: 'Junior Doctor', salary: 90000, status: 'Full-time' },
  { id: 8, name: 'Linda Martinez', department: 'Administrative', position: 'Accountant', salary: 58000, status: 'Full-time' },
  { id: 9, name: 'Thomas Anderson', department: 'Radiology', position: 'Radiologist', salary: 95000, status: 'Part-time' },
  { id: 10, name: 'Amanda White', department: 'Support Staff', position: 'Receptionist', salary: 42000, status: 'Full-time' },
];

const payrollBreakdown = [
  { name: 'Base Salary', value: 7200000 },
  { name: 'Overtime', value: 580000 },
  { name: 'Bonuses', value: 450000 },
  { name: 'Allowances', value: 770000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const PayrollManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"process" | "employees">("process");
  
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const viewEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setShowEmployeeDialog(true);
  };

  // Calculate totals
  const totalEmployees = employees.length;
  const totalSalary = employees.reduce((sum, employee) => sum + employee.salary, 0);

  // Format total for display
  const formattedTotal = formatNaira(totalSalary);

  return (
    <DashboardPageLayout
      title="Payroll Management"
      description="Process payroll and manage employee compensation"
      role="finance"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">April 2023 Payroll</h2>
          <p className="text-muted-foreground">Payment scheduled for April 25th, 2023</p>
        </div>
        <div className="flex gap-2">
          <Tabs defaultValue={viewMode} onValueChange={(value) => setViewMode(value as "process" | "employees")}>
            <TabsList>
              <TabsTrigger value="process">Process Payroll</TabsTrigger>
              <TabsTrigger value="employees">Employee Management</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Payroll Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">+11 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formattedTotal}</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Payroll Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-xl font-bold">In Progress</div>
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                65% Complete
              </span>
            </div>
            <div className="mt-2">
              <Progress value={65} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Due in 10 days</p>
          </CardContent>
        </Card>
      </div>

      {viewMode === "process" ? (
        // Payroll Processing View
        <>
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            {/* Department Payroll */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Department Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={departmentPayroll}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" tickFormatter={(value) => formatNaira(value, { maximumFractionDigits: 0 })} />
                      <YAxis type="category" dataKey="department" width={120} />
                      <Tooltip formatter={(value) => formatNaira(Number(value))} />
                      <Legend />
                      <Bar dataKey="totalSalary" name="Total Salary" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Payroll Composition */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payroll Composition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={payrollBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {payrollBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatNaira(Number(value))} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payroll History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payroll History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Processed Date</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead className="text-right">Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payrollHistory.map((payroll) => (
                    <TableRow key={payroll.id}>
                      <TableCell className="font-medium">{payroll.period}</TableCell>
                      <TableCell>{payroll.processedDate}</TableCell>
                      <TableCell>{payroll.employeeCount}</TableCell>
                      <TableCell className="text-right">{formatNaira(payroll.totalAmount)}</TableCell>
                      <TableCell>
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {payroll.status}
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
            </CardContent>
          </Card>
        </>
      ) : (
        // Employee Management View
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-lg">Employee Management</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="flex-grow sm:flex-grow-0">
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Medical Staff">Medical Staff</SelectItem>
                      <SelectItem value="Nursing">Nursing</SelectItem>
                      <SelectItem value="Administrative">Administrative</SelectItem>
                      <SelectItem value="Laboratory">Laboratory</SelectItem>
                      <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="Radiology">Radiology</SelectItem>
                      <SelectItem value="Support Staff">Support Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative flex-grow sm:flex-grow-0">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 w-full"
                  />
                </div>
                <Button>
                  <Plus className="mr-1 h-4 w-4" />
                  Add Employee
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Salary</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">No employees found</TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          employee.status === 'Full-time' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {employee.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{formatNaira(employee.salary)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => viewEmployee(employee)}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Employee Detail Dialog */}
      <Dialog open={showEmployeeDialog} onOpenChange={setShowEmployeeDialog}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedEmployee && (
            <>
              <DialogHeader>
                <DialogTitle>Employee Details</DialogTitle>
                <DialogDescription>
                  Payroll information for {selectedEmployee.name}
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="font-medium text-sm">Employee ID</h3>
                    <p>EMP-{selectedEmployee.id.toString().padStart(5, '0')}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Status</h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      selectedEmployee.status === 'Full-time' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {selectedEmployee.status}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Department</h3>
                    <p>{selectedEmployee.department}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Position</h3>
                    <p>{selectedEmployee.position}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Base Salary</h3>
                    <p className="font-semibold">{formatNaira(selectedEmployee.salary)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Employment Date</h3>
                    <p>01-Jul-2020</p>
                  </div>
                </div>

                <h3 className="font-medium mb-2">Salary Breakdown</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Base Salary</TableCell>
                      <TableCell className="text-right">{formatNaira(selectedEmployee.salary)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Housing Allowance</TableCell>
                      <TableCell className="text-right">{formatNaira(selectedEmployee.salary * 0.1)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Transport Allowance</TableCell>
                      <TableCell className="text-right">{formatNaira(selectedEmployee.salary * 0.05)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Healthcare Allowance</TableCell>
                      <TableCell className="text-right">{formatNaira(selectedEmployee.salary * 0.03)}</TableCell>
                    </TableRow>
                    <TableRow className="font-semibold">
                      <TableCell>Gross Salary</TableCell>
                      <TableCell className="text-right">{formatNaira(selectedEmployee.salary * 1.18)}</TableCell>
                    </TableRow>
                    <TableRow className="text-red-600">
                      <TableCell>Tax Deductions (PAYE)</TableCell>
                      <TableCell className="text-right">-{formatNaira(selectedEmployee.salary * 0.08)}</TableCell>
                    </TableRow>
                    <TableRow className="text-red-600">
                      <TableCell>Pension Contribution</TableCell>
                      <TableCell className="text-right">-{formatNaira(selectedEmployee.salary * 0.05)}</TableCell>
                    </TableRow>
                    <TableRow className="font-bold">
                      <TableCell>Net Salary</TableCell>
                      <TableCell className="text-right">{formatNaira(selectedEmployee.salary * 1.05)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEmployeeDialog(false)}>
                  Close
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Record
                </Button>
                <Button>Edit Details</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Bottom Button Group */}
      {viewMode === "process" && (
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline">Save Draft</Button>
          <Button>Process Payroll</Button>
        </div>
      )}
    </DashboardPageLayout>
  );
};

export default PayrollManagement;
