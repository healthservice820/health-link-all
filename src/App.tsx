
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
            <Route path="/dashboard/patient" element={<PatientDashboard />} />
            <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
            <Route path="/dashboard/pharmacy" element={<PharmacyDashboard />} />
            <Route path="/dashboard/diagnostics" element={<DiagnosticsDashboard />} />
            <Route path="/dashboard/ambulance" element={<AmbulanceDashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
