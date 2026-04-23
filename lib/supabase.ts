import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nfxenwsvtcfxmqaaogog.supabase.co";
const supabaseAnonKey = "sb_publishable_8esBCLDe6Foi3543xHGknQ_hLaRAZNs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);