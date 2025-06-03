export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
         
      provider_applications: {
        Row: {
          id: string;
          provider_type: 'doctor' | 'pharmacy' | 'diagnostic' | 'ambulance';
          organization_name: string | null;
          contact_person: string;
          email: string;
          phone: string;
          address: string | null;
          license_number: string | null;
          license_document_url: string | null;
          other_documents_urls: string[] | null;
          status: 'pending' | 'approved' | 'rejected' | 'needs_revision';
          rejection_reason: string | null;
          submitted_at: string;
          reviewed_at: string | null;
          reviewer_id: string | null;
        };
        Insert: {
          id?: string;
          provider_type: 'doctor' | 'pharmacy' | 'diagnostic' | 'ambulance';
          organization_name?: string | null;
          contact_person: string;
          email: string;
          phone: string;
          address?: string | null;
          license_number?: string | null;
          license_document_url?: string | null;
          other_documents_urls?: string[] | null;
          status?: 'pending' | 'approved' | 'rejected' | 'needs_revision';
          rejection_reason?: string | null;
          submitted_at?: string;
          reviewed_at?: string | null;
          reviewer_id?: string | null;
        };
        Update: {
          id?: string;
          provider_type?: 'doctor' | 'pharmacy' | 'diagnostic' | 'ambulance';
          organization_name?: string | null;
          contact_person?: string;
          email?: string;
          phone?: string;
          address?: string | null;
          license_number?: string | null;
          license_document_url?: string | null;
          other_documents_urls?: string[] | null;
          status?: 'pending' | 'approved' | 'rejected' | 'needs_revision';
          rejection_reason?: string | null;
          submitted_at?: string;
          reviewed_at?: string | null;
          reviewer_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "provider_applications_reviewer_id_fkey";
            columns: ["reviewer_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      
      provider_profiles: {
        Row: {
          id: string;
          user_id: string;
          application_id: string;
          provider_type: 'doctor' | 'pharmacy' | 'diagnostic' | 'ambulance';
          display_name: string;
          contact_email: string;
          contact_phone: string;
          specialization: string | null;
          services_offered: string[] | null;
          coverage_area: string | null;
          is_verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          application_id: string;
          provider_type: 'doctor' | 'pharmacy' | 'diagnostic' | 'ambulance';
          display_name: string;
          contact_email: string;
          contact_phone: string;
          specialization?: string | null;
          services_offered?: string[] | null;
          coverage_area?: string | null;
          is_verified?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          application_id?: string;
          provider_type?: 'doctor' | 'pharmacy' | 'diagnostic' | 'ambulance';
          display_name?: string;
          contact_email?: string;
          contact_phone?: string;
          specialization?: string | null;
          services_offered?: string[] | null;
          coverage_area?: string | null;
          is_verified?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "provider_profiles_application_id_fkey";
            columns: ["application_id"];
            isOneToOne: true;
            referencedRelation: "provider_applications";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "provider_profiles_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      }

      admins: {
        Row: {
          created_at: string | null
          id: string
          permission_level: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          permission_level?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          permission_level?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ambulance_services: {
        Row: {
          contact_number: string | null
          created_at: string | null
          id: string
          license_number: string | null
          service_name: string
        }
        Insert: {
          contact_number?: string | null
          created_at?: string | null
          id: string
          license_number?: string | null
          service_name: string
        }
        Update: {
          contact_number?: string | null
          created_at?: string | null
          id?: string
          license_number?: string | null
          service_name?: string
        }
        Relationships: []
      }
      diagnostic_centers: {
        Row: {
          address: string
          center_name: string
          created_at: string
          home_sample_collection: boolean | null
          id: string
          license_number: string
          operating_hours: string | null
          tests_offered: Json | null
          updated_at: string
        }
        Insert: {
          address: string
          center_name: string
          created_at?: string
          home_sample_collection?: boolean | null
          id: string
          license_number: string
          operating_hours?: string | null
          tests_offered?: Json | null
          updated_at?: string
        }
        Update: {
          address?: string
          center_name?: string
          created_at?: string
          home_sample_collection?: boolean | null
          id?: string
          license_number?: string
          operating_hours?: string | null
          tests_offered?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnostic_centers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      doctors: {
        Row: {
          available_for_appointments: boolean | null
          consultation_fee: number | null
          created_at: string
          experience_years: number | null
          id: string
          license_number: string
          qualification: string
          specialty: string
          updated_at: string
        }
        Insert: {
          available_for_appointments?: boolean | null
          consultation_fee?: number | null
          created_at?: string
          experience_years?: number | null
          id: string
          license_number: string
          qualification: string
          specialty: string
          updated_at?: string
        }
        Update: {
          available_for_appointments?: boolean | null
          consultation_fee?: number | null
          created_at?: string
          experience_years?: number | null
          id?: string
          license_number?: string
          qualification?: string
          specialty?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "doctors_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          blood_group: string | null
          created_at: string
          date_of_birth: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          gender: string | null
          id: string
          medical_history: string | null
          updated_at: string
        }
        Insert: {
          blood_group?: string | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          gender?: string | null
          id: string
          medical_history?: string | null
          updated_at?: string
        }
        Update: {
          blood_group?: string | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          gender?: string | null
          id?: string
          medical_history?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "patients_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pharmacies: {
        Row: {
          address: string
          created_at: string
          delivers_medicine: boolean | null
          id: string
          license_number: string
          operating_hours: string | null
          pharmacy_name: string
          updated_at: string
        }
        Insert: {
          address: string
          created_at?: string
          delivers_medicine?: boolean | null
          id: string
          license_number: string
          operating_hours?: string | null
          pharmacy_name: string
          updated_at?: string
        }
        Update: {
          address?: string
          created_at?: string
          delivers_medicine?: boolean | null
          id?: string
          license_number?: string
          operating_hours?: string | null
          pharmacy_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pharmacies_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone_text: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone_text?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone_text?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role:
        | "patient"
        | "doctor"
        | "pharmacy"
        | "diagnostics"
        | "admin"
        | "ambulance"
        | "customer_care"
        | "financial_controller"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type ProviderApplication = Tables<'provider_applications'>;
export type ProviderProfile = Tables<'provider_profiles'>;

export interface ApplicationStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  byType: Record<ProviderApplication['provider_type'], number>;
}

export interface ProviderStats {
  total: number;
  verified: number;
  byType: Record<ProviderProfile['provider_type'], number>;
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: [
        "patient",
        "doctor",
        "pharmacy",
        "diagnostics",
        "admin",
        "ambulance",
        "customer_care",
        "financial_controller",
      ],
    },
  },
} as const
