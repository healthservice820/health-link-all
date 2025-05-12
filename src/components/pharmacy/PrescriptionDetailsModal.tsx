import React from "react";
import { Prescription, PrescriptionStatus } from "@/types/prescription";
import { CheckCircleIcon, XCircleIcon, ClockIcon, TruckIcon, PrinterIcon } from "@heroicons/react/outline";
import {Modal} from "@/components/ui/Modal";

interface PrescriptionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  prescription: Prescription;
  onStatusUpdate: (prescriptionId: string, newStatus: PrescriptionStatus) => void;
  onPrintLabel: (prescriptionId: string) => void;
}

const PrescriptionDetailsModal: React.FC<PrescriptionDetailsModalProps> = ({
  isOpen,
  onClose,
  prescription,
  onStatusUpdate,
  onPrintLabel
}) => {
  const getStatusIcon = () => {
    switch (prescription.status) {
      case "pending":
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case "processed":
        return <CheckCircleIcon className="h-5 w-5 text-blue-500" />;
      case "ready":
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case "dispatched":
        return <TruckIcon className="h-5 w-5 text-purple-500" />;
      case "rejected":
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusActions = () => {
    switch (prescription.status) {
      case "pending":
        return (
          <div className="flex space-x-2 mt-4">
            <button
              onClick={() => {
                onStatusUpdate(prescription.prescriptionId, "processed");
                onClose();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Process Prescription
            </button>
            <button
              onClick={() => {
                onStatusUpdate(prescription.prescriptionId, "rejected");
                onClose();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reject Prescription
            </button>
          </div>
        );
      case "processed":
        return (
          <button
            onClick={() => {
              onStatusUpdate(prescription.prescriptionId, "ready");
              onClose();
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mt-4"
          >
            Mark as Ready for Pickup
          </button>
        );
      case "ready":
        return (
          <button
            onClick={() => {
              onStatusUpdate(prescription.prescriptionId, "dispatched");
              onClose();
            }}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mt-4"
          >
            Mark as Dispatched
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Prescription Details">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Prescription ID</h3>
            <p className="mt-1 text-sm text-gray-900">{prescription.prescriptionId}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <div className="mt-1 flex items-center">
              {getStatusIcon()}
              <span className="ml-2 text-sm text-gray-900 capitalize">{prescription.status}</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Patient</h3>
            <p className="mt-1 text-sm text-gray-900">{prescription.patientName}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Date</h3>
            <p className="mt-1 text-sm text-gray-900">{new Date(prescription.date).toLocaleDateString()}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Medication</h3>
          <p className="mt-1 text-sm text-gray-900">{prescription.medication}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Dosage</h3>
          <p className="mt-1 text-sm text-gray-900">{prescription.dosage}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Instructions</h3>
          <p className="mt-1 text-sm text-gray-900">{prescription.instructions}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Prescriber</h3>
          <p className="mt-1 text-sm text-gray-900">{prescription.prescriber}</p>
        </div>

        {prescription.refills > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Refills</h3>
            <p className="mt-1 text-sm text-gray-900">{prescription.refills} remaining</p>
          </div>
        )}

        {prescription.notes && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Notes</h3>
            <p className="mt-1 text-sm text-gray-900">{prescription.notes}</p>
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <button
            onClick={() => onPrintLabel(prescription.prescriptionId)}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            <PrinterIcon className="h-5 w-5 mr-2" />
            Print Label
          </button>
          {getStatusActions()}
        </div>
      </div>
    </Modal>
  );
};

export default PrescriptionDetailsModal;