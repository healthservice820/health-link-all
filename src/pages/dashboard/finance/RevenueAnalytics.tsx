
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatNaira } from "@/utils/currency";
import { ChartLine, ChartBar, ChartPie } from "lucide-react";

// Sample data
const revenueByService = [
  { name: 'Consultations', value: 3200000 },
  { name: 'Procedures', value: 2800000 },
  { name: 'Pharmacy', value: 1500000 },
  { name: 'Diagnostics', value: 1320000 },
  { name: 'Emergency', value: 800000 },
  { name: 'Others', value: 400000 },
];

const revenueByLocation = [
  { name: 'Main Hospital', value: 5600000 },
  { name: 'North Branch', value: 2300000 },
  { name: 'South Branch', value: 1800000 },
  { name: 'East Clinic', value: 900000 },
  { name: 'West Clinic', value: 700000 },
];

const revenueByPaymentMethod = [
  { name: 'Insurance', value: 6200000 },
  { name: 'Out of Pocket', value: 2500000 },
  { name: 'Corporate', value: 1200000 },
  { name: 'Government', value: 800000 },
  { name: 'NGO', value: 300000 },
];

const monthlyRevenueData = [
  { month: 'Jan', revenue: 750000, growth: 0 },
  { month: 'Feb', revenue: 890000, growth: 18.7 },
  { month: 'Mar', revenue: 820000, growth: -7.9 },
  { month: 'Apr', revenue: 930000, growth: 13.4 },
  { month: 'May', revenue: 980000, growth: 5.4 },
  { month: 'Jun', revenue: 1050000, growth: 7.1 },
  { month: 'Jul', revenue: 1120000, growth: 6.7 },
  { month: 'Aug', revenue: 1080000, growth: -3.6 },
  { month: 'Sep', revenue: 1150000, growth: 6.5 },
  { month: 'Oct', revenue: 1230000, growth: 7.0 },
  { month: 'Nov', revenue: 1320000, growth: 7.3 },
  { month: 'Dec', revenue: 1450000, growth: 9.8 },
];

const topRevenueServices = [
  { id: 1, name: 'Specialist Consultations', revenue: 1850000, growth: '+12.3%', status: 'increase' },
  { id: 2, name: 'Surgical Procedures', revenue: 1620000, growth: '+8.7%', status: 'increase' },
  { id: 3, name: 'Diagnostic Imaging', revenue: 1340000, growth: '+15.2%', status: 'increase' },
  { id: 4, name: 'Laboratory Tests', revenue: 980000, growth: '-2.1%', status: 'decrease' },
  { id: 5, name: 'Prescription Medications', revenue: 840000, growth: '+5.8%', status: 'increase' },
  { id: 6, name: 'Emergency Services', revenue: 720000, growth: '+9.4%', status: 'increase' },
  { id: 7, name: 'Physical Therapy', revenue: 580000, growth: '-1.3%', status: 'decrease' },
  { id: 8, name: 'Dental Procedures', revenue: 450000, growth: '+6.2%', status: 'increase' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const RevenueAnalytics = () => {
  const [period, setPeriod] = useState("yearly");

  return (
    <DashboardPageLayout
      title="Revenue Analytics"
      description="Analyze revenue streams and identify growth opportunities"
      role="finance"
    >
      {/* Revenue Overview */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Revenue Trends</CardTitle>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyRevenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₦${value / 1000000}M`} />
                <Tooltip formatter={(value) => formatNaira(Number(value))} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Revenue" 
                  stroke="#0088FE" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Breakdown */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mb-6">
        {/* Revenue by Service */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Revenue by Service</CardTitle>
              <ChartPie className="text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByService}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueByService.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatNaira(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Location */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Revenue by Location</CardTitle>
              <ChartPie className="text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByLocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueByLocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatNaira(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Payment Method */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Revenue by Payment</CardTitle>
              <ChartPie className="text-gray-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueByPaymentMethod}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {revenueByPaymentMethod.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatNaira(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Growth */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Monthly Revenue Growth Rate (%)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRevenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value, name) => [name === 'growth' ? `${value}%` : formatNaira(Number(value)), name === 'growth' ? 'Growth Rate' : 'Revenue']} />
                <Legend />
                <Bar dataKey="growth" name="Growth %" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Revenue Generating Services */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Revenue Generating Services</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topRevenueServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{formatNaira(service.revenue)}</TableCell>
                  <TableCell className={service.status === 'increase' ? 'text-green-600' : 'text-red-600'}>
                    {service.growth}
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

export default RevenueAnalytics;
