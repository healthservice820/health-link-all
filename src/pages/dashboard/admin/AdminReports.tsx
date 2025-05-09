
import React from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, ChartBar, ChartPie, Database } from "lucide-react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { formatNaira } from "@/utils/currency";

const AdminReports = () => {
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

  if (!user || !profile || profile.role !== "admin") {
    return <Navigate to="/login" />;
  }

  const revenueData = [
    { month: 'Jan', revenue: 3650000 },
    { month: 'Feb', revenue: 3850000 },
    { month: 'Mar', revenue: 4200000 },
    { month: 'Apr', revenue: 3950000 },
    { month: 'May', revenue: 4500000 },
    { month: 'Jun', revenue: 4750000 },
    { month: 'Jul', revenue: 5100000 },
    { month: 'Aug', revenue: 5450000 },
    { month: 'Sep', revenue: 4950000 },
    { month: 'Oct', revenue: 5250000 },
    { month: 'Nov', revenue: 5750000 },
    { month: 'Dec', revenue: 6200000 },
  ];

  const divisionRevenueData = [
    { name: 'Doctor Consultations', value: 40 },
    { name: 'Pharmacy Sales', value: 25 },
    { name: 'Diagnostics', value: 20 },
    { name: 'Ambulance Services', value: 8 },
    { name: 'Other', value: 7 },
  ];

  const userGrowthData = [
    { month: 'Jan', patients: 1250, doctors: 45 },
    { month: 'Feb', patients: 1320, doctors: 48 },
    { month: 'Mar', patients: 1420, doctors: 52 },
    { month: 'Apr', patients: 1540, doctors: 55 },
    { month: 'May', patients: 1680, doctors: 58 },
    { month: 'Jun', patients: 1780, doctors: 62 },
    { month: 'Jul', patients: 1900, doctors: 65 },
    { month: 'Aug', patients: 2050, doctors: 70 },
    { month: 'Sep', patients: 2200, doctors: 75 },
    { month: 'Oct', patients: 2380, doctors: 78 },
    { month: 'Nov', patients: 2520, doctors: 82 },
    { month: 'Dec', patients: 2650, doctors: 85 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">System Analytics</h1>
            <p className="text-gray-600">View comprehensive platform statistics</p>
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
            <CardTitle>Platform Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-700">Total Revenue</p>
                <p className="text-2xl font-bold">{formatNaira(5250000)}</p>
                <p className="text-xs text-blue-700">↑ 12% from last month</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700">Total Users</p>
                <p className="text-2xl font-bold">2,650</p>
                <p className="text-xs text-green-700">↑ 5% from last month</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-700">Appointments</p>
                <p className="text-2xl font-bold">1,245</p>
                <p className="text-xs text-purple-700">↑ 8% from last month</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-700">Registered Doctors</p>
                <p className="text-2xl font-bold">85</p>
                <p className="text-xs text-yellow-700">↑ 3 since last month</p>
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
                  <Tooltip formatter={(value) => [formatNaira(value), 'Revenue']} />
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
                User Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={userGrowthData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="patients" fill="#0891b2" name="Patients" />
                    <Bar dataKey="doctors" fill="#0e7490" name="Doctors" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <ChartPie className="mr-2 h-5 w-5" />
                Revenue by Division
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={divisionRevenueData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {divisionRevenueData.map((entry, index) => (
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
                <TabsTrigger value="user">User Activity</TabsTrigger>
                <TabsTrigger value="operations">Operations</TabsTrigger>
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
                      <h3 className="font-medium">Quarterly Financial Statement</h3>
                      <p className="text-sm text-gray-500">Q2 2023 financial analysis</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Revenue by Division</h3>
                      <p className="text-sm text-gray-500">Revenue breakdown across all services</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="user">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">User Growth Report</h3>
                      <p className="text-sm text-gray-500">New user sign-ups and retention analysis</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">App Usage Statistics</h3>
                      <p className="text-sm text-gray-500">Feature engagement and user activity metrics</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Doctor Performance Report</h3>
                      <p className="text-sm text-gray-500">Doctor ratings and appointment statistics</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="operations">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">System Performance Report</h3>
                      <p className="text-sm text-gray-500">Platform uptime and response time metrics</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Service Quality Report</h3>
                      <p className="text-sm text-gray-500">Customer satisfaction and issue resolution stats</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Emergency Response Analysis</h3>
                      <p className="text-sm text-gray-500">Ambulance service response time analysis</p>
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

export default AdminReports;
