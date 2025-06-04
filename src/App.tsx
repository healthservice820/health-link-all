import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import ProviderApplicationForm from './components/ProviderApplicationForm'

// Create placeholder pages for navigation links
import FindDoctor from './pages/FindDoctor'
import Diagnostics from './pages/Diagnostics'
import Symptoms from './pages/Symptoms'
import About from './pages/About'
import Login from './pages/Login'
import SignUpWithPlan from './pages/SignUpWithPlan'
import BookDoctor from './pages/BookDoctor'

import Emergency from './pages/Emergency'
import Plans from './pages/Plans'

// Dashboard imports
import DashboardRouter from './components/dashboard/DashboardRouter'
import DoctorDashboard from './pages/dashboard/DoctorDashboard'
import PharmacyDashboard from './pages/dashboard/PharmacyDashboard'
import DiagnosticsDashboard from './pages/dashboard/DiagnosticsDashboard'
import AmbulanceDashboard from './pages/dashboard/AmbulanceDashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import FinanceControllerDashboard from './pages/dashboard/FinanceControllerDashboard'
import CustomerCareDashboard from './pages/dashboard/CustomerCareDashboard'

// Patient dashboard pages
import Appointments from './pages/dashboard/patient/Appointments'
import MedicalRecords from './pages/dashboard/patient/MedicalRecords'
import FindDoctors from './pages/dashboard/patient/FindDoctors'
import PharmacyServices from './pages/dashboard/patient/PharmacyServices'
import DiagnosticServices from './pages/dashboard/patient/DiagnosticServices'
import Payments from './pages/dashboard/patient/Payments'

// Doctor dashboard pages
import DoctorAppointments from './pages/dashboard/doctor/DoctorAppointments'
import DoctorPatients from './pages/dashboard/doctor/DoctorPatients'
import DoctorPrescriptions from './pages/dashboard/doctor/DoctorPrescriptions'
import DoctorLabOrders from './pages/dashboard/doctor/DoctorLabOrders'
import Telemedicine from './pages/dashboard/doctor/Telemedicine'
import Earnings from './pages/dashboard/doctor/Earnings'

// Pharmacy dashboard pages
import PharmacyPrescriptions from './pages/dashboard/pharmacy/PharmacyPrescriptions'
import PharmacyInventory from './pages/dashboard/pharmacy/PharmacyInventory'
import PharmacyCustomers from './pages/dashboard/pharmacy/PharmacyCustomers'
import PharmacyDeliveries from './pages/dashboard/pharmacy/PharmacyDeliveries'
import PharmacySuppliers from './pages/dashboard/pharmacy/PharmacySuppliers'
import PharmacyReports from './pages/dashboard/pharmacy/PharmacyReports'
import PharmacyEmergencyStock from './pages/dashboard/pharmacy/PharmacyEmergencyStock'
import PharmacyBilling from './pages/dashboard/pharmacy/PharmacyBilling'

// Diagnostics dashboard pages
import DiagnosticsAppointments from './pages/dashboard/diagnostics/DiagnosticsAppointments'
import DiagnosticsResults from './pages/dashboard/diagnostics/DiagnosticsResults'
import DiagnosticsPatients from './pages/dashboard/diagnostics/DiagnosticsPatients'
import DiagnosticsSampleCollection from './pages/dashboard/diagnostics/DiagnosticsSampleCollection'
import DiagnosticsPartners from './pages/dashboard/diagnostics/DiagnosticsPartners'
import DiagnosticsReports from './pages/dashboard/diagnostics/DiagnosticsReports'
import DiagnosticsUrgentTests from './pages/dashboard/diagnostics/DiagnosticsUrgentTests'

// Ambulance dashboard pages
import AmbulanceCalls from './pages/dashboard/ambulance/AmbulanceCalls'
import AmbulanceFleet from './pages/dashboard/ambulance/AmbulanceFleet'
import AmbulanceHistory from './pages/dashboard/ambulance/AmbulanceHistory'
import AmbulanceStaff from './pages/dashboard/ambulance/AmbulanceStaff'
import AmbulanceHospitals from './pages/dashboard/ambulance/AmbulanceHospitals'
import AmbulanceMaintenance from './pages/dashboard/ambulance/AmbulanceMaintenance'

// Admin dashboard pages
import AdminUsers from './pages/dashboard/admin/AdminUsers'
import AdminDoctors from './pages/dashboard/admin/AdminDoctors'
import AdminPharmacies from './pages/dashboard/admin/AdminPharmacies'
import AdminDiagnostics from './pages/dashboard/admin/AdminDiagnostics'
import AdminAmbulances from './pages/dashboard/admin/AdminAmbulances'
import AdminReports from './pages/dashboard/admin/AdminReports'
import AdminSettings from './pages/dashboard/admin/AdminSettings'
import AdminPayments from './pages/dashboard/admin/AdminPayments'
import AdminLogs from './pages/dashboard/admin/AdminLogs'
import AdminBackup from './pages/dashboard/admin/AdminBackup'
import ApplicationReview from './pages/dashboard/admin/ApplicationReview'

// Finance Controller dashboard pages
import FinancialOverview from './pages/dashboard/finance/FinancialOverview'
import RevenueAnalytics from './pages/dashboard/finance/RevenueAnalytics'
import ExpenseManagement from './pages/dashboard/finance/ExpenseManagement'
import BudgetPlanning from './pages/dashboard/finance/BudgetPlanning'
import InvoiceManagement from './pages/dashboard/finance/InvoiceManagement'
import PayrollManagement from './pages/dashboard/finance/PayrollManagement'
import FinancialReports from './pages/dashboard/finance/FinancialReports'
import TaxManagement from './pages/dashboard/finance/TaxManagement'

// Customer Care dashboard pages
import ActiveCalls from './pages/dashboard/customer-care/ActiveCalls'
import PatientOnboarding from './pages/dashboard/customer-care/PatientOnboarding'
import ProviderSearch from './pages/dashboard/customer-care/ProviderSearch'
import RecentPatients from './pages/dashboard/customer-care/RecentPatients'
import LocationServices from './pages/dashboard/customer-care/LocationServices'
import ScrollToTop from './ScrollToTop'
import CustomerDashboard from './pages/dashboard/CustomerDashboard'

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/apply" element={<ProviderApplicationForm />} />
            <Route path="/find-doctor" element={<FindDoctor />} />
            <Route path="/diagnostics" element={<Diagnostics />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/plansignup" element={<SignUpWithPlan />} />
            <Route path="/emergency" element={<Emergency />} />

            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardRouter />} />

            {/* Patient dashboard routes */}
            <Route path="/dashboard/patient" element={<CustomerDashboard />} />
            <Route path="/book-doctor" element={<BookDoctor />} />

            {/* Doctor dashboard routes */}
            <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
            <Route
              path="/dashboard/doctor/appointments"
              element={<DoctorAppointments />}
            />
            <Route
              path="/dashboard/doctor/patients"
              element={<DoctorPatients />}
            />
            <Route
              path="/dashboard/doctor/prescriptions"
              element={<DoctorPrescriptions />}
            />
            <Route
              path="/dashboard/doctor/lab-orders"
              element={<DoctorLabOrders />}
            />
            <Route
              path="/dashboard/doctor/telemedicine"
              element={<Telemedicine />}
            />
            <Route path="/dashboard/doctor/earnings" element={<Earnings />} />

            {/* Pharmacy dashboard routes */}
            <Route path="/dashboard/pharmacy" element={<PharmacyDashboard />} />
            <Route
              path="/dashboard/pharmacy/prescriptions"
              element={<PharmacyPrescriptions />}
            />
            <Route
              path="/dashboard/pharmacy/inventory"
              element={<PharmacyInventory />}
            />
            <Route
              path="/dashboard/pharmacy/customers"
              element={<PharmacyCustomers />}
            />
            <Route
              path="/dashboard/pharmacy/deliveries"
              element={<PharmacyDeliveries />}
            />
            <Route
              path="/dashboard/pharmacy/billing"
              element={<PharmacyBilling />}
            />
            <Route
              path="/dashboard/pharmacy/suppliers"
              element={<PharmacySuppliers />}
            />
            <Route
              path="/dashboard/pharmacy/reports"
              element={<PharmacyReports />}
            />
            <Route
              path="/dashboard/pharmacy/emergency-stock"
              element={<PharmacyEmergencyStock />}
            />

            {/* Diagnostics dashboard routes */}
            <Route
              path="/dashboard/diagnostics"
              element={<DiagnosticsDashboard />}
            />
            <Route
              path="/dashboard/diagnostics/appointments"
              element={<DiagnosticsAppointments />}
            />
            <Route
              path="/dashboard/diagnostics/results"
              element={<DiagnosticsResults />}
            />
            <Route
              path="/dashboard/diagnostics/patients"
              element={<DiagnosticsPatients />}
            />
            <Route
              path="/dashboard/diagnostics/sample-collection"
              element={<DiagnosticsSampleCollection />}
            />
            <Route
              path="/dashboard/diagnostics/partners"
              element={<DiagnosticsPartners />}
            />
            <Route
              path="/dashboard/diagnostics/reports"
              element={<DiagnosticsReports />}
            />
            <Route
              path="/dashboard/diagnostics/urgent-tests"
              element={<DiagnosticsUrgentTests />}
            />

            {/* Ambulance dashboard routes */}
            <Route
              path="/dashboard/ambulance"
              element={<AmbulanceDashboard />}
            />
            <Route
              path="/dashboard/ambulance/calls"
              element={<AmbulanceCalls />}
            />
            <Route
              path="/dashboard/ambulance/fleet"
              element={<AmbulanceFleet />}
            />
            <Route
              path="/dashboard/ambulance/history"
              element={<AmbulanceHistory />}
            />
            <Route
              path="/dashboard/ambulance/staff"
              element={<AmbulanceStaff />}
            />
            <Route
              path="/dashboard/ambulance/hospitals"
              element={<AmbulanceHospitals />}
            />
            <Route
              path="/dashboard/ambulance/maintenance"
              element={<AmbulanceMaintenance />}
            />

            {/* Admin dashboard routes */}
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard/admin/users" element={<AdminUsers />} />
            <Route path="/dashboard/admin/doctors" element={<AdminDoctors />} />
            <Route
              path="/dashboard/admin/pharmacies"
              element={<AdminPharmacies />}
            />
            <Route
              path="/dashboard/admin/diagnostics"
              element={<AdminDiagnostics />}
            />
            <Route
              path="/dashboard/admin/ambulances"
              element={<AdminAmbulances />}
            />
            <Route path="/dashboard/admin/reports" element={<AdminReports />} />
            <Route
              path="/dashboard/admin/settings"
              element={<AdminSettings />}
            />
            <Route
              path="/dashboard/admin/payments"
              element={<AdminPayments />}
            />
            <Route path="/dashboard/admin/logs" element={<AdminLogs />} />
            <Route path="/dashboard/admin/backup" element={<AdminBackup />} />
            <Route
              path="/dashboard/admin/applications"
              element={<ApplicationReview />}
            />

            {/* Finance Controller dashboard routes */}
            <Route
              path="/dashboard/finance"
              element={<FinanceControllerDashboard />}
            />
            <Route
              path="/dashboard/finance/overview"
              element={<FinancialOverview />}
            />
            <Route
              path="/dashboard/finance/revenue"
              element={<RevenueAnalytics />}
            />
            <Route
              path="/dashboard/finance/expenses"
              element={<ExpenseManagement />}
            />
            <Route
              path="/dashboard/finance/budget"
              element={<BudgetPlanning />}
            />
            <Route
              path="/dashboard/finance/invoices"
              element={<InvoiceManagement />}
            />
            <Route
              path="/dashboard/finance/payroll"
              element={<PayrollManagement />}
            />
            <Route
              path="/dashboard/finance/reports"
              element={<FinancialReports />}
            />
            <Route path="/dashboard/finance/tax" element={<TaxManagement />} />

            {/* Customer Care dashboard routes */}
            <Route
              path="/dashboard/customer-care"
              element={<CustomerCareDashboard />}
            />
            <Route
              path="/dashboard/customer-care/active-calls"
              element={<ActiveCalls />}
            />
            <Route
              path="/dashboard/customer-care/patient-onboarding"
              element={<PatientOnboarding />}
            />
            <Route
              path="/dashboard/customer-care/provider-search"
              element={<ProviderSearch />}
            />
            <Route
              path="/dashboard/customer-care/recent-patients"
              element={<RecentPatients />}
            />
            <Route
              path="/dashboard/customer-care/location-services"
              element={<LocationServices />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
