import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Patient {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  dateOfBirth: string
  country: string
  gender: string
  priorPanchakarmaExperience: boolean | null
  dietaryHabits: string
  sharedCalendar: boolean
  contentPreferences: string[]
  activityLevel: string
  healthGoals: string[]
  chronicConditions: string[]
  currentMedications: string[]
  stressAnxiety: boolean
  physicalSymptoms: boolean
  panchkarmaExpectations: string[]
  consentShare: boolean
  agreeTerms: boolean
  previousTherapies: string[]
  previousBenefits: string[]
  sideEffects: string
  followInstructions: string
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  patient_id: string
  title: string
  description?: string
  date: string
  time?: string
  type: 'meeting' | 'treatment' | 'call' | 'consultation'
  status: 'scheduled' | 'completed' | 'cancelled'
  created_at: string
}

export interface Consultation {
  id: string
  patient_id: string
  practitioner_id?: string
  symptoms: string
  ai_recommendations: string
  prescribed_treatments: string[]
  follow_up_date?: string
  status: 'pending' | 'completed'
  created_at: string
}

export interface Practitioner {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  specialization: string[]
  experience_years?: number
  license_number?: string
  bio?: string
  consultation_fee?: number
  profile_image_url?: string
  rating: number
  total_reviews: number
  location?: string
  address?: string
  city?: string
  state?: string
  pincode?: string
  languages?: string[]
  years_of_experience?: number
  education?: string[]
  clinic_name?: string
  online_consultation: boolean
  in_person_consultation: boolean
  verified: boolean
  created_at: string
  updated_at: string
}

export interface Specialization {
  id: string
  name: string
  description?: string
  icon_name?: string
  created_at: string
}

export interface ConsultationType {
  id: string
  practitioner_id: string
  type: 'online' | 'in_person' | 'follow_up'
  duration_minutes: number
  price: number
  description?: string
  is_active: boolean
  created_at: string
}

export interface DoctorAvailability {
  id: string
  practitioner_id: string
  day_of_week: number // 0=Sunday, 1=Monday, etc.
  start_time: string
  end_time: string
  consultation_type_id?: string
  is_active: boolean
  created_at: string
}

export interface AppointmentSlot {
  id: string
  practitioner_id: string
  consultation_type_id?: string
  slot_date: string
  start_time: string
  end_time: string
  is_available: boolean
  is_blocked: boolean
  created_at: string
}

export interface DoctorReview {
  id: string
  practitioner_id: string
  patient_id: string
  appointment_id?: string
  rating: number
  review_text?: string
  is_anonymous: boolean
  is_verified: boolean
  helpful_votes: number
  created_at: string
  updated_at: string
  patient?: {
    first_name: string
    last_name: string
  }
}