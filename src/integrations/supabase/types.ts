export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      disaster_alerts: {
        Row: {
          affected_regions: Json
          alert_id: string
          coordinates: Json | null
          created_at: string
          description: string
          disaster_type: Database["public"]["Enums"]["disaster_type"]
          expires_at: string | null
          id: string
          is_active: boolean
          issued_at: string
          safety_instructions: string[]
          severity: Database["public"]["Enums"]["alert_severity"]
          source: string
          title: string
          updated_at: string
        }
        Insert: {
          affected_regions: Json
          alert_id: string
          coordinates?: Json | null
          created_at?: string
          description: string
          disaster_type: Database["public"]["Enums"]["disaster_type"]
          expires_at?: string | null
          id?: string
          is_active?: boolean
          issued_at: string
          safety_instructions: string[]
          severity: Database["public"]["Enums"]["alert_severity"]
          source: string
          title: string
          updated_at?: string
        }
        Update: {
          affected_regions?: Json
          alert_id?: string
          coordinates?: Json | null
          created_at?: string
          description?: string
          disaster_type?: Database["public"]["Enums"]["disaster_type"]
          expires_at?: string | null
          id?: string
          is_active?: boolean
          issued_at?: string
          safety_instructions?: string[]
          severity?: Database["public"]["Enums"]["alert_severity"]
          source?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      emergency_id_cards: {
        Row: {
          address: string
          blood_group: string | null
          college_name: string
          created_at: string
          email: string
          emergency_contact_name: string
          emergency_contact_number: string
          id: string
          medical_conditions: string | null
          mobile_number: string
          nearest_hospital: string
          nearest_police_station: string
          nearest_shelter: string
          student_id: string
          student_name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          blood_group?: string | null
          college_name: string
          created_at?: string
          email: string
          emergency_contact_name: string
          emergency_contact_number: string
          id?: string
          medical_conditions?: string | null
          mobile_number: string
          nearest_hospital: string
          nearest_police_station: string
          nearest_shelter: string
          student_id: string
          student_name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          blood_group?: string | null
          college_name?: string
          created_at?: string
          email?: string
          emergency_contact_name?: string
          emergency_contact_number?: string
          id?: string
          medical_conditions?: string | null
          mobile_number?: string
          nearest_hospital?: string
          nearest_police_station?: string
          nearest_shelter?: string
          student_id?: string
          student_name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      emergency_shelters: {
        Row: {
          address: string
          capacity: number | null
          city: string
          contact_number: string | null
          created_at: string
          disaster_types: Database["public"]["Enums"]["disaster_type"][]
          district: string
          facilities: string[] | null
          id: string
          is_active: boolean
          latitude: number
          longitude: number
          name: string
          state: string
          updated_at: string
        }
        Insert: {
          address: string
          capacity?: number | null
          city: string
          contact_number?: string | null
          created_at?: string
          disaster_types: Database["public"]["Enums"]["disaster_type"][]
          district: string
          facilities?: string[] | null
          id?: string
          is_active?: boolean
          latitude: number
          longitude: number
          name: string
          state: string
          updated_at?: string
        }
        Update: {
          address?: string
          capacity?: number | null
          city?: string
          contact_number?: string | null
          created_at?: string
          disaster_types?: Database["public"]["Enums"]["disaster_type"][]
          district?: string
          facilities?: string[] | null
          id?: string
          is_active?: boolean
          latitude?: number
          longitude?: number
          name?: string
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      helpline_numbers: {
        Row: {
          created_at: string
          disaster_type: Database["public"]["Enums"]["disaster_type"]
          district: string | null
          helpline_name: string
          id: string
          is_24x7: boolean | null
          is_toll_free: boolean | null
          phone_number: string
          state: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          disaster_type: Database["public"]["Enums"]["disaster_type"]
          district?: string | null
          helpline_name: string
          id?: string
          is_24x7?: boolean | null
          is_toll_free?: boolean | null
          phone_number: string
          state: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          disaster_type?: Database["public"]["Enums"]["disaster_type"]
          district?: string | null
          helpline_name?: string
          id?: string
          is_24x7?: boolean | null
          is_toll_free?: boolean | null
          phone_number?: string
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_alert_preferences: {
        Row: {
          alert_radius_km: number | null
          created_at: string
          disaster_types: Database["public"]["Enums"]["disaster_type"][]
          email_notifications: boolean | null
          id: string
          location_lat: number | null
          location_lng: number | null
          push_notifications: boolean | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          alert_radius_km?: number | null
          created_at?: string
          disaster_types?: Database["public"]["Enums"]["disaster_type"][]
          email_notifications?: boolean | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          push_notifications?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          alert_radius_km?: number | null
          created_at?: string
          disaster_types?: Database["public"]["Enums"]["disaster_type"][]
          email_notifications?: boolean | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          push_notifications?: boolean | null
          updated_at?: string
          user_id?: string | null
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
      alert_severity: "minor" | "moderate" | "severe" | "extreme"
      disaster_type:
        | "earthquake"
        | "cyclone"
        | "flood"
        | "tsunami"
        | "thunderstorm"
        | "fire"
        | "drought"
        | "landslide"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_severity: ["minor", "moderate", "severe", "extreme"],
      disaster_type: [
        "earthquake",
        "cyclone",
        "flood",
        "tsunami",
        "thunderstorm",
        "fire",
        "drought",
        "landslide",
      ],
    },
  },
} as const
