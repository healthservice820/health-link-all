import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type PaymentSource = "self" | "insurance" | "government" | "donor" | "privateOrg";
type HealthPlan = "basic" | "intermediate" | "premium";

const SignUpWithPlan = () => {
  const location = useLocation();
  const selectedPlan = (location.state?.plan as HealthPlan) || "basic";
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    paymentSource: "self" as PaymentSource,
    insuranceProvider: "",
    governmentAgency: "",
    donorOrganization: "",
    privateOrganization: "",
    selectedPlan: selectedPlan,
    agreeToTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { signUp, user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!formData.agreeToTerms) {
      toast.error("You must agree to the terms and conditions");
      setIsLoading(false);
      return;
    }

    try {
      await signUp(
        formData.email, 
        formData.password,
        {
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          paymentSource: formData.paymentSource,
          insuranceProvider: formData.paymentSource === "insurance" ? formData.insuranceProvider : null,
          governmentAgency: formData.paymentSource === "government" ? formData.governmentAgency : null,
          donorOrganization: formData.paymentSource === "donor" ? formData.donorOrganization : null,
          privateOrganization: formData.paymentSource === "privateOrg" ? formData.privateOrganization : null,
          healthPlan: formData.selectedPlan,
        }
      );
      toast.success("Account created successfully! Please check your email to verify your account.");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if already logged in
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
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Join HealthLink and choose your health plan
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
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
                  placeholder="+1234567890" 
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              
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
                  <Link 
                    to="/plans" 
                    state={{ fromSignup: true }}
                    className="ml-auto text-sm text-healthcare-primary hover:underline"
                  >
                    Change plan
                  </Link>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Who will be paying for your plan?</Label>
                <RadioGroup 
                  defaultValue="self" 
                  className="grid grid-cols-2 gap-2"
                  onValueChange={(value) => handleSelectChange("paymentSource", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="self" id="self" />
                    <Label htmlFor="self">Myself</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="insurance" id="insurance" />
                    <Label htmlFor="insurance">Insurance</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="government" id="government" />
                    <Label htmlFor="government">Government</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="donor" id="donor" />
                    <Label htmlFor="donor">Donor Org</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="privateOrg" id="privateOrg" />
                    <Label htmlFor="privateOrg">Private Org</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {formData.paymentSource === "insurance" && (
                <div className="space-y-2">
                  <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                  <Input 
                    id="insuranceProvider" 
                    name="insuranceProvider"
                    type="text" 
                    placeholder="Provider name" 
                    value={formData.insuranceProvider}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              
              {formData.paymentSource === "government" && (
                <div className="space-y-2">
                  <Label htmlFor="governmentAgency">Government Agency</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("governmentAgency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select agency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nhis">National Health Insurance</SelectItem>
                      <SelectItem value="state">State Health Scheme</SelectItem>
                      <SelectItem value="other">Other Government Agency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {formData.paymentSource === "donor" && (
                <div className="space-y-2">
                  <Label htmlFor="donorOrganization">Donor Organization</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("donorOrganization", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="who">World Health Organization</SelectItem>
                      <SelectItem value="unicef">UNICEF</SelectItem>
                      <SelectItem value="redcross">Red Cross</SelectItem>
                      <SelectItem value="other">Other Organization</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {formData.paymentSource === "privateOrg" && (
                <div className="space-y-2">
                  <Label htmlFor="privateOrganization">Private Organization</Label>
                  <div className="flex flex-col gap-2">
                    <Select
                      onValueChange={(value) => handleSelectChange("privateOrganization", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select organization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corporate">Corporate Sponsor</SelectItem>
                        <SelectItem value="foundation">Health Foundation</SelectItem>
                        <SelectItem value="religious">Religious Organization</SelectItem>
                        <SelectItem value="other">Other Private Organization</SelectItem>
                      </SelectContent>
                    </Select>
                    {formData.privateOrganization === "other" && (
                      <Input
                        name="privateOrganization"
                        placeholder="Please specify organization name"
                        value={formData.privateOrganization}
                        onChange={handleChange}
                        required
                      />
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
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
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                className="w-full bg-healthcare-primary hover:bg-healthcare-accent" 
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-healthcare-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default SignUpWithPlan;