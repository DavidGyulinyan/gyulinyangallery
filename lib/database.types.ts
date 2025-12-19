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
      artworks: {
        Row: {
          id: string
          title: string
          category: string
          description: string | null
          dimensions: string | null
          year: number | null
          price: number | null
          url: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          category: string
          description?: string | null
          dimensions?: string | null
          year?: number | null
          price?: number | null
          url: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          category?: string
          description?: string | null
          dimensions?: string | null
          year?: number | null
          price?: number | null
          url?: string
          created_at?: string
        }
        Relationships: []
      }
      exhibitions: {
        Row: {
          id: string
          title: string
          location: string
          date: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          location: string
          date: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          location?: string
          date?: string
          description?: string | null
          created_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          read?: boolean
          created_at?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}