import { createClient } from '@supabase/supabase-js'

interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          id: number
          name: string
          batch: 'guest' | 'cyberx' | 'brainware'
          message: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          batch?: 'guest' | 'cyberx' | 'brainware'
          message: string
          created_at?: string
        }
        Update: never
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type WallMessage = Database['public']['Tables']['messages']['Row']

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && anonKey ? createClient<Database>(url, anonKey) : null

/** true عندما يكون الربط السحابي جاهزاً، وإلا يعمل الجدار بوضع تجريبي محلي */
export const isCloudWall = supabase !== null
