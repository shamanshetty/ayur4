import { supabase } from './supabase'
import type { Patient, Event, Consultation } from './supabase'

// Patient Services
export class PatientService {
  static async createPatient(patientData: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .insert([{
          email: patientData.email,
          first_name: patientData.firstName,
          last_name: patientData.lastName,
          phone: patientData.phone,
          date_of_birth: patientData.dateOfBirth,
          country: patientData.country,
          gender: patientData.gender,
          prior_panchakarma_experience: patientData.priorPanchakarmaExperience,
          dietary_habits: patientData.dietaryHabits,
          shared_calendar: patientData.sharedCalendar,
          content_preferences: patientData.contentPreferences,
          activity_level: patientData.activityLevel,
          health_goals: patientData.healthGoals,
          chronic_conditions: patientData.chronicConditions,
          current_medications: patientData.currentMedications,
          stress_anxiety: patientData.stressAnxiety,
          physical_symptoms: patientData.physicalSymptoms,
          panchakarma_expectations: patientData.panchkarmaExpectations,
          consent_share: patientData.consentShare,
          agree_terms: patientData.agreeTerms,
          previous_therapies: patientData.previousTherapies,
          previous_benefits: patientData.previousBenefits,
          side_effects: patientData.sideEffects,
          follow_instructions: patientData.followInstructions
        }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating patient:', error)
      throw error
    }
  }

  static async getPatient(patientId: string) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('id', patientId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching patient:', error)
      throw error
    }
  }

  static async updatePatient(patientId: string, updates: Partial<Patient>) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .update(updates)
        .eq('id', patientId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating patient:', error)
      throw error
    }
  }
}

// Event Services
export class EventService {
  static async createEvent(eventData: Omit<Event, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([{
          patient_id: eventData.patient_id,
          title: eventData.title,
          description: eventData.description,
          event_date: eventData.date,
          event_time: eventData.time,
          type: eventData.type,
          status: eventData.status
        }])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating event:', error)
      throw error
    }
  }

  static async getPatientEvents(patientId: string) {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('patient_id', patientId)
        .order('event_date', { ascending: true })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching events:', error)
      throw error
    }
  }

  static async updateEvent(eventId: string, updates: Partial<Event>) {
    try {
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', eventId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating event:', error)
      throw error
    }
  }

  static async deleteEvent(eventId: string) {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId)

      if (error) throw error
    } catch (error) {
      console.error('Error deleting event:', error)
      throw error
    }
  }
}

// Consultation Services
export class ConsultationService {
  static async createConsultation(consultationData: Omit<Consultation, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const { data, error } = await supabase
        .from('consultations')
        .insert([consultationData])
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error creating consultation:', error)
      throw error
    }
  }

  static async getPatientConsultations(patientId: string) {
    try {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .eq('patient_id', patientId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching consultations:', error)
      throw error
    }
  }

  static async updateConsultation(consultationId: string, updates: Partial<Consultation>) {
    try {
      const { data, error } = await supabase
        .from('consultations')
        .update(updates)
        .eq('id', consultationId)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating consultation:', error)
      throw error
    }
  }
}

// Authentication Services
export class AuthService {
  static async signUp(email: string, password: string, patientData: any) {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: patientData.firstName,
            last_name: patientData.lastName
          }
        }
      })

      if (authError) throw authError

      // If auth user created successfully, create patient record
      if (authData.user) {
        const patientRecord = await PatientService.createPatient({
          ...patientData,
          email,
          id: authData.user.id
        })
        return { user: authData.user, patient: patientRecord }
      }

      throw new Error('User creation failed')
    } catch (error) {
      console.error('Error in sign up:', error)
      throw error
    }
  }

  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  static async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      throw error
    }
  }

  static async getCurrentPatient() {
    try {
      const user = await this.getCurrentUser()
      if (!user) return null

      const patient = await PatientService.getPatient(user.id)
      return patient
    } catch (error) {
      console.error('Error getting current patient:', error)
      return null
    }
  }
}

// Utility function to convert form data to database format
export function convertFormDataToPatient(formData: any): Omit<Patient, 'id' | 'created_at' | 'updated_at'> {
  return {
    email: formData.email,
    firstName: formData.firstName,
    lastName: formData.lastName,
    phone: formData.phone,
    dateOfBirth: formData.dateOfBirth,
    country: formData.country,
    gender: formData.gender,
    priorPanchakarmaExperience: formData.priorPanchakarmaExperience,
    dietaryHabits: formData.dietaryHabits,
    sharedCalendar: formData.sharedCalendar,
    contentPreferences: formData.contentPreferences,
    activityLevel: formData.activityLevel,
    healthGoals: formData.healthGoals,
    chronicConditions: formData.chronicConditions,
    currentMedications: formData.currentMedications,
    stressAnxiety: formData.stressAnxiety,
    physicalSymptoms: formData.physicalSymptoms,
    panchkarmaExpectations: formData.panchkarmaExpectations,
    consentShare: formData.consentShare,
    agreeTerms: formData.agreeTerms,
    previousTherapies: formData.previousTherapies,
    previousBenefits: formData.previousBenefits,
    sideEffects: formData.sideEffects,
    followInstructions: formData.followInstructions
  }
}