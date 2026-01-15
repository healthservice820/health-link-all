
import React, { useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  
  // General settings state
  const [siteName, setSiteName] = useState("HealthLink");
  const [siteDescription, setSiteDescription] = useState("Healthcare Management Platform");
  const [supportEmail, setSupportEmail] = useState("support@healthlink.com");
  const [timeZone, setTimeZone] = useState("UTC");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  
  // Security settings state
  const [passwordPolicy, setPasswordPolicy] = useState("medium");
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [enableTwoFactor, setEnableTwoFactor] = useState(true);
  const [enableIpRestriction, setEnableIpRestriction] = useState(false);
  const [enableAuditLogging, setEnableAuditLogging] = useState(true);
  
  // Notification settings state
  const [enableEmailNotifications, setEnableEmailNotifications] = useState(true);
  const [enableSmsNotifications, setEnableSmsNotifications] = useState(true);
  const [enablePushNotifications, setEnablePushNotifications] = useState(false);
  const [adminEmailRecipients, setAdminEmailRecipients] = useState("admin@healthlink.com, tech@healthlink.com");
  
  const handleSaveSettings = () => {
    // In a real application, this would save the settings to your backend
    toast.success("Settings saved successfully!");
  };
  
  return (
    <DashboardPageLayout
      title="System Settings"
      description="Configure system-wide settings and preferences"
      role="admin"
    >
      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full md:w-[600px] grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input
                  id="site-name"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="support-email">Support Email</Label>
                <Input
                  id="support-email"
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select value={timeZone} onValueChange={setTimeZone}>
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Asia/Kolkata">India Standard Time (IST)</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select value={dateFormat} onValueChange={setDateFormat}>
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="YYYY.MM.DD">YYYY.MM.DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select value={passwordPolicy} onValueChange={setPasswordPolicy}>
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Select password policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Basic (Minimum 8 characters)</SelectItem>
                    <SelectItem value="medium">Medium (Min 10 chars, 1 uppercase, 1 number)</SelectItem>
                    <SelectItem value="high">Strong (Min 12 chars, uppercase, number, special)</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  min="1"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                </div>
                <Switch
                  id="two-factor"
                  checked={enableTwoFactor}
                  onCheckedChange={setEnableTwoFactor}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ip-restriction">IP Restriction</Label>
                  <p className="text-sm text-muted-foreground">Limit access to specific IP addresses</p>
                </div>
                <Switch
                  id="ip-restriction"
                  checked={enableIpRestriction}
                  onCheckedChange={setEnableIpRestriction}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="audit-logging">Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">Track all administrative actions</p>
                </div>
                <Switch
                  id="audit-logging"
                  checked={enableAuditLogging}
                  onCheckedChange={setEnableAuditLogging}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send system alerts via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={enableEmailNotifications}
                  onCheckedChange={setEnableEmailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send system alerts via SMS</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={enableSmsNotifications}
                  onCheckedChange={setEnableSmsNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send system alerts via browser push</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={enablePushNotifications}
                  onCheckedChange={setEnablePushNotifications}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="admin-email-recipients">Admin Email Recipients</Label>
                <Textarea
                  id="admin-email-recipients"
                  value={adminEmailRecipients}
                  onChange={(e) => setAdminEmailRecipients(e.target.value)}
                  placeholder="Enter email addresses separated by commas"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">Enter email addresses separated by commas</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end mt-6">
        <Button 
          onClick={handleSaveSettings} 
          className="bg-healthcare-primary hover:bg-healthcare-accent"
        >
          <Save className="mr-2 h-4 w-4" /> Save Settings
        </Button>
      </div>
    </DashboardPageLayout>
  );
};

export default AdminSettings;
