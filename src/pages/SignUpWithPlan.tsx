import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Heart, ArrowRight, ArrowLeft, CreditCard, Building2, ShieldCheck, Users, Briefcase } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePaystackPayment } from 'react-paystack';

type PaymentSource = "self" | "insurance" | "government" | "donor" | "privateOrg";
type HealthPlan = "basic" | "classic" | "premium" | "executive";

const SignUpWithPlan = () => {
  const location = useLocation();
  const selectedPlan = (location.state?.plan as HealthPlan) || "basic";
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    paymentSource: "self" as PaymentSource,
    organizationName: "",
    userId: "",
    selectedPlan: selectedPlan,
    agreeToTerms: false,
    cardDetails: {
      email: "",
      amount: selectedPlan === "classic" ? 150000 : selectedPlan === "premium" ? 300000 : 1000000, // in kobo
    }
  });

  const planPrices = {
    basic: 0,
    classic: 150000, // ₦1,500 in kobo
    premium: 300000, // ₦3,000 in kobo
    executive: 1000000 // ₦10,000 in kobo
  };

  const config = {
    reference: (new Date()).getTime().toString(),
    email: formData.cardDetails.email,
    amount: planPrices[formData.selectedPlan],
    publicKey:import.meta.env.VITE_PAYSTACK_TEST_KEY,
    currency: "NGN",
  };

  const initializePayment = usePaystackPayment(config);

  const [isLoading, setIsLoading] = useState(false);
  const { signUp, user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      cardDetails: {
        ...prev.cardDetails,
        [name]: value
      }
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onPaystackSuccess = async (reference: any) => {
    try {
      await handleAccountCreation();
      toast.success("Payment successful! Account created.");
    } catch (error: any) {
      toast.error("Payment succeeded but account creation failed: " + error.message);
    }
  };

  const onPaystackClose = () => {
    setPaymentInitiated(false);
    toast.info("Payment window closed");
  };

  const handleAccountCreation = async () => {
    await signUp(
      formData.email, 
      formData.password,
      {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        paymentSource: formData.paymentSource,
        organizationName: formData.paymentSource !== "self" ? formData.organizationName : null,
        userId: formData.paymentSource !== "self" ? formData.userId : null,
        healthPlan: formData.selectedPlan,
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!formData.agreeToTerms) {
      toast.error("You must agree to the terms and conditions");
      setIsLoading(false);
      return;
    }

    if (formData.paymentSource === "self" && formData.selectedPlan !== "basic") {
      setPaymentInitiated(true);
      initializePayment(onPaystackSuccess, onPaystackClose);
    } else {
      try {
        await handleAccountCreation();
        toast.success("Account created successfully!");
      } catch (error: any) {
        toast.error(error.message || "Failed to create account");
      }
    }
    setIsLoading(false);
  };

  const nextStep = () => {
    if (currentStep === 1 && !formData.fullName) {
      toast.error("Please enter your full name");
      return;
    }
    if (currentStep === 1 && !formData.email) {
      toast.error("Please enter your email");
      return;
    }
    if (currentStep === 1 && !formData.phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }
    if (currentStep === 2 && !formData.password) {
      toast.error("Please enter a password");
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-healthcare-light p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Link to="/" className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-healthcare-primary" />
                <span className="text-xl font-bold text-healthcare-primary">HealthLink</span>
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Account Security"}
              {currentStep === 3 && "Payment Method"}
              {currentStep === 4 && "Plan Confirmation"}
            </CardTitle>
            <CardDescription className="text-center">
              Step {currentStep} of 4
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName" 
                      name="fullName"
                      type="text" 
                      placeholder="John Doe" 
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="name@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input 
                      id="phoneNumber" 
                      name="phoneNumber"
                      type="tel" 
                      placeholder="+2348012345678" 
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}

              {/* Step 2: Account Security */}
              {currentStep === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Selected Health Plan</Label>
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <span className="capitalize font-medium">{formData.selectedPlan}</span>
                      {formData.selectedPlan === "basic" && <span className="ml-auto text-sm font-bold">FREE</span>}
                      {formData.selectedPlan === "classic" && <span className="ml-auto text-sm font-bold">₦1,500/month</span>}
                      {formData.selectedPlan === "premium" && <span className="ml-auto text-sm font-bold">₦3,000/month</span>}
                      {formData.selectedPlan === "executive" && <span className="ml-auto text-sm font-bold">₦10,000/month</span>}
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Payment Method */}
              {currentStep === 3 && (
                <>
                  <div className="space-y-2">
                    <Label>Who will be paying for your plan?</Label>
                    <RadioGroup 
                      defaultValue="self" 
                      className="grid grid-cols-2 gap-2"
                      value={formData.paymentSource}
                      onValueChange={(value) => handleSelectChange("paymentSource", value as PaymentSource)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="self" id="self" />
                        <Label htmlFor="self" className="flex items-center gap-1">
                          <CreditCard className="h-4 w-4" /> Self
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="insurance" id="insurance" />
                        <Label htmlFor="insurance" className="flex items-center gap-1">
                          <ShieldCheck className="h-4 w-4" /> Insurance
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="government" id="government" />
                        <Label htmlFor="government" className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" /> Government
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="donor" id="donor" />
                        <Label htmlFor="donor" className="flex items-center gap-1">
                          <Users className="h-4 w-4" /> Donor
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="privateOrg" id="privateOrg" />
                        <Label htmlFor="privateOrg" className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" /> Private Org
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.paymentSource === "self" && formData.selectedPlan !== "basic" && (
                    <div className="space-y-4 border p-4 rounded-md mt-4">
                      <Label className="flex items-center gap-2 text-lg">
                        <CreditCard className="h-5 w-5" /> Card Details (Paystack)
                      </Label>
                      <div className="space-y-2">
                        <Label htmlFor="cardEmail">Email for Payment Receipt</Label>
                        <Input 
                          id="cardEmail" 
                          name="email"
                          type="email" 
                          placeholder="payment@example.com" 
                          value={formData.cardDetails.email}
                          onChange={handleCardDetailsChange}
                          required
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        You'll be redirected to Paystack to complete your payment of {' '}
                        {formData.selectedPlan === "classic" ? '₦1,500' : 
                         formData.selectedPlan === "premium" ? '₦3,000' : '₦10,000'}
                      </p>
                    </div>
                  )}

                  {formData.paymentSource !== "self" && (
                    <div className="space-y-4 border p-4 rounded-md mt-4">
                      <Label className="flex items-center gap-2 text-lg">
                        {formData.paymentSource === "insurance" && <ShieldCheck className="h-5 w-5" />}
                        {formData.paymentSource === "government" && <Building2 className="h-5 w-5" />}
                        {formData.paymentSource === "donor" && <Users className="h-5 w-5" />}
                        {formData.paymentSource === "privateOrg" && <Briefcase className="h-5 w-5" />}
                        Organization Verification
                      </Label>
                      <div className="space-y-2">
                        <Label htmlFor="organizationName">
                          {formData.paymentSource === "insurance" && "Insurance Company Name"}
                          {formData.paymentSource === "government" && "Government Agency Name"}
                          {formData.paymentSource === "donor" && "Donor Organization Name"}
                          {formData.paymentSource === "privateOrg" && "Private Organization Name"}
                        </Label>
                        <Input 
                          id="organizationName" 
                          name="organizationName"
                          type="text" 
                          placeholder={
                            formData.paymentSource === "insurance" ? "e.g. AXA Mansard" :
                            formData.paymentSource === "government" ? "e.g. NHIS" :
                            formData.paymentSource === "donor" ? "e.g. UNICEF" :
                            "e.g. Acme Corp"
                          } 
                          value={formData.organizationName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="userId">
                          {formData.paymentSource === "insurance" && "Policy Number"}
                          {formData.paymentSource === "government" && "Beneficiary ID"}
                          {formData.paymentSource === "donor" && "Donor ID"}
                          {formData.paymentSource === "privateOrg" && "Employee/Member ID"}
                        </Label>
                        <Input 
                          id="userId" 
                          name="userId"
                          type="text" 
                          placeholder="Your identification number" 
                          value={formData.userId}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <>
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg">Review Your Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-semibold">Plan:</span> {formData.selectedPlan.charAt(0).toUpperCase() + formData.selectedPlan.slice(1)}</p>
                      <p><span className="font-semibold">Payment Method:</span> {formData.paymentSource === "self" ? "Self Payment" : formData.organizationName}</p>
                      <p><span className="font-semibold">Amount:</span> {formData.selectedPlan === "basic" ? "FREE" : 
                        formData.selectedPlan === "classic" ? "₦1,500/month" :
                        formData.selectedPlan === "premium" ? "₦3,000/month" : "₦10,000/month"}</p>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-healthcare-primary focus:ring-healthcare-primary"
                      />
                      <Label htmlFor="agreeToTerms">
                        I agree to the <Link to="/terms" className="text-healthcare-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-healthcare-primary hover:underline">Privacy Policy</Link>
                      </Label>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={prevStep} disabled={isLoading}>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 4 ? (
                <Button onClick={nextStep} disabled={isLoading}>
                  Next <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isLoading || paymentInitiated}>
                  {isLoading ? "Processing..." : "Complete Registration"}
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default SignUpWithPlan;