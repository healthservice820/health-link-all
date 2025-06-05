import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import {
  Pill,
  Search,
  ShoppingCart,
  Plus,
  Minus,
  X,
  FileText,
  UploadCloud,
  Loader2,
  AlertCircle,
  Check,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

interface Medicine {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image?: string
  dosage: string
  manufacturer: string
  requiresPrescription: boolean
}

interface CartItem extends Medicine {
  quantity: number
}

const OrderMedicinePage = () => {
  const { user, profile } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCart, setShowCart] = useState(false)
  const [prescriptionUploads, setPrescriptionUploads] = useState<
    Record<string, File>
  >({})
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false)
  const [currentMedicine, setCurrentMedicine] = useState<Medicine | null>(null)

  // Simulate fetching medicines from API
  useEffect(() => {
    const fetchMedicines = async () => {
      setIsLoading(true)
      try {
        // Mock data - in a real app, you would fetch from your API
        const mockMedicines: Medicine[] = [
          {
            id: '1',
            name: 'Amoxicillin',
            description: 'Antibiotic for bacterial infections',
            price: 12.99,
            stock: 50,
            dosage: '500mg',
            manufacturer: 'Pfizer',
            requiresPrescription: true,
          },
          {
            id: '2',
            name: 'Ibuprofen',
            description: 'Pain reliever and anti-inflammatory',
            price: 5.99,
            stock: 100,
            dosage: '200mg',
            manufacturer: 'Advil',
            requiresPrescription: false,
          },
          {
            id: '3',
            name: 'Paracetamol',
            description: 'Pain reliever and fever reducer',
            price: 3.99,
            stock: 75,
            dosage: '500mg',
            manufacturer: 'Tylenol',
            requiresPrescription: false,
          },
          {
            id: '4',
            name: 'Codeine',
            description: 'Pain reliever for moderate to severe pain',
            price: 15.99,
            stock: 20,
            dosage: '30mg',
            manufacturer: 'Generic',
            requiresPrescription: true,
          },
        ]
        setMedicines(mockMedicines)
      } catch (error) {
        console.error('Error fetching medicines:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMedicines()
  }, [])

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addToCart = (medicine: Medicine) => {
    if (medicine.requiresPrescription && !prescriptionUploads[medicine.id]) {
      setCurrentMedicine(medicine)
      setShowPrescriptionDialog(true)
      return
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === medicine.id)

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      } else {
        return [...prevCart, { ...medicine, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (medicineId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== medicineId))
  }

  const updateQuantity = (medicineId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === medicineId ? { ...item, quantity: newQuantity } : item,
      ),
    )
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  const discount =
    profile?.health_plan === 'basic'
      ? 0
      : profile?.health_plan === 'classic'
      ? subtotal * 0.1
      : profile?.health_plan === 'premium'
      ? subtotal * 0.15
      : subtotal * 0.2 // executive plan gets 20% off
  const total = subtotal - discount

  const handleCheckout = () => {
    // In a real app, you would process the order here
    alert(`Order placed successfully! Total: $${total.toFixed(2)}`)
    setCart([])
    setShowCart(false)
  }

  const PrescriptionDialog = () => {
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0])
      }
    }

    const handleUpload = () => {
      if (!file || !currentMedicine) return

      setIsUploading(true)
      // Simulate upload process
      setTimeout(() => {
        setPrescriptionUploads((prev) => ({
          ...prev,
          [currentMedicine.id]: file,
        }))
        setIsUploading(false)
        setShowPrescriptionDialog(false)
        setFile(null)
      }, 1500)
    }

    return (
      <Dialog
        open={showPrescriptionDialog}
        onOpenChange={setShowPrescriptionDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Upload Prescription for {currentMedicine?.name}
            </DialogTitle>
            <DialogDescription>
              This medication requires a valid doctor's prescription.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {file ? (
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <span>{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Drag and drop your prescription here, or click to browse
                  </p>
                  <Input
                    type="file"
                    className="hidden"
                    id="prescription-upload"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                  <Label htmlFor="prescription-upload" className="mt-2">
                    <Button variant="outline" asChild>
                      <span>Select File</span>
                    </Button>
                  </Label>
                </>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPrescriptionDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpload} disabled={!file || isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Upload Prescription'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <PrescriptionDialog />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold">Order Medicine</h1>
          <div className="relative mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search medicines..."
                className="pl-10 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Cart Button */}
        <div className="fixed bottom-6 right-6 z-10">
          <Button
            onClick={() => setShowCart(true)}
            className="rounded-full p-4 h-14 w-14 shadow-lg relative"
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
        </div>

        {/* Medicine List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <p>Loading medicines...</p>
          </div>
        ) : filteredMedicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMedicines.map((medicine) => (
              <Card
                key={medicine.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{medicine.name}</CardTitle>
                    <span className="text-sm font-medium text-green-600">
                      ₦{medicine.price.toFixed(2)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-600">
                    {medicine.description}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Dosage:</span>
                    <span className="font-medium">{medicine.dosage}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Manufacturer:</span>
                    <span className="font-medium">{medicine.manufacturer}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Stock:</span>
                    <span
                      className={`font-medium ${
                        medicine.stock < 10 ? 'text-red-500' : 'text-green-500'
                      }`}
                    >
                      {medicine.stock} available
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full space-y-2">
                    {medicine.requiresPrescription && (
                      <div className="flex items-center gap-2 text-sm">
                        {prescriptionUploads[medicine.id] ? (
                          <span className="text-green-600 flex items-center gap-1">
                            <Check className="h-4 w-4" />
                            Prescription uploaded
                          </span>
                        ) : (
                          <span className="text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            Prescription required
                          </span>
                        )}
                      </div>
                    )}
                    <Button
                      onClick={() => addToCart(medicine)}
                      className="w-full"
                      disabled={medicine.stock === 0}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <Pill className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="text-lg font-medium">No medicines found</h3>
            <p className="text-gray-500">
              {searchTerm
                ? 'Try a different search term'
                : 'No medicines available at the moment'}
            </p>
          </div>
        )}

        {/* Shopping Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-end">
            <div className="bg-white w-full max-w-md h-full overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Your Cart</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCart(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="text-lg font-medium">Your cart is empty</h3>
                    <p className="text-gray-500">
                      Add some medicines to get started
                    </p>
                    <Button onClick={() => setShowCart(false)}>
                      Browse Medicines
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <Pill className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">
                                ₦{item.price.toFixed(2)} each
                              </p>
                              {item.requiresPrescription && (
                                <p className="text-xs text-green-600 flex items-center gap-1">
                                  <Check className="h-3 w-3" />
                                  Prescription verified
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              disabled={item.quantity >= item.stock}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>₦{subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({profile?.health_plan} plan):</span>
                          <span>-₦{discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>₦{total.toFixed(2)}</span>
                      </div>

                      <Button
                        onClick={handleCheckout}
                        className="w-full mt-4"
                        size="lg"
                      >
                        Proceed to Checkout
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default OrderMedicinePage
