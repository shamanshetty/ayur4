'use client'
import { useState, useEffect } from 'react'
import { AppointmentService } from '@/lib/doctorServices'
import { AuthService } from '@/lib/services'
import Chatbot, { ChatbotButton } from '@/components/Chatbot'

interface Appointment {
  id: string
  title: string
  event_date: string
  event_time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  type: string
  price: number
  booking_notes?: string
  consultation_notes?: string
  practitioners: {
    first_name: string
    last_name: string
    profile_image_url?: string
    clinic_name?: string
    specialization: string[]
  }
  consultation_types: {
    type: string
    duration_minutes: number
    price: number
  }
}

export default function MyAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('upcoming')
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    try {
      setIsLoading(true)

      // Load current user
      try {
        const user = await AuthService.getCurrentPatient()
        if (user) {
          setCurrentUser(user)
          // Load real appointments from database
          const appointmentsData = await AppointmentService.getPatientAppointments(user.id)
          setAppointments(appointmentsData || [])
        } else {
          // Fallback to localStorage and sample data
          const patientData = localStorage.getItem('patientData')
          if (patientData) {
            setCurrentUser(JSON.parse(patientData))
          }
          setAppointments(getSampleAppointments())
        }
      } catch (error) {
        console.error('Error loading user or appointments:', error)
        setAppointments(getSampleAppointments())
      }
    } catch (error) {
      console.error('Error loading appointments:', error)
      setAppointments(getSampleAppointments())
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelAppointment = async (appointmentId: string) => {
    const confirmed = window.confirm('Are you sure you want to cancel this appointment?')
    if (!confirmed) return

    try {
      if (currentUser?.id) {
        await AppointmentService.cancelAppointment(appointmentId, currentUser.id)
      }

      // Update local state
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
        )
      )

      alert('Appointment cancelled successfully')
    } catch (error) {
      console.error('Error cancelling appointment:', error)
      alert('Failed to cancel appointment. Please try again.')
    }
  }

  const handleRescheduleAppointment = (appointmentId: string) => {
    // For demo, just show alert
    alert('Reschedule feature coming soon! Please contact the clinic directly for now.')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getFilteredAppointments = () => {
    const now = new Date()

    switch (activeTab) {
      case 'upcoming':
        return appointments.filter(apt =>
          apt.status === 'scheduled' && new Date(apt.event_date) >= now
        )
      case 'past':
        return appointments.filter(apt =>
          apt.status === 'completed' || new Date(apt.event_date) < now
        )
      case 'cancelled':
        return appointments.filter(apt => apt.status === 'cancelled')
      default:
        return appointments
    }
  }

  const filteredAppointments = getFilteredAppointments()

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
            <a href="/dashboard/patient" className="text-gray-600 hover:text-gray-900 px-4 py-2">Dashboard</a>
            <a href="/find-doctors" className="text-gray-600 hover:text-gray-900 px-4 py-2">Find Doctors</a>
            <a href="/calendar" className="text-gray-600 hover:text-gray-900 px-4 py-2">Calendar</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
            <p className="text-gray-600">Manage your upcoming and past consultations</p>
          </div>
          <button
            onClick={() => window.location.href = '/find-doctors'}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Book New Appointment
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'upcoming', label: 'Upcoming', count: appointments.filter(apt => apt.status === 'scheduled' && new Date(apt.event_date) >= new Date()).length },
                { id: 'past', label: 'Past', count: appointments.filter(apt => apt.status === 'completed' || new Date(apt.event_date) < new Date()).length },
                { id: 'cancelled', label: 'Cancelled', count: appointments.filter(apt => apt.status === 'cancelled').length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      activeTab === tab.id
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Appointments List */}
          <div className="p-8">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex space-x-4">
                      <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredAppointments.length > 0 ? (
              <div className="space-y-6">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      {/* Appointment Info */}
                      <div className="flex space-x-4 mb-4 lg:mb-0">
                        {/* Doctor Avatar */}
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          {appointment.practitioners.profile_image_url ? (
                            <img
                              src={appointment.practitioners.profile_image_url}
                              alt={`Dr. ${appointment.practitioners.first_name}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <span className="text-white text-lg font-bold">
                              {appointment.practitioners.first_name.charAt(0)}{appointment.practitioners.last_name.charAt(0)}
                            </span>
                          )}
                        </div>

                        {/* Appointment Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                Dr. {appointment.practitioners.first_name} {appointment.practitioners.last_name}
                              </h3>
                              <p className="text-gray-600">{appointment.practitioners.specialization.join(', ')}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center text-gray-600">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                              </svg>
                              {formatDate(appointment.event_date)} at {formatTime(appointment.event_time)}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                              {appointment.consultation_types.duration_minutes} minutes • {appointment.consultation_types.type === 'online' ? 'Online' : 'In-person'}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                              </svg>
                              ₹{appointment.price}
                            </div>
                          </div>

                          {appointment.booking_notes && (
                            <div className="mt-3 p-3 bg-white rounded border-l-4 border-blue-500">
                              <p className="text-sm text-gray-600">
                                <strong>Notes:</strong> {appointment.booking_notes}
                              </p>
                            </div>
                          )}

                          {appointment.consultation_notes && (
                            <div className="mt-3 p-3 bg-white rounded border-l-4 border-green-500">
                              <p className="text-sm text-gray-600">
                                <strong>Doctor's Notes:</strong> {appointment.consultation_notes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 lg:flex-col lg:space-x-0 lg:space-y-2">
                        {appointment.status === 'scheduled' && new Date(appointment.event_date) > new Date() && (
                          <>
                            <button
                              onClick={() => handleRescheduleAppointment(appointment.id)}
                              className="flex-1 lg:flex-none bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                              Reschedule
                            </button>
                            <button
                              onClick={() => handleCancelAppointment(appointment.id)}
                              className="flex-1 lg:flex-none bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                            >
                              Cancel
                            </button>
                          </>
                        )}

                        {appointment.status === 'completed' && (
                          <button
                            onClick={() => window.location.href = `/doctor/${appointment.practitioners}`}
                            className="flex-1 lg:flex-none bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Book Again
                          </button>
                        )}

                        {appointment.consultation_types.type === 'online' && appointment.status === 'scheduled' && (
                          <button
                            onClick={() => alert('Meeting link will be sent via SMS 15 minutes before consultation')}
                            className="flex-1 lg:flex-none bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                          >
                            Join Meeting
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab} appointments
                </h3>
                <p className="text-gray-500 mb-4">
                  {activeTab === 'upcoming'
                    ? "You don't have any upcoming appointments scheduled."
                    : activeTab === 'past'
                    ? "No consultation history to display."
                    : "No cancelled appointments."
                  }
                </p>
                {activeTab === 'upcoming' && (
                  <button
                    onClick={() => window.location.href = '/find-doctors'}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Book Your First Appointment
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chatbot */}
      {!isChatbotOpen && <ChatbotButton onClick={() => setIsChatbotOpen(true)} />}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  )
}

// Sample data for demo
function getSampleAppointments(): Appointment[] {
  return [
    {
      id: '1',
      title: 'Consultation with Dr. Sharma',
      event_date: '2025-04-15',
      event_time: '10:00:00',
      status: 'scheduled',
      type: 'consultation',
      price: 2000,
      booking_notes: 'I have been experiencing chronic fatigue and digestive issues.',
      practitioners: {
        first_name: 'Rajesh',
        last_name: 'Sharma',
        clinic_name: 'Ayur Wellness Center',
        specialization: ['Panchakarma Specialist']
      },
      consultation_types: {
        type: 'in_person',
        duration_minutes: 60,
        price: 2000
      }
    },
    {
      id: '2',
      title: 'Follow-up with Dr. Patel',
      event_date: '2025-03-20',
      event_time: '14:30:00',
      status: 'completed',
      type: 'consultation',
      price: 1500,
      consultation_notes: 'Patient showing good improvement. Continue current medication for 2 more weeks.',
      practitioners: {
        first_name: 'Priya',
        last_name: 'Patel',
        clinic_name: 'Women\'s Ayurveda Clinic',
        specialization: ['Women\'s Health']
      },
      consultation_types: {
        type: 'online',
        duration_minutes: 30,
        price: 1500
      }
    },
    {
      id: '3',
      title: 'Consultation with Dr. Kumar',
      event_date: '2025-03-25',
      event_time: '16:00:00',
      status: 'cancelled',
      type: 'consultation',
      price: 1800,
      booking_notes: 'Need help with stress management and sleep issues.',
      practitioners: {
        first_name: 'Amit',
        last_name: 'Kumar',
        clinic_name: 'Holistic Health Center',
        specialization: ['Mental Wellness', 'Stress Management']
      },
      consultation_types: {
        type: 'online',
        duration_minutes: 45,
        price: 1800
      }
    }
  ]
}