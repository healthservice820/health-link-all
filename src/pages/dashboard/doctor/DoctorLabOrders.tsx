
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Search, User, Calendar, Plus, X, MapPin, Database } from "lucide-react";
import SearchInput from "@/components/shared/SearchInput";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const DoctorLabOrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all-orders");
  const { toast } = useToast();

  const [nearbyDiagnosticCenters, setNearbyDiagnosticCenters] = useState([
    { id: 1, name: "City Diagnostics", distance: "0.8 km", address: "234 Main St", homeCollection: true },
    { id: 2, name: "LabCorp Center", distance: "1.5 km", address: "567 Oak Ave", homeCollection: false },
    { id: 3, name: "MedLab Diagnostics", distance: "2.1 km", address: "890 Pine Rd", homeCollection: true },
    { id: 4, name: "HealthTest Center", distance: "3.2 km", address: "112 Elm St", homeCollection: true },
  ]);
  
  const [patientList, setPatientList] = useState([
    { id: 1, name: "John Smith" },
    { id: 2, name: "Emily Johnson" },
    { id: 3, name: "Michael Brown" },
    { id: 4, name: "Sarah Wilson" },
  ]);

  // Mock data for lab orders
  const labOrders = [
    { 
      id: 1, 
      patient: "John Smith", 
      date: "2025-05-05", 
      tests: ["Complete Blood Count", "Lipid Panel"],
      status: "Pending",
      diagnosticCenter: "City Diagnostics",
      homeCollection: false
    },
    { 
      id: 2, 
      patient: "Emily Johnson", 
      date: "2025-05-04", 
      tests: ["Thyroid Function Test", "Vitamin D Test"],
      status: "Completed",
      diagnosticCenter: "LabCorp Center",
      homeCollection: false
    },
    { 
      id: 3, 
      patient: "Michael Brown", 
      date: "2025-05-03", 
      tests: ["Liver Function Test", "Kidney Function Test"],
      status: "Pending",
      diagnosticCenter: "MedLab Diagnostics",
      homeCollection: true
    },
    { 
      id: 4, 
      patient: "Sarah Wilson", 
      date: "2025-04-28", 
      tests: ["HbA1c", "Blood Glucose Test"],
      status: "Scheduled",
      diagnosticCenter: "HealthTest Center",
      homeCollection: true
    },
  ];

  // Mock data for new lab order
  const [tests, setTests] = useState([
    { name: "" }
  ]);

  const form = useForm({
    defaultValues: {
      patient: "",
      date: new Date().toISOString().split('T')[0],
      diagnosticCenter: "",
      homeCollection: false,
      priority: "normal",
      notes: ""
    }
  });

  const addTest = () => {
    setTests([...tests, { name: "" }]);
  };

  const removeTest = (index) => {
    const updatedTests = [...tests];
    updatedTests.splice(index, 1);
    setTests(updatedTests);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleSubmitLabOrder = (data) => {
    if (tests[0].name === "") {
      toast({
        title: "Missing tests",
        description: "Please add at least one test to the lab order",
        variant: "destructive"
      });
      return;
    }

    if (!data.diagnosticCenter) {
      toast({
        title: "Missing diagnostic center",
        description: "Please select a diagnostic center for the lab order",
        variant: "destructive"
      });
      return;
    }

    // In a real implementation, this would submit the lab order to the backend
    console.log("Lab order data:", {
      ...data,
      tests: tests.map(test => test.name)
    });

    toast({
      title: "Lab order created",
      description: `Lab order for ${data.patient} has been sent to ${data.diagnosticCenter}`,
    });

    // Reset form and tests
    form.reset();
    setTests([{ name: "" }]);
    setActiveTab("all-orders");
  };

  // Filter lab orders based on search term
  const filteredLabOrders = labOrders.filter(order => 
    order.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.tests.some(test => test.toLowerCase().includes(searchTerm.toLowerCase())) ||
    order.diagnosticCenter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardPageLayout title="Lab Orders" description="Create and manage patient lab orders" role="doctor">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all-orders">All Lab Orders</TabsTrigger>
          <TabsTrigger value="create-order">Create Lab Order</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all-orders">
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative md:w-2/3">
              <SearchInput 
                placeholder="Search lab orders by patient name, test, or diagnostic center" 
                value={searchTerm}
                onChange={setSearchTerm}
              />
            </div>
            <Button 
              className="bg-healthcare-primary hover:bg-healthcare-accent md:w-1/3"
              onClick={() => setActiveTab("create-order")}
            >
              Create New Lab Order
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Tests</TableHead>
                  <TableHead>Diagnostic Center</TableHead>
                  <TableHead>Home Collection</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLabOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {order.patient}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        {order.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        {order.tests.map((test, index) => (
                          <div key={index} className="text-sm">
                            {test}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {order.diagnosticCenter}
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.homeCollection ? 
                        <span className="text-green-600">Yes</span> : 
                        <span className="text-gray-500">No</span>
                      }
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === "Completed" 
                          ? "bg-green-100 text-green-800" 
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline">Actions</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>View Results</DropdownMenuItem>
                          <DropdownMenuItem>Edit Order</DropdownMenuItem>
                          <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="create-order">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-6 flex items-center">
                <Database className="h-5 w-5 mr-2 text-healthcare-primary" />
                New Lab Order
              </h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitLabOrder)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="patient"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Patient</FormLabel>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select patient" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {patientList.map(patient => (
                                <SelectItem key={patient.id} value={patient.name}>
                                  {patient.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium">
                        Tests
                      </label>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={addTest}
                        className="flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Test
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {tests.map((test, index) => (
                        <div key={index} className="border rounded-md p-4 relative">
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTest(index)}
                              className="absolute right-2 top-2 text-gray-400 hover:text-red-500 p-0 h-auto"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                          
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">
                              Test Name
                            </label>
                            <Input 
                              placeholder="e.g., Complete Blood Count (CBC)" 
                              value={test.name}
                              onChange={(e) => {
                                const newTests = [...tests];
                                newTests[index].name = e.target.value;
                                setTests(newTests);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="diagnosticCenter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diagnostic Center</FormLabel>
                        <Select 
                          onValueChange={(value) => {
                            field.onChange(value);
                            // Find selected center to check if it offers home collection
                            const selectedCenter = nearbyDiagnosticCenters.find(center => center.name === value);
                            if (selectedCenter && selectedCenter.homeCollection) {
                              // Make home collection available
                              form.setValue("homeCollection", false);
                            }
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select diagnostic center" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {nearbyDiagnosticCenters.map(center => (
                              <SelectItem key={center.id} value={center.name}>
                                {center.name} - {center.distance} {center.homeCollection && "- Home Collection Available"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="homeCollection"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="h-4 w-4 rounded border-gray-300 text-healthcare-primary focus:ring-healthcare-accent"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-medium">
                          Request Home Collection (if available)
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="urgent">Urgent</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Clinical Notes</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Any relevant clinical information or special instructions" 
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4 flex justify-end gap-3">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        form.reset();
                        setTests([{ name: "" }]);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-healthcare-primary hover:bg-healthcare-accent">
                      Create Lab Order
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardPageLayout>
  );
};

export default DoctorLabOrdersPage;
