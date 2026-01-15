
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

// Mock data for pharmacies
const mockPharmacies = [
  { id: 1, name: "MediCare Pharmacy", address: "123 Main St, New York", license: "PH12345", manager: "John Smith", contact: "212-555-1234", status: "active" },
  { id: 2, name: "QuickRx Pharmacy", address: "456 Oak Ave, Chicago", license: "PH23456", manager: "Sarah Johnson", contact: "312-555-5678", status: "active" },
  { id: 3, name: "CarePlus Pharmacy", address: "789 Pine Rd, Los Angeles", license: "PH34567", manager: "David Lee", contact: "310-555-9012", status: "inactive" },
  { id: 4, name: "Wellness Pharmacy", address: "101 Elm St, Boston", license: "PH45678", manager: "Lisa Brown", contact: "617-555-3456", status: "active" },
  { id: 5, name: "City Drugs", address: "202 Maple Dr, Seattle", license: "PH56789", manager: "Michael Wong", contact: "206-555-7890", status: "active" },
];

const AdminPharmacies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter pharmacies based on search
  const filteredPharmacies = mockPharmacies.filter(pharmacy => 
    pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pharmacy.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <DashboardPageLayout
      title="Pharmacy Management"
      description="Manage pharmacy services and operations"
      role="admin"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-1 gap-2 items-center">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search pharmacies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
            <Plus className="mr-2 h-4 w-4" /> Add Pharmacy
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pharmacy Name</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>License Number</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPharmacies.length > 0 ? (
                filteredPharmacies.map((pharmacy) => (
                  <TableRow key={pharmacy.id}>
                    <TableCell className="font-medium">{pharmacy.name}</TableCell>
                    <TableCell>{pharmacy.manager}</TableCell>
                    <TableCell>{pharmacy.license}</TableCell>
                    <TableCell>{pharmacy.contact}</TableCell>
                    <TableCell>{pharmacy.address}</TableCell>
                    <TableCell>
                      <Badge className={pharmacy.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {pharmacy.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">No pharmacies found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardPageLayout>
  );
};

export default AdminPharmacies;
