
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, PhoneCall } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Call {
  id: string;
  patient: string;
  phone: string;
  status: "active" | "waiting" | "on-hold";
  time: string;
  issue: string;
}

const ActiveCalls = () => {
  const [calls, setCalls] = useState<Call[]>([
    { id: "1", patient: "John Doe", phone: "+234-812-345-6789", status: "active", time: "10:23 am", issue: "Medication question" },
    { id: "2", patient: "Sarah Johnson", phone: "+234-705-543-2109", status: "waiting", time: "10:15 am", issue: "Finding nearest pharmacy" },
    { id: "3", patient: "Michael Okafor", phone: "+234-909-876-5432", status: "waiting", time: "10:10 am", issue: "Doctor appointment" },
    { id: "4", patient: "Mary Emeka", phone: "+234-814-567-3219", status: "on-hold", time: "10:05 am", issue: "Insurance coverage" },
    { id: "5", patient: "David Adeyemi", phone: "+234-701-234-5678", status: "waiting", time: "10:00 am", issue: "Lab test results" },
  ]);

  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAnswerCall = (call: Call) => {
    setSelectedCall(call);
    setIsDialogOpen(true);
  };

  const handleEndCall = () => {
    if (selectedCall) {
      setCalls(calls.filter(call => call.id !== selectedCall.id));
      setIsDialogOpen(false);
      setSelectedCall(null);
    }
  };

  const filteredCalls = calls.filter(call => 
    call.patient.toLowerCase().includes(searchQuery.toLowerCase()) || 
    call.phone.includes(searchQuery) || 
    call.issue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleEmergencyMode = () => {
    setIsEmergencyMode(!isEmergencyMode);
  };

  return (
    <DashboardPageLayout
      title="Active Calls"
      description="Manage incoming and ongoing patient calls"
      role="customer_care"
    >
      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <div className="flex-1">
          <Input 
            placeholder="Search patient name, phone or issue..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={isEmergencyMode ? "destructive" : "outline"}
            className={isEmergencyMode ? "animate-pulse" : ""}
            onClick={toggleEmergencyMode}
          >
            {isEmergencyMode ? "Emergency Mode Active" : "Enable Emergency Mode"}
          </Button>
          <Button>
            <Phone className="mr-2 h-4 w-4" /> New Call
          </Button>
        </div>
      </div>

      {isEmergencyMode && (
        <Card className="mb-6 bg-red-50 border-red-300">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-600 font-semibold">
              <Phone className="h-5 w-5" />
              <span>Emergency Mode Active - Prioritizing urgent medical calls</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center justify-between">
            <div>Incoming & Active Calls</div>
            <Badge variant="outline">{filteredCalls.length} calls</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCalls.length > 0 ? (
                filteredCalls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell className="font-medium">{call.patient}</TableCell>
                    <TableCell>{call.phone}</TableCell>
                    <TableCell>
                      <Badge variant={
                        call.status === "active" ? "default" : 
                        call.status === "waiting" ? "secondary" : "outline"
                      }>
                        {call.status === "active" ? "On Call" :
                         call.status === "waiting" ? "Waiting" : "On Hold"}
                      </Badge>
                    </TableCell>
                    <TableCell>{call.time}</TableCell>
                    <TableCell>{call.issue}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        size="sm" 
                        variant={call.status === "active" ? "outline" : "default"}
                        onClick={() => handleAnswerCall(call)}
                      >
                        {call.status === "active" ? "View" : "Answer"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No calls match your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Call with {selectedCall?.patient}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Phone Number</Label>
                <div className="font-medium">{selectedCall?.phone}</div>
              </div>
              <div>
                <Label>Issue</Label>
                <div className="font-medium">{selectedCall?.issue}</div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="notes">Call Notes</Label>
              <Textarea id="notes" placeholder="Enter call notes here..." className="mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <PhoneCall className="mr-2 h-4 w-4" /> Transfer
              </Button>
              <Button variant="outline" className="w-full">
                Hold
              </Button>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
            <Button variant="destructive" onClick={handleEndCall}>
              End Call
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardPageLayout>
  );
};

export default ActiveCalls;
