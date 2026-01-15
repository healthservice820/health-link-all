
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from "recharts";
import { formatNaira } from "@/utils/currency";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const departmentBudgets = [
  { 
    id: 1, 
    department: 'Medical', 
    budgetAllocated: 3500000, 
    budgetUsed: 2100000, 
    percentUsed: 60,
    status: 'On Track' 
  },
  { 
    id: 2, 
    department: 'Surgical', 
    budgetAllocated: 2800000, 
    budgetUsed: 1950000, 
    percentUsed: 70,
    status: 'On Track' 
  },
  { 
    id: 3, 
    department: 'Pharmacy', 
    budgetAllocated: 1200000, 
    budgetUsed: 980000, 
    percentUsed: 82,
    status: 'Warning' 
  },
  { 
    id: 4, 
    department: 'Radiology', 
    budgetAllocated: 1800000, 
    budgetUsed: 1080000, 
    percentUsed: 60,
    status: 'On Track' 
  },
  { 
    id: 5, 
    department: 'Laboratory', 
    budgetAllocated: 1500000, 
    budgetUsed: 1350000, 
    percentUsed: 90,
    status: 'Warning' 
  },
  { 
    id: 6, 
    department: 'Emergency', 
    budgetAllocated: 2200000, 
    budgetUsed: 1540000, 
    percentUsed: 70,
    status: 'On Track' 
  },
  { 
    id: 7, 
    department: 'Administrative', 
    budgetAllocated: 900000, 
    budgetUsed: 630000, 
    percentUsed: 70,
    status: 'On Track' 
  },
  { 
    id: 8, 
    department: 'Facilities', 
    budgetAllocated: 1100000, 
    budgetUsed: 880000, 
    percentUsed: 80,
    status: 'Warning' 
  },
];

const categoryBudgets = [
  { category: 'Staff Salaries', budget: 6500000, actual: 5850000 },
  { category: 'Medical Supplies', budget: 2800000, actual: 2520000 },
  { category: 'Equipment', budget: 1800000, actual: 1260000 },
  { category: 'Medications', budget: 1500000, actual: 1350000 },
  { category: 'Facility Costs', budget: 1200000, actual: 1140000 },
  { category: 'IT & Technology', budget: 900000, actual: 810000 },
  { category: 'Training & Development', budget: 700000, actual: 560000 },
];

const quarterlyBudgets = [
  { quarter: 'Q1', planned: 3800000, actual: 3650000 },
  { quarter: 'Q2', planned: 4200000, actual: 4050000 },
  { quarter: 'Q3', planned: 4500000, actual: 4350000 },
  { quarter: 'Q4', planned: 5000000, actual: 2700000 },
];

const BudgetPlanning = () => {
  const [selectedYear, setSelectedYear] = useState("2023");

  return (
    <DashboardPageLayout
      title="Budget Planning"
      description="Plan, allocate, and track departmental budgets"
      role="finance"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">FY {selectedYear} Budget</h2>
          <p className="text-muted-foreground">Budget period: Jan {selectedYear} - Dec {selectedYear}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setSelectedYear("2022")}>2022</Button>
          <Button variant="default" onClick={() => setSelectedYear("2023")}>2023</Button>
          <Button variant="outline" onClick={() => setSelectedYear("2024")}>2024</Button>
        </div>
      </div>

      {/* Budget Summary Chart */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Budget Allocation vs. Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentBudgets}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis tickFormatter={(value) => `₦${value / 1000000}M`} />
                <Tooltip formatter={(value) => formatNaira(Number(value))} />
                <Legend />
                <Bar dataKey="budgetAllocated" name="Budget Allocated" fill="#8884d8" />
                <Bar dataKey="budgetUsed" name="Budget Used" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quarterly Budget Performance */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Quarterly Budget Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={quarterlyBudgets}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" />
                <YAxis tickFormatter={(value) => `₦${value / 1000000}M`} />
                <Tooltip formatter={(value) => formatNaira(Number(value))} />
                <Legend />
                <Bar dataKey="planned" name="Planned Budget" fill="#8884d8" />
                <Bar dataKey="actual" name="Actual Spending" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Budget by Category */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Budget Utilization by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={categoryBudgets}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `₦${value / 1000000}M`} />
                <YAxis type="category" dataKey="category" width={150} />
                <Tooltip formatter={(value) => formatNaira(Number(value))} />
                <Legend />
                <Bar dataKey="budget" name="Allocated Budget" fill="#8884d8" />
                <Bar dataKey="actual" name="Actual Spending" fill="#82ca9d" />
                <ReferenceLine x={0} stroke="#000" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Department Budget Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Department Budget Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Budget Allocated</TableHead>
                <TableHead>Budget Used</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departmentBudgets.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell className="font-medium">{dept.department}</TableCell>
                  <TableCell>{formatNaira(dept.budgetAllocated)}</TableCell>
                  <TableCell>{formatNaira(dept.budgetUsed)}</TableCell>
                  <TableCell>{formatNaira(dept.budgetAllocated - dept.budgetUsed)}</TableCell>
                  <TableCell className="w-[200px]">
                    <div className="flex items-center gap-2">
                      <Progress value={dept.percentUsed} className="h-2" />
                      <span className="text-sm">{dept.percentUsed}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      dept.status === 'On Track' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {dept.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardPageLayout>
  );
};

export default BudgetPlanning;
