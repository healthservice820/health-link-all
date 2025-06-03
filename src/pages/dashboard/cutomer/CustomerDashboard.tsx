import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartPulse, Stethoscope, Pill, Ambulance, Calendar, User, Shield, Bell, Activity, Star, Crown, Syringe, ClipboardList, MessageSquare, Clock, Check, Plus, X, ChevronRight } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdsterraAd } from "@/components/AdsterraAds";

export const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentPrescriptions, setRecentPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  

  useEffect(() => {
    // Simulate fetching user data
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch these from your API
        const mockAppointments = [
          { id: 1, type: "doctor", doctorName: "Dr. Adebayo", date: "2023-06-15", time: "10:00 AM", status: "confirmed" },
          { id: 2, type: "lab", testName: "Blood Work", date: "2023-06-17", time: "2:00 PM", status: "pending" }
        ];
        
        const mockPrescriptions = [
          { id: 1, medication: "Amoxicillin", dosage: "500mg", frequency: "Twice daily", status: "active", refills: 2 },
          { id: 2, medication: "Paracetamol", dosage: "500mg", frequency: "As needed", status: "completed", refills: 0 }
        ];

        setUpcomingAppointments(mockAppointments);
        setRecentPrescriptions(mockPrescriptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!user) return <Navigate to="/login" />;

  // Plan-specific features
  const planFeatures = {
    basic: [
      { icon: <HeartPulse size={20} />, name: "AI Symptom Checker" },
      { icon: <Bell size={20} />, name: "Health Tips" }
    ],
    classic: [
      { icon: <Stethoscope size={20} />, name: "5 Doctor Consultations" },
      { icon: <Pill size={20} />, name: "10% Medicine Discount" }
    ],
    premium: [
      { icon: <Stethoscope size={20} />, name: "15 Doctor Consultations" },
      { icon: <Ambulance size={20} />, name: "Basic Ambulance Coverage" },
      { icon: <Activity size={20} />, name: "Health Analytics" }
    ],
    executive: [
      { icon: <Stethoscope size={20} />, name: "Unlimited Consultations" },
      { icon: <Ambulance size={20} />, name: "Priority Ambulance" },
      { icon: <Star size={20} />, name: "Executive Concierge" },
      { icon: <Shield size={20} />, name: "Annual Comprehensive Checkup" }
    ]
  };

  const handleCancelAppointment = (appointmentId) => {
    // In a real app, you would call your API here
    setUpcomingAppointments(prev => 
      prev.filter(appt => appt.id !== appointmentId)
    );
  };

  const handleRefillPrescription = (prescriptionId) => {
    // In a real app, you would call your API here
    alert(`Requesting refill for prescription ${prescriptionId}`);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Welcome back, {user.fullName}!</CardTitle>
              <p className="text-gray-600">
                {user.plan === 'basic' && "Your free health companion"}
                {user.plan === 'classic' && "Your essential healthcare plan"}
                {user.plan === 'premium' && "Your premium health experience"}
                {user.plan === 'executive' && "Your executive health solution"}
              </p>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-sm">
              <span className="capitalize font-medium text-sm flex items-center gap-2">
                {user.plan === 'executive' && <Crown size={16} className="text-amber-500" />}
                {user.plan} plan
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Ad for Basic Plan Users */}
      {user.plan === 'basic' && (
        <div className="my-4">
          <AdsterraAd 
            adKey="a761ba4fad4c4f940ea99e784e321476"
            format="iframe"
            height={250}
            width={300}
            className="mx-auto border border-gray-200 rounded"
          />
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'appointments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'prescriptions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('prescriptions')}
        >
          Prescriptions
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'lab' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('lab')}
        >
          Lab Results
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DashboardButton 
              icon={<Stethoscope size={24} />} 
              label="Book Doctor" 
              href="/book-doctor" 
            />
            <DashboardButton 
              icon={<Syringe size={24} />} 
              label="Book Lab Test" 
              href="/book-lab" 
            />
            <DashboardButton 
              icon={<Pill size={24} />} 
              label="Order Medicine" 
              href="/pharmacy" 
            />
            <DashboardButton 
              icon={<Ambulance size={24} />} 
              label="Emergency" 
              href="/emergency" 
              highlight={user.plan !== 'basic'}
              disabled={user.plan === 'basic'}
              tooltip={user.plan === 'basic' ? "Upgrade for ambulance services" : ""}
            />
          </div>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Upcoming Appointments</CardTitle>
                <Button asChild variant="ghost" className="text-blue-600">
                  <Link to="/appointments">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <p>Loading appointments...</p>
                </div>
              ) : upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map(appointment => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          appointment.type === 'doctor' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                        }`}>
                          {appointment.type === 'doctor' ? <Stethoscope size={20} /> : <Syringe size={20} />}
                        </div>
                        <div>
                          <p className="font-medium">
                            {appointment.type === 'doctor' ? `Dr. ${appointment.doctorName}` : appointment.testName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          Cancel
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/appointments/${appointment.id}`}>
                            Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No upcoming appointments</p>
                  <Button className="mt-2" asChild>
                    <Link to="/book-doctor">Book Appointment</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Prescriptions */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Prescriptions</CardTitle>
                <Button asChild variant="ghost" className="text-blue-600">
                  <Link to="/prescriptions">View All</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <p>Loading prescriptions...</p>
                </div>
              ) : recentPrescriptions.length > 0 ? (
                <div className="space-y-4">
                  {recentPrescriptions.map(prescription => (
                    <div key={prescription.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{prescription.medication}</p>
                          <p className="text-sm text-gray-600">
                            {prescription.dosage} • {prescription.frequency}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          prescription.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {prescription.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <p className="text-sm">
                          Refills left: {prescription.refills}
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled={prescription.refills === 0}
                          onClick={() => handleRefillPrescription(prescription.id)}
                        >
                          Request Refill
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500">No recent prescriptions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 'appointments' && (
        <AppointmentsTab 
          appointments={upcomingAppointments} 
          isLoading={isLoading}
          onCancel={handleCancelAppointment}
          userPlan={user.plan}
        />
      )}

      {activeTab === 'prescriptions' && (
        <PrescriptionsTab 
          prescriptions={recentPrescriptions} 
          isLoading={isLoading}
          onRefill={handleRefillPrescription}
        />
      )}

      {activeTab === 'lab' && (
        <LabResultsTab userPlan={user.plan} />
      )}

      {/* Plan Features */}
      <Card>
        <CardHeader>
          <CardTitle>Your Plan Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {planFeatures[user.plan].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                  {feature.icon}
                </div>
                <span className="font-medium">{feature.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Prompt for Basic Users */}
      {user.plan === 'basic' && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Upgrade for More Features</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Get access to real doctors, medicine discounts, and more!</p>
            <Button asChild variant="outline" className="border-blue-300 text-blue-700">
              <Link to="/plans">View Upgrade Options</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Tab Components
const AppointmentsTab = ({ appointments, isLoading, onCancel, userPlan }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredAppointments = appointments.filter(appt => {
    if (activeFilter === "all") return true;
    if (activeFilter === "doctor") return appt.type === "doctor";
    if (activeFilter === "lab") return appt.type === "lab";
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button 
          variant={activeFilter === "all" ? "default" : "outline"}
          onClick={() => setActiveFilter("all")}
        >
          All
        </Button>
        <Button 
          variant={activeFilter === "doctor" ? "default" : "outline"}
          onClick={() => setActiveFilter("doctor")}
        >
          Doctor
        </Button>
        <Button 
          variant={activeFilter === "lab" ? "default" : "outline"}
          onClick={() => setActiveFilter("lab")}
        >
          Lab
        </Button>
      </div>

      <div className="flex justify-end">
        <Button asChild>
          <Link to="/book-doctor">
            <Plus size={16} className="mr-2" />
            New Appointment
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <p>Loading appointments...</p>
        </div>
      ) : filteredAppointments.length > 0 ? (
        <div className="space-y-4">
          {filteredAppointments.map(appointment => (
            <Card key={appointment.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  {appointment.type === 'doctor' ? (
                    <Stethoscope className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Syringe className="h-4 w-4 text-purple-600" />
                  )}
                  <CardTitle className="text-sm font-medium">
                    {appointment.type === 'doctor' ? 'Doctor Appointment' : 'Lab Test'}
                  </CardTitle>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  appointment.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {appointment.status}
                </span>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">With</span>
                    <span className="text-sm font-medium">
                      {appointment.type === 'doctor' 
                        ? `Dr. ${appointment.doctorName}` 
                        : appointment.testName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Date & Time</span>
                    <span className="text-sm font-medium">
                      {appointment.date} at {appointment.time}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onCancel(appointment.id)}
                >
                  <X size={16} className="mr-2" />
                  Cancel
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to={`/appointments/${appointment.id}`}>
                    <ChevronRight size={16} className="mr-2" />
                    Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 space-y-4">
          <p className="text-gray-500">No appointments found</p>
          <Button asChild>
            <Link to="/book-doctor">
              <Plus size={16} className="mr-2" />
              Book Appointment
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

const PrescriptionsTab = ({ prescriptions, isLoading, onRefill }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button asChild>
          <Link to="/pharmacy">
            <Plus size={16} className="mr-2" />
            Request Prescription
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <p>Loading prescriptions...</p>
        </div>
      ) : prescriptions.length > 0 ? (
        <div className="space-y-4">
          {prescriptions.map(prescription => (
            <Card key={prescription.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{prescription.medication}</CardTitle>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    prescription.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {prescription.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Dosage</span>
                  <span className="text-sm font-medium">{prescription.dosage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Frequency</span>
                  <span className="text-sm font-medium">{prescription.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Refills Remaining</span>
                  <span className="text-sm font-medium">{prescription.refills}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  variant="default" 
                  size="sm" 
                  disabled={prescription.refills === 0}
                  onClick={() => onRefill(prescription.id)}
                >
                  Request Refill
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No prescriptions found</p>
        </div>
      )}
    </div>
  );
};

const LabResultsTab = ({ userPlan }) => {
  const [labResults, setLabResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching lab results
    setTimeout(() => {
      setLabResults([
        { id: 1, testName: "Complete Blood Count", date: "2023-05-10", status: "completed", hasResults: true },
        { id: 2, testName: "Lipid Profile", date: "2023-04-15", status: "completed", hasResults: true },
        { id: 3, testName: "Liver Function Test", date: "2023-06-01", status: "pending", hasResults: false }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Your Lab Tests</h3>
        <Button asChild>
          <Link to="/book-lab">
            <Plus size={16} className="mr-2" />
            Book Lab Test
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <p>Loading lab results...</p>
        </div>
      ) : labResults.length > 0 ? (
        <div className="space-y-4">
          {labResults.map(result => (
            <Card key={result.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {result.testName}
                </CardTitle>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  result.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {result.status}
                </span>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Date</span>
                  <span className="text-sm font-medium">{result.date}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  variant="default" 
                  size="sm" 
                  disabled={!result.hasResults}
                  asChild
                >
                  <Link to={`/lab-results/${result.id}`}>
                    {result.hasResults ? "View Results" : "Pending"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 space-y-4">
          <p className="text-gray-500">No lab results found</p>
          <Button asChild>
            <Link to="/book-lab">
              <Plus size={16} className="mr-2" />
              Book Lab Test
            </Link>
          </Button>
        </div>
      )}

      {userPlan === 'basic' && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">Upgrade for Advanced Lab Features</h4>
          <p className="text-sm text-blue-700 mb-3">
            Premium plans include discounted lab tests and detailed analysis reports.
          </p>
          <Button variant="outline" className="border-blue-300 text-blue-700" asChild>
            <Link to="/plans">View Plans</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

// Helper Components
const DashboardButton = ({ icon, label, href, disabled = false, tooltip = "", highlight = false }) => (
  <Button 
    asChild 
    variant={highlight ? "default" : "outline"} 
    className={`h-24 flex-col gap-2 ${highlight ? 'shadow-md' : ''}`} 
    disabled={disabled}
  >
    <Link to={href}>
      {icon}
      <span>{label}</span>
      {tooltip && (
        <span className="sr-only">{tooltip}</span>
      )}
    </Link>
  </Button>
);