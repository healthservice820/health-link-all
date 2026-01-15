-- Create a secure function to check if an email exists
-- This function runs with SECURITY DEFINER to access auth.users
-- It checks both the auth.users table and provider_applications table

CREATE OR REPLACE FUNCTION check_email_exists(email_to_check TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if email exists in auth.users (registered users)
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = email_to_check) THEN
    RETURN TRUE;
  END IF;

  -- Check if email exists in provider_applications (pending providers)
  IF EXISTS (SELECT 1 FROM public.provider_applications WHERE email = email_to_check) THEN
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$;

-- Grant execute permission to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION check_email_exists(TEXT) TO anon, authenticated, service_role;
