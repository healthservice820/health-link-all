
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create placeholder pages for navigation links
import FindDoctor from "./pages/FindDoctor";
import Diagnostics from "./pages/Diagnostics";
import Symptoms from "./pages/Symptoms";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Emergency from "./pages/Emergency";

// Dashboard imports
import DashboardRouter from "./components/dashboard/DashboardRouter";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import PharmacyDashboard from "./pages/dashboard/PharmacyDashboard";
import DiagnosticsDashboard from "./pages/dashboard/DiagnosticsDashboard";
import AmbulanceDashboard from "./pages/dashboard/AmbulanceDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

// Patient dashboard pages
import Appointments from "./pages/dashboard/patient/Appointments";
import MedicalRecords from "./pages/dashboard/patient/MedicalRecords";
import FindDoctors from "./pages/dashboard/patient/FindDoctors";
import PharmacyServices from "./pages/dashboard/patient/PharmacyServices";
import DiagnosticServices from "./pages/dashboard/patient/DiagnosticServices";
import Payments from "./pages/dashboard/patient/Payments";

// Doctor dashboard pages
import DoctorAppointments from "./pages/dashboard/doctor/DoctorAppointments";
import DoctorPatients from "./pages/dashboard/doctor/DoctorPatients";
import DoctorPrescriptions from "./pages/dashboard/doctor/DoctorPrescriptions";
import DoctorLabOrders from "./pages/dashboard/doctor/DoctorLabOrders";
import Telemedicine from "./pages/dashboard/doctor/Telemedicine";
import Earnings from "./pages/dashboard/doctor/Earnings";

// Pharmacy dashboard pages
import PharmacyPrescriptions from "./pages/dashboard/pharmacy/PharmacyPrescriptions";
import PharmacyInventory from "./pages/dashboard/pharmacy/PharmacyInventory";
import PharmacyCustomers from "./pages/dashboard/pharmacy/PharmacyCustomers";
import PharmacyDeliveries from "./pages/dashboard/pharmacy/PharmacyDeliveries";
import PharmacySuppliers from "./pages/dashboard/pharmacy/PharmacySuppliers";
import PharmacyReports from "./pages/dashboard/pharmacy/PharmacyReports";
import PharmacyEmergencyStock from "./pages/dashboard/pharmacy/PharmacyEmergencyStock";

// Diagnostics dashboard pages
import DiagnosticsAppointments from "./pages/dashboard/diagnostics/DiagnosticsAppointments";
import DiagnosticsResults from "./pages/dashboard/diagnostics/DiagnosticsResults";
import DiagnosticsPatients from "./pages/dashboard/diagnostics/DiagnosticsPatients";
import DiagnosticsSampleCollection from "./pages/dashboard/diagnostics/DiagnosticsSampleCollection";
import DiagnosticsPartners from "./pages/dashboard/diagnostics/DiagnosticsPartners";
import DiagnosticsReports from "./pages/dashboard/diagnostics/DiagnosticsReports";

// Ambulance dashboard pages
import AmbulanceCalls from "./pages/dashboard/ambulance/AmbulanceCalls";
import AmbulanceFleet from "./pages/dashboard/ambulance/AmbulanceFleet";
import AmbulanceHistory from "./pages/dashboard/ambulance/AmbulanceHistory";
import AmbulanceStaff from "./pages/dashboard/ambulance/AmbulanceStaff";
import AmbulanceHospitals from "./pages/dashboard/ambulance/AmbulanceHospitals";
import AmbulanceMaintenance from "./pages/dashboard/ambulance/AmbulanceMaintenance";

// Admin dashboard pages
import AdminUsers from "./pages/dashboard/admin/AdminUsers";
import AdminDoctors from "./pages/dashboard/admin/AdminDoctors";
import AdminReports from "./pages/dashboard/admin/AdminReports";
import AdminSettings from "./pages/dashboard/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/find-doctor" element={<FindDoctor />} />
            <Route path="/diagnostics" element={<Diagnostics />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/emergency" element={<Emergency />} />
            
            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardRouter />} />
            
            {/* Patient dashboard routes */}
            <Route path="/dashboard/patient" element={<PatientDashboard />} />
            <Route path="/dashboard/patient/appointments" element={<Appointments />} />
            <Route path="/dashboard/patient/medical-records" element={<MedicalRecords />} />
            <Route path="/dashboard/patient/find-doctors" element={<FindDoctors />} />
            <Route path="/dashboard/patient/pharmacy-services" element={<PharmacyServices />} />
            <Route path="/dashboard/patient/diagnostic-services" element={<DiagnosticServices />} />
            <Route path="/dashboard/patient/payments" element={<Payments />} />
            
            {/* Doctor dashboard routes */}
            <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
            <Route path="/dashboard/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/dashboard/doctor/patients" element={<DoctorPatients />} />
            <Route path="/dashboard/doctor/prescriptions" element={<DoctorPrescriptions />} />
            <Route path="/dashboard/doctor/lab-orders" element={<DoctorLabOrders />} />
            <Route path="/dashboard/doctor/telemedicine" element={<Telemedicine />} />
            <Route path="/dashboard/doctor/earnings" element={<Earnings />} />
            
            {/* Pharmacy dashboard routes */}
            <Route path="/dashboard/pharmacy" element={<PharmacyDashboard />} />
            <Route path="/dashboard/pharmacy/prescriptions" element={<PharmacyPrescriptions />} />
            <Route path="/dashboard/pharmacy/inventory" element={<PharmacyInventory />} />
            <Route path="/dashboard/pharmacy/customers" element={<PharmacyCustomers />} />
            <Route path="/dashboard/pharmacy/deliveries" element={<PharmacyDeliveries />} />
            <Route path="/dashboard/pharmacy/suppliers" element={<PharmacySuppliers />} />
            <Route path="/dashboard/pharmacy/reports" element={<PharmacyReports />} />
            <Route path="/dashboard/pharmacy/emergency-stock" element={<PharmacyEmergencyStock />} />
            
            {/* Diagnostics dashboard routes */}
            <Route path="/dashboard/diagnostics" element={<DiagnosticsDashboard />} />
            <Route path="/dashboard/diagnostics/appointments" element={<DiagnosticsAppointments />} />
            <Route path="/dashboard/diagnostics/results" element={<DiagnosticsResults />} />
            <Route path="/dashboard/diagnostics/patients" element={<DiagnosticsPatients />} />
            <Route path="/dashboard/diagnostics/sample-collection" element={<DiagnosticsSampleCollection />} />
            <Route path="/dashboard/diagnostics/partners" element={<DiagnosticsPartners />} />
            <Route path="/dashboard/diagnostics/reports" element={<DiagnosticsReports />} />
            
            {/* Ambulance dashboard routes */}
            <Route path="/dashboard/ambulance" element={<AmbulanceDashboard />} />
            <Route path="/dashboard/ambulance/calls" element={<AmbulanceCalls />} />
            <Route path="/dashboard/ambulance/fleet" element={<AmbulanceFleet />} />
            <Route path="/dashboard/ambulance/history" element={<AmbulanceHistory />} />
            <Route path="/dashboard/ambulance/staff" element={<AmbulanceStaff />} />
            <Route path="/dashboard/ambulance/hospitals" element={<AmbulanceHospitals />} />
            <Route path="/dashboard/ambulance/maintenance" element={<AmbulanceMaintenance />} />
            
            {/* Admin dashboard routes */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/users" element={<AdminUsers />} />
            <Route path="/dashboard/admin/doctors" element={<AdminDoctors />} />
            <Route path="/dashboard/admin/reports" element={<AdminReports />} />
            <Route path="/dashboard/admin/settings" element={<AdminSettings />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
