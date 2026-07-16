/// <reference types="vite/client" />

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || "";
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || "";


if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase configuration is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment."
  );
}

// Initialize and export the Supabase client.
// Uses a placeholder URL/key format when environment variables are not yet defined
// to prevent the application from crashing on initial module load.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
