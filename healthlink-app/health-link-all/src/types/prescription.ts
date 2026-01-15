export type PrescriptionStatus = "pending" | "processed" | "ready" | "dispatched" | "rejected";

export interface Prescription {
  prescriptionId: string;
  patientName: string;
  patientId: string;
  medication: string;
  dosage: string;
  instructions: string;
  prescriber: string;
  date: string;
  status: PrescriptionStatus;
  refills: number;
  notes?: string;
}