import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon, CrossIcon, CrownIcon } from "lucide-react"; // Assuming you have these icons
import Layout from "@/components/layout/Layout"

interface PlanFeature {
  name: string;
  basic: boolean | string;
  intermediate: boolean | string;
  premium: boolean | string;
}

export function PlanComparison() {
  const features: PlanFeature[] = [
    {
      name: "Doctor Consultations",
      basic: "5/month",
      intermediate: "15/month",
      premium: "Unlimited",
    },
    {
      name: "Lab Test Discounts",
      basic: "10%",
      intermediate: "20%",
      premium: "30%",
    },
    {
      name: "Medicine Delivery",
      basic: false,
      intermediate: "Standard (48h)",
      premium: "Express (24h)",
    },
    {
      name: "Ambulance Services",
      basic: false,
      intermediate: "Basic Coverage",
      premium: "Priority Dispatch",
    },
    {
      name: "24/7 Support",
      basic: "Email only",
      intermediate: "Chat & Email",
      premium: "Dedicated Line",
    },
    {
      name: "Health Records Storage",
      basic: "6 months",
      intermediate: "1 year",
      premium: "Lifetime",
    },
    {
      name: "Family Members",
      basic: false,
      intermediate: "Up to 3",
      premium: "Up to 5",
    },
    {
      name: "Annual Health Checkup",
      basic: false,
      intermediate: "Basic Package",
      premium: "Comprehensive Package",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Choose the right plan for you
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          HealthLink offers comprehensive healthcare solutions tailored to your needs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Basic Plan */}
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-xl">Basic</CardTitle>
            <CardDescription>Essential healthcare access</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">₦9,999</span>
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
                <span>
                  {typeof feature.basic === "string" 
                    ? `${feature.name}: ${feature.basic}`
                    : feature.name}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Get Started
            </Button>
          </CardFooter>
        </Card>

        {/* Intermediate Plan */}
        <Card className="relative border-2 border-primary">
          <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
            MOST POPULAR
          </div>
          <CardHeader>
            <CardTitle className="text-xl">Intermediate</CardTitle>
            <CardDescription>Enhanced healthcare experience</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">₦19,999</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex items-center">
                {feature.intermediate ? (
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <CrossIcon className="h-5 w-5 text-red-500 mr-2" />
                )}
                <span>
                  {typeof feature.intermediate === "string" 
                    ? `${feature.name}: ${feature.intermediate}`
                    : feature.name}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              Get Started
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="relative">
          <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg flex items-center">
            <CrownIcon className="h-4 w-4 mr-1" />
            PREMIUM
          </div>
          <CardHeader>
            <CardTitle className="text-xl">Premium</CardTitle>
            <CardDescription>Complete healthcare solution</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">₦29,999</span>
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
                <span>
                  {typeof feature.premium === "string" 
                    ? `${feature.name}: ${feature.premium}`
                    : feature.name}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full bg-gradient-to-r from-primary to-purple-600 text-white">
              Get Premium
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>All plans come with a 30-day money-back guarantee.</p>
        <p className="mt-2">Need help choosing? <a href="#" className="text-primary underline">Contact our support</a></p>
      </div>
    </div>
  );
}