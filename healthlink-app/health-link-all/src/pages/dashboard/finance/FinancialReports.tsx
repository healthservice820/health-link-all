
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatNaira } from "@/utils/currency";
import { FileText, Download, ChartBar, Calendar, Filter } from "lucide-react";

// Sample data
const recentReports = [
  { 
    id: 1, 
    name: 'Quarterly Financial Report Q1 2023', 
    type: 'Quarterly', 
    date: '2023-04-15', 
    status: 'Completed' 
  },
  { 
    id: 2, 
    name: 'Monthly Income Statement - March 2023', 
    type: 'Monthly', 
    date: '2023-04-10', 
    status: 'Completed' 
  },
  { 
    id: 3, 
    name: 'Cash Flow Analysis - March 2023', 
    type: 'Monthly', 
    date: '2023-04-08', 
    status: 'Completed' 
  },
  { 
    id: 4, 
    name: 'Department Budget Report - March 2023', 
    type: 'Monthly', 
    date: '2023-04-05', 
    status: 'Completed' 
  },
  { 
    id: 5, 
    name: 'Annual Financial Report 2022', 
    type: 'Annual', 
    date: '2023-02-28', 
    status: 'Completed' 
  },
];

const incomeStatementData = [
  { category: 'Revenue', amount: 4550000 },
  { category: 'Cost of Services', amount: -2300000 },
  { category: 'Gross Profit', amount: 2250000, isTotalRow: true },
  { category: 'Operating Expenses', amount: -1450000 },
  { category: 'Administrative Expenses', amount: -580000 },
  { category: 'Operating Income', amount: 220000, isTotalRow: true },
  { category: 'Other Income', amount: 85000 },
  { category: 'Interest Expense', amount: -35000 },
  { category: 'Net Income', amount: 270000, isTotalRow: true, isFinalTotal: true },
];

const balanceSheetData = {
  assets: [
    { item: 'Cash and Cash Equivalents', amount: 1250000 },
    { item: 'Accounts Receivable', amount: 850000 },
    { item: 'Inventory', amount: 380000 },
    { item: 'Prepaid Expenses', amount: 120000 },
    { item: 'Total Current Assets', amount: 2600000, isTotal: true },
    { item: 'Property and Equipment', amount: 4500000 },
    { item: 'Less: Accumulated Depreciation', amount: -1200000 },
    { item: 'Net Property and Equipment', amount: 3300000, isTotal: true },
    { item: 'Other Assets', amount: 450000 },
    { item: 'Total Assets', amount: 6350000, isTotal: true, isFinalTotal: true },
  ],
  liabilities: [
    { item: 'Accounts Payable', amount: 550000 },
    { item: 'Accrued Expenses', amount: 320000 },
    { item: 'Short-term Debt', amount: 450000 },
    { item: 'Total Current Liabilities', amount: 1320000, isTotal: true },
    { item: 'Long-term Debt', amount: 1800000 },
    { item: 'Other Liabilities', amount: 280000 },
    { item: 'Total Liabilities', amount: 3400000, isTotal: true },
  ],
  equity: [
    { item: 'Common Stock', amount: 1000000 },
    { item: 'Retained Earnings', amount: 1950000 },
    { item: 'Total Equity', amount: 2950000, isTotal: true },
    { item: 'Total Liabilities and Equity', amount: 6350000, isTotal: true, isFinalTotal: true },
  ]
};

const cashFlowData = [
  { category: 'Net Income', amount: 270000 },
  { category: 'Depreciation', amount: 180000 },
  { category: 'Changes in Accounts Receivable', amount: -120000 },
  { category: 'Changes in Inventory', amount: -35000 },
  { category: 'Changes in Accounts Payable', amount: 85000 },
  { category: 'Net Cash from Operating Activities', amount: 380000, isTotalRow: true },
  { category: 'Purchase of Equipment', amount: -250000 },
  { category: 'Net Cash used in Investing Activities', amount: -250000, isTotalRow: true },
  { category: 'Repayment of Debt', amount: -120000 },
  { category: 'Net Cash used in Financing Activities', amount: -120000, isTotalRow: true },
  { category: 'Net Increase in Cash', amount: 10000, isTotalRow: true, isFinalTotal: true },
  { category: 'Cash at Beginning of Period', amount: 1240000 },
  { category: 'Cash at End of Period', amount: 1250000, isTotalRow: true },
];

const FinancialReports = () => {
  const [period, setPeriod] = useState("monthly");
  const [month, setMonth] = useState("march");
  const [year, setYear] = useState("2023");

  return (
    <DashboardPageLayout
      title="Financial Reports"
      description="Generate and view comprehensive financial reports"
      role="finance"
    >
      {/* Report Controls */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>

          {period === "monthly" && (
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="january">January</SelectItem>
                <SelectItem value="february">February</SelectItem>
                <SelectItem value="march">March</SelectItem>
                <SelectItem value="april">April</SelectItem>
                {/* Add other months */}
              </SelectContent>
            </Select>
          )}

          {period === "quarterly" && (
            <Select defaultValue="q1">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select quarter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q1">Q1</SelectItem>
                <SelectItem value="q2">Q2</SelectItem>
                <SelectItem value="q3">Q3</SelectItem>
                <SelectItem value="q4">Q4</SelectItem>
              </SelectContent>
            </Select>
          )}

          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
        </div>

        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Financial Statements */}
      <Card className="mb-6">
        <CardHeader className="border-b">
          <CardTitle className="text-lg mb-2">Financial Statements - {period === 'monthly' ? month.charAt(0).toUpperCase() + month.slice(1) : period === 'quarterly' ? 'Q1' : ''} {year}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="income">
            <TabsList className="mx-6 mt-2 bg-white border-b w-fit">
              <TabsTrigger value="income">Income Statement</TabsTrigger>
              <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
              <TabsTrigger value="cash">Cash Flow</TabsTrigger>
            </TabsList>

            <TabsContent value="income" className="m-0 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Income Statement</h3>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-2/3">Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incomeStatementData.map((item, idx) => (
                    <TableRow key={idx} className={item.isTotalRow ? 'bg-gray-50 font-medium' : ''}>
                      <TableCell className={item.isFinalTotal ? 'font-bold' : ''}>{item.category}</TableCell>
                      <TableCell className={`text-right ${item.isFinalTotal ? 'font-bold' : ''} ${item.amount < 0 ? 'text-red-600' : ''}`}>
                        {formatNaira(Math.abs(item.amount))}
                        {item.amount < 0 && ' (-)'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="balance" className="m-0 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Balance Sheet</h3>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              <div className="grid gap-6">
                <div>
                  <h4 className="font-medium mb-2">Assets</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-2/3">Item</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {balanceSheetData.assets.map((item, idx) => (
                        <TableRow key={idx} className={item.isTotal ? 'bg-gray-50 font-medium' : ''}>
                          <TableCell className={item.isFinalTotal ? 'font-bold' : ''}>{item.item}</TableCell>
                          <TableCell className={`text-right ${item.isFinalTotal ? 'font-bold' : ''}`}>
                            {formatNaira(Math.abs(item.amount))}
                            {item.amount < 0 && ' (-)'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Liabilities</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-2/3">Item</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {balanceSheetData.liabilities.map((item, idx) => (
                        <TableRow key={idx} className={item.isTotal ? 'bg-gray-50 font-medium' : ''}>
                          <TableCell>{item.item}</TableCell>
                          <TableCell className="text-right">{formatNaira(item.amount)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Equity</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-2/3">Item</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {balanceSheetData.equity.map((item, idx) => (
                        <TableRow key={idx} className={item.isTotal ? 'bg-gray-50 font-medium' : ''}>
                          <TableCell className={item.isFinalTotal ? 'font-bold' : ''}>{item.item}</TableCell>
                          <TableCell className={`text-right ${item.isFinalTotal ? 'font-bold' : ''}`}>{formatNaira(item.amount)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="cash" className="m-0 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Cash Flow Statement</h3>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-2/3">Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cashFlowData.map((item, idx) => (
                    <TableRow key={idx} className={item.isTotalRow ? 'bg-gray-50 font-medium' : ''}>
                      <TableCell className={item.isFinalTotal ? 'font-bold' : ''}>{item.category}</TableCell>
                      <TableCell className={`text-right ${item.isFinalTotal ? 'font-bold' : ''} ${item.amount < 0 ? 'text-red-600' : ''}`}>
                        {formatNaira(Math.abs(item.amount))}
                        {item.amount < 0 && ' (-)'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Generated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {report.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
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

export default FinancialReports;
