// src/components/PlanBasedAds.tsx
import { AdsterraAd } from "./AdsterraAds";
import { useUser } from "../hooks/useUser"; // You'll need to create this hook

export const PlanBasedAds = () => {
  const { user } = useUser();
  
  // Only show ads for basic plan users
  if (user?.plan === "basic") {
    return (
      <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">
          Support our free service with these ads
        </h3>
        <div className="flex flex-wrap gap-4">
          <AdsterraAd 
            adKey={import.meta.env.VITE_ADSTERRA_KEY} 
            className="border border-gray-200 rounded"
          />
          {/* Add more ad units if needed */}
        </div>
      </div>
    );
  }

  return null;
};