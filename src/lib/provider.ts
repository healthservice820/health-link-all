import { supabase } from "@/integrations/supabase/client";

type ProviderType = 'doctor' | 'pharmacy' | 'diagnostic' | 'ambulance';

interface Application {
  provider_type: ProviderType;
  organization_name?: string;
  contact_person: string;
  email: string;
  phone: string;
  address?: string;
  license_number?: string;
  license_document_url?: string;
  other_documents_urls?: string[];
}

export const submitApplication = async (application: Application) => {
  return await supabase
    .from('provider_applications')
    .insert(application)
    .select()
    .single();
};

export const getApplications = async (status?: string) => {
  let query = supabase
    .from('provider_applications')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  
  if (error) throw error;
  return data;
};

export const updateApplicationStatus = async (
  id: string, 
  status: 'approved' | 'rejected' | 'needs_revision',
  feedback?: string
) => {
  const { data, error } = await supabase
    .from('provider_applications')
    .update({ 
      status,
      rejection_reason: feedback,
      reviewed_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};