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
            
            {/* Other dashboard routes */}
            <Route path="/dashboard/pharmacy" element={<PharmacyDashboard />} />
            <Route path="/dashboard/diagnostics" element={<DiagnosticsDashboard />} />
            <Route path="/dashboard/ambulance" element={<AmbulanceDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
