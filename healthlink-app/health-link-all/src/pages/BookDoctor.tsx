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
  Video,
  Phone,
  MessageSquare,
  Navigation,
  Locate,
  Loader2,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const BookDoctor = () => {
  const { user, profile, isLoading: authLoading } = useAuth()
  const [specialty, setSpecialty] = useState('all')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [doctors, setDoctors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState(null)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [consultationType, setConsultationType] = useState('physical')
  const [notes, setNotes] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const navigate = useNavigate()

  // Consultation types
  const consultationTypes = [
    {
      id: 'physical',
      label: 'In-Person Visit',
      icon: <User className="h-4 w-4" />,
    },
    {
      id: 'video',
      label: 'Video Consultation',
      icon: <Video className="h-4 w-4" />,
    },
    { id: 'voice', label: 'Voice Call', icon: <Phone className="h-4 w-4" /> },
    {
      id: 'text',
      label: 'Text Chat',
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ]

  // Get user location
  const getUserLocation = () => {
    setIsLoading(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setIsLoading(false)
      },
      (error) => {
        setLocationError('Unable to retrieve your location')
        setIsLoading(false)
      },
    )
  }

  useEffect(() => {
    getUserLocation()
  }, [])

  useEffect(() => {
    // Simulate fetching doctors data with location filtering
    const fetchDoctors = async () => {
      setIsLoading(true)
      try {
        // Mock data - in a real app, you would fetch from your API with location parameters
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
            distance: userLocation ? '0.5 km away' : '5 km away',
            coordinates: { lat: 6.5244, lng: 3.3792 }, // Lagos coordinates
            acceptsVideo: true,
            acceptsVoice: true,
            acceptsText: true,
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
            distance: userLocation ? '1.2 km away' : '7 km away',
            coordinates: { lat: 6.5244, lng: 3.3792 },
            acceptsVideo: true,
            acceptsVoice: false,
            acceptsText: true,
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
            distance: userLocation ? '2.5 km away' : '10 km away',
            coordinates: { lat: 6.5244, lng: 3.3792 },
            acceptsVideo: false,
            acceptsVoice: true,
            acceptsText: true,
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
        const specialtyFilteredDoctors =
          specialty && specialty !== 'all'
            ? filteredDoctors.filter((doctor) => doctor.specialty === specialty)
            : filteredDoctors

        // Sort by distance if location is available
        const sortedDoctors = userLocation
          ? [...specialtyFilteredDoctors].sort((a, b) => {
              // In a real app, you would calculate actual distance
              return a.distance.localeCompare(b.distance)
            })
          : specialtyFilteredDoctors

        setDoctors(sortedDoctors)
      } catch (error) {
        console.error('Error fetching doctors:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDoctors()
  }, [specialty, searchQuery, userLocation])

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

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor)
  }

  const confirmBooking = async () => {
    setIsBooking(true)
    try {
      // In a real app, you would call your API here
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setBookingSuccess(true)
    } catch (error) {
      console.error('Booking failed:', error)
    } finally {
      setIsBooking(false)
    }
  }

  const closeBookingDialog = () => {
    setSelectedDoctor(null)
    setBookingSuccess(false)
    setConsultationType('physical')
    setNotes('')
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
          <CardFooter className="flex justify-between items-center p-4 border-t">
            <div className="flex items-center gap-2">
              {userLocation ? (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Locate className="h-3 w-3 text-blue-500" />
                  <span>Using your location</span>
                </Badge>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={getUserLocation}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Navigation className="h-4 w-4 mr-2" />
                  )}
                  {locationError ? 'Location Error' : 'Use My Location'}
                </Button>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('')
                setSpecialty('all')
                setDate('')
                setTime('')
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Clear filters
            </Button>
          </CardFooter>
        </Card>

        {/* Doctors List */}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
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
                  <div className="flex items-center text-sm text-gray-600">
                    <Navigation className="h-4 w-4 mr-2" />
                    <span>{doctor.distance}</span>
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
                  <div className="pt-2 flex flex-wrap gap-2">
                    {doctor.acceptsVideo && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Video className="h-3 w-3" />
                        <span>Video</span>
                      </Badge>
                    )}
                    {doctor.acceptsVoice && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Phone className="h-3 w-3" />
                        <span>Voice</span>
                      </Badge>
                    )}
                    {doctor.acceptsText && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <MessageSquare className="h-3 w-3" />
                        <span>Text</span>
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={() => handleBookAppointment(doctor)}
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
            </CardContent>
          </Card>
        )}

        {/* Booking Dialog */}
        {selectedDoctor && (
          <Dialog open={!!selectedDoctor} onOpenChange={closeBookingDialog}>
            <DialogContent>
              {!bookingSuccess ? (
                <>
                  <DialogHeader>
                    <DialogTitle>Confirm Appointment</DialogTitle>
                    <DialogDescription>
                      Book an appointment with {selectedDoctor.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedDoctor.image} />
                        <AvatarFallback>
                          {selectedDoctor.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{selectedDoctor.name}</h4>
                        <p className="text-sm text-gray-600">
                          {selectedDoctor.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{time}</span>
                      </div>
                    </div>
                    <div>
                      <Label>Consultation Type</Label>
                      <RadioGroup
                        value={consultationType}
                        onValueChange={setConsultationType}
                        className="grid grid-cols-2 gap-4 mt-2"
                      >
                        {consultationTypes
                          .filter((type) => {
                            if (type.id === 'video')
                              return selectedDoctor.acceptsVideo
                            if (type.id === 'voice')
                              return selectedDoctor.acceptsVoice
                            if (type.id === 'text')
                              return selectedDoctor.acceptsText
                            return true
                          })
                          .map((type) => (
                            <div key={type.id}>
                              <RadioGroupItem
                                value={type.id}
                                id={type.id}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={type.id}
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <div className="flex items-center gap-2">
                                  {type.icon}
                                  {type.label}
                                </div>
                              </Label>
                            </div>
                          ))}
                      </RadioGroup>
                    </div>
                    <div>
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any symptoms or details you'd like to share..."
                        className="mt-2"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={closeBookingDialog}>
                      Cancel
                    </Button>
                    <Button onClick={confirmBooking} disabled={isBooking}>
                      {isBooking ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Confirm Booking'
                      )}
                    </Button>
                  </DialogFooter>
                </>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle>Appointment Confirmed!</DialogTitle>
                    <DialogDescription>
                      Your appointment with {selectedDoctor.name} has been
                      booked.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={selectedDoctor.image} />
                        <AvatarFallback>
                          {selectedDoctor.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{selectedDoctor.name}</h4>
                        <p className="text-sm text-gray-600">
                          {selectedDoctor.specialty}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>{time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {consultationType === 'physical' && (
                        <>
                          <User className="h-4 w-4 text-gray-500" />
                          <span>In-Person Visit</span>
                        </>
                      )}
                      {consultationType === 'video' && (
                        <>
                          <Video className="h-4 w-4 text-gray-500" />
                          <span>Video Consultation</span>
                        </>
                      )}
                      {consultationType === 'voice' && (
                        <>
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span>Voice Call</span>
                        </>
                      )}
                      {consultationType === 'text' && (
                        <>
                          <MessageSquare className="h-4 w-4 text-gray-500" />
                          <span>Text Chat</span>
                        </>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button asChild>
                      <Link to="/appointments">View Appointments</Link>
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
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
