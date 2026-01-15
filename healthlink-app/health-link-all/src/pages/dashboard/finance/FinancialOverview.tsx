
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChartLine, DollarSign, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatNaira } from "@/utils/currency";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Sample data for the charts
const monthlyRevenueData = [
  { month: 'Jan', revenue: 750000, expenses: 420000, profit: 330000 },
  { month: 'Feb', revenue: 890000, expenses: 460000, profit: 430000 },
  { month: 'Mar', revenue: 820000, expenses: 490000, profit: 330000 },
  { month: 'Apr', revenue: 930000, expenses: 520000, profit: 410000 },
  { month: 'May', revenue: 980000, expenses: 550000, profit: 430000 },
  { month: 'Jun', revenue: 1050000, expenses: 580000, profit: 470000 },
  { month: 'Jul', revenue: 1120000, expenses: 620000, profit: 500000 },
  { month: 'Aug', revenue: 1080000, expenses: 590000, profit: 490000 },
  { month: 'Sep', revenue: 1150000, expenses: 610000, profit: 540000 },
  { month: 'Oct', revenue: 1230000, expenses: 650000, profit: 580000 },
  { month: 'Nov', revenue: 1320000, expenses: 680000, profit: 640000 },
  { month: 'Dec', revenue: 1450000, expenses: 720000, profit: 730000 },
];

const departmentRevenue = [
  { department: 'Primary Care', revenue: 3250000, target: 3000000 },
  { department: 'Specialty', revenue: 2800000, target: 3200000 },
  { department: 'Emergency', revenue: 1850000, target: 1500000 },
  { department: 'Pharmacy', revenue: 1520000, target: 1400000 },
  { department: 'Diagnostics', revenue: 1320000, target: 1200000 },
  { department: 'Ambulance', revenue: 580000, target: 650000 },
];

const revenueBreakdown = [
  { name: 'Consultations', value: 32 },
  { name: 'Procedures', value: 28 },
  { name: 'Pharmacy', value: 15 },
  { name: 'Diagnostics', value: 13 },
  { name: 'Emergency', value: 8 },
  { name: 'Others', value: 4 },
];

const chartColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const FinancialOverview = () => {
  const [timeframe, setTimeframe] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  
  const financialSummary = [
    { title: 'Total Revenue YTD', value: formatNaira(12750000), icon: <DollarSign />, change: '+15.2%', positive: true },
    { title: 'Current Quarter Revenue', value: formatNaira(4000000), icon: <TrendingUp />, change: '+8.7%', positive: true },
    { title: 'Operating Expenses YTD', value: formatNaira(6890000), icon: <TrendingDown />, change: '+3.2%', positive: false },
    { title: 'Net Profit YTD', value: formatNaira(5860000), icon: <PiggyBank />, change: '+22.4%', positive: true },
  ];

  return (
    <DashboardPageLayout 
      title="Financial Overview" 
      description="Comprehensive view of your organization's financial health"
      role="finance"
    >
      {/* Financial Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {financialSummary.map((item, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-md font-medium">{item.title}</CardTitle>
                <div className="p-2 bg-gray-100 rounded-md">
                  {item.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{item.value}</p>
              <p className={`text-sm ${item.positive ? 'text-green-600' : 'text-red-600'}`}>
                {item.change} from last year
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue vs Expenses Chart */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Revenue vs Expenses</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant={timeframe === 'monthly' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setTimeframe('monthly')}
              >
                Monthly
              </Button>
              <Button 
                variant={timeframe === 'quarterly' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setTimeframe('quarterly')}
              >
                Quarterly
              </Button>
              <Button 
                variant={timeframe === 'yearly' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setTimeframe('yearly')}
              >
                Yearly
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyRevenueData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₦${value / 1000000}M`} />
                <Tooltip formatter={(value) => formatNaira(Number(value))} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Revenue"
                  stroke="#0088FE" 
                  fill="#0088FE" 
                  fillOpacity={0.3} 
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  name="Expenses"
                  stroke="#FF8042" 
                  fill="#FF8042" 
                  fillOpacity={0.3} 
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  name="Profit"
                  stroke="#00C49F" 
                  fill="#00C49F" 
                  fillOpacity={0.3} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 mb-6">
        {/* Department Revenue Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Department Revenue Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={departmentRevenue}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis tickFormatter={(value) => `₦${value / 1000000}M`} />
                  <Tooltip formatter={(value) => formatNaira(Number(value))} />
                  <Legend />
                  <Bar dataKey="revenue" name="Actual Revenue" fill="#0088FE" />
                  <Bar dataKey="target" name="Target Revenue" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Sources Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue Sources (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyRevenueData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
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
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    name="Profit" 
                    stroke="#00C49F" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Trends */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Financial Health Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cashFlow">
            <TabsList className="mb-4">
              <TabsTrigger value="cashFlow">Cash Flow</TabsTrigger>
              <TabsTrigger value="profitMargin">Profit Margins</TabsTrigger>
              <TabsTrigger value="operatingEfficiency">Operating Efficiency</TabsTrigger>
            </TabsList>
            <TabsContent value="cashFlow" className="mt-0">
              <div className="mb-4">
                <h3 className="text-md font-medium mb-2">Cash Flow Status</h3>
                <p className="text-gray-600">Current cash position and flow trends show strong liquidity with a positive 3-month forecast.</p>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyRevenueData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₦${value / 1000000}M`} />
                    <Tooltip formatter={(value) => formatNaira(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" name="Inflow" stroke="#0088FE" />
                    <Line type="monotone" dataKey="expenses" name="Outflow" stroke="#FF8042" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="profitMargin" className="mt-0">
              <div className="mb-4">
                <h3 className="text-md font-medium mb-2">Profit Margin Analysis</h3>
                <p className="text-gray-600">Gross margin improved by 2.3% year-over-year with a consistent increase in net profit margin.</p>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyRevenueData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${(value / 10000).toFixed(1)}%`} />
                    <Tooltip formatter={(value) => `${(Number(value) / 10000).toFixed(2)}%`} />
                    <Bar dataKey="revenue" name="Gross Margin" fill="#0088FE" />
                    <Bar dataKey="profit" name="Net Margin" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="operatingEfficiency" className="mt-0">
              <div className="mb-4">
                <h3 className="text-md font-medium mb-2">Operating Efficiency</h3>
                <p className="text-gray-600">Overall operating efficiency improved by 5.2% from last quarter with cost optimization efforts showing results.</p>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyRevenueData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="expenses" name="Operating Costs" stroke="#FF8042" />
                    <Line type="monotone" dataKey="profit" name="Operating Income" stroke="#00C49F" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardPageLayout>
  );
};

export default FinancialOverview;
