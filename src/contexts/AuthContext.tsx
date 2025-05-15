
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: any | null;
  isLoading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (event === "SIGNED_OUT") {
          setProfile(null);
        } else if (event === "SIGNED_IN" && currentSession?.user) {
          // Use setTimeout to prevent potential deadlock
          setTimeout(() => {
            fetchProfile(currentSession.user.id);
          }, 0);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Existing session:", currentSession ? "Yes" : "No");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchProfile(userId: string) {
    try {
      setIsLoading(true);
      console.log("Fetching profile for user:", userId);
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
        
      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
      
      if (data) {
        console.log("Profile data:", data);
        setProfile(data);
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      console.log("Signing up with userData:", userData);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) {
        throw error;
      }

      toast.success("Registration successful! Please check your email for verification.");
      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Signing in:", email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Logged in successfully!");
      
      // Fetch user profile before redirecting
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (currentUser) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .single();
          
        // Redirect based on role
        if (profileData) {
          // Navigate to the appropriate dashboard based on user role
          switch (profileData.role) {
            case "patient":
              navigate("/dashboard/patient");
              break;
            case "financial_controller":
              navigate("/dashboard/finance");
              break;
            case "doctor":
              navigate("/dashboard/doctor");
              break;
            case "pharmacy":
              navigate("/dashboard/pharmacy");
              break;
            case "diagnostics":
              navigate("/dashboard/diagnostics");
              break;
            case "ambulance":
              navigate("/dashboard/ambulance");
              break;
            case "admin":
              navigate("/dashboard/admin");
              break;
            case "customer_care":
              navigate("/dashboard/customer-care");
              break;
            default:
              navigate("/dashboard");
          }
        } else {
          navigate("/dashboard");
        }
      } else {
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out");
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error: any) {
      console.error("Error logging out:", error);
      toast.error(error.message || "Error logging out.");
      throw error;
    }
  };

  const value = {
    user,
    session,
    profile,
    isLoading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
