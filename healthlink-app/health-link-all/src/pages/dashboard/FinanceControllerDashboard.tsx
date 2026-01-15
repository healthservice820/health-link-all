
import React from "react";
import { Link } from "react-router-dom";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartLine, DollarSign, FileText, Coins, Wallet, CreditCard, Table, PiggyBank } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { formatNaira } from "@/utils/currency";

const FinanceControllerDashboard = () => {
  const { profile } = useAuth();
  
  // Sample financial data
  const financialMetrics = [
    { 
      title: "Total Revenue", 
      value: formatNaira(9872450.75),
      change: "+12.5%",
      positive: true,
      icon: <DollarSign />,
      path: "/dashboard/finance/revenue"
    },
    { 
      title: "Total Expenses", 
      value: formatNaira(5643890.25),
      change: "+3.2%",
      positive: false,
      icon: <Wallet />,
      path: "/dashboard/finance/expenses"
    },
    { 
      title: "Net Profit", 
      value: formatNaira(4228560.50),
      change: "+15.3%",
      positive: true,
      icon: <PiggyBank />,
      path: "/dashboard/finance/overview"
    },
    { 
      title: "Pending Invoices", 
      value: formatNaira(1542300.00),
      change: "-5.1%",
      positive: true,
      icon: <FileText />,
      path: "/dashboard/finance/invoices"
    },
  ];
  
  const dashboardLinks = [
    { title: "Financial Overview", description: "View financial summaries and key metrics", icon: <ChartLine />, path: "/dashboard/finance/overview" },
    { title: "Revenue Analytics", description: "Analyze revenue streams and trends", icon: <DollarSign />, path: "/dashboard/finance/revenue" },
    { title: "Expense Management", description: "Track and manage organizational expenses", icon: <Wallet />, path: "/dashboard/finance/expenses" },
    { title: "Budget Planning", description: "Create and monitor department budgets", icon: <Coins />, path: "/dashboard/finance/budget" },
    { title: "Invoice Management", description: "Manage invoices, payments, and receivables", icon: <FileText />, path: "/dashboard/finance/invoices" },
    { title: "Payroll Management", description: "Oversee payroll processing and compensation", icon: <CreditCard />, path: "/dashboard/finance/payroll" },
    { title: "Financial Reports", description: "Generate comprehensive financial reports", icon: <Table />, path: "/dashboard/finance/reports" },
    { title: "Tax Management", description: "Manage tax filings and compliance", icon: <FileText />, path: "/dashboard/finance/tax" },
  ];

  return (
    <DashboardPageLayout 
      title="Financial Controller Dashboard" 
      description={`Welcome ${profile?.first_name || 'back'} to the financial control center`}
      role="finance"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {financialMetrics.map((metric, index) => (
          <Link key={index} to={metric.path}>
            <Card className="hover:bg-gray-50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{metric.title}</CardTitle>
                  <div className="p-2 bg-gray-100 rounded-md">
                    {metric.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className={`text-sm ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="font-semibold text-xl mt-8 mb-4">Financial Management</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dashboardLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            <Card className="hover:bg-gray-50 transition-colors h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-md">
                    {link.icon}
                  </div>
                  <CardTitle className="text-lg">{link.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{link.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </DashboardPageLayout>
  );
};

export default FinanceControllerDashboard;
