
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, Clock, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const DiagnosticsUrgentTests = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock urgent tests data
  const urgentTests = [
    { 
      id: "UT-001", 
      patientName: "Emma Thompson", 
      testType: "Complete Blood Count", 
      priority: "Critical",
      requestTime: "Today, 08:15 AM",
      requestedBy: "Dr. Robert Chen",
      status: "Pending"
    },
    { 
      id: "UT-002", 
      patientName: "Michael Garcia", 
      testType: "Electrolyte Panel", 
      priority: "High",
      requestTime: "Today, 09:30 AM",
      requestedBy: "Dr. Sarah Williams",
      status: "In Progress"
    },
    { 
      id: "UT-003", 
      patientName: "Sophia Martinez", 
      testType: "Cardiac Enzyme Panel", 
      priority: "Critical",
      requestTime: "Today, 10:05 AM",
      requestedBy: "Dr. James Johnson",
      status: "Pending"
    },
    { 
      id: "UT-004", 
      patientName: "William Davis", 
      testType: "Blood Glucose", 
      priority: "High",
      requestTime: "Today, 11:22 AM",
      requestedBy: "Dr. Elizabeth Brown",
      status: "In Progress"
    }
  ];

  const filteredTests = urgentTests.filter(test => 
    test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.testType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Test ${id} status changed to ${newStatus}`,
    });
  };

  const getPriorityBadgeColor = (priority: string) => {
    return priority === "Critical" 
      ? "bg-red-100 text-red-800 border-red-200" 
      : "bg-orange-100 text-orange-800 border-orange-200";
  };

  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <DashboardPageLayout
      title="Urgent Tests"
      description="Prioritize and process urgent test requests"
      role="diagnostics"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-medium">Critical Test Requests</h2>
          </div>
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

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Test Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Request Time</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTests.length > 0 ? (
                filteredTests.map((test) => (
                  <TableRow key={test.id} className={test.priority === "Critical" ? "bg-red-50" : ""}>
                    <TableCell className="font-medium">{test.id}</TableCell>
                    <TableCell>{test.patientName}</TableCell>
                    <TableCell>{test.testType}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPriorityBadgeColor(test.priority)}>
                        {test.priority === "Critical" && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {test.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-gray-500" />
                      {test.requestTime}
                    </TableCell>
                    <TableCell>{test.requestedBy}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadgeColor(test.status)}>
                        {test.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleStatusChange(test.id, "In Progress")}>
                          Process
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleStatusChange(test.id, "Completed")}>
                          Complete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No urgent tests found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardPageLayout>
  );
};

export default DiagnosticsUrgentTests;
