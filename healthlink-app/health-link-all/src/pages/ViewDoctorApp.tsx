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
  Stethoscope,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Video,
  Phone,
  MessageSquare,
  User,
  Check,
  X,
  AlertCircle,
  Syringe,
  Plus,
  Loader2,
} from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Layout from '@/components/layout/Layout'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const AppointmentsPage = () => {
  const { user, profile, isLoading: authLoading } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [cancelConfirm, setCancelConfirm] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  useEffect(() => {
    // Simulate fetching appointments
    const fetchAppointments = async () => {
      setIsLoading(true)
      try {
        // Mock data - in a real app, you would fetch from your API
        const mockAppointments = [
          {
            id: 'apt-001',
            doctor: {
              id: 'doc-001',
              name: 'Dr. Adebayo Ogunlesi',
              specialty: 'Cardiology',
              hospital: 'Lagos University Teaching Hospital',
              image: '/doctors/doctor1.jpg',
            },
            date: '2023-06-15',
            time: '10:00 AM',
            type: 'video',
            status: 'confirmed',
            reason: 'Follow-up on hypertension medication',
            joinLink: 'https://meet.healthapp.com/apt-001',
          },
          {
            id: 'apt-002',
            doctor: {
              id: 'doc-002',
              name: 'Dr. Chioma Nwachukwu',
              specialty: 'Pediatrics',
              hospital: 'Reddington Hospital',
              image: '/doctors/doctor2.jpg',
            },
            date: '2023-06-17',
            time: '2:00 PM',
            type: 'physical',
            status: 'upcoming',
            reason: 'Child vaccination',
            address: '123 Medical Way, Victoria Island, Lagos',
          },
          {
            id: 'apt-003',
            doctor: {
              id: 'doc-003',
              name: 'Dr. Ibrahim Mohammed',
              specialty: 'General Medicine',
              hospital: 'Eko Hospitals',
              image: '/doctors/doctor3.jpg',
            },
            date: '2023-05-20',
            time: '11:30 AM',
            type: 'voice',
            status: 'completed',
            reason: 'Annual checkup',
          },
        ]
        setAppointments(mockAppointments)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  if (authLoading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" />

  // Get user plan from profile
  const userPlan = profile?.health_plan || 'basic'

  // Redirect basic users
  if (userPlan === 'basic') {
    return <Navigate to="/dashboard" />
  }

  const handleCancelAppointment = (appointmentId) => {
    setSelectedAppointment(appointmentId)
    setCancelConfirm(true)
  }

  const confirmCancel = async () => {
    setIsCancelling(true)
    try {
      // In a real app, you would call your API here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setAppointments((prev) =>
        prev.filter((apt) => apt.id !== selectedAppointment),
      )
      setCancelConfirm(false)
    } catch (error) {
      console.error('Cancellation failed:', error)
    } finally {
      setIsCancelling(false)
      setSelectedAppointment(null)
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="default">Confirmed</Badge>
      case 'upcoming':
        return <Badge variant="secondary">Upcoming</Badge>
      case 'completed':
        return <Badge variant="outline">Completed</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />
      case 'voice':
        return <Phone className="h-4 w-4" />
      case 'text':
        return <MessageSquare className="h-4 w-4" />
      case 'physical':
        return <User className="h-4 w-4" />
      default:
        return <Stethoscope className="h-4 w-4" />
    }
  }

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === 'confirmed' || apt.status === 'upcoming',
  )
  const pastAppointments = appointments.filter(
    (apt) => apt.status === 'completed' || apt.status === 'cancelled',
  )

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Appointments</h1>
            <p className="text-gray-600">
              Manage your upcoming and past consultations
            </p>
          </div>
          <Button asChild>
            <Link to="/book-doctor">
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Link>
          </Button>
        </div>

        {/* Upcoming Appointments */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Upcoming Appointments</h2>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>Loading appointments...</p>
            </div>
          ) : upcomingAppointments.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {upcomingAppointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={appointment.doctor.image} />
                        <AvatarFallback>
                          {appointment.doctor.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {appointment.doctor.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          {appointment.doctor.specialty}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        {getTypeIcon(appointment.type)}
                        <span className="ml-2 capitalize">
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm font-medium">Reason:</p>
                      <p className="text-sm text-gray-600">
                        {appointment.reason}
                      </p>
                    </div>
                    {appointment.type === 'physical' && appointment.address && (
                      <div className="flex items-start text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{appointment.address}</span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    {appointment.status !== 'completed' && (
                      <Button
                        variant="outline"
                        onClick={() => handleCancelAppointment(appointment.id)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    )}
                    {appointment.type === 'video' && appointment.joinLink && (
                      <Button asChild>
                        <a
                          href={appointment.joinLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Join Consultation
                        </a>
                      </Button>
                    )}
                    {appointment.type !== 'video' && (
                      <Button variant="default">
                        <ChevronRight className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No upcoming appointments</AlertTitle>
              <AlertDescription>
                You don't have any upcoming appointments. Book a new
                consultation to get started.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Past Appointments</h2>
            <div className="grid grid-cols-1 gap-4">
              {pastAppointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={appointment.doctor.image} />
                        <AvatarFallback>
                          {appointment.doctor.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">
                          {appointment.doctor.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          {appointment.doctor.specialty}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        {getTypeIcon(appointment.type)}
                        <span className="ml-2 capitalize">
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm font-medium">Reason:</p>
                      <p className="text-sm text-gray-600">
                        {appointment.reason}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" asChild>
                      <Link to={`/appointments/${appointment.id}`}>
                        <ChevronRight className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Cancellation Confirmation Dialog */}
        {cancelConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Cancel Appointment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Are you sure you want to cancel this appointment? This action
                  cannot be undone.
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCancelConfirm(false)}
                  disabled={isCancelling}
                >
                  No, Keep It
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmCancel}
                  disabled={isCancelling}
                >
                  {isCancelling ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Yes, Cancel'
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default AppointmentsPage
