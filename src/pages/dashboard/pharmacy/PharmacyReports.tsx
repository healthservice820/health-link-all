
import React from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, ChartBar, ChartPie, Database } from "lucide-react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const PharmacyReports = () => {
  const { user, profile, isLoading } = useAuth();

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

  const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 4200 },
    { month: 'Mar', revenue: 5800 },
    { month: 'Apr', revenue: 4800 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 5500 },
    { month: 'Jul', revenue: 7000 },
    { month: 'Aug', revenue: 8200 },
    { month: 'Sep', revenue: 7800 },
    { month: 'Oct', revenue: 8800 },
    { month: 'Nov', revenue: 9500 },
    { month: 'Dec', revenue: 11000 },
  ];

  const categoryData = [
    { name: 'Antibiotics', value: 25 },
    { name: 'Antihypertensives', value: 20 },
    { name: 'Analgesics', value: 15 },
    { name: 'Antidiabetics', value: 12 },
    { name: 'Supplements', value: 10 },
    { name: 'Other', value: 18 },
  ];

  const salesData = [
    { day: 'Mon', inStore: 40, online: 24 },
    { day: 'Tue', inStore: 30, online: 28 },
    { day: 'Wed', inStore: 45, online: 35 },
    { day: 'Thu', inStore: 50, online: 30 },
    { day: 'Fri', inStore: 60, online: 42 },
    { day: 'Sat', inStore: 75, online: 55 },
    { day: 'Sun', inStore: 65, online: 48 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Financial Reports</h1>
            <p className="text-gray-600">View sales and financial analytics</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">Total Revenue</p>
                <p className="text-2xl font-bold">$24,500</p>
                <p className="text-xs text-blue-700">↑ 12% from last month</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700">Prescriptions Filled</p>
                <p className="text-2xl font-bold">412</p>
                <p className="text-xs text-green-700">↑ 8% from last month</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-700">Average Order Value</p>
                <p className="text-2xl font-bold">$59.47</p>
                <p className="text-xs text-purple-700">↑ 4% from last month</p>
              </div>
            </div>

            <div className="h-80 mt-6">
              <p className="text-sm font-medium mb-2">Monthly Revenue (2023)</p>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Line type="monotone" dataKey="revenue" stroke="#0891b2" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <ChartBar className="mr-2 h-5 w-5" />
                Weekly Sales Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="inStore" fill="#0891b2" name="In-Store" />
                    <Bar dataKey="online" fill="#0e7490" name="Online" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <ChartPie className="mr-2 h-5 w-5" />
                Sales by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Available Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="financial" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="financial">Financial Reports</TabsTrigger>
                <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
                <TabsTrigger value="staff">Staff Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="financial">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Monthly Revenue Report</h3>
                      <p className="text-sm text-gray-500">Complete financial breakdown for the current month</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Quarterly P&L Statement</h3>
                      <p className="text-sm text-gray-500">Profit and loss analysis for Q2 2023</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Annual Financial Report</h3>
                      <p className="text-sm text-gray-500">Comprehensive financial report for the year 2022</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="inventory">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Stock Levels Report</h3>
                      <p className="text-sm text-gray-500">Current inventory levels for all medications</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Low Stock Items</h3>
                      <p className="text-sm text-gray-500">List of medications that need reordering</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Supplier Order History</h3>
                      <p className="text-sm text-gray-500">Purchase records from all suppliers</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="staff">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Staff Performance</h3>
                      <p className="text-sm text-gray-500">Productivity and efficiency metrics</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Working Hours Report</h3>
                      <p className="text-sm text-gray-500">Staff scheduling and hours worked</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Training Compliance</h3>
                      <p className="text-sm text-gray-500">Staff certification and training status</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PharmacyReports;
