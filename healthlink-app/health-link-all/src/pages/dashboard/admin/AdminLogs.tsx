
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
import { Search, Download, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for system logs
const mockLogs = [
  { id: 1, timestamp: "2023-05-15 08:23:45", level: "info", service: "auth", message: "User login successful", user: "john@example.com", ip: "192.168.1.45" },
  { id: 2, timestamp: "2023-05-15 08:24:12", level: "error", service: "payments", message: "Payment processing failed", user: "jane@example.com", ip: "192.168.1.72" },
  { id: 3, timestamp: "2023-05-15 08:30:56", level: "warning", service: "appointments", message: "Appointment rescheduled multiple times", user: "robert@example.com", ip: "192.168.1.90" },
  { id: 4, timestamp: "2023-05-15 09:12:34", level: "info", service: "auth", message: "User logout", user: "sarah@example.com", ip: "192.168.1.105" },
  { id: 5, timestamp: "2023-05-15 09:45:22", level: "error", service: "database", message: "Database connection timeout", user: "system", ip: "localhost" },
  { id: 6, timestamp: "2023-05-15 10:03:15", level: "info", service: "user", message: "Profile updated", user: "michael@example.com", ip: "192.168.1.150" },
  { id: 7, timestamp: "2023-05-15 10:15:40", level: "warning", service: "security", message: "Multiple failed login attempts", user: "unknown", ip: "203.0.113.42" },
];

const AdminLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  
  // Filter logs based on search, log level, and service
  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ip.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    const matchesService = serviceFilter === "all" || log.service === serviceFilter;
    
    return matchesSearch && matchesLevel && matchesService;
  });
  
  return (
    <DashboardPageLayout
      title="System Logs"
      description="View and analyze system logs and events"
      role="admin"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-1 gap-2 items-center">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search logs by message, user or IP..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Log Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="auth">Auth</SelectItem>
                <SelectItem value="payments">Payments</SelectItem>
                <SelectItem value="appointments">Appointments</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>User</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          log.level === "info" 
                            ? "bg-blue-100 text-blue-800" 
                            : log.level === "warning" 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {log.level}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.service}</TableCell>
                    <TableCell className="max-w-xs truncate" title={log.message}>{log.message}</TableCell>
                    <TableCell className="font-mono text-sm">{log.user}</TableCell>
                    <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">No logs found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardPageLayout>
  );
};

export default AdminLogs;
