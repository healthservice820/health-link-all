
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const AdminSettings = () => {
  const { user, profile, isLoading } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-8">
          <div className="flex justify-center items-center h-64">
            <p>Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user || !profile || profile.role !== "admin") {
    return <Navigate to="/login" />;
  }

  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      });
    }, 1000);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">System Settings</h1>
            <p className="text-gray-600">Configure platform settings and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>Configure general platform settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="platformName">Platform Name</Label>
                    <Input id="platformName" defaultValue="HealthLink" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input id="supportEmail" type="email" defaultValue="support@healthlink.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input id="contactPhone" defaultValue="+234 123 456 7890" />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>Maintenance Mode</Label>
                      <div className="text-sm text-muted-foreground">
                        Take the platform offline for maintenance
                      </div>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>User Registration</Label>
                      <div className="text-sm text-muted-foreground">
                        Allow new users to register
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Settings</CardTitle>
                  <CardDescription>Configure localization preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <select 
                      id="timezone" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="Africa/Lagos"
                    >
                      <option value="Africa/Lagos">Nigeria (GMT+1)</option>
                      <option value="Africa/Accra">Ghana (GMT+0)</option>
                      <option value="Africa/Cairo">Egypt (GMT+2)</option>
                      <option value="Africa/Johannesburg">South Africa (GMT+2)</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <select 
                      id="dateFormat" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="DD/MM/YYYY"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <select 
                      id="currency" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="NGN"
                    >
                      <option value="NGN">Nigerian Naira (₦)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button 
                  className="bg-healthcare-primary hover:bg-healthcare-accent"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure platform security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <div className="text-sm text-muted-foreground">
                        Require 2FA for administrators
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>Email Verification</Label>
                      <div className="text-sm text-muted-foreground">
                        Require email verification for new accounts
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>Doctor Verification</Label>
                      <div className="text-sm text-muted-foreground">
                        Require manual verification of doctor accounts
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input id="sessionTimeout" type="number" defaultValue="60" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input id="maxLoginAttempts" type="number" defaultValue="5" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Password Policy</CardTitle>
                  <CardDescription>Configure password requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="minPasswordLength">Minimum Password Length</Label>
                    <Input id="minPasswordLength" type="number" defaultValue="8" />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>Require Special Characters</Label>
                      <div className="text-sm text-muted-foreground">
                        Require at least one special character in passwords
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>Require Numbers</Label>
                      <div className="text-sm text-muted-foreground">
                        Require at least one number in passwords
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>Require Mixed Case</Label>
                      <div className="text-sm text-muted-foreground">
                        Require both uppercase and lowercase letters
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button 
                  className="bg-healthcare-primary hover:bg-healthcare-accent"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Configure system email notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>New User Registration</Label>
                      <div className="text-sm text-muted-foreground">
                        Send email when new users register
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>Doctor Registration</Label>
                      <div className="text-sm text-muted-foreground">
                        Send email when new doctors register
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>System Alerts</Label>
                      <div className="text-sm text-muted-foreground">
                        Send email for system critical events
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="adminEmails">Admin Email Recipients</Label>
                    <Input id="adminEmails" defaultValue="admin@healthlink.com, support@healthlink.com" />
                    <p className="text-sm text-muted-foreground">Comma separated list of admin emails</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Push Notification Templates</CardTitle>
                  <CardDescription>Configure system notification templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointmentTemplate">Appointment Reminder Template</Label>
                    <Textarea 
                      id="appointmentTemplate" 
                      defaultValue="Hello {{name}}, this is a reminder about your upcoming appointment with {{doctor}} on {{date}} at {{time}}. Please arrive 15 minutes early." 
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="resultTemplate">Test Result Template</Label>
                    <Textarea 
                      id="resultTemplate" 
                      defaultValue="Hello {{name}}, your test results for {{test}} are now available. Please log in to your account to view them." 
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="prescriptionTemplate">Prescription Template</Label>
                    <Textarea 
                      id="prescriptionTemplate" 
                      defaultValue="Hello {{name}}, your prescription for {{medication}} has been issued by Dr. {{doctor}}. Please visit our pharmacy to collect your medication." 
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button 
                  className="bg-healthcare-primary hover:bg-healthcare-accent"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="integrations">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Gateway</CardTitle>
                  <CardDescription>Configure payment gateway settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="paymentGateway">Payment Provider</Label>
                    <select 
                      id="paymentGateway" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="paystack"
                    >
                      <option value="paystack">Paystack</option>
                      <option value="flutterwave">Flutterwave</option>
                      <option value="stripe">Stripe</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input id="apiKey" type="password" defaultValue="pk_test_xxxxxxxxxxxxxxxxxxxxx" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="secretKey">Secret Key</Label>
                    <Input id="secretKey" type="password" defaultValue="sk_test_xxxxxxxxxxxxxxxxxxxxx" />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>Test Mode</Label>
                      <div className="text-sm text-muted-foreground">
                        Use test environment for transactions
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>SMS Gateway</CardTitle>
                  <CardDescription>Configure SMS notification service</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="smsProvider">SMS Provider</Label>
                    <select 
                      id="smsProvider" 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="termii"
                    >
                      <option value="termii">Termii</option>
                      <option value="twilio">Twilio</option>
                      <option value="smsapi">SMS API</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smsApiKey">API Key</Label>
                    <Input id="smsApiKey" type="password" defaultValue="termii_xxxxxxxxxxxxx" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="senderId">Sender ID</Label>
                    <Input id="senderId" defaultValue="HealthLink" />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label>Enable SMS</Label>
                      <div className="text-sm text-muted-foreground">
                        Enable sending SMS notifications
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button 
                  className="bg-healthcare-primary hover:bg-healthcare-accent"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Settings"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminSettings;
