import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export interface WallMessage {
  id: number | string
  name: string
  batch: 'guest' | 'cyberx' | 'brainware'
  message: string
  created_at: string
}

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase: SupabaseClient | null = url && anonKey ? createClient(url, anonKey) : null

/** true عندما يكون الربط السحابي جاهزاً، وإلا يعمل الجدار بوضع تجريبي محلي */
export const isCloudWall = supabase !== null
