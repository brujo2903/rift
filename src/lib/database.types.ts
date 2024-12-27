export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          id: string
          name: string
          type: 'RED_ROOM' | 'TWITTER_ROOM' | 'WAIFU_ROOM' | 'QUANT_ROOM' | 'SWARM_ROOM' | 'CUSTOM'
          theme_color: string
          is_private: boolean
          passcode: string | null
          created_by: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'RED_ROOM' | 'TWITTER_ROOM' | 'WAIFU_ROOM' | 'QUANT_ROOM' | 'SWARM_ROOM' | 'CUSTOM'
          theme_color: string
          is_private?: boolean
          passcode?: string | null
          created_by: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'RED_ROOM' | 'TWITTER_ROOM' | 'WAIFU_ROOM' | 'QUANT_ROOM' | 'SWARM_ROOM' | 'CUSTOM'
          theme_color?: string
          is_private?: boolean
          passcode?: string | null
          created_by?: string
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          room_id: string
          user_id: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          room_id: string
          user_id: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          room_id?: string
          user_id?: string
          content?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}