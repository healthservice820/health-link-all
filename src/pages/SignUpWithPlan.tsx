import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, Navigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type UserRole = "patient" | "doctor" | "pharmacy" | "diagnostics" | "ambulance";
type PaymentMethod = "card" | "paypal" | "insurance";
type HealthPlan = "basic" | "standard" | "premium";

const SignUpWithPlan = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState<UserRole>("patient");
  const [selectedPlan, setSelectedPlan] = useState<HealthPlan>("basic");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [organizationName, setOrganizationName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        fullName: `${firstName} ${lastName}`,
        phoneNumber: phone,
        role: userType,
        healthPlan: selectedPlan,
        paymentSource: paymentMethod,
        organizationName: organizationName,
        userId: Math.random().toString(36).substr(2, 9)
      };

      await signUp(email, password, userData);
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
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
                <span className="text-xl font-bold text-healthcare-primary">
                  HealthLink
                </span>
              </Link>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Create an Account
            </CardTitle>
            <CardDescription className="text-center">
              Choose your plan and enter your details to register
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="123-456-7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Account Type</Label>
                <Select onValueChange={(value) => setUserType(value as UserRole)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patient">Patient</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="diagnostics">Diagnostics</SelectItem>
                    <SelectItem value="ambulance">Ambulance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {userType === "doctor" || userType === "pharmacy" || userType === "diagnostics" || userType === "ambulance" ? (
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input
                    id="organizationName"
                    type="text"
                    placeholder="HealthLink Inc."
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    required
                  />
                </div>
              ) : null}
              <div className="space-y-2">
                <Label>Health Plan</Label>
                <RadioGroup defaultValue="basic" className="flex flex-col gap-2" onValueChange={(value) => setSelectedPlan(value as HealthPlan)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="basic" id="plan-basic" />
                    <Label htmlFor="plan-basic">Basic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="plan-standard" />
                    <Label htmlFor="plan-standard">Standard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="premium" id="plan-premium" />
                    <Label htmlFor="plan-premium">Premium</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup defaultValue="card" className="flex flex-col gap-2" onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="payment-card" />
                    <Label htmlFor="payment-card">Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="payment-paypal" />
                    <Label htmlFor="payment-paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="insurance" id="payment-insurance" />
                    <Label htmlFor="payment-insurance">Insurance</Label>
                  </div>
                </RadioGroup>
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
