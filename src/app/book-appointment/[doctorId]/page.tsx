'use client'
import { useState, useEffect } from 'react'
import { DoctorService, AppointmentService } from '@/lib/doctorServices'
import { AuthService } from '@/lib/services'
import type { Practitioner, ConsultationType } from '@/lib/supabase'
import Chatbot, { ChatbotButton } from '@/components/Chatbot'

interface BookAppointmentProps {
  params: { doctorId: string }
}

export default function BookAppointment({ params }: BookAppointmentProps) {
  const [doctor, setDoctor] = useState<Practitioner | null>(null)
  const [consultationTypes, setConsultationTypes] = useState<ConsultationType[]>([])
  const [selectedConsultationType, setSelectedConsultationType] = useState<ConsultationType | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [bookingData, setBookingData] = useState({
    phone: '',
    notes: ''
  })
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isBooking, setIsBooking] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState(1) // 1: Type, 2: Date/Time, 3: Details, 4: Confirmation

  useEffect(() => {
    loadInitialData()
  }, [params.doctorId])

  useEffect(() => {
    if (selectedDate && selectedConsultationType) {
      loadAvailableSlots()
    }
  }, [selectedDate, selectedConsultationType])

  const loadInitialData = async () => {
    try {
      setIsLoading(true)

      // Load doctor data
      const doctorData = await DoctorService.getDoctorById(params.doctorId)
      if (doctorData) {
        setDoctor(doctorData)
      } else {
        setDoctor(getSampleDoctor())
      }

      // Load current user
      try {
        const user = await AuthService.getCurrentPatient()
        if (user) {
          setCurrentUser(user)
        } else {
          // Fallback to localStorage
          const patientData = localStorage.getItem('patientData')
          if (patientData) {
            setCurrentUser(JSON.parse(patientData))
          }
        }
      } catch (error) {
        console.error('Error loading user:', error)
      }

      // Set sample consultation types for demo
      setConsultationTypes(getSampleConsultationTypes())

    } catch (error) {
      console.error('Error loading data:', error)
      setDoctor(getSampleDoctor())
      setConsultationTypes(getSampleConsultationTypes())
    } finally {
      setIsLoading(false)
    }
  }

  const loadAvailableSlots = () => {
    // Generate sample time slots for demo
    const slots = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
      '05:00 PM', '05:30 PM'
    ]

    // Randomly make some slots unavailable for demo
    const availableSlots = slots.filter(() => Math.random() > 0.3)
    setAvailableSlots(availableSlots)
  }

  const generateDateOptions = () => {
    const dates = []
    const today = new Date()

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-IN', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }),
        isWeekend: date.getDay() === 0 || date.getDay() === 6
      })
    }

    return dates
  }

  const handleBookAppointment = async () => {
    if (!currentUser || !selectedConsultationType || !selectedDate || !selectedTimeSlot) {
      alert('Please fill in all required fields')
      return
    }

    try {
      setIsBooking(true)

      // Create appointment (using sample data for demo)
      const appointmentData = {
        practitioner_id: params.doctorId,
        patient_id: currentUser.id || 'sample-patient-id',
        appointment_slot_id: 'sample-slot-id',
        consultation_type_id: selectedConsultationType.id,
        booking_notes: bookingData.notes,
        patient_phone: bookingData.phone
      }

      // For demo, just simulate booking
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Show success and redirect
      alert('Appointment booked successfully! You will receive a confirmation email shortly.')
      window.location.href = '/my-appointments'

    } catch (error) {
      console.error('Error booking appointment:', error)
      alert('Failed to book appointment. Please try again.')
    } finally {
      setIsBooking(false)
    }
  }

  const nextStep = () => {
    if (bookingStep < 4) setBookingStep(bookingStep + 1)
  }

  const prevStep = () => {
    if (bookingStep > 1) setBookingStep(bookingStep - 1)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Doctor Not Found</h1>
          <button
            onClick={() => window.location.href = '/find-doctors'}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Search
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span
            className="font-display text-2xl font-bold cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            AyurSutra
          </span>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = `/doctor/${params.doctorId}`}
              className="text-gray-600 hover:text-gray-900 px-4 py-2"
            >
              ← Back to Profile
            </button>
            <a href="/dashboard/patient" className="text-gray-600 hover:text-gray-900 px-4 py-2">Dashboard</a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Appointment</h1>
          <p className="text-gray-600">Schedule your consultation with Dr. {doctor.first_name} {doctor.last_name}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[
              { step: 1, title: 'Consultation Type' },
              { step: 2, title: 'Date & Time' },
              { step: 3, title: 'Details' },
              { step: 4, title: 'Confirmation' }
            ].map((item) => (
              <div key={item.step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  bookingStep >= item.step
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {item.step}
                </div>
                <span className={`ml-2 text-sm ${
                  bookingStep >= item.step ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {item.title}
                </span>
                {item.step < 4 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    bookingStep > item.step ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Step 1: Consultation Type */}
          {bookingStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Consultation Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {consultationTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setSelectedConsultationType(type)}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${
                      selectedConsultationType?.id === type.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {type.type === 'online' ? '📹 Online Consultation' : '🏥 In-person Consultation'}
                      </h3>
                      <span className="text-2xl font-bold text-green-600">₹{type.price}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    <div className="text-sm text-gray-500">
                      Duration: {type.duration_minutes} minutes
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <button
                  onClick={nextStep}
                  disabled={!selectedConsultationType}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {bookingStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Date & Time</h2>

              {/* Date Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Date</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {generateDateOptions().map((date) => (
                    <button
                      key={date.value}
                      onClick={() => setSelectedDate(date.value)}
                      disabled={date.isWeekend}
                      className={`p-3 rounded-lg text-center transition-colors ${
                        selectedDate === date.value
                          ? 'bg-green-600 text-white'
                          : date.isWeekend
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-sm font-medium">{date.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Time</h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`p-3 rounded-lg text-center transition-colors ${
                          selectedTimeSlot === slot
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  disabled={!selectedDate || !selectedTimeSlot}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {bookingStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Details</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                    placeholder="Any specific concerns or notes for the doctor..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  disabled={!bookingData.phone}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Review Booking
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {bookingStep === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Confirm Your Appointment</h2>

              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Doctor Details</h3>
                    <p className="text-gray-600">Dr. {doctor.first_name} {doctor.last_name}</p>
                    <p className="text-gray-600">{doctor.specialization.join(', ')}</p>
                    <p className="text-gray-600">{doctor.location}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Appointment Details</h3>
                    <p className="text-gray-600">
                      Type: {selectedConsultationType?.type === 'online' ? 'Online Consultation' : 'In-person Consultation'}
                    </p>
                    <p className="text-gray-600">
                      Date: {new Date(selectedDate).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-gray-600">Time: {selectedTimeSlot}</p>
                    <p className="text-gray-600">Duration: {selectedConsultationType?.duration_minutes} minutes</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-6 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                    <span className="text-2xl font-bold text-green-600">₹{selectedConsultationType?.price}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                <div className="flex">
                  <svg className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Important Notes:</h4>
                    <ul className="text-sm text-yellow-700 mt-1 list-disc list-inside">
                      <li>Please arrive 10 minutes early for in-person consultations</li>
                      <li>For online consultations, you'll receive a meeting link via SMS</li>
                      <li>Cancellations must be made at least 24 hours in advance</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={handleBookAppointment}
                  disabled={isBooking}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {isBooking ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Booking...
                    </>
                  ) : (
                    'Confirm & Book Appointment'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chatbot */}
      {!isChatbotOpen && <ChatbotButton onClick={() => setIsChatbotOpen(true)} />}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  )
}

// Sample data for demo
function getSampleDoctor(): Practitioner {
  return {
    id: '1',
    email: 'dr.sharma@ayursutra.com',
    first_name: 'Rajesh',
    last_name: 'Sharma',
    specialization: ['Panchakarma Specialist'],
    years_of_experience: 15,
    consultation_fee: 2000,
    rating: 4.8,
    total_reviews: 127,
    location: 'Andheri West, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    online_consultation: true,
    in_person_consultation: true,
    verified: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  } as Practitioner
}

function getSampleConsultationTypes(): ConsultationType[] {
  return [
    {
      id: '1',
      practitioner_id: '1',
      type: 'online',
      duration_minutes: 45,
      price: 1500,
      description: 'Video consultation with detailed health assessment and personalized treatment recommendations',
      is_active: true,
      created_at: '2024-01-01'
    },
    {
      id: '2',
      practitioner_id: '1',
      type: 'in_person',
      duration_minutes: 60,
      price: 2000,
      description: 'In-person consultation with physical examination, pulse diagnosis, and comprehensive treatment plan',
      is_active: true,
      created_at: '2024-01-01'
    }
  ]
}