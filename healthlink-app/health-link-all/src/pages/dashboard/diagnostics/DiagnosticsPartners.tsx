
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, User, Phone, Mail, Building, FileText, Calendar, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DiagnosticsPartners = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock referring physicians data
  const partners = [
    {
      id: "DR-001",
      name: "Dr. Robert Chen",
      specialization: "Cardiologist",
      hospital: "Springfield Medical Center",
      phone: "+1 555-123-4567",
      email: "robert.chen@springfieldmc.org",
      activePatients: 15,
      totalReferrals: 58,
      lastReferral: "2025-05-13",
      commission: 12,
      status: "Active"
    },
    {
      id: "DR-002",
      name: "Dr. Sarah Williams",
      specialization: "Endocrinologist",
      hospital: "Central Hospital",
      phone: "+1 555-234-5678",
      email: "sarah.williams@centralhospital.org",
      activePatients: 10,
      totalReferrals: 42,
      lastReferral: "2025-05-12",
      commission: 10,
      status: "Active"
    },
    {
      id: "DR-003",
      name: "Dr. James Johnson",
      specialization: "Gastroenterologist",
      hospital: "Springfield Medical Center",
      phone: "+1 555-345-6789",
      email: "james.johnson@springfieldmc.org",
      activePatients: 8,
      totalReferrals: 37,
      lastReferral: "2025-05-10",
      commission: 12,
      status: "Active"
    },
    {
      id: "DR-004",
      name: "Dr. Elizabeth Brown",
      specialization: "Neurologist",
      hospital: "Neurology Associates",
      phone: "+1 555-456-7890",
      email: "elizabeth.brown@neuroassoc.org",
      activePatients: 12,
      totalReferrals: 45,
      lastReferral: "2025-05-14",
      commission: 15,
      status: "Active"
    },
    {
      id: "DR-005",
      name: "Dr. David Miller",
      specialization: "General Practitioner",
      hospital: "Community Health Clinic",
      phone: "+1 555-567-8901",
      email: "david.miller@commhealth.org",
      activePatients: 20,
      totalReferrals: 64,
      lastReferral: "2025-05-13",
      commission: 10,
      status: "Active"
    },
    {
      id: "DR-006",
      name: "Dr. Michael Garcia",
      specialization: "Pulmonologist",
      hospital: "Respiratory Care Center",
      phone: "+1 555-678-9012",
      email: "michael.garcia@respcare.org",
      activePatients: 7,
      totalReferrals: 28,
      lastReferral: "2025-05-09",
      commission: 12,
      status: "Inactive"
    }
  ];
  
  // Mock referral data
  const referrals = [
    {
      id: "REF-001",
      patientName: "John Smith",
      doctorId: "DR-001",
      doctorName: "Dr. Robert Chen",
      testType: "Complete Blood Count",
      referralDate: "2025-05-13",
      status: "Completed",
      amount: 250,
      commission: 30,
      paid: true
    },
    {
      id: "REF-002",
      patientName: "Alice Johnson",
      doctorId: "DR-002",
      doctorName: "Dr. Sarah Williams",
      testType: "Lipid Profile",
      referralDate: "2025-05-12",
      status: "Completed",
      amount: 350,
      commission: 35,
      paid: true
    },
    {
      id: "REF-003",
      patientName: "Robert Brown",
      doctorId: "DR-003",
      doctorName: "Dr. James Johnson",
      testType: "Liver Function Test",
      referralDate: "2025-05-10",
      status: "In Progress",
      amount: 400,
      commission: 48,
      paid: false
    },
    {
      id: "REF-004",
      patientName: "Emily Davis",
      doctorId: "DR-004",
      doctorName: "Dr. Elizabeth Brown",
      testType: "Blood Glucose",
      referralDate: "2025-05-14",
      status: "Scheduled",
      amount: 150,
      commission: 22.5,
      paid: false
    },
    {
      id: "REF-005",
      patientName: "Michael Wilson",
      doctorId: "DR-005",
      doctorName: "Dr. David Miller",
      testType: "Thyroid Profile",
      referralDate: "2025-05-13",
      status: "Completed",
      amount: 450,
      commission: 45,
      paid: true
    }
  ];

  const activePartners = partners.filter(partner => partner.status === "Active");
  
  const filteredPartners = partners.filter(
    partner => partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              partner.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
              partner.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
              partner.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  const getPartnerReferrals = (partnerId: string) => {
    return referrals.filter(referral => referral.doctorId === partnerId);
  };

  const getStatusBadge = (status: string) => {
    return status === "Active" 
      ? <Badge className="bg-green-100 text-green-800 border-green-200">{status}</Badge>
      : <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
  };

  const getReferralStatusBadge = (status: string) => {
    switch(status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">{status}</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">{status}</Badge>;
      case "Scheduled":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardPageLayout
      title="Partner Physicians"
      description="Manage referring physician network"
      role="diagnostics"
    >
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Partners</TabsTrigger>
            <TabsTrigger value="active">Active Partners</TabsTrigger>
            <TabsTrigger value="referrals">Recent Referrals</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search partners..." 
              className="max-w-xs" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button>
              <User className="h-4 w-4 mr-2" />
              Add Partner
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Referrals</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPartners.length > 0 ? (
                  filteredPartners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell className="font-medium">{partner.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            {partner.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1 text-gray-400" />
                              {partner.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{partner.specialization}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-gray-400" />
                          {partner.hospital}
                        </div>
                      </TableCell>
                      <TableCell>{partner.totalReferrals}</TableCell>
                      <TableCell>{partner.commission}%</TableCell>
                      <TableCell>{getStatusBadge(partner.status)}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline"
                              onClick={() => setSelectedPartner(partner)}
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Partner Details: {selectedPartner?.name}</DialogTitle>
                            </DialogHeader>
                            {selectedPartner && (
                              <div className="py-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-lg">Doctor Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div>
                                        <p className="text-sm text-gray-500">Partner ID:</p>
                                        <p className="font-medium">{selectedPartner.id}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Name:</p>
                                        <p>{selectedPartner.name}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Specialization:</p>
                                        <p>{selectedPartner.specialization}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Hospital/Practice:</p>
                                        <p>{selectedPartner.hospital}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Status:</p>
                                        <p>{getStatusBadge(selectedPartner.status)}</p>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-lg">Contact Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div>
                                        <p className="text-sm text-gray-500">Phone:</p>
                                        <p className="flex items-center">
                                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                          {selectedPartner.phone}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Email:</p>
                                        <p className="flex items-center">
                                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                          {selectedPartner.email}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-lg">Referral Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                      <div>
                                        <p className="text-sm text-gray-500">Active Patients:</p>
                                        <p className="font-medium">{selectedPartner.activePatients}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Total Referrals:</p>
                                        <p className="font-medium">{selectedPartner.totalReferrals}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Last Referral:</p>
                                        <p className="flex items-center">
                                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                          {selectedPartner.lastReferral}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-sm text-gray-500">Commission Rate:</p>
                                        <p className="font-medium">{selectedPartner.commission}%</p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                <div className="mt-6">
                                  <h3 className="font-medium text-lg mb-4">Recent Referrals</h3>
                                  <div className="rounded-md border">
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          <TableHead>ID</TableHead>
                                          <TableHead>Patient</TableHead>
                                          <TableHead>Test Type</TableHead>
                                          <TableHead>Date</TableHead>
                                          <TableHead>Amount</TableHead>
                                          <TableHead>Commission</TableHead>
                                          <TableHead>Status</TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {getPartnerReferrals(selectedPartner.id).length > 0 ? (
                                          getPartnerReferrals(selectedPartner.id).map(referral => (
                                            <TableRow key={referral.id}>
                                              <TableCell className="font-medium">{referral.id}</TableCell>
                                              <TableCell>{referral.patientName}</TableCell>
                                              <TableCell>{referral.testType}</TableCell>
                                              <TableCell>{referral.referralDate}</TableCell>
                                              <TableCell>${referral.amount}</TableCell>
                                              <TableCell>${referral.commission}</TableCell>
                                              <TableCell>{getReferralStatusBadge(referral.status)}</TableCell>
                                            </TableRow>
                                          ))
                                        ) : (
                                          <TableRow>
                                            <TableCell colSpan={7} className="text-center py-4">
                                              No referrals found
                                            </TableCell>
                                          </TableRow>
                                        )}
                                      </TableBody>
                                    </Table>
                                  </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-2">
                                  <Button>
                                    <FileText className="h-4 w-4 mr-2" />
                                    Generate Statement
                                  </Button>
                                  <Button variant="outline">
                                    <Download className="h-4 w-4 mr-2" /> 
                                    Export Data
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No partners found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Referrals</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activePartners.length > 0 ? (
                  activePartners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell className="font-medium">{partner.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            {partner.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-1 text-gray-400" />
                              {partner.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{partner.specialization}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-gray-400" />
                          {partner.hospital}
                        </div>
                      </TableCell>
                      <TableCell>{partner.totalReferrals}</TableCell>
                      <TableCell>{partner.commission}%</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => setSelectedPartner(partner)}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No active partners found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="referrals">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.length > 0 ? (
                  referrals.map((referral) => (
                    <TableRow key={referral.id}>
                      <TableCell className="font-medium">{referral.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          {referral.doctorName}
                        </div>
                      </TableCell>
                      <TableCell>{referral.patientName}</TableCell>
                      <TableCell>{referral.testType}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {referral.referralDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>${referral.amount}</div>
                          <div className="text-xs text-gray-500">
                            Com: ${referral.commission}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getReferralStatusBadge(referral.status)}</TableCell>
                      <TableCell>
                        {referral.paid ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No referrals found
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

export default DiagnosticsPartners;
