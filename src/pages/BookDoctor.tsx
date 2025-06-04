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
  User,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Search,
  Filter,
  Star,
  Plus,
  X,
} from 'lucide-react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Layout from '@/components/layout/Layout'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const BookDoctor = () => {
  const { user, profile, isLoading: authLoading } = useAuth()
  const [specialty, setSpecialty] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [doctors, setDoctors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate fetching doctors data
    const fetchDoctors = async () => {
      setIsLoading(true)
      try {
        // Mock data - in a real app, you would fetch from your API
        const mockDoctors = [
          {
            id: 1,
            name: 'Dr. Adebayo Ogunlesi',
            specialty: 'Cardiology',
            hospital: 'Lagos University Teaching Hospital',
            rating: 4.8,
            reviews: 124,
            availableDates: ['2023-06-15', '2023-06-16', '2023-06-17'],
            image: '/doctors/doctor1.jpg',
          },
          {
            id: 2,
            name: 'Dr. Chioma Nwachukwu',
            specialty: 'Pediatrics',
            hospital: 'Reddington Hospital',
            rating: 4.9,
            reviews: 215,
            availableDates: ['2023-06-15', '2023-06-18'],
            image: '/doctors/doctor2.jpg',
          },
          {
            id: 3,
            name: 'Dr. Ibrahim Mohammed',
            specialty: 'General Medicine',
            hospital: 'Eko Hospitals',
            rating: 4.7,
            reviews: 98,
            availableDates: ['2023-06-16', '2023-06-19'],
            image: '/doctors/doctor3.jpg',
          },
          {
            id: 4,
            name: 'Dr. Folake Adebayo',
            specialty: 'Dermatology',
            hospital: 'St. Nicholas Hospital',
            rating: 4.6,
            reviews: 76,
            availableDates: ['2023-06-17', '2023-06-20'],
            image: '/doctors/doctor4.jpg',
          },
        ]

        // Filter based on search query if any
        const filteredDoctors = searchQuery
          ? mockDoctors.filter(
              (doctor) =>
                doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doctor.specialty
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
            )
          : mockDoctors

        // Filter by specialty if selected
        const specialtyFilteredDoctors = specialty
          ? filteredDoctors.filter((doctor) => doctor.specialty === specialty)
          : filteredDoctors

        setDoctors(specialtyFilteredDoctors)
      } catch (error) {
        console.error('Error fetching doctors:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDoctors()
  }, [specialty, searchQuery])

  if (authLoading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" />

  // Get user plan from profile
  const userPlan = profile?.health_plan || 'basic'

  // Redirect basic users
  if (userPlan === 'basic') {
    return <Navigate to="/dashboard" />
  }

  const specialties = [
    { value: 'all', label: 'All Specialties' },
    { value: 'General Medicine', label: 'General Medicine' },
    { value: 'Cardiology', label: 'Cardiology' },
    { value: 'Pediatrics', label: 'Pediatrics' },
    { value: 'Dermatology', label: 'Dermatology' },
    { value: 'Neurology', label: 'Neurology' },
    { value: 'Orthopedics', label: 'Orthopedics' },
    { value: 'Gynecology', label: 'Gynecology' },
    { value: 'Ophthalmology', label: 'Ophthalmology' },
  ]

  const handleBookAppointment = (doctorId) => {
    navigate(`/book-doctor/${doctorId}`, {
      state: { date, time },
    })
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Book Doctor Appointment</h1>
            <p className="text-gray-600">
              Schedule a consultation with our certified specialists
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to="/appointments">
                <ChevronRight className="h-4 w-4 mr-2" />
                View Appointments
              </Link>
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white rounded-xl shadow-sm">
          <CardContent className="p-4 space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row items-center">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search doctors by name or specialty..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/4">
              <Select onValueChange={setSpecialty} value={specialty}>
                <SelectTrigger>
                  <SelectValue placeholder="All Specialties" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((spec) => (
                    <SelectItem key={spec.value} value={spec.value}>
                      {spec.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/4">
              <Input
                type="date"
                placeholder="Select date"
                min={new Date().toISOString().split('T')[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/4">
              <Input
                type="time"
                placeholder="Select time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Doctors List */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <p>Loading doctors...</p>
          </div>
        ) : doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="flex flex-row items-start justify-between pb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={doctor.image} />
                      <AvatarFallback>
                        {doctor.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <p className="text-sm text-gray-600">
                        {doctor.specialty}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{doctor.rating}</span>
                    <span className="text-gray-500">({doctor.reviews})</span>
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{doctor.hospital}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {doctor.availableDates.map((date) => (
                      <Badge
                        key={date}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(date).toLocaleDateString()}</span>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={() => handleBookAppointment(doctor.id)}
                    disabled={!date || !time}
                  >
                    Book Appointment
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">No Doctors Found</h3>
              <p className="text-gray-500">
                {searchQuery
                  ? 'No doctors match your search criteria'
                  : 'No available doctors at the moment'}
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('')
                  setSpecialty('')
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Clear filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Booking Assistance */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">
              Need help booking an appointment?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Our customer care team is available 24/7 to assist you with
              bookings and answer any questions.
            </p>
            <Button variant="outline" className="border-blue-300 text-blue-700">
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default BookDoctor
