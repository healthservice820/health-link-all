// types/provider.ts

export type ProviderType = 'doctor' | 'pharmacy' | 'diagnostic' | 'ambulance';
export type ApplicationStatus = 'pending' | 'approved' | 'rejected' | 'needs_revision';

export interface ProviderApplication {
  id: string;
  provider_type: ProviderType;
  organization_name?: string;
  contact_person: string;
  email: string;
  phone: string;
  address?: string;
  license_number?: string;
  license_document_url?: string;
  other_documents_urls?: string[];
  status: ApplicationStatus;
  rejection_reason?: string;
  submitted_at: string;
  reviewed_at?: string;
  reviewer_id?: string;
}

export interface ProviderProfile {
  id: string;
  user_id: string;
  application_id: string;
  provider_type: ProviderType;
  display_name: string;
  contact_email: string;
  contact_phone: string;
  specialization?: string;
  services_offered?: string[];
  coverage_area?: string;
  is_verified: boolean;
  created_at: string;
}

export interface ApplicationStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  byType: {
    doctor: number;
    pharmacy: number;
    diagnostic: number;
    ambulance: number;
  };
}

export interface ProviderStats {
  total: number;
  verified: number;
  byType: {
    doctor: number;
    pharmacy: number;
    diagnostic: number;
    ambulance: number;
  };
}