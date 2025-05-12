import { Prescription } from "@/types/prescription";

export const mockPrescriptions: Prescription[] = [
  {
    prescriptionId: "RX-1001",
    patientName: "John Smith",
    patientId: "PT-001",
    medication: "Amoxicillin 500mg",
    dosage: "1 tablet every 8 hours",
    instructions: "Take with food",
    prescriber: "Dr. Sarah Johnson",
    date: "2023-05-15",
    status: "pending",
    refills: 1,
    notes: "Patient may experience mild stomach upset"
  },
  {
    prescriptionId: "RX-1002",
    patientName: "Emily Davis",
    patientId: "PT-002",
    medication: "Lisinopril 10mg",
    dosage: "1 tablet daily",
    instructions: "Take in the morning",
    prescriber: "Dr. Michael Chen",
    date: "2023-05-14",
    status: "processed",
    refills: 3
  },
  {
    prescriptionId: "RX-1003",
    patientName: "Robert Johnson",
    patientId: "PT-003",
    medication: "Atorvastatin 20mg",
    dosage: "1 tablet at bedtime",
    instructions: "Take with water",
    prescriber: "Dr. Lisa Wong",
    date: "2023-05-13",
    status: "ready",
    refills: 0
  },
  {
    prescriptionId: "RX-1004",
    patientName: "Maria Garcia",
    patientId: "PT-004",
    medication: "Metformin 500mg",
    dosage: "1 tablet twice daily",
    instructions: "Take with meals",
    prescriber: "Dr. James Wilson",
    date: "2023-05-12",
    status: "dispatched",
    refills: 2
  },
  {
    prescriptionId: "RX-1005",
    patientName: "David Kim",
    patientId: "PT-005",
    medication: "Albuterol Inhaler",
    dosage: "2 puffs every 4-6 hours as needed",
    instructions: "Shake well before use",
    prescriber: "Dr. Sarah Johnson",
    date: "2023-05-11",
    status: "rejected",
    refills: 0,
    notes: "Insurance requires prior authorization"
  }
];