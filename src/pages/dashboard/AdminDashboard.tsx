import React from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  ClipboardList,
  LayoutDashboard, 
  User,
  Settings,
  CreditCard,
  FileText,
  Archive,
  Building,
  Activity,
  Ambulance,
  CheckCircle,
  AlertCircle,
  Clock,
  Mail,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  ApplicationStats, 
  ProviderStats,
  ProviderType,
  ApplicationStatus
} from "@/types/provider";

const AdminDashboard = () => {
  const { user, profile, isLoading: authLoading } = useAuth();

  // Fetch application stats
  const { data: appStats, isLoading: statsLoading } = useQuery<ApplicationStats>({
    queryKey: ['admin-application-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('provider_applications')
        .select('status, provider_type');
      
      if (error) throw error;
      
      const applications = data as unknown as Array<{
        status: ApplicationStatus;
        provider_type: ProviderType;
      }>;
      
      return {
        total: applications?.length || 0,
        pending: applications?.filter(app => app.status === 'pending').length || 0,
        approved: applications?.filter(app => app.status === 'approved').length || 0,
        rejected: applications?.filter(app => app.status === 'rejected').length || 0,
        byType: {
          doctor: applications?.filter(app => app.provider_type === 'doctor').length || 0,
          pharmacy: applications?.filter(app => app.provider_type === 'pharmacy').length || 0,
          diagnostic: applications?.filter(app => app.provider_type === 'diagnostic').length || 0,
          ambulance: applications?.filter(app => app.provider_type === 'ambulance').length || 0
        }
      };
    }
  });

  // Fetch provider stats
  const { data: providerStats, isLoading: providersLoading } = useQuery<ProviderStats>({
    queryKey: ['admin-provider-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('provider_profiles')
        .select('provider_type, is_verified');
      
      if (error) throw error;
      
      const profiles = data as unknown as Array<{
        provider_type: ProviderType;
        is_verified: boolean;
      }>;
      
      return {
        total: profiles?.length || 0,
        verified: profiles?.filter(provider => provider.is_verified).length || 0,
        byType: {
          doctor: profiles?.filter(provider => provider.provider_type === 'doctor').length || 0,
          pharmacy: profiles?.filter(provider => provider.provider_type === 'pharmacy').length || 0,
          diagnostic: profiles?.filter(provider => provider.provider_type === 'diagnostic').length || 0,
          ambulance: profiles?.filter(provider => provider.provider_type === 'ambulance').length || 0
        }
      };
    }
  });

  const isLoading = authLoading || statsLoading || providersLoading;

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !profile || profile.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        {/* ... rest of your JSX remains the same ... */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, {profile.first_name || "Admin"}!</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" className="border-healthcare-primary text-healthcare-primary">
              System Status
            </Button>
            <Button className="bg-healthcare-primary hover:bg-healthcare-accent">
              Quick Actions
            </Button>
          </div>
        </div>

        {/* Application Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ClipboardList className="mr-2 h-5 w-5 text-blue-600" />
                Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{appStats?.total || 0}</div>
              <p className="text-sm text-gray-500">Total applications</p>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="mr-2 h-5 w-5 text-yellow-600" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{appStats?.pending || 0}</div>
              <p className="text-sm text-gray-500">Awaiting review</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{appStats?.approved || 0}</div>
              <p className="text-sm text-gray-500">Successful applications</p>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-red-600" />
                Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{appStats?.rejected || 0}</div>
              <p className="text-sm text-gray-500">Unsuccessful applications</p>
            </CardContent>
          </Card>
        </div>

        {/* Provider Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <User className="mr-2 h-5 w-5 text-purple-600" />
                Doctors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{providerStats?.byType?.doctor || 0}</div>
              <p className="text-sm text-gray-500">Active practitioners</p>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Building className="mr-2 h-5 w-5 text-orange-600" />
                Pharmacies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{providerStats?.byType?.pharmacy || 0}</div>
              <p className="text-sm text-gray-500">Registered pharmacies</p>
            </CardContent>
          </Card>
          
          <Card className="bg-indigo-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Activity className="mr-2 h-5 w-5 text-indigo-600" />
                Diagnostics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{providerStats?.byType?.diagnostic || 0}</div>
              <p className="text-sm text-gray-500">Diagnostic centers</p>
            </CardContent>
          </Card>
          
          <Card className="bg-emerald-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Ambulance className="mr-2 h-5 w-5 text-emerald-600" />
                Ambulances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{providerStats?.byType?.ambulance || 0}</div>
              <p className="text-sm text-gray-500">Ambulance services</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Application Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/dashboard/admin/applications">
                  <span>Review Applications</span>
                  <ClipboardList className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/applications/pending">
                  <span>Pending Applications ({appStats?.pending || 0})</span>
                  <Clock className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/invitations">
                  <span>Send Invitations</span>
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/verifications">
                  <span>Verify Providers</span>
                  <CheckCircle className="h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Provider Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/providers/doctors">
                  <span>Manage Doctors</span>
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/providers/pharmacies">
                  <span>Manage Pharmacies</span>
                  <Building className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/providers/diagnostics">
                  <span>Manage Diagnostic Centers</span>
                  <Activity className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild className="w-full bg-healthcare-primary hover:bg-healthcare-accent flex justify-between items-center">
                <Link to="/admin/providers/ambulances">
                  <span>Manage Ambulance Services</span>
                  <Ambulance className="h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild variant="outline" className="w-full flex justify-between items-center">
                <Link to="/admin/settings">
                  <span>System Settings</span>
                  <Settings className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full flex justify-between items-center">
                <Link to="/admin/payments">
                  <span>Payment Configuration</span>
                  <CreditCard className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full flex justify-between items-center">
                <Link to="/admin/reports">
                  <span>Analytics & Reports</span>
                  <LayoutDashboard className="h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">System Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild variant="outline" className="w-full flex justify-between items-center">
                <Link to="/admin/logs">
                  <span>Audit Logs</span>
                  <FileText className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full flex justify-between items-center">
                <Link to="/admin/backup">
                  <span>Backup & Recovery</span>
                  <Archive className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full flex justify-between items-center">
                <Link to="/admin/notifications">
                  <span>Notification Center</span>
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;