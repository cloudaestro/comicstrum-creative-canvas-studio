
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hopavkfazojocfxanrjv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvcGF2a2Zhem9qb2NmeGFucmp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MzM0NTEsImV4cCI6MjA2MjUwOTQ1MX0.SPpga3WM8ocMS3ZA5gguVCUI6Q0GC4cV-NmUwa0k4eo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
