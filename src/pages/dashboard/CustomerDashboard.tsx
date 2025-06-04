import { useAuth } from '@/contexts/AuthContext'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  HeartPulse,
  Stethoscope,
  Pill,
  Ambulance,
  Calendar,
  User,
  Shield,
  Bell,
  Activity,
  Star,
  Crown,
  Syringe,
  ClipboardList,
  MessageSquare,
  Clock,
  Check,
  Plus,
  X,
  ChevronRight,
} from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AdsterraAd } from '@/components/AdsterraAd'
import Layout from '@/components/layout/Layout'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Tooltip } from '@/components/ui/tooltip'
import { TooltipContent } from '@/components/ui/tooltip'
import { TooltipTrigger } from '@/components/ui/tooltip'

const CustomerDashboard = () => {
  const { user, profile, isLoading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [recentPrescriptions, setRecentPrescriptions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching user data
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch these from your API
        const mockAppointments = [
          {
            id: 1,
            type: 'doctor',
            doctorName: 'Dr. Adebayo',
            date: '2023-06-15',
            time: '10:00 AM',
            status: 'confirmed',
          },
          {
            id: 2,
            type: 'lab',
            testName: 'Blood Work',
            date: '2023-06-17',
            time: '2:00 PM',
            status: 'pending',
          },
        ]

        const mockPrescriptions = [
          {
            id: 1,
            medication: 'Amoxicillin',
            dosage: '500mg',
            frequency: 'Twice daily',
            status: 'active',
            refills: 2,
          },
          {
            id: 2,
            medication: 'Paracetamol',
            dosage: '500mg',
            frequency: 'As needed',
            status: 'completed',
            refills: 0,
          },
        ]

        setUpcomingAppointments(mockAppointments)
        setRecentPrescriptions(mockPrescriptions)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (authLoading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" />

  // Get user plan from profile, default to 'basic' if not available
  const userPlan = profile?.health_plan || 'basic'
  const userName = profile?.full_name || profile?.first_name || 'User'

  // Plan-specific features
  const planFeatures = {
    basic: [
      { icon: <HeartPulse size={20} />, name: 'AI Symptom Checker' },
      { icon: <Bell size={20} />, name: 'Health Tips' },
    ],
    classic: [
      { icon: <Stethoscope size={20} />, name: '5 Doctor Consultations' },
      { icon: <Pill size={20} />, name: '10% Medicine Discount' },
    ],
    premium: [
      { icon: <Stethoscope size={20} />, name: '15 Doctor Consultations' },
      { icon: <Ambulance size={20} />, name: 'Basic Ambulance Coverage' },
      { icon: <Activity size={20} />, name: 'Health Analytics' },
    ],
    executive: [
      { icon: <Stethoscope size={20} />, name: 'Unlimited Consultations' },
      { icon: <Ambulance size={20} />, name: 'Priority Ambulance' },
      { icon: <Star size={20} />, name: 'Executive Concierge' },
      { icon: <Shield size={20} />, name: 'Annual Comprehensive Checkup' },
    ],
  }

  const handleCancelAppointment = (appointmentId) => {
    // In a real app, you would call your API here
    setUpcomingAppointments((prev) =>
      prev.filter((appt) => appt.id !== appointmentId),
    )
  }

  const handleRefillPrescription = (prescriptionId) => {
    // In a real app, you would call your API here
    alert(`Requesting refill for prescription ${prescriptionId}`)
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section - Redesigned */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, {userName}!
              </h1>
              <p className="text-blue-100 mt-1">
                {userPlan === 'basic' && 'Your free health companion'}
                {userPlan === 'classic' && 'Your essential healthcare plan'}
                {userPlan === 'premium' && 'Your premium health experience'}
                {userPlan === 'executive' && 'Your executive health solution'}
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <span className="capitalize font-medium text-sm flex items-center gap-2">
                {userPlan === 'executive' && (
                  <Crown size={16} className="text-amber-300" />
                )}
                {userPlan} plan
              </span>
            </div>
          </div>
        </div>

        {/* Ad for Basic Plan Users */}
        {userPlan === 'basic' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="w-full max-w-[300px] mx-auto">
              {' '}
              {/* Control the width */}
              <AdsterraAd
                adKey={import.meta.env.VITE_ADSTERRA_KEY}
                format="iframe"
                height={250}
                width={300}
                className="mx-auto border border-gray-200 rounded-lg shadow-sm"
                isLoggedIn={!!user}
              />
            </div>
          </div>
        )}

        {/* Navigation Tabs - Updated for mobile responsiveness */}
        <div className="flex overflow-x-auto pb-2 bg-gray-100 rounded-xl">
          <div className="flex space-x-1 p-1 min-w-max">
            {['overview', 'appointments', 'prescriptions', 'lab'].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-white shadow-sm text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Quick Actions - Modern Tile Design */}
            {/* Quick Actions - Modern Tile Design */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {userPlan !== 'basic' ? (
                <>
                  <DashboardButton
                    icon={<Stethoscope className="h-6 w-6 text-blue-600" />}
                    label="Book Doctor"
                    href="/book-doctor"
                    className="bg-white hover:bg-blue-50 border border-gray-200"
                  />
                  <DashboardButton
                    icon={<Syringe className="h-6 w-6 text-purple-600" />}
                    label="Book Lab Test"
                    href="/book-lab"
                    className="bg-white hover:bg-purple-50 border border-gray-200"
                  />
                  <DashboardButton
                    icon={<Pill className="h-6 w-6 text-green-600" />}
                    label="Order Medicine"
                    href="/pharmacy"
                    className="bg-white hover:bg-green-50 border border-gray-200"
                  />
                  <DashboardButton
                    icon={<Ambulance className="h-6 w-6 text-red-600" />}
                    label="Emergency"
                    href="/emergency"
                    disabled={userPlan === 'basic'}
                    className={`${
                      userPlan === 'basic'
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-white hover:bg-red-50 border border-gray-200'
                    }`}
                    tooltip={
                      userPlan === 'basic'
                        ? 'Upgrade for ambulance services'
                        : ''
                    }
                  />
                </>
              ) : (
                <>
                  <DashboardButton
                    icon={<HeartPulse className="h-6 w-6 text-blue-600" />}
                    label="AI Symptom Checker"
                    href="/symptom-checker"
                    className="bg-white hover:bg-blue-50 border border-gray-200"
                  />
                  <DashboardButton
                    icon={<Bell className="h-6 w-6 text-purple-600" />}
                    label="Health Tips"
                    href="/health-tips"
                    className="bg-white hover:bg-purple-50 border border-gray-200"
                  />
                  <div className="col-span-2 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-200">
                    <Button
                      asChild
                      variant="link"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Link to="/plans">Upgrade for More Features</Link>
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Upcoming Appointments */}
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Upcoming Appointments</CardTitle>
                  {userPlan !== 'basic' && (
                    <Button asChild variant="ghost" className="text-blue-600">
                      <Link to="/appointments">View All</Link>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {userPlan === 'basic' ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="mx-auto h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                      <Stethoscope className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Doctor Appointments Locked
                    </h3>
                    <p className="text-sm text-gray-500">
                      Upgrade your plan to book consultations with real doctors
                    </p>
                    <Button asChild className="mt-2">
                      <Link to="/plans" className="flex items-center gap-2">
                        <Crown className="h-4 w-4" />
                        Upgrade Now
                      </Link>
                    </Button>
                  </div>
                ) : isLoading ? (
                  <div className="flex justify-center py-4">
                    <p>Loading appointments...</p>
                  </div>
                ) : upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-white border border-gray-100 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              appointment.type === 'doctor'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-purple-100 text-purple-600'
                            }`}
                          >
                            {appointment.type === 'doctor' ? (
                              <Stethoscope size={20} />
                            ) : (
                              <Syringe size={20} />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {appointment.type === 'doctor'
                                ? `Dr. ${appointment.doctorName}`
                                : appointment.testName}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">
                                {appointment.date}
                              </span>{' '}
                              at {appointment.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300 hover:bg-gray-50"
                            onClick={() =>
                              handleCancelAppointment(appointment.id)
                            }
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-300 hover:bg-blue-50"
                            asChild
                          >
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
                  {userPlan !== 'basic' && (
                    <Button asChild variant="ghost" className="text-blue-600">
                      <Link to="/prescriptions">View All</Link>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {userPlan === 'basic' ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="mx-auto h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
                      <Pill className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Prescription Services
                    </h3>
                    <p className="text-sm text-gray-500">
                      Upgrade your plan to access medication ordering and
                      prescription refills
                    </p>
                    <Button asChild className="mt-2">
                      <Link to="/plans" className="flex items-center gap-2">
                        <Crown className="h-4 w-4" />
                        Upgrade Now
                      </Link>
                    </Button>
                  </div>
                ) : isLoading ? (
                  <div className="flex justify-center py-4">
                    <p>Loading prescriptions...</p>
                  </div>
                ) : recentPrescriptions.length > 0 ? (
                  <div className="space-y-4">
                    {recentPrescriptions.map((prescription) => (
                      <div
                        key={prescription.id}
                        className="p-3 border rounded-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              {prescription.medication}
                            </p>
                            <p className="text-sm text-gray-600">
                              {prescription.dosage} • {prescription.frequency}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              prescription.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
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
                            disabled={
                              prescription.refills === 0 || userPlan === 'basic'
                            }
                            onClick={() =>
                              handleRefillPrescription(prescription.id)
                            }
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
            userPlan={userPlan}
          />
        )}

        {activeTab === 'prescriptions' && (
          <PrescriptionsTab
            prescriptions={recentPrescriptions}
            isLoading={isLoading}
            userPlan={userPlan}
            onRefill={handleRefillPrescription}
          />
        )}

        {activeTab === 'lab' && <LabResultsTab userPlan={userPlan} />}

        {/* Plan Features */}
        <Card className="rounded-xl border border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Your Plan Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {planFeatures[userPlan]?.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="p-2 rounded-full bg-white shadow-xs">
                    {feature.icon}
                  </div>
                  <span className="font-medium text-sm">{feature.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Prompt for Basic Users */}
        {userPlan === 'basic' && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-800">
                Upgrade for More Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Get access to real doctors, medicine discounts, and more!
              </p>
              <Button
                asChild
                variant="outline"
                className="border-blue-300 text-blue-700"
              >
                <Link to="/plans">View Upgrade Options</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}

// Tab Components
const AppointmentsTab = ({ appointments, isLoading, onCancel, userPlan }) => {
  const [activeFilter, setActiveFilter] = useState('all')
  if (userPlan === 'basic') {
    return (
      <div className="text-center py-8 space-y-4">
        <p className="text-gray-500">
          Doctor appointments are available with premium plans
        </p>
        <Button asChild>
          <Link to="/plans">Upgrade Now</Link>
        </Button>
      </div>
    )
  }

  const filteredAppointments = appointments.filter((appt) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'doctor') return appt.type === 'doctor'
    if (activeFilter === 'lab') return appt.type === 'lab'
    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={activeFilter === 'all' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('all')}
        >
          All
        </Button>
        <Button
          variant={activeFilter === 'doctor' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('doctor')}
        >
          Doctor
        </Button>
        <Button
          variant={activeFilter === 'lab' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('lab')}
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
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  {appointment.type === 'doctor' ? (
                    <Stethoscope className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Syringe className="h-4 w-4 text-purple-600" />
                  )}
                  <CardTitle className="text-sm font-medium">
                    {appointment.type === 'doctor'
                      ? 'Doctor Appointment'
                      : 'Lab Test'}
                  </CardTitle>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    appointment.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
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
  )
}

interface PrescriptionsTabProps {
  prescriptions: Array<{
    id: number
    medication: string
    dosage: string
    frequency: string
    status: 'active' | 'completed'
    refills: number
  }>
  isLoading: boolean
  onRefill: (prescriptionId: number) => void
  userPlan: 'basic' | 'classic' | 'premium' | 'executive'
}

const PrescriptionsTab = ({
  prescriptions,
  isLoading,
  onRefill,
  userPlan,
}: PrescriptionsTabProps) => {
  if (userPlan === 'basic') {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="mx-auto h-16 w-16 bg-green-50 rounded-full flex items-center justify-center">
          <Pill className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-medium text-gray-900">
          Prescription Services
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Upgrade to access medication ordering, prescription management, and
          automatic refills.
        </p>
        <div className="pt-4">
          <Button asChild size="lg">
            <Link to="/plans" className="flex items-center gap-2">
              <Crown className="h-5 w-5" />
              View Upgrade Options
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Prescriptions</h3>
        <Button asChild>
          <Link to="/pharmacy">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <p>Loading your prescriptions...</p>
        </div>
      ) : prescriptions.length > 0 ? (
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <Card
              key={prescription.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">
                    {prescription.medication}
                  </CardTitle>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      prescription.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {prescription.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Dosage</p>
                    <p>{prescription.dosage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Frequency</p>
                    <p>{prescription.frequency}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Refills Remaining
                  </p>
                  <p>{prescription.refills}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => onRefill(prescription.id)}
                  disabled={prescription.refills === 0}
                  className="w-full"
                >
                  Request Refill
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 space-y-4">
          <div className="mx-auto h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center">
            <Pill className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium">No Prescriptions</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            You don't have any active prescriptions yet
          </p>
          <Button asChild className="mt-4">
            <Link to="/pharmacy">
              <Plus className="mr-2 h-4 w-4" />
              Request New Prescription
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

const LabResultsTab = ({ userPlan }) => {
  const [labResults, setLabResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching lab results
    setTimeout(() => {
      setLabResults([
        {
          id: 1,
          testName: 'Complete Blood Count',
          date: '2023-05-10',
          status: 'completed',
          hasResults: true,
        },
        {
          id: 2,
          testName: 'Lipid Profile',
          date: '2023-04-15',
          status: 'completed',
          hasResults: true,
        },
        {
          id: 3,
          testName: 'Liver Function Test',
          date: '2023-06-01',
          status: 'pending',
          hasResults: false,
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])
  if (userPlan === 'basic') {
    return (
      <div className="text-center py-8 space-y-4">
        <p className="text-gray-500">
          Lab test services are available with premium plans
        </p>
        <Button asChild>
          <Link to="/plans">Upgrade Now</Link>
        </Button>
      </div>
    )
  }

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
          {labResults.map((result) => (
            <Card key={result.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {result.testName}
                </CardTitle>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    result.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
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
                    {result.hasResults ? 'View Results' : 'Pending'}
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
          <h4 className="font-medium text-blue-800 mb-2">
            Upgrade for Advanced Lab Features
          </h4>
          <p className="text-sm text-blue-700 mb-3">
            Premium plans include discounted lab tests and detailed analysis
            reports.
          </p>
          <Button
            variant="outline"
            className="border-blue-300 text-blue-700"
            asChild
          >
            <Link to="/plans">View Plans</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

// Helper Components

interface DashboardButtonProps {
  icon: React.ReactNode
  label: string
  href: string
  className?: string
  disabled?: boolean
  tooltip?: string
}

const DashboardButton = ({
  icon,
  label,
  href,
  className = '',
  disabled = false,
  tooltip = '',
}: DashboardButtonProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant="ghost"
          disabled={disabled}
          className={`h-24 flex-col gap-3 rounded-xl transition-all ${className}`}
        >
          <Link to={href}>
            <div className="p-2 rounded-full bg-opacity-20">{icon}</div>
            <span className="font-medium text-sm">{label}</span>
          </Link>
        </Button>
      </TooltipTrigger>
      {tooltip && (
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      )}
    </Tooltip>
  </TooltipProvider>
)
interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}

const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <div className="text-center py-8 space-y-3">
    <div className="mx-auto h-12 w-12 text-gray-400">{icon}</div>
    <h3 className="text-sm font-medium text-gray-900">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
    {action && <div className="mt-4">{action}</div>}
  </div>
)

export default CustomerDashboard
