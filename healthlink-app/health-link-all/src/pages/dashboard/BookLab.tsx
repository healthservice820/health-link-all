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
  Syringe,
  ClipboardList,
  Check,
  Calendar,
  MapPin,
  Search,
  Frown,
  Clock,
  ChevronRight,
  Filter,
  Plus,
  Crown,
} from 'lucide-react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Layout from '@/components/layout/Layout'
import { Input } from '@/components/ui/input'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

interface LabTest {
  id: number
  name: string
  price: number
  duration: string
}

interface DiagnosticCenter {
  id: number
  name: string
  address: string
  distance: string
  rating: number
  tests: LabTest[]
  latitude: number
  longitude: number
}

const BookLabTest = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const { user, profile, isLoading: authLoading } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [diagnosticCenters, setDiagnosticCenters] = useState<
    DiagnosticCenter[]
  >([])
  const [filteredCenters, setFilteredCenters] = useState<DiagnosticCenter[]>([])
  const [selectedTests, setSelectedTests] = useState([])
  const [currentStep, setCurrentStep] = useState(1) // 1: search, 2: select tests, 3: confirm
  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState(null)
  const navigate = useNavigate()

  // Get user plan from profile, default to 'basic' if not available
  const userPlan = profile?.health_plan || 'basic'

  useEffect(() => {
    if (userPlan === 'basic') return

    // Simulate fetching diagnostic centers with GPS data
    const fetchDiagnosticCenters = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch these from your API with actual GPS data
        const mockCenters = [
          {
            id: 1,
            name: 'City Medical Diagnostics',
            address: '123 Health St, Medical District',
            distance: '0.5 km',
            rating: 4.8,
            tests: [
              {
                id: 101,
                name: 'Complete Blood Count',
                price: 25,
                duration: '1 hour',
              },
              {
                id: 102,
                name: 'Lipid Profile',
                price: 35,
                duration: '2 hours',
              },
              {
                id: 103,
                name: 'Liver Function Test',
                price: 45,
                duration: '1 day',
              },
            ],
            latitude: 12.3456,
            longitude: 98.7654,
          },
          {
            id: 2,
            name: 'Premium Lab Services',
            address: '456 Wellness Ave, Downtown',
            distance: '1.2 km',
            rating: 4.5,
            tests: [
              {
                id: 201,
                name: 'Thyroid Function Test',
                price: 55,
                duration: '1 day',
              },
              {
                id: 202,
                name: 'Hemoglobin A1C',
                price: 40,
                duration: '1 hour',
              },
              {
                id: 203,
                name: 'Vitamin D Test',
                price: 65,
                duration: '2 days',
              },
            ],
            latitude: 12.3478,
            longitude: 98.769,
          },
          {
            id: 3,
            name: 'Quick Test Labs',
            address: '789 Care Blvd, Uptown',
            distance: '2.5 km',
            rating: 4.2,
            tests: [
              { id: 301, name: 'Urinalysis', price: 20, duration: '30 mins' },
              {
                id: 302,
                name: 'COVID-19 PCR Test',
                price: 75,
                duration: '1 day',
              },
              {
                id: 303,
                name: 'Allergy Panel',
                price: 120,
                duration: '3 days',
              },
            ],
            latitude: 12.3421,
            longitude: 98.7632,
          },
        ]

        setDiagnosticCenters(mockCenters)
        setFilteredCenters(mockCenters)
      } catch (error) {
        console.error('Error fetching diagnostic centers:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          fetchDiagnosticCenters()
        },
        (error) => {
          console.error('Error getting location:', error)
          setLocationError(
            'Unable to retrieve your location. Please enable location services.',
          )
          fetchDiagnosticCenters() // Still fetch centers even without location
        },
      )
    } else {
      setLocationError('Geolocation is not supported by your browser.')
      fetchDiagnosticCenters()
    }
  }, [userPlan])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCenters(diagnosticCenters)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = diagnosticCenters.filter(
        (center) =>
          center.name.toLowerCase().includes(query) ||
          center.address.toLowerCase().includes(query) ||
          center.tests.some((test) => test.name.toLowerCase().includes(query)),
      )
      setFilteredCenters(filtered)
    }
  }, [searchQuery, diagnosticCenters])

  const handleTestSelect = (test) => {
    setSelectedTests((prev) => {
      const exists = prev.some((t) => t.id === test.id)
      if (exists) {
        return prev.filter((t) => t.id !== test.id)
      } else {
        return [...prev, test]
      }
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleConfirmBooking = () => {
    if (!bookingDate || !bookingTime) {
      alert('Please select both date and time for your booking')
      return
    }
    setIsConfirmationOpen(true)
  }

  const completeBooking = () => {
    // In a real app, you would send this data to your API
    console.log('Booking confirmed:', {
      center: diagnosticCenters[0],
      tests: selectedTests,
      date: bookingDate,
      time: bookingTime,
    })

    // Show success and navigate away
    alert('Your lab test has been booked successfully!')
    navigate('/lab-results')
  }

  const handleProceedToBooking = (centerId) => {
    const selectedCenter = diagnosticCenters.find((c) => c.id === centerId)
    navigate('/confirm-lab-booking', {
      state: {
        center: selectedCenter,
        tests: selectedTests.filter((t) => t.centerId === centerId),
      },
    })
  }

  const calculateTotal = (centerId) => {
    return selectedTests
      .filter((test) => test.centerId === centerId)
      .reduce((sum, test) => sum + test.price, 0)
  }

  if (authLoading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" />
  if (userPlan === 'basic') {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-16 w-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <Crown className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl font-semibold">
                Premium Feature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">
                Lab test booking is only available for premium plan members.
              </p>
              <p className="text-gray-600 mb-6">
                Upgrade your plan to access this and other premium features.
              </p>
              <Button asChild className="w-full max-w-xs mx-auto">
                <Link to="/plans">Upgrade Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Book Lab Test</h1>
            <p className="text-gray-600">
              {currentStep === 1 && 'Find diagnostic centers near you'}
              {currentStep === 2 && 'Select tests to book'}
              {currentStep === 3 && 'Confirm your booking'}
            </p>
          </div>

          {currentStep === 1 && (
            <div className="w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search centers or tests..."
                  className="pl-10 w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {locationError && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <Frown className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">{locationError}</p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {currentStep === 1 && (
          <div className="space-y-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2 mt-2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mt-2" />
                      <Skeleton className="h-4 w-3/4 mt-2" />
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-10 w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : filteredCenters.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCenters.map((center) => (
                  <Card
                    key={center.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{center.name}</CardTitle>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{center.address}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Distance</span>
                        <span className="font-medium">{center.distance}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Rating</span>
                        <span className="font-medium">{center.rating}/5</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Available Tests</span>
                        <span className="font-medium">
                          {center.tests.length}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => {
                          setCurrentStep(2)
                          // For demo, we're not tracking which center was selected
                        }}
                      >
                        View Tests
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="mx-auto h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium">
                  No Diagnostic Centers Found
                </h3>
                <p className="text-gray-500">
                  {searchQuery.trim()
                    ? 'Try a different search term'
                    : 'No centers available in your area'}
                </p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-2"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back to centers
            </Button>

            <Card>
              <CardHeader>
                <CardTitle>Available Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {diagnosticCenters[0]?.tests.map((test) => (
                    <div
                      key={test.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedTests.some((t) => t.id === test.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() =>
                        handleTestSelect({
                          ...test,
                          centerId: diagnosticCenters[0].id,
                        })
                      }
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{test.name}</h4>
                          <p className="text-sm text-gray-600">
                            {test.duration}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatCurrency(test.price)}
                          </p>
                          {selectedTests.some((t) => t.id === test.id) ? (
                            <p className="text-xs text-blue-600">Selected</p>
                          ) : (
                            <p className="text-xs text-gray-500">
                              Click to select
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    {selectedTests.length} test
                    {selectedTests.length !== 1 ? 's' : ''} selected
                  </p>
                  {selectedTests.length > 0 && (
                    <p className="font-medium">
                      Total:{' '}
                      {formatCurrency(
                        selectedTests.reduce(
                          (sum, test) => sum + test.price,
                          0,
                        ),
                      )}
                    </p>
                  )}
                </div>
                <Button
                  disabled={selectedTests.length === 0}
                  onClick={() => setCurrentStep(3)}
                >
                  Continue to Booking
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            {/* Back button */}
            <Button
              variant="outline"
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-2"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back to tests
            </Button>

            <Card>
              <CardHeader>
                <CardTitle>Confirm Your Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Diagnostic Center</h4>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <p className="font-medium">{diagnosticCenters[0]?.name}</p>
                    <p className="text-sm text-gray-600">
                      {diagnosticCenters[0]?.address}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      {diagnosticCenters[0]?.distance} away
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Selected Tests</h4>
                  <div className="border rounded-lg divide-y">
                    {selectedTests.map((test) => (
                      <div key={test.id} className="p-4 flex justify-between">
                        <div>
                          <p className="font-medium">{test.name}</p>
                          <p className="text-sm text-gray-600">
                            {test.duration}
                          </p>
                        </div>
                        <p className="font-medium">
                          {formatCurrency(test.price)}
                        </p>
                      </div>
                    ))}
                    <div className="p-4 bg-gray-50 flex justify-between font-medium">
                      <span>Total</span>
                      <span>
                        {formatCurrency(
                          selectedTests.reduce(
                            (sum, test) => sum + test.price,
                            0,
                          ),
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Select Date & Time</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        Date
                      </label>
                      <Input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Clock className="inline h-4 w-4 mr-1" />
                        Time
                      </label>
                      <Input
                        type="time"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Back
                </Button>
                <Button onClick={handleConfirmBooking}>Confirm Booking</Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Confirmation Dialog */}
        <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                Confirm Lab Test Booking
              </DialogTitle>
              <DialogDescription>
                Please review your booking details before confirmation
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Diagnostic Center</h4>
                <p className="text-sm">{diagnosticCenters[0]?.name}</p>
                <p className="text-sm text-gray-600">
                  {diagnosticCenters[0]?.address}
                </p>
              </div>

              <div>
                <h4 className="font-medium">Tests</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {selectedTests.map((test) => (
                    <li key={test.id}>
                      {test.name} - {formatCurrency(test.price)}
                    </li>
                  ))}
                </ul>
                <p className="font-medium mt-2">
                  Total:{' '}
                  {formatCurrency(
                    selectedTests.reduce((sum, test) => sum + test.price, 0),
                  )}
                </p>
              </div>

              <div>
                <h4 className="font-medium">Appointment Time</h4>
                <p className="text-sm">
                  {new Date(bookingDate).toLocaleDateString('en-NG', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm">{bookingTime}</p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsConfirmationOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={completeBooking}>Confirm & Pay</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}

export default BookLabTest
