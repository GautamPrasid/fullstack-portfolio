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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      about_me: {
        Row: {
          availability: string | null
          bio: string
          current_learning: string[] | null
          description: string
          experience_years: number | null
          headline: string
          id: string
          location: string | null
          photo_url: string | null
          projects_count: number | null
          updated_at: string | null
        }
        Insert: {
          availability?: string | null
          bio: string
          current_learning?: string[] | null
          description: string
          experience_years?: number | null
          headline: string
          id?: string
          location?: string | null
          photo_url?: string | null
          projects_count?: number | null
          updated_at?: string | null
        }
        Update: {
          availability?: string | null
          bio?: string
          current_learning?: string[] | null
          description?: string
          experience_years?: number | null
          headline?: string
          id?: string
          location?: string | null
          photo_url?: string | null
          projects_count?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          created_at: string | null
          credential_url: string | null
          id: string
          image_url: string | null
          issue_date: string
          issuer: string
          name: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          credential_url?: string | null
          id?: string
          image_url?: string | null
          issue_date: string
          issuer: string
          name: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          credential_url?: string | null
          id?: string
          image_url?: string | null
          issue_date?: string
          issuer?: string
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
        }
        Relationships: []
      }
      content_creator: {
        Row: {
          category: string | null
          created_at: string | null
          id: string
          is_featured: boolean | null
          platform: string
          thumbnail_url: string | null
          title: string
          url: string
          views: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          platform: string
          thumbnail_url?: string | null
          title: string
          url: string
          views?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          platform?: string
          thumbnail_url?: string | null
          title?: string
          url?: string
          views?: number | null
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string | null
          degree: string
          description: string | null
          id: string
          institute: string
          logo_url: string | null
          sort_order: number | null
          year: string
        }
        Insert: {
          created_at?: string | null
          degree: string
          description?: string | null
          id?: string
          institute: string
          logo_url?: string | null
          sort_order?: number | null
          year: string
        }
        Update: {
          created_at?: string | null
          degree?: string
          description?: string | null
          id?: string
          institute?: string
          logo_url?: string | null
          sort_order?: number | null
          year?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          company: string
          created_at: string | null
          description: string
          end_date: string | null
          id: string
          institution: string | null
          is_current: boolean | null
          is_highlight: boolean | null
          location: string | null
          period: string | null
          position: string
          sort_order: number | null
          start_date: string
          technologies: string[] | null
        }
        Insert: {
          company: string
          created_at?: string | null
          description: string
          end_date?: string | null
          id?: string
          institution?: string | null
          is_current?: boolean | null
          is_highlight?: boolean | null
          location?: string | null
          period?: string | null
          position: string
          sort_order?: number | null
          start_date: string
          technologies?: string[] | null
        }
        Update: {
          company?: string
          created_at?: string | null
          description?: string
          end_date?: string | null
          id?: string
          institution?: string | null
          is_current?: boolean | null
          is_highlight?: boolean | null
          location?: string | null
          period?: string | null
          position?: string
          sort_order?: number | null
          start_date?: string
          technologies?: string[] | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          category: string
          created_at: string | null
          id: string
          image_url: string
          sort_order: number | null
          title: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          image_url: string
          sort_order?: number | null
          title?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          image_url?: string
          sort_order?: number | null
          title?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          about_description: string | null
          availability: string | null
          bio: string | null
          cta_primary_text: string | null
          cta_primary_url: string | null
          cta_secondary_text: string | null
          cta_secondary_url: string | null
          full_name: string
          hero_headline: string | null
          hero_image_url: string | null
          hero_subheadline: string | null
          id: string
          location: string | null
          monthly_views: number | null
          profession: string | null
          profile_image_url: string | null
          projects_completed: number | null
          subtitle: string | null
          total_downloads: number | null
          typing_roles: string[] | null
          updated_at: string | null
          years_experience: number | null
        }
        Insert: {
          about_description?: string | null
          availability?: string | null
          bio?: string | null
          cta_primary_text?: string | null
          cta_primary_url?: string | null
          cta_secondary_text?: string | null
          cta_secondary_url?: string | null
          full_name?: string
          hero_headline?: string | null
          hero_image_url?: string | null
          hero_subheadline?: string | null
          id?: string
          location?: string | null
          monthly_views?: number | null
          profession?: string | null
          profile_image_url?: string | null
          projects_completed?: number | null
          subtitle?: string | null
          total_downloads?: number | null
          typing_roles?: string[] | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Update: {
          about_description?: string | null
          availability?: string | null
          bio?: string | null
          cta_primary_text?: string | null
          cta_primary_url?: string | null
          cta_secondary_text?: string | null
          cta_secondary_url?: string | null
          full_name?: string
          hero_headline?: string | null
          hero_image_url?: string | null
          hero_subheadline?: string | null
          id?: string
          location?: string | null
          monthly_views?: number | null
          profession?: string | null
          profile_image_url?: string | null
          projects_completed?: number | null
          subtitle?: string | null
          total_downloads?: number | null
          typing_roles?: string[] | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          badge: string | null
          category: string
          created_at: string | null
          demo_url: string | null
          description: string
          github_url: string | null
          highlights: string[] | null
          id: string
          image_url: string | null
          is_archived: boolean | null
          is_featured: boolean | null
          is_published: boolean | null
          slug: string
          sort_order: number | null
          tech: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          badge?: string | null
          category: string
          created_at?: string | null
          demo_url?: string | null
          description: string
          github_url?: string | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          is_archived?: boolean | null
          is_featured?: boolean | null
          is_published?: boolean | null
          slug: string
          sort_order?: number | null
          tech?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          badge?: string | null
          category?: string
          created_at?: string | null
          demo_url?: string | null
          description?: string
          github_url?: string | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          is_archived?: boolean | null
          is_featured?: boolean | null
          is_published?: boolean | null
          slug?: string
          sort_order?: number | null
          tech?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      resume: {
        Row: {
          cv_image_url: string | null
          download_count: number | null
          id: string
          is_active: boolean | null
          pdf_url: string
          updated_at: string | null
          version: string | null
        }
        Insert: {
          cv_image_url?: string | null
          download_count?: number | null
          id?: string
          is_active?: boolean | null
          pdf_url: string
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          cv_image_url?: string | null
          download_count?: number | null
          id?: string
          is_active?: boolean | null
          pdf_url?: string
          updated_at?: string | null
          version?: string | null
        }
        Relationships: []
      }
      seo_settings: {
        Row: {
          favicon_url: string | null
          id: string
          keywords: string[] | null
          meta_description: string
          og_image_url: string | null
          robots: string | null
          site_title: string
          twitter_card: string | null
          updated_at: string | null
        }
        Insert: {
          favicon_url?: string | null
          id?: string
          keywords?: string[] | null
          meta_description: string
          og_image_url?: string | null
          robots?: string | null
          site_title: string
          twitter_card?: string | null
          updated_at?: string | null
        }
        Update: {
          favicon_url?: string | null
          id?: string
          keywords?: string[] | null
          meta_description?: string
          og_image_url?: string | null
          robots?: string | null
          site_title?: string
          twitter_card?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          category: string | null
          created_at: string | null
          deliverables: string[] | null
          description: string
          features: string[] | null
          icon_name: string | null
          id: string
          is_visible: boolean | null
          sort_order: number | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          deliverables?: string[] | null
          description: string
          features?: string[] | null
          icon_name?: string | null
          id?: string
          is_visible?: boolean | null
          sort_order?: number | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          deliverables?: string[] | null
          description?: string
          features?: string[] | null
          icon_name?: string | null
          id?: string
          is_visible?: boolean | null
          sort_order?: number | null
          title?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          accent_color: string | null
          google_analytics_id: string | null
          google_search_console_id: string | null
          id: string
          maintenance_mode: boolean | null
          primary_color: string | null
          site_name: string | null
          theme: string | null
          updated_at: string | null
        }
        Insert: {
          accent_color?: string | null
          google_analytics_id?: string | null
          google_search_console_id?: string | null
          id?: string
          maintenance_mode?: boolean | null
          primary_color?: string | null
          site_name?: string | null
          theme?: string | null
          updated_at?: string | null
        }
        Update: {
          accent_color?: string | null
          google_analytics_id?: string | null
          google_search_console_id?: string | null
          id?: string
          maintenance_mode?: boolean | null
          primary_color?: string | null
          site_name?: string | null
          theme?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string
          color: string | null
          created_at: string | null
          icon: string | null
          id: string
          is_hidden: boolean | null
          is_visible: boolean | null
          name: string
          percentage: number | null
          sort_order: number | null
        }
        Insert: {
          category: string
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_hidden?: boolean | null
          is_visible?: boolean | null
          name: string
          percentage?: number | null
          sort_order?: number | null
        }
        Update: {
          category?: string
          color?: string | null
          created_at?: string | null
          icon?: string | null
          id?: string
          is_hidden?: boolean | null
          is_visible?: boolean | null
          name?: string
          percentage?: number | null
          sort_order?: number | null
        }
        Relationships: []
      }
      social_links: {
        Row: {
          description: string | null
          follower_count: number | null
          handle: string
          id: string
          is_visible: boolean | null
          platform: string
          sort_order: number | null
          url: string
        }
        Insert: {
          description?: string | null
          follower_count?: number | null
          handle: string
          id?: string
          is_visible?: boolean | null
          platform: string
          sort_order?: number | null
          url: string
        }
        Update: {
          description?: string | null
          follower_count?: number | null
          handle?: string
          id?: string
          is_visible?: boolean | null
          platform?: string
          sort_order?: number | null
          url?: string
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
    Enums: {},
  },
} as const
