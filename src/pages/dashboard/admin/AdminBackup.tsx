import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Download, Upload, RotateCcw, Database, Server, HardDrive } from "lucide-react";

const AdminBackup = () => {
  const [backupStatus, setBackupStatus] = useState<"idle" | "running" | "completed" | "failed">("idle");
  const [restoreStatus, setRestoreStatus] = useState<"idle" | "running" | "completed" | "failed">("idle");
  const [logSearchTerm, setLogSearchTerm] = useState("");

  // Mock function to simulate backup
  const runBackup = async () => {
    setBackupStatus("running");
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate backup process
    setBackupStatus("completed");
  };

  // Mock function to simulate restore
  const runRestore = async () => {
    setRestoreStatus("running");
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate restore process
    setRestoreStatus("completed");
  };

  // Mock data for logs
  const mockLogs = [
    { id: 1, timestamp: "2024-01-22 14:30:00", level: "info", message: "Backup started" },
    { id: 2, timestamp: "2024-01-22 14:30:05", level: "info", message: "Database backup completed" },
    { id: 3, timestamp: "2024-01-22 14:30:10", level: "info", message: "Files backup started" },
    { id: 4, timestamp: "2024-01-22 14:30:15", level: "info", message: "Files backup completed" },
    { id: 5, timestamp: "2024-01-22 14:30:20", level: "success", message: "Backup completed successfully" },
  ];

  const filteredLogs = mockLogs.filter(log =>
    log.message.toLowerCase().includes(logSearchTerm.toLowerCase()) ||
    log.level.toLowerCase().includes(logSearchTerm.toLowerCase())
  );

  return (
    <DashboardPageLayout
      title="Backup & Restore"
      description="Manage backups and restore points for the system"
      role="admin"
    >
      <div className="grid gap-4">
        {/* Backup Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><Database className="mr-2 h-5 w-5" /> Backup</CardTitle>
            <CardDescription>Create a backup of your database and system files.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Regular backups ensure you can recover from data loss or system failures.</p>
            <div className="mt-4 flex justify-between items-center">
              <Button
                onClick={runBackup}
                disabled={backupStatus === "running"}
                className="bg-healthcare-primary hover:bg-healthcare-accent"
              >
                {backupStatus === "idle" && <><RotateCcw className="mr-2 h-4 w-4" /> Run Backup</>}
                {backupStatus === "running" && <>Running... <RotateCcw className="ml-2 h-4 w-4 animate-spin" /></>}
                {backupStatus === "completed" && <>Completed <Database className="ml-2 h-4 w-4" /></>}
                {backupStatus === "failed" && <>Failed <AlertTriangle className="ml-2 h-4 w-4" /></>}
              </Button>
              {backupStatus === "completed" && (
                <Badge variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Backup
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Restore Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><Server className="mr-2 h-5 w-5" /> Restore</CardTitle>
            <CardDescription>Restore your system from a previous backup.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Choose a backup file to restore your system to a previous state.</p>
            <div className="mt-4 flex justify-between items-center">
              <Button
                onClick={runRestore}
                disabled={restoreStatus === "running"}
                className="bg-healthcare-primary hover:bg-healthcare-accent"
              >
                {restoreStatus === "idle" && <><Upload className="mr-2 h-4 w-4" /> Run Restore</>}
                {restoreStatus === "running" && <>Restoring... <RotateCcw className="ml-2 h-4 w-4 animate-spin" /></>}
                {restoreStatus === "completed" && <>Completed <Server className="ml-2 h-4 w-4" /></>}
                {restoreStatus === "failed" && <>Failed <AlertTriangle className="ml-2 h-4 w-4" /></>}
              </Button>
              <Input type="file" className="hidden" id="restore-file" />
              <Button variant="secondary" asChild>
                <label htmlFor="restore-file" className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Backup
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Logs Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center"><HardDrive className="mr-2 h-5 w-5" /> Logs</CardTitle>
            <CardDescription>View system logs for backup and restore operations.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-1 gap-2 items-center mb-4">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={logSearchTerm}
                onChange={(e) => setLogSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map(log => (
                    <TableRow key={log.id}>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{log.level}</Badge>
                      </TableCell>
                      <TableCell>{log.message}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardPageLayout>
  );
};

export default AdminBackup;
