
import React from "react";
import { Link } from "react-router-dom";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, UserPlus, Search, Users, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const CustomerCareDashboard = () => {
  const { profile } = useAuth();
  
  // Sample metrics
  const customerCareMetrics = [
    { 
      title: "Active Calls", 
      value: "12",
      change: "+3",
      status: "Waiting",
      icon: <Phone className="h-5 w-5" />,
      path: "/dashboard/customer-care/active-calls"
    },
    { 
      title: "Patient Onboarding", 
      value: "5",
      change: "+2",
      status: "In Progress",
      icon: <UserPlus className="h-5 w-5" />,
      path: "/dashboard/customer-care/patient-onboarding"
    },
    { 
      title: "Provider Search", 
      value: "8",
      change: "-1",
      status: "Pending",
      icon: <Search className="h-5 w-5" />,
      path: "/dashboard/customer-care/provider-search"
    },
    { 
      title: "Recent Patients", 
      value: "24",
      change: "+5",
      status: "Today",
      icon: <Users className="h-5 w-5" />,
      path: "/dashboard/customer-care/recent-patients"
    },
  ];
  
  const dashboardLinks = [
    { title: "Active Calls", description: "Manage and respond to incoming patient calls", icon: <Phone className="h-5 w-5" />, path: "/dashboard/customer-care/active-calls" },
    { title: "Patient Onboarding", description: "Register new patients and update profiles", icon: <UserPlus className="h-5 w-5" />, path: "/dashboard/customer-care/patient-onboarding" },
    { title: "Provider Search", description: "Find nearby doctors, pharmacies and diagnostic centers", icon: <Search className="h-5 w-5" />, path: "/dashboard/customer-care/provider-search" },
    { title: "Recent Patients", description: "View and manage recent patient interactions", icon: <Users className="h-5 w-5" />, path: "/dashboard/customer-care/recent-patients" },
    { title: "Location Services", description: "Find healthcare services based on patient location", icon: <MapPin className="h-5 w-5" />, path: "/dashboard/customer-care/location-services" },
  ];

  return (
    <DashboardPageLayout 
      title="Customer Care Dashboard" 
      description={`Welcome ${profile?.first_name || ''} to the Customer Support Center`}
      role="customer_care"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {customerCareMetrics.map((metric, index) => (
          <Link key={index} to={metric.path}>
            <Card className="hover:bg-gray-50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{metric.title}</CardTitle>
                  <div className="p-2 bg-gray-100 rounded-md">
                    {metric.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-muted-foreground">
                  {metric.change} • {metric.status}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="font-semibold text-xl mt-8 mb-4">Quick Access</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dashboardLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            <Card className="hover:bg-gray-50 transition-colors h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-md">
                    {link.icon}
                  </div>
                  <CardTitle className="text-lg">{link.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{link.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </DashboardPageLayout>
  );
};

export default CustomerCareDashboard;
