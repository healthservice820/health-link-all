
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "./ScrollToTop";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUpWithPlan";
import Plans from "./pages/Plans";
import FindDoctor from "./pages/FindDoctor";
import Symptoms from "./pages/Symptoms";
import Emergency from "./pages/Emergency";
import Diagnostics from "./pages/Diagnostics";
import About from "./pages/About";
import DashboardRouter from "./components/dashboard/DashboardRouter";
import ProviderApplicationForm from "./components/ProviderApplicationForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/find-doctor" element={<FindDoctor />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/diagnostics" element={<Diagnostics />} />
            <Route path="/about" element={<About />} />
            <Route path="/apply" element={<ProviderApplicationForm />} />
            <Route path="/dashboard/*" element={<DashboardRouter />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
