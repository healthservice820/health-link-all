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
          full_name: string | null
          health_plan: string | null
          id: string
          last_name: string | null
          organization_name: string | null
          payment_source: string | null
          phone_number: string | null
          phone_text: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
          user_id_external: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          full_name?: string | null
          health_plan?: string | null
          id: string
          last_name?: string | null
          organization_name?: string | null
          payment_source?: string | null
          phone_number?: string | null
          phone_text?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
          user_id_external?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          full_name?: string | null
          health_plan?: string | null
          id?: string
          last_name?: string | null
          organization_name?: string | null
          payment_source?: string | null
          phone_number?: string | null
          phone_text?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
          user_id_external?: string | null
        }
        Relationships: []
      }
      provider_applications: {
        Row: {
          address: string | null
          contact_person: string
          coverage_area: string | null
          email: string
          id: string
          license_document_url: string | null
          license_number: string | null
          organization_name: string | null
          other_documents_urls: string[] | null
          phone: string
          provider_type: string
          rejection_reason: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          services_offered: string[] | null
          specialization: string | null
          status: string | null
          submitted_at: string | null
        }
        Insert: {
          address?: string | null
          contact_person: string
          coverage_area?: string | null
          email: string
          id?: string
          license_document_url?: string | null
          license_number?: string | null
          organization_name?: string | null
          other_documents_urls?: string[] | null
          phone: string
          provider_type: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          services_offered?: string[] | null
          specialization?: string | null
          status?: string | null
          submitted_at?: string | null
        }
        Update: {
          address?: string | null
          contact_person?: string
          coverage_area?: string | null
          email?: string
          id?: string
          license_document_url?: string | null
          license_number?: string | null
          organization_name?: string | null
          other_documents_urls?: string[] | null
          phone?: string
          provider_type?: string
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          services_offered?: string[] | null
          specialization?: string | null
          status?: string | null
          submitted_at?: string | null
        }
        Relationships: []
      }
      provider_profiles: {
        Row: {
          application_id: string
          contact_email: string
          contact_phone: string
          coverage_area: string | null
          created_at: string | null
          display_name: string
          id: string
          is_verified: boolean | null
          provider_type: string
          services_offered: string[] | null
          specialization: string | null
          user_id: string
        }
        Insert: {
          application_id: string
          contact_email: string
          contact_phone: string
          coverage_area?: string | null
          created_at?: string | null
          display_name: string
          id?: string
          is_verified?: boolean | null
          provider_type: string
          services_offered?: string[] | null
          specialization?: string | null
          user_id: string
        }
        Update: {
          application_id?: string
          contact_email?: string
          contact_phone?: string
          coverage_area?: string | null
          created_at?: string | null
          display_name?: string
          id?: string
          is_verified?: boolean | null
          provider_type?: string
          services_offered?: string[] | null
          specialization?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_profiles_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "provider_applications"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_email_exists: {
        Args: {
          email_to_check: string
        }
        Returns: boolean
      }
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
