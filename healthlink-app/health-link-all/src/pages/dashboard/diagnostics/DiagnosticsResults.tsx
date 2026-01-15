
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Filter, Download, Eye, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Sample test results data
const testResults = [
  {
    id: "TR-5678",
    patientName: "John Smith",
    testType: "Complete Blood Count",
    dateCollected: "2023-05-10",
    dateCompleted: "2023-05-11",
    status: "Completed",
    doctor: "Dr. James Wilson",
    components: [
      { name: "WBC", value: "7.5 x 10^9/L", range: "4.0-11.0 x 10^9/L", status: "normal" },
      { name: "RBC", value: "5.2 x 10^12/L", range: "4.5-5.9 x 10^12/L", status: "normal" },
      { name: "Hemoglobin", value: "14.2 g/dL", range: "13.5-17.5 g/dL", status: "normal" },
      { name: "Hematocrit", value: "42%", range: "41-53%", status: "normal" },
      { name: "Platelets", value: "245 x 10^9/L", range: "150-450 x 10^9/L", status: "normal" },
    ]
  },
  {
    id: "TR-5679",
    patientName: "Sarah Johnson",
    testType: "Liver Function Test",
    dateCollected: "2023-05-09",
    dateCompleted: "2023-05-10",
    status: "Critical",
    doctor: "Dr. Emily Brown",
    components: [
      { name: "ALT", value: "75 U/L", range: "7-56 U/L", status: "high" },
      { name: "AST", value: "82 U/L", range: "5-40 U/L", status: "high" },
      { name: "ALP", value: "142 U/L", range: "44-147 U/L", status: "normal" },
      { name: "Albumin", value: "3.9 g/dL", range: "3.4-5.4 g/dL", status: "normal" },
      { name: "Total Bilirubin", value: "2.1 mg/dL", range: "0.1-1.2 mg/dL", status: "high" },
    ]
  },
  {
    id: "TR-5680",
    patientName: "Michael Davis",
    testType: "Lipid Profile",
    dateCollected: "2023-05-10",
    dateCompleted: "2023-05-12",
    status: "Abnormal",
    doctor: "Dr. Robert Thompson",
    components: [
      { name: "Total Cholesterol", value: "245 mg/dL", range: "<200 mg/dL", status: "high" },
      { name: "Triglycerides", value: "180 mg/dL", range: "<150 mg/dL", status: "high" },
      { name: "HDL", value: "38 mg/dL", range: ">40 mg/dL", status: "low" },
      { name: "LDL", value: "165 mg/dL", range: "<100 mg/dL", status: "high" },
    ]
  },
  {
    id: "TR-5681",
    patientName: "Elizabeth Wilson",
    testType: "Thyroid Function Test",
    dateCollected: "2023-05-12",
    dateCompleted: null,
    status: "Processing",
    doctor: "Dr. Sarah Adams",
    components: []
  },
  {
    id: "TR-5682",
    patientName: "Robert Brown",
    testType: "Complete Blood Count",
    dateCollected: "2023-05-12",
    dateCompleted: "2023-05-13",
    status: "Completed",
    doctor: "Dr. James Wilson",
    components: [
      { name: "WBC", value: "6.2 x 10^9/L", range: "4.0-11.0 x 10^9/L", status: "normal" },
      { name: "RBC", value: "5.0 x 10^12/L", range: "4.5-5.9 x 10^12/L", status: "normal" },
      { name: "Hemoglobin", value: "15.1 g/dL", range: "13.5-17.5 g/dL", status: "normal" },
      { name: "Hematocrit", value: "44%", range: "41-53%", status: "normal" },
      { name: "Platelets", value: "210 x 10^9/L", range: "150-450 x 10^9/L", status: "normal" },
    ]
  },
  {
    id: "TR-5683",
    patientName: "Jennifer Martinez",
    testType: "Glucose Tolerance Test",
    dateCollected: "2023-05-11",
    dateCompleted: "2023-05-12",
    status: "Abnormal",
    doctor: "Dr. Michael Jones",
    components: [
      { name: "Fasting Glucose", value: "105 mg/dL", range: "70-99 mg/dL", status: "high" },
      { name: "1-Hour Glucose", value: "190 mg/dL", range: "<180 mg/dL", status: "high" },
      { name: "2-Hour Glucose", value: "155 mg/dL", range: "<140 mg/dL", status: "high" },
      { name: "3-Hour Glucose", value: "115 mg/dL", range: "70-120 mg/dL", status: "normal" },
    ]
  },
];

const DiagnosticsResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  
  const handleViewResult = (result: any) => {
    setSelectedResult(result);
    setIsResultDialogOpen(true);
  };

  // Filter test results based on search term and status filter
  const filteredResults = testResults.filter(result => {
    const matchesSearch = result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         result.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || result.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardPageLayout 
      title="Test Results" 
      description="View and manage completed diagnostic test results"
      role="diagnostics"
    >
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <CardTitle className="text-xl">Test Results Management</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search patient or test..."
                  className="pl-8 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="abnormal">Abnormal</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>All Results</TabsTrigger>
              <TabsTrigger value="completed" onClick={() => setStatusFilter("completed")}>Completed</TabsTrigger>
              <TabsTrigger value="abnormal" onClick={() => setStatusFilter("abnormal")}>Abnormal</TabsTrigger>
              <TabsTrigger value="critical" onClick={() => setStatusFilter("critical")}>Critical</TabsTrigger>
            </TabsList>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Test Type</TableHead>
                    <TableHead>Collected</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6">
                        No test results found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.id}</TableCell>
                        <TableCell>{result.patientName}</TableCell>
                        <TableCell>{result.testType}</TableCell>
                        <TableCell>{result.dateCollected}</TableCell>
                        <TableCell>{result.dateCompleted || "Pending"}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {result.status === "Completed" && (
                              <span className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" /> Completed
                              </span>
                            )}
                            {result.status === "Processing" && (
                              <span className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <Clock className="w-3 h-3 mr-1" /> Processing
                              </span>
                            )}
                            {result.status === "Abnormal" && (
                              <span className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <AlertCircle className="w-3 h-3 mr-1" /> Abnormal
                              </span>
                            )}
                            {result.status === "Critical" && (
                              <span className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <AlertCircle className="w-3 h-3 mr-1" /> Critical
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewResult(result)} disabled={result.status === "Processing"}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" disabled={result.status === "Processing"}>
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Test result detail dialog */}
      <Dialog open={isResultDialogOpen} onOpenChange={setIsResultDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Test Result Details</DialogTitle>
            <DialogDescription>
              {selectedResult && (
                <span>
                  {selectedResult.testType} for {selectedResult.patientName}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {selectedResult && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Test ID</p>
                  <p className="font-medium">{selectedResult.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="font-medium">{selectedResult.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Collected Date</p>
                  <p className="font-medium">{selectedResult.dateCollected}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed Date</p>
                  <p className="font-medium">{selectedResult.dateCompleted || "Pending"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">
                    {selectedResult.status === "Completed" && (
                      <span className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" /> Completed
                      </span>
                    )}
                    {selectedResult.status === "Processing" && (
                      <span className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Clock className="w-3 h-3 mr-1" /> Processing
                      </span>
                    )}
                    {selectedResult.status === "Abnormal" && (
                      <span className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <AlertCircle className="w-3 h-3 mr-1" /> Abnormal
                      </span>
                    )}
                    {selectedResult.status === "Critical" && (
                      <span className="flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <AlertCircle className="w-3 h-3 mr-1" /> Critical
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Referring Doctor</p>
                  <p className="font-medium">{selectedResult.doctor}</p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2">Test Components</h3>
                {selectedResult.components.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Component</TableHead>
                        <TableHead>Result</TableHead>
                        <TableHead>Reference Range</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedResult.components.map((component, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{component.name}</TableCell>
                          <TableCell>{component.value}</TableCell>
                          <TableCell>{component.range}</TableCell>
                          <TableCell>
                            {component.status === "normal" && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Normal
                              </span>
                            )}
                            {component.status === "high" && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                High
                              </span>
                            )}
                            {component.status === "low" && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Low
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-gray-500">No test components available</p>
                )}
              </div>

              {selectedResult.status !== "Processing" && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Comments</h3>
                  <p className="text-gray-700 text-sm">
                    {selectedResult.status === "Abnormal" && "Some values are outside the normal range. Further investigation may be required."}
                    {selectedResult.status === "Critical" && "Critical values detected. Immediate clinical attention is recommended."}
                    {selectedResult.status === "Completed" && "All values within normal range. No further action required."}
                  </p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResultDialogOpen(false)}>
              Close
            </Button>
            {selectedResult && selectedResult.status !== "Processing" && (
              <Button variant="outline" className="gap-1">
                <Download className="h-4 w-4" /> Download Report
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardPageLayout>
  );
};

export default DiagnosticsResults;
