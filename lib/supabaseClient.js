import { createClient } from "@supabase/supabase-js";
const SUPABASE_PROJECT = process.env.SUPABASE_PROJECT;
const SUPABASE_PROJECT_KEY = process.env.SUPABASE_PROJECT_KEY;
export const supabase = createClient(SUPABASE_PROJECT, SUPABASE_PROJECT_KEY);
