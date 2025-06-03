// src/hooks/useUser.ts
import { useEffect, useState } from "react";
import { User } from "../types/index";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Implement your actual user fetching logic here
    // This is just a mock implementation
    const fetchUser = async () => {
      // Example: Get user from your auth provider or API
     
      setUser(mockUser);
    };
    
    fetchUser();
  }, []);
  const mockUser: User = {
  id: "123",
  name: "Mohammed Ramadan",
  email: "ramadan@healthlink-app.com",
  plan: "basic", // now recognized as "basic" literal type
};


  return { user };
};