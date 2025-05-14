
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";

// Mock data for diagnostic centers
const mockDiagnostics = [
  { id: 1, name: "HealthScan Diagnostics", address: "123 Medical Pkwy, Houston", license: "DC12345", director: "Dr. Sarah Johnson", contact: "713-555-1234", specialties: ["Radiology", "Pathology"], status: "active" },
  { id: 2, name: "PrecisionLab", address: "456 Science Dr, San Francisco", license: "DC23456", director: "Dr. James Wong", contact: "415-555-5678", specialties: ["Molecular Testing", "Biochemistry"], status: "active" },
  { id: 3, name: "ClearView Imaging", address: "789 Technology Blvd, Boston", license: "DC34567", director: "Dr. Emily Chen", contact: "617-555-9012", specialties: ["MRI", "CT Scan", "Ultrasound"], status: "active" },
  { id: 4, name: "Metro Medical Labs", address: "101 Healthcare Ave, Chicago", license: "DC45678", director: "Dr. Robert Miller", contact: "312-555-3456", specialties: ["Blood Work", "Microbiology"], status: "inactive" },
  { id: 5, name: "Advanced Diagnostics", address: "202 Research Way, Seattle", license: "DC56789", director: "Dr. Lisa Brown", contact: "206-555-7890", specialties: ["Genetics", "Cytology"], status: "active" },
];

const AdminDiagnostics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter diagnostic centers based on search
  const filteredDiagnostics = mockDiagnostics.filter(center => 
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    center.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  return (
    <DashboardPageLayout
      title="Diagnostic Centers Management"
      description="Manage diagnostic centers, services and operations"
      role="admin"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-1 gap-2 items-center">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search diagnostic centers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
            <Plus className="mr-2 h-4 w-4" /> Add Center
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Center Name</TableHead>
                <TableHead>Director</TableHead>
                <TableHead>License Number</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Specialties</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDiagnostics.length > 0 ? (
                filteredDiagnostics.map((center) => (
                  <TableRow key={center.id}>
                    <TableCell className="font-medium">{center.name}</TableCell>
                    <TableCell>{center.director}</TableCell>
                    <TableCell>{center.license}</TableCell>
                    <TableCell>{center.contact}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {center.specialties.map((specialty, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={center.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {center.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">No diagnostic centers found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardPageLayout>
  );
};

export default AdminDiagnostics;
