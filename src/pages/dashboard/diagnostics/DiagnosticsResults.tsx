
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileText, Search, User, Upload, Download, Calendar, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const DiagnosticsResults = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  
  // Mock test results data
  const testResults = [
    {
      id: "TR-001",
      patientName: "John Smith",
      patientId: "P-1234",
      testType: "Complete Blood Count",
      sampleDate: "2025-05-12",
      resultStatus: "Pending",
      requestedBy: "Dr. Robert Chen",
      priority: "Normal",
      referenceRange: {
        "WBC": "4,500 to 11,000/μL",
        "RBC": "4.5 to 5.9 million/μL (men); 4.1 to 5.1 million/μL (women)",
        "Hemoglobin": "14 to 17.5 g/dL (men); 12.3 to 15.3 g/dL (women)",
        "Hematocrit": "41.5% to 50.4% (men); 35.9% to 44.6% (women)",
        "Platelets": "150,000 to 450,000/μL"
      }
    },
    {
      id: "TR-002",
      patientName: "Alice Johnson",
      patientId: "P-2345",
      testType: "Lipid Profile",
      sampleDate: "2025-05-12",
      resultStatus: "Completed",
      requestedBy: "Dr. Sarah Williams",
      priority: "Normal",
      results: {
        "Total Cholesterol": "190 mg/dL",
        "LDL Cholesterol": "110 mg/dL",
        "HDL Cholesterol": "50 mg/dL",
        "Triglycerides": "150 mg/dL"
      },
      referenceRange: {
        "Total Cholesterol": "<200 mg/dL",
        "LDL Cholesterol": "<130 mg/dL",
        "HDL Cholesterol": ">40 mg/dL (men); >50 mg/dL (women)",
        "Triglycerides": "<150 mg/dL"
      }
    },
    {
      id: "TR-003",
      patientName: "Robert Brown",
      patientId: "P-3456",
      testType: "Liver Function Test",
      sampleDate: "2025-05-12",
      resultStatus: "In Progress",
      requestedBy: "Dr. James Johnson",
      priority: "Urgent",
      referenceRange: {
        "ALT": "7 to 55 units/L",
        "AST": "8 to 48 units/L",
        "ALP": "45 to 115 units/L",
        "GGT": "9 to 48 units/L",
        "Total Bilirubin": "0.1 to 1.2 mg/dL"
      }
    },
    {
      id: "TR-004",
      patientName: "Emily Davis",
      patientId: "P-4567",
      testType: "Blood Glucose",
      sampleDate: "2025-05-13",
      resultStatus: "Completed",
      requestedBy: "Dr. Elizabeth Brown",
      priority: "Urgent",
      results: {
        "Fasting Blood Sugar": "135 mg/dL"
      },
      referenceRange: {
        "Fasting Blood Sugar": "70 to 100 mg/dL"
      },
      abnormal: true
    },
    {
      id: "TR-005",
      patientName: "Michael Wilson",
      patientId: "P-5678",
      testType: "Thyroid Profile",
      sampleDate: "2025-05-13",
      resultStatus: "Pending",
      requestedBy: "Dr. David Miller",
      priority: "Normal",
      referenceRange: {
        "TSH": "0.4 to 4.0 mIU/L",
        "T3": "80 to 200 ng/dL",
        "T4": "4.5 to 11.2 μg/dL"
      }
    }
  ];

  const pendingResults = testResults.filter(result => result.resultStatus === "Pending");
  const completedResults = testResults.filter(result => result.resultStatus === "Completed");
  const inProgressResults = testResults.filter(result => result.resultStatus === "In Progress");
  
  const filteredResults = testResults.filter(
    result => result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             result.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
             result.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
             result.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUploadResults = () => {
    if (selectedTest) {
      toast({
        title: "Results Uploaded",
        description: `Test results for ${selectedTest.id} have been uploaded`,
      });
      setShowUploadDialog(false);
    }
  };

  const handleMarkCompleted = (id: string) => {
    toast({
      title: "Test Completed",
      description: `Test ${id} has been marked as completed`,
    });
  };

  const handleSendResults = (id: string) => {
    toast({
      title: "Results Sent",
      description: `Test results for ${id} have been sent to the patient and doctor`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">{status}</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">{status}</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    return priority === "Urgent" 
      ? <Badge className="bg-red-100 text-red-800 border-red-200"><AlertTriangle className="h-3 w-3 mr-1" /> {priority}</Badge>
      : <Badge className="bg-gray-100 text-gray-800 border-gray-200">{priority}</Badge>;
  };

  const ResultRow = ({ result }: { result: any }) => (
    <TableRow key={result.id} className={result.priority === "Urgent" ? "bg-red-50" : ""}>
      <TableCell className="font-medium">{result.id}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-gray-400" />
          <div>
            <div>{result.patientName}</div>
            <div className="text-xs text-gray-500">{result.patientId}</div>
          </div>
        </div>
      </TableCell>
      <TableCell>{result.testType}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
          {result.sampleDate}
        </div>
      </TableCell>
      <TableCell>{getPriorityBadge(result.priority)}</TableCell>
      <TableCell>{getStatusBadge(result.resultStatus)}</TableCell>
      <TableCell className="flex space-x-2">
        <Dialog>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Test Results: {result.testType}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Patient:</p>
                  <p className="font-medium">{result.patientName} ({result.patientId})</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Test ID:</p>
                  <p className="font-medium">{result.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sample Date:</p>
                  <p>{result.sampleDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Requested By:</p>
                  <p>{result.requestedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status:</p>
                  <p>{getStatusBadge(result.resultStatus)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Priority:</p>
                  <p>{getPriorityBadge(result.priority)}</p>
                </div>
              </div>

              {result.results && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Results</h3>
                  <div className="border rounded-md p-4 bg-gray-50">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4">Test</th>
                          <th className="text-left py-2 pr-4">Result</th>
                          <th className="text-left py-2">Reference Range</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(result.results).map(([test, value]) => (
                          <tr key={test} className="border-b last:border-0">
                            <td className="py-2 pr-4">{test}</td>
                            <td className={`py-2 pr-4 font-medium ${
                              result.abnormal ? "text-red-600" : ""
                            }`}>{value}</td>
                            <td className="py-2">{result.referenceRange[test]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {!result.results && result.referenceRange && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Reference Ranges</h3>
                  <div className="border rounded-md p-4 bg-gray-50">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4">Test</th>
                          <th className="text-left py-2">Reference Range</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(result.referenceRange).map(([test, range]) => (
                          <tr key={test} className="border-b last:border-0">
                            <td className="py-2 pr-4">{test}</td>
                            <td className="py-2">{range}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {result.resultStatus === "Completed" && (
                <div className="flex justify-end">
                  <Button variant="outline" className="mr-2">
                    <Download className="h-4 w-4 mr-2" /> 
                    Download PDF
                  </Button>
                  <Button onClick={() => handleSendResults(result.id)}>
                    Send to Patient
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {result.resultStatus === "Pending" && (
          <Button 
            size="sm"
            variant="outline"
            onClick={() => {
              setSelectedTest(result);
              setShowUploadDialog(true);
            }}
          >
            <Upload className="h-4 w-4 mr-2" /> Upload Results
          </Button>
        )}

        {result.resultStatus === "In Progress" && (
          <Button size="sm" onClick={() => handleMarkCompleted(result.id)}>
            Mark Completed
          </Button>
        )}

        {result.resultStatus === "Completed" && (
          <Button size="sm" variant="outline" onClick={() => handleSendResults(result.id)}>
            Send Results
          </Button>
        )}
      </TableCell>
    </TableRow>
  );

  return (
    <DashboardPageLayout
      title="Test Results"
      description="Manage and deliver test results"
      role="diagnostics"
    >
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Test Results</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedTest && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Test ID:</p>
                  <p className="font-medium">{selectedTest.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Patient:</p>
                  <p className="font-medium">{selectedTest.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Test Type:</p>
                  <p>{selectedTest.testType}</p>
                </div>
              </div>
            )}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm">Drag and drop your files here or</p>
                <Button variant="outline" className="mt-2">Browse Files</Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUploadResults}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="pending">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="pending">Pending Results</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Tests</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search tests..." 
              className="max-w-xs" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="pending">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Sample Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingResults.length > 0 ? (
                  pendingResults.map(result => (
                    <ResultRow key={result.id} result={result} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No pending results
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="in-progress">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Sample Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inProgressResults.length > 0 ? (
                  inProgressResults.map(result => (
                    <ResultRow key={result.id} result={result} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No tests in progress
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Sample Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedResults.length > 0 ? (
                  completedResults.map(result => (
                    <ResultRow key={result.id} result={result} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No completed results
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Sample Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResults.length > 0 ? (
                  filteredResults.map(result => (
                    <ResultRow key={result.id} result={result} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No results found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default DiagnosticsResults;
