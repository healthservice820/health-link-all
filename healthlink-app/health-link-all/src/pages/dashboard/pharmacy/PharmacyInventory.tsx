
import React from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PharmacyInventory = () => {
  return (
    <DashboardPageLayout
      title="Inventory Management"
      description="Track medication stock and supplies"
      role="pharmacy"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-lg font-medium">Medication Inventory</h2>
          <Button className="w-full sm:w-auto">Add New Medication</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Paracetamol</h3>
            <p className="text-sm text-gray-600">Stock: 120 units</p>
            <p className="text-sm text-gray-600">Location: Shelf A2</p>
          </Card>
          
          <Card className="p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Ibuprofen</h3>
            <p className="text-sm text-gray-600">Stock: 85 units</p>
            <p className="text-sm text-gray-600">Location: Shelf B1</p>
          </Card>
          
          <Card className="p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-semibold mb-2">Amoxicillin</h3>
            <p className="text-sm text-gray-600">Stock: 45 units</p>
            <p className="text-sm text-gray-600">Location: Shelf C3</p>
          </Card>
        </div>
      </div>
    </DashboardPageLayout>
  );
};

export default PharmacyInventory;
