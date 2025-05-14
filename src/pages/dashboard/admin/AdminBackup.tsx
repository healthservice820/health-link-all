
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
import { Download, Upload, Archive, History, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for backups
const mockBackups = [
  { id: 1, name: "Full System Backup", date: "2023-05-14", time: "02:00 AM", size: "1.2 GB", status: "completed", type: "automated" },
  { id: 2, name: "Database Backup", date: "2023-05-13", time: "02:00 AM", size: "456 MB", status: "completed", type: "automated" },
  { id: 3, name: "Pre-Update Backup", date: "2023-05-10", time: "10:15 AM", size: "1.3 GB", status: "completed", type: "manual" },
  { id: 4, name: "Weekly Full Backup", date: "2023-05-07", time: "02:00 AM", size: "1.1 GB", status: "completed", type: "automated" },
  { id: 5, name: "Database Backup", date: "2023-05-06", time: "02:00 AM", size: "428 MB", status: "completed", type: "automated" },
];

// Mock data for restore points
const mockRestorePoints = [
  { id: 1, name: "Recovery Point - May 14", date: "2023-05-14", time: "02:30 AM", status: "available" },
  { id: 2, name: "Recovery Point - May 13", date: "2023-05-13", time: "02:30 AM", status: "available" },
  { id: 3, name: "Recovery Point - May 10", date: "2023-05-10", time: "10:45 AM", status: "available" },
  { id: 4, name: "Recovery Point - May 07", date: "2023-05-07", time: "02:30 AM", status: "available" },
  { id: 5, name: "Recovery Point - May 06", date: "2023-05-06", time: "02:30 AM", status: "archived" },
];

const AdminBackup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("backups");
  
  // Filter backups based on search
  const filteredBackups = mockBackups.filter(backup => 
    backup.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    backup.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    backup.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter restore points based on search
  const filteredRestorePoints = mockRestorePoints.filter(point => 
    point.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    point.date.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <DashboardPageLayout
      title="Backup & Recovery"
      description="Manage system backups and recovery options"
      role="admin"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Archive className="mr-2 h-5 w-5 text-blue-600" />
                Total Backups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">15</div>
              <p className="text-sm text-gray-500">5.4 GB total size</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <History className="mr-2 h-5 w-5 text-green-600" />
                Recovery Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-sm text-gray-500">Available for restoration</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Upload className="mr-2 h-5 w-5 text-purple-600" />
                Next Backup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-medium">Today, 02:00 AM</div>
              <p className="text-sm text-gray-500">Automated daily backup</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
          <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
            <Plus className="mr-2 h-4 w-4" /> Create Backup Now
          </Button>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" /> Import Backup
            </Button>
            
            <Button variant="outline">
              <History className="mr-2 h-4 w-4" /> Configure Schedule
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="backups" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="backups">Backup History</TabsTrigger>
            <TabsTrigger value="recovery">Recovery Points</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col md:flex-row gap-4 justify-between mt-4">
            <div className="flex flex-1 gap-2 items-center">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab === 'backups' ? 'backups' : 'recovery points'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </div>
          
          <TabsContent value="backups" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Backup Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBackups.length > 0 ? (
                    filteredBackups.map((backup) => (
                      <TableRow key={backup.id}>
                        <TableCell className="font-medium">{backup.name}</TableCell>
                        <TableCell>{backup.date}</TableCell>
                        <TableCell>{backup.time}</TableCell>
                        <TableCell>{backup.size}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={backup.type === "automated" ? "bg-blue-50 text-blue-800" : "bg-purple-50 text-purple-800"}>
                            {backup.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            {backup.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">No backups found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="recovery" className="mt-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recovery Point</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRestorePoints.length > 0 ? (
                    filteredRestorePoints.map((point) => (
                      <TableRow key={point.id}>
                        <TableCell className="font-medium">{point.name}</TableCell>
                        <TableCell>{point.date}</TableCell>
                        <TableCell>{point.time}</TableCell>
                        <TableCell>
                          <Badge className={point.status === "available" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                            {point.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" disabled={point.status !== "available"}>
                            Restore
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">No recovery points found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardPageLayout>
  );
};

export default AdminBackup;
