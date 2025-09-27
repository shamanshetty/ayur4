import { supabase } from './supabase'
import type { Practitioner, Specialization, ConsultationType, DoctorReview, AppointmentSlot } from './supabase'

// Doctor Search and Discovery Services
export class DoctorService {

  // Search doctors with filters
  static async searchDoctors(filters: {
    city?: string
    specialization?: string
    minRating?: number
    maxPrice?: number
    consultationType?: 'online' | 'in_person'
    sortBy?: 'rating' | 'price' | 'experience' | 'reviews'
    limit?: number
    offset?: number
  }) {
    try {
      let query = supabase
        .from('practitioners')
        .select(`
          *,
          doctor_specializations!inner(
            specializations(*)
          ),
          consultation_types(*)
        `)
        .eq('verified', true)

      // Apply filters
      if (filters.city) {
        query = query.ilike('city', `%${filters.city}%`)
      }

      if (filters.specialization) {
        query = query.contains('specialization', [filters.specialization])
      }

      if (filters.minRating) {
        query = query.gte('rating', filters.minRating)
      }

      if (filters.maxPrice) {
        query = query.lte('consultation_fee', filters.maxPrice)
      }

      if (filters.consultationType === 'online') {
        query = query.eq('online_consultation', true)
      } else if (filters.consultationType === 'in_person') {
        query = query.eq('in_person_consultation', true)
      }

      // Apply sorting
      switch (filters.sortBy) {
        case 'rating':
          query = query.order('rating', { ascending: false })
          break
        case 'price':
          query = query.order('consultation_fee', { ascending: true })
          break
        case 'experience':
          query = query.order('years_of_experience', { ascending: false })
          break
        case 'reviews':
          query = query.order('total_reviews', { ascending: false })
          break
        default:
          query = query.order('rating', { ascending: false })
      }

      // Apply pagination
      if (filters.limit) {
        query = query.limit(filters.limit)
      }
      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
      }

      const { data, error } = await query

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error searching doctors:', error)
      throw error
    }
  }

  // Get doctor by ID with full details
  static async getDoctorById(doctorId: string) {
    try {
      const { data, error } = await supabase
        .from('practitioners')
        .select(`
          *,
          doctor_specializations(
            specializations(*)
          ),
          consultation_types(*),
          doctor_reviews(
            *,
            patients(first_name, last_name)
          )
        `)
        .eq('id', doctorId)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching doctor:', error)
      throw error
    }
  }

  // Get all specializations
  static async getSpecializations() {
    try {
      const { data, error } = await supabase
        .from('specializations')
        .select('*')
        .order('name')

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching specializations:', error)
      throw error
    }
  }

  // Get doctor availability for a specific date range
  static async getDoctorAvailability(doctorId: string, startDate: string, endDate: string) {
    try {
      const { data, error } = await supabase
        .from('appointment_slots')
        .select(`
          *,
          consultation_types(*)
        `)
        .eq('practitioner_id', doctorId)
        .gte('slot_date', startDate)
        .lte('slot_date', endDate)
        .eq('is_available', true)
        .eq('is_blocked', false)
        .order('slot_date')
        .order('start_time')

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching availability:', error)
      throw error
    }
  }

  // Get featured/top doctors
  static async getFeaturedDoctors(limit: number = 6) {
    try {
      const { data, error } = await supabase
        .from('practitioners')
        .select(`
          *,
          doctor_specializations(
            specializations(name)
          )
        `)
        .eq('verified', true)
        .gte('rating', 4.5)
        .order('rating', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching featured doctors:', error)
      throw error
    }
  }
}

// Appointment Booking Services
export class AppointmentService {

  // Book an appointment
  static async bookAppointment(appointmentData: {
    practitioner_id: string
    patient_id: string
    appointment_slot_id: string
    consultation_type_id: string
    booking_notes?: string
    patient_phone: string
  }) {
    try {
      // Start a transaction to ensure slot is still available
      const { data: slot, error: slotError } = await supabase
        .from('appointment_slots')
        .select('*')
        .eq('id', appointmentData.appointment_slot_id)
        .eq('is_available', true)
        .single()

      if (slotError || !slot) {
        throw new Error('Appointment slot is no longer available')
      }

      // Get consultation type details for pricing
      const { data: consultationType, error: consultationError } = await supabase
        .from('consultation_types')
        .select('*')
        .eq('id', appointmentData.consultation_type_id)
        .single()

      if (consultationError) throw consultationError

      // Create the appointment
      const { data: appointment, error: appointmentError } = await supabase
        .from('events')
        .insert({
          patient_id: appointmentData.patient_id,
          practitioner_id: appointmentData.practitioner_id,
          appointment_slot_id: appointmentData.appointment_slot_id,
          consultation_type_id: appointmentData.consultation_type_id,
          title: `Consultation with Dr. ${slot.practitioner_id}`,
          description: appointmentData.booking_notes,
          event_date: slot.slot_date,
          event_time: slot.start_time,
          type: 'consultation',
          status: 'scheduled',
          booking_notes: appointmentData.booking_notes,
          patient_phone: appointmentData.patient_phone,
          price: consultationType.price,
          payment_status: 'pending'
        })
        .select()
        .single()

      if (appointmentError) throw appointmentError

      // Mark the slot as unavailable
      const { error: updateError } = await supabase
        .from('appointment_slots')
        .update({ is_available: false })
        .eq('id', appointmentData.appointment_slot_id)

      if (updateError) throw updateError

      return appointment
    } catch (error) {
      console.error('Error booking appointment:', error)
      throw error
    }
  }

  // Get patient appointments
  static async getPatientAppointments(patientId: string, status?: string) {
    try {
      let query = supabase
        .from('events')
        .select(`
          *,
          practitioners(
            first_name,
            last_name,
            profile_image_url,
            clinic_name,
            specialization
          ),
          consultation_types(
            type,
            duration_minutes,
            price
          )
        `)
        .eq('patient_id', patientId)
        .not('practitioner_id', 'is', null)

      if (status) {
        query = query.eq('status', status)
      }

      query = query.order('event_date', { ascending: false })

      const { data, error } = await query

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching patient appointments:', error)
      throw error
    }
  }

  // Cancel appointment
  static async cancelAppointment(appointmentId: string, patientId: string) {
    try {
      // Get appointment details
      const { data: appointment, error: fetchError } = await supabase
        .from('events')
        .select('*, appointment_slots(*)')
        .eq('id', appointmentId)
        .eq('patient_id', patientId)
        .single()

      if (fetchError) throw fetchError

      // Update appointment status
      const { error: updateError } = await supabase
        .from('events')
        .update({ status: 'cancelled' })
        .eq('id', appointmentId)

      if (updateError) throw updateError

      // Make the slot available again if cancelled more than 24 hours before
      if (appointment.appointment_slot_id) {
        const appointmentDate = new Date(appointment.event_date)
        const now = new Date()
        const hoursDiff = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60)

        if (hoursDiff > 24) {
          await supabase
            .from('appointment_slots')
            .update({ is_available: true })
            .eq('id', appointment.appointment_slot_id)
        }
      }

      return { success: true }
    } catch (error) {
      console.error('Error cancelling appointment:', error)
      throw error
    }
  }
}

// Review Services
export class ReviewService {

  // Add a review
  static async addReview(reviewData: {
    practitioner_id: string
    patient_id: string
    appointment_id?: string
    rating: number
    review_text?: string
    is_anonymous?: boolean
  }) {
    try {
      const { data, error } = await supabase
        .from('doctor_reviews')
        .insert(reviewData)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error adding review:', error)
      throw error
    }
  }

  // Get reviews for a doctor
  static async getDoctorReviews(doctorId: string, limit: number = 10, offset: number = 0) {
    try {
      const { data, error } = await supabase
        .from('doctor_reviews')
        .select(`
          *,
          patients(first_name, last_name)
        `)
        .eq('practitioner_id', doctorId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching reviews:', error)
      throw error
    }
  }
}