
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Truck, Check, Clock, AlertCircle, Pill, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

const PharmacyServicesPage = () => {
  const { toast } = useToast();
  const [showRefillDialog, setShowRefillDialog] = useState(false);
  const [showRenewalDialog, setShowRenewalDialog] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refillForm = useForm({
    defaultValues: {
      deliveryAddress: "",
      deliveryInstructions: "",
    }
  });

  const renewalForm = useForm({
    defaultValues: {
      reason: "",
      doctorMessage: "",
    }
  });

  // Mock data for medication orders
  const medicationOrders = [
    { id: 1, medication: "Amoxicillin 500mg", quantity: "14 tablets", orderedDate: "2025-05-01", status: "Delivered", deliveryDate: "2025-05-03" },
    { id: 2, medication: "Loratadine 10mg", quantity: "30 tablets", orderedDate: "2025-05-05", status: "Processing", deliveryDate: "Expected: 2025-05-08" },
    { id: 3, medication: "Ibuprofen 400mg", quantity: "20 tablets", orderedDate: "2025-04-28", status: "Delivered", deliveryDate: "2025-04-30" },
  ];

  // Mock data for prescriptions
  const activePrescriptions = [
    { id: 1, medication: "Amoxicillin 500mg", prescribedBy: "Dr. Sarah Johnson", date: "2025-04-15", refillsLeft: 2, status: "Active" },
    { id: 2, medication: "Loratadine 10mg", prescribedBy: "Dr. Michael Chen", date: "2025-04-10", refillsLeft: 5, status: "Active" },
    { id: 3, medication: "Ibuprofen 400mg", prescribedBy: "Dr. James Taylor", date: "2025-04-05", refillsLeft: 0, status: "Expired" },
  ];

  const handleRequestRefill = (prescription: any) => {
    setSelectedPrescription(prescription);
    setShowRefillDialog(true);
    refillForm.reset({
      deliveryAddress: "",
      deliveryInstructions: "",
    });
  };

  const handleRequestRenewal = (prescription: any) => {
    setSelectedPrescription(prescription);
    setShowRenewalDialog(true);
    renewalForm.reset({
      reason: "",
      doctorMessage: "",
    });
  };

  const submitRefillRequest = async (data: any) => {
    if (!selectedPrescription) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call to request refill
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Refill Requested",
        description: `Your refill request for ${selectedPrescription.medication} has been submitted successfully.`,
      });
      
      setShowRefillDialog(false);
    } catch (error) {
      console.error("Failed to request refill:", error);
      toast({
        title: "Request Failed",
        description: "There was an error processing your refill request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitRenewalRequest = async (data: any) => {
    if (!selectedPrescription) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call to request prescription renewal
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Renewal Requested",
        description: `Your renewal request for ${selectedPrescription.medication} has been sent to ${selectedPrescription.prescribedBy}.`,
      });
      
      setShowRenewalDialog(false);
    } catch (error) {
      console.error("Failed to request renewal:", error);
      toast({
        title: "Request Failed",
        description: "There was an error processing your renewal request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardPageLayout title="Pharmacy Services" description="Order medications and track deliveries" role="patient">
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="orders">Medication Orders</TabsTrigger>
          <TabsTrigger value="prescriptions">My Prescriptions</TabsTrigger>
          <TabsTrigger value="new-order">New Order</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicationOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <ShoppingBag className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {order.medication}
                      </div>
                    </TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.orderedDate}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === "Delivered" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {order.status === "Delivered" ? (
                          <Check className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>{order.deliveryDate}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">Track Order</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="prescriptions">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Prescribed By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Refills Left</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activePrescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Pill className="h-4 w-4 mr-2 text-healthcare-primary" />
                        {prescription.medication}
                      </div>
                    </TableCell>
                    <TableCell>{prescription.prescribedBy}</TableCell>
                    <TableCell>{prescription.date}</TableCell>
                    <TableCell>{prescription.refillsLeft}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        prescription.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {prescription.status === "Active" ? (
                          <Check className="h-3 w-3 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 mr-1" />
                        )}
                        {prescription.status}
                      </span>
                    </TableCell>
                    <TableCell className="space-x-2">
                      {prescription.status === "Active" && prescription.refillsLeft > 0 ? (
                        <Button 
                          size="sm" 
                          className="bg-healthcare-primary hover:bg-healthcare-accent"
                          onClick={() => handleRequestRefill(prescription)}
                        >
                          Request Refill
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          disabled={prescription.status !== "Active"}
                          onClick={() => handleRequestRenewal(prescription)}
                        >
                          Request Renewal
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="new-order">
          <div className="max-w-lg mx-auto">
            <form className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Order Medication</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="prescription" className="block text-sm font-medium mb-1">
                      Prescription Upload
                    </label>
                    <div className="border-2 border-dashed rounded-md p-6 text-center">
                      <p className="text-sm text-gray-500 mb-2">
                        Upload a photo of your prescription
                      </p>
                      <Button type="button" variant="outline" className="mx-auto">
                        Upload Image
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="address" className="block text-sm font-medium">
                      Delivery Address
                    </label>
                    <Input id="address" placeholder="Enter your full address" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="notes" className="block text-sm font-medium">
                      Special Instructions (Optional)
                    </label>
                    <Input id="notes" placeholder="Any specific instructions for delivery" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center pt-4 border-t">
                <div className="flex items-center text-healthcare-primary mr-4">
                  <Truck className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Free delivery on orders over $20</span>
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-healthcare-primary hover:bg-healthcare-accent">
                Place Order
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>

      {/* Refill Request Dialog */}
      <Dialog open={showRefillDialog} onOpenChange={setShowRefillDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Pill className="mr-2 h-5 w-5 text-healthcare-primary" />
              Request Medication Refill
            </DialogTitle>
            <DialogDescription>
              {selectedPrescription ? (
                <>Requesting refill for {selectedPrescription.medication}</>
              ) : (
                <>Complete the form to request your medication refill</>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...refillForm}>
            <form onSubmit={refillForm.handleSubmit(submitRefillRequest)} className="space-y-4 py-4">
              <FormField
                control={refillForm.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter your full delivery address" 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={refillForm.control}
                name="deliveryInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Instructions (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any specific delivery instructions" 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowRefillDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-healthcare-primary hover:bg-healthcare-accent"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Request Refill"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Renewal Request Dialog */}
      <Dialog open={showRenewalDialog} onOpenChange={setShowRenewalDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5 text-healthcare-primary" />
              Request Prescription Renewal
            </DialogTitle>
            <DialogDescription>
              {selectedPrescription ? (
                <>
                  Request renewal for {selectedPrescription.medication} from {selectedPrescription.prescribedBy}
                </>
              ) : (
                <>Complete the form to request prescription renewal</>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...renewalForm}>
            <form onSubmit={renewalForm.handleSubmit(submitRenewalRequest)} className="space-y-4 py-4">
              <FormField
                control={renewalForm.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Renewal</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Briefly explain why you need this prescription renewed" 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={renewalForm.control}
                name="doctorMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message for Doctor (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any additional information for your doctor" 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowRenewalDialog(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-healthcare-primary hover:bg-healthcare-accent"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Request Renewal"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DashboardPageLayout>
  );
};

export default PharmacyServicesPage;
