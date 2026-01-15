
import React from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, ChartBar, ChartPie, Database } from "lucide-react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const DiagnosticsReports = () => {
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

  if (!user || !profile || profile.role !== "diagnostics") {
    return <Navigate to="/login" />;
  }

  const revenueData = [
    { month: 'Jan', revenue: 35000 },
    { month: 'Feb', revenue: 38000 },
    { month: 'Mar', revenue: 42000 },
    { month: 'Apr', revenue: 40000 },
    { month: 'May', revenue: 45000 },
    { month: 'Jun', revenue: 48000 },
    { month: 'Jul', revenue: 52000 },
    { month: 'Aug', revenue: 55000 },
    { month: 'Sep', revenue: 49000 },
    { month: 'Oct', revenue: 53000 },
    { month: 'Nov', revenue: 58000 },
    { month: 'Dec', revenue: 62000 },
  ];

  const testTypeData = [
    { name: 'Blood Tests', value: 35 },
    { name: 'Imaging', value: 25 },
    { name: 'Pathology', value: 15 },
    { name: 'Cardiology', value: 10 },
    { name: 'Other', value: 15 },
  ];

  const weeklyTestsData = [
    { day: 'Mon', tests: 42 },
    { day: 'Tue', tests: 38 },
    { day: 'Wed', tests: 45 },
    { day: 'Thu', tests: 52 },
    { day: 'Fri', tests: 58 },
    { day: 'Sat', tests: 30 },
    { day: 'Sun', tests: 25 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Business Analytics</h1>
            <p className="text-gray-600">View analytics and financial reports</p>
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
                <p className="text-2xl font-bold">$45,000</p>
                <p className="text-xs text-blue-700">↑ 8% from last month</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-700">Tests Performed</p>
                <p className="text-2xl font-bold">385</p>
                <p className="text-xs text-green-700">↑ 5% from last month</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-700">Average Test Value</p>
                <p className="text-2xl font-bold">$116.88</p>
                <p className="text-xs text-purple-700">↑ 3% from last month</p>
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
                Weekly Tests Performed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyTestsData}
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
                    <Bar dataKey="tests" fill="#0891b2" name="Tests" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <ChartPie className="mr-2 h-5 w-5" />
                Test Types Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={testTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {testTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [`${value}%`, 'Percentage']} />
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
                <TabsTrigger value="operations">Operational Reports</TabsTrigger>
                <TabsTrigger value="quality">Quality Control</TabsTrigger>
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
                      <p className="text-sm text-gray-500">P&L analysis for Q2 2023</p>
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
              
              <TabsContent value="operations">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Test Volume Report</h3>
                      <p className="text-sm text-gray-500">Analysis of test volumes by type and department</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Staff Productivity</h3>
                      <p className="text-sm text-gray-500">Performance metrics for laboratory technicians</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Equipment Utilization</h3>
                      <p className="text-sm text-gray-500">Usage statistics for diagnostic equipment</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="quality">
                <div className="space-y-4">
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Quality Assurance Report</h3>
                      <p className="text-sm text-gray-500">Monthly quality control metrics</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Test Accuracy Analysis</h3>
                      <p className="text-sm text-gray-500">Error rates and validation statistics</p>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Compliance Report</h3>
                      <p className="text-sm text-gray-500">Regulatory compliance status</p>
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

export default DiagnosticsReports;
