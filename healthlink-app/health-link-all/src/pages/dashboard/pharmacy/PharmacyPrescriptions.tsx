import React, { useState, useEffect } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Prescription, PrescriptionStatus } from "@/types/prescription";
import { SearchIcon, FilterIcon, CheckCircleIcon, XCircleIcon, ClockIcon, TruckIcon, PrinterIcon } from "@heroicons/react/outline";
import PrescriptionDetailsModal from "@/components/pharmacy/PrescriptionDetailsModal";
import { toast } from "react-hot-toast";
import { mockPrescriptions } from "@/mocks/precriptions";

const PharmacyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<PrescriptionStatus | "all">("all");
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchPrescriptions = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setPrescriptions(mockPrescriptions);
        setFilteredPrescriptions(mockPrescriptions);
      } catch (error) {
        toast.error("Failed to load prescriptions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  useEffect(() => {
    let results = prescriptions;
    
    if (statusFilter !== "all") {
      results = results.filter(p => p.status === statusFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(p => 
        p.patientName.toLowerCase().includes(term) ||
        p.prescriptionId.toLowerCase().includes(term) ||
        p.medication.toLowerCase().includes(term)
      );
    }
    
    setFilteredPrescriptions(results);
  }, [searchTerm, statusFilter, prescriptions]);

  const handleStatusUpdate = (prescriptionId: string, newStatus: PrescriptionStatus) => {
    setPrescriptions(prev => 
      prev.map(p => 
        p.prescriptionId === prescriptionId ? { ...p, status: newStatus } : p
      )
    );
    toast.success(`Prescription status updated to ${newStatus}`);
  };

  const handlePrintLabel = (prescriptionId: string) => {
    toast.success(`Printing label for prescription ${prescriptionId}`);
  };

  const getStatusBadge = (status: PrescriptionStatus) => {
    const baseClass = "px-2 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case "pending":
        return <span className={`${baseClass} bg-yellow-100 text-yellow-800`}>Pending</span>;
      case "processed":
        return <span className={`${baseClass} bg-blue-100 text-blue-800`}>Processed</span>;
      case "ready":
        return <span className={`${baseClass} bg-green-100 text-green-800`}>Ready</span>;
      case "dispatched":
        return <span className={`${baseClass} bg-purple-100 text-purple-800`}>Dispatched</span>;
      case "rejected":
        return <span className={`${baseClass} bg-red-100 text-red-800`}>Rejected</span>;
      default:
        return <span className={`${baseClass} bg-gray-100 text-gray-800`}>Unknown</span>;
    }
  };

  const getStatusActions = (prescription: Prescription) => {
    switch (prescription.status) {
      case "pending":
        return (
          <div className="flex space-x-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleStatusUpdate(prescription.prescriptionId, "processed");
              }}
              className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              Process
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleStatusUpdate(prescription.prescriptionId, "rejected");
              }}
              className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        );
      case "processed":
        return (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleStatusUpdate(prescription.prescriptionId, "ready");
            }}
            className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
          >
            Mark Ready
          </button>
        );
      case "ready":
        return (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleStatusUpdate(prescription.prescriptionId, "dispatched");
            }}
            className="text-sm bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded"
          >
            Dispatch
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardPageLayout
      title="Prescriptions"
      description="Manage and process prescriptions"
      role="pharmacy"
    >
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center justify-between mb-6">
            <h2 className="text-lg font-medium">Prescription Management</h2>
            
            {/* Mobile filter button */}
            <button
              className="sm:hidden flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FilterIcon className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Mobile filter menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden mb-4 space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search prescriptions..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as PrescriptionStatus | "all")}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processed">Processed</option>
                <option value="ready">Ready</option>
                <option value="dispatched">Dispatched</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          )}

          {/* Desktop filter controls */}
          <div className="hidden sm:flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by patient, prescription ID, or medication..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <FilterIcon className="h-5 w-5 text-gray-400" />
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as PrescriptionStatus | "all")}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processed">Processed</option>
                <option value="ready">Ready</option>
                <option value="dispatched">Dispatched</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredPrescriptions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No prescriptions found matching your criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* Desktop table */}
              <table className="hidden sm:table min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prescription ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Medication
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPrescriptions.map((prescription) => (
                    <tr 
                      key={prescription.prescriptionId} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedPrescription(prescription);
                        setIsModalOpen(true);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {prescription.prescriptionId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {prescription.patientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {prescription.medication}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(prescription.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(prescription.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        {getStatusActions(prescription)}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrintLabel(prescription.prescriptionId);
                          }}
                          className="text-gray-500 hover:text-gray-700"
                          title="Print label"
                        >
                          <PrinterIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile cards */}
              <div className="sm:hidden space-y-4">
                {filteredPrescriptions.map((prescription) => (
                  <div 
                    key={prescription.prescriptionId}
                    className="bg-white p-4 rounded-lg shadow border border-gray-200"
                    onClick={() => {
                      setSelectedPrescription(prescription);
                      setIsModalOpen(true);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-blue-600">{prescription.prescriptionId}</h3>
                        <p className="text-sm font-medium text-gray-900 mt-1">{prescription.patientName}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(prescription.status)}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrintLabel(prescription.prescriptionId);
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <PrinterIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-500">Medication</p>
                        <p className="text-sm text-gray-900">{prescription.medication}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="text-sm text-gray-900">{new Date(prescription.date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      {getStatusActions(prescription)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedPrescription && (
        <PrescriptionDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          prescription={selectedPrescription}
          onStatusUpdate={handleStatusUpdate}
          onPrintLabel={handlePrintLabel}
        />
      )}
    </DashboardPageLayout>
  );
};

export default PharmacyPrescriptions;