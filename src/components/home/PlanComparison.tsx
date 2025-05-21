import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon, CrossIcon, CrownIcon, SparklesIcon, StarIcon, ZapIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface PlanFeature {
  name: string;
  basic: boolean | string;
  classic: boolean | string;
  premium: boolean | string;
  executive: boolean | string;
}

export function PlanComparison() {
  const features: PlanFeature[] = [
    {
      name: "AI Symptom Checker",
      basic: true,
      classic: true,
      premium: true,
      executive: true,
    },
    {
      name: "Doctor Consultations",
      basic: false,
      classic: "5/month",
      premium: "15/month",
      executive: "Unlimited",
    },
    {
      name: "Lab Test Discounts",
      basic: false,
      classic: "10%",
      premium: "20%",
      executive: "30%",
    },
    {
      name: "Medicine Delivery",
      basic: false,
      classic: false,
      premium: "Standard (48h)",
      executive: "Express (24h)",
    },
    {
      name: "Ambulance Services",
      basic: false,
      classic: false,
      premium: "Basic Coverage",
      executive: "Priority Dispatch",
    },
    {
      name: "Support Channels",
      basic: "Email only",
      classic: "Chat & Email",
      premium: "24/7 Chat Support",
      executive: "Dedicated Line",
    },
    {
      name: "Health Records",
      basic: "3 months",
      classic: "6 months",
      premium: "1 year",
      executive: "Lifetime",
    },
    {
      name: "Family Members",
      basic: false,
      classic: false,
      premium: "Up to 3",
      executive: "Up to 5",
    },
    {
      name: "Annual Checkup",
      basic: false,
      classic: false,
      premium: "Basic Package",
      executive: "Comprehensive",
    },
    {
      name: "Advertisements",
      basic: true,
      classic: false,
      premium: false,
      executive: false,
    },
    {
      name: "Priority Booking",
      basic: false,
      classic: false,
      premium: true,
      executive: true,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Choose Your Health Plan
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Select the package that best fits your healthcare needs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Basic Plan - Free */}
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-blue-500" />
              Basic
            </CardTitle>
            <CardDescription>AI-powered health assistance</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">₦0</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center">
                {feature.basic ? (
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <CrossIcon className="h-5 w-5 text-red-500 mr-2" />
                )}
                <span className="text-sm">
                  {typeof feature.basic === "string" 
                    ? `${feature.name}: ${feature.basic}`
                    : feature.name}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/plansignup" state={{ plan: "basic" }} onClick={() => window.scrollTo(0, 0)}>
                Get Started
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Classic Plan */}
        <Card className="relative border-2 border-primary">
          <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
            POPULAR CHOICE
          </div>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <StarIcon className="h-5 w-5 text-yellow-500" />
              Classic
            </CardTitle>
            <CardDescription>Essential healthcare access</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">₦1,500</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center">
                {feature.classic ? (
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <CrossIcon className="h-5 w-5 text-red-500 mr-2" />
                )}
                <span className="text-sm">
                  {typeof feature.classic === "string" 
                    ? `${feature.name}: ${feature.classic}`
                    : feature.name}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link to="/plansignup" state={{ plan: "classic" }} onClick={() => window.scrollTo(0, 0)}>
                Choose Classic
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <ZapIcon className="h-5 w-5 text-purple-500" />
              Premium
            </CardTitle>
            <CardDescription>Enhanced healthcare experience</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">₦3,000</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center">
                {feature.premium ? (
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <CrossIcon className="h-5 w-5 text-red-500 mr-2" />
                )}
                <span className="text-sm">
                  {typeof feature.premium === "string" 
                    ? `${feature.name}: ${feature.premium}`
                    : feature.name}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/plansignup" state={{ plan: "premium" }} onClick={() => window.scrollTo(0, 0)}>
                Choose Premium
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Executive Plan */}
        <Card className="relative">
          <div className="absolute top-0 right-0 bg-amber-600 text-white px-3 py-1 text-xs font-bold rounded-bl-lg flex items-center">
            <CrownIcon className="h-4 w-4 mr-1" />
            EXECUTIVE
          </div>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <CrownIcon className="h-5 w-5 text-amber-500" />
              Executive
            </CardTitle>
            <CardDescription>Complete healthcare solution</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">₦10,000</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center">
                {feature.executive ? (
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <CrossIcon className="h-5 w-5 text-red-500 mr-2" />
                )}
                <span className="text-sm">
                  {typeof feature.executive === "string" 
                    ? `${feature.name}: ${feature.executive}`
                    : feature.name}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white" asChild>
              <Link to="/plansignup" state={{ plan: "executive" }} onClick={() => window.scrollTo(0, 0)}>
                Choose Executive
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>All paid plans come with a 14-day money-back guarantee.</p>
        <p className="mt-2">Need help choosing? <a href="#" className="text-primary underline">Contact our support</a></p>
      </div>
    </div>
  );
}