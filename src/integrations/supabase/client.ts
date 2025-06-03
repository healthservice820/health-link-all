
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rfxnddesviblegzjxavp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmeG5kZGVzdmlibGVnemp4YXZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMTM5NDcsImV4cCI6MjA2MTY4OTk0N30.A33Ef3Lvdf6gvWGgZPpmMEOv3FjggaNCGxkr7olPHY0";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
