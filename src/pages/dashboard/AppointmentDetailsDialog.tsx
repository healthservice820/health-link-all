import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface AppointmentDetailsDialogProps {
  appointment: {
    id: number
    type: string
    doctorName?: string
    testName?: string
    date: string
    time: string
    status: string
    // Add any additional fields you have
  }
  children: React.ReactNode
}

export const AppointmentDetailsDialog = ({
  appointment,
  children,
}: AppointmentDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Type:</span>
            <span className="text-sm font-medium capitalize">
              {appointment.type} appointment
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-500">
              {appointment.type === 'doctor' ? 'Doctor:' : 'Test:'}
            </span>
            <span className="text-sm font-medium">
              {appointment.type === 'doctor'
                ? `Dr. ${appointment.doctorName}`
                : appointment.testName}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Date:</span>
            <span className="text-sm font-medium">{appointment.date}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Time:</span>
            <span className="text-sm font-medium">{appointment.time}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Status:</span>
            <span
              className={`text-sm font-medium px-2 py-1 rounded-full ${
                appointment.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {appointment.status}
            </span>
          </div>

          {/* Add any additional appointment details here */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
