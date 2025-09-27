'use client'
import { useState, useEffect } from 'react'
import { getDoctorAppointments, updateAppointmentStatus } from '@/lib/doctorServices'
import { Doctor, Appointment } from '@/lib/supabase'

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('today')
  const [stats, setStats] = useState({
    todayTotal: 0,
    todayCompleted: 0,
    thisWeekTotal: 0,
    thisMonthTotal: 0
  })

  useEffect(() => {
    const loadDoctorData = async () => {
      try {
        const doctorData = localStorage.getItem('doctorData')
        if (doctorData) {
          const parsedDoctor = JSON.parse(doctorData)
          setDoctor(parsedDoctor)

          const appointmentData = await getDoctorAppointments(parsedDoctor.id)
          setAppointments(appointmentData)

          calculateStats(appointmentData)
        } else {
          setDoctor({
            id: 'doc1',
            name: 'Dr. Rajesh Sharma',
            specialization: 'Panchakarma Specialist',
            experience: 15,
            location: 'Mumbai, Maharashtra',
            rating: 4.8,
            reviews_count: 156,
            consultation_fee: 800,
            available_slots: ['09:00', '10:00', '11:00'],
            image_url: '/images/doctor1.jpg',
            qualifications: ['BAMS', 'MD (Ayurveda)'],
            languages: ['Hindi', 'English', 'Marathi'],
            about: 'Experienced Ayurveda practitioner specializing in Panchakarma treatments.',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })

          const sampleAppointments = [
            {
              id: 'apt1',
              patient_id: 'pat1',
              doctor_id: 'doc1',
              appointment_date: new Date().toISOString().split('T')[0],
              appointment_time: '09:00',
              status: 'confirmed',
              consultation_type: 'video',
              symptoms: 'Chronic fatigue, digestive issues',
              notes: '',
              patient_name: 'Amit Kumar',
              patient_phone: '+91 9876543210',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            {
              id: 'apt2',
              patient_id: 'pat2',
              doctor_id: 'doc1',
              appointment_date: new Date().toISOString().split('T')[0],
              appointment_time: '10:00',
              status: 'confirmed',
              consultation_type: 'in-person',
              symptoms: 'Joint pain, insomnia',
              notes: '',
              patient_name: 'Priya Sharma',
              patient_phone: '+91 9876543211',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ]
          setAppointments(sampleAppointments)
          calculateStats(sampleAppointments)
        }
      } catch (error) {
        console.error('Error loading doctor data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDoctorData()
  }, [])

  const calculateStats = (appointmentData: Appointment[]) => {
    const today = new Date().toISOString().split('T')[0]
    const todayAppointments = appointmentData.filter(apt => apt.appointment_date === today)

    const thisWeekStart = new Date()
    thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay())
    const thisWeekAppointments = appointmentData.filter(apt =>
      new Date(apt.appointment_date) >= thisWeekStart
    )

    const thisMonthStart = new Date()
    thisMonthStart.setDate(1)
    const thisMonthAppointments = appointmentData.filter(apt =>
      new Date(apt.appointment_date) >= thisMonthStart
    )

    setStats({
      todayTotal: todayAppointments.length,
      todayCompleted: todayAppointments.filter(apt => apt.status === 'completed').length,
      thisWeekTotal: thisWeekAppointments.length,
      thisMonthTotal: thisMonthAppointments.length
    })
  }

  const getFilteredAppointments = () => {
    const today = new Date().toISOString().split('T')[0]
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    switch (activeTab) {
      case 'today':
        return appointments.filter(apt => apt.appointment_date === today)
      case 'upcoming':
        return appointments.filter(apt => apt.appointment_date >= tomorrow)
      case 'completed':
        return appointments.filter(apt => apt.status === 'completed')
      case 'cancelled':
        return appointments.filter(apt => apt.status === 'cancelled')
      default:
        return appointments
    }
  }

  const handleStatusUpdate = async (appointmentId: string, newStatus: string) => {
    try {
      await updateAppointmentStatus(appointmentId, newStatus)
      setAppointments(prev =>
        prev.map(apt =>
          apt.id === appointmentId ? { ...apt, status: newStatus } : apt
        )
      )
      calculateStats(appointments)
    } catch (error) {
      console.error('Error updating appointment status:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getConsultationTypeIcon = (type: string) => {
    return type === 'video' ? '📹' : '🏥'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const filteredAppointments = getFilteredAppointments()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <img
                src={doctor?.image_url || '/images/doctor1.jpg'}
                alt={doctor?.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {doctor?.name}
                </h1>
                <p className="text-gray-600">{doctor?.specialization}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/calendar" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                View Calendar
              </a>
              <button
                onClick={() => {
                  localStorage.removeItem('doctorData')
                  window.location.href = '/'
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayTotal}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayCompleted}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 7h12v9a1 1 0 01-1 1H5a1 1 0 01-1-1V7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">{stats.thisWeekTotal}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h8a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 5a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">{stats.thisMonthTotal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { key: 'today', label: 'Today', count: stats.todayTotal },
                { key: 'upcoming', label: 'Upcoming' },
                { key: 'completed', label: 'Completed' },
                { key: 'cancelled', label: 'Cancelled' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Appointments List */}
          <div className="p-6">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m0 0V7a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No appointments found for the selected filter.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {appointment.patient_name?.charAt(0) || 'P'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{appointment.patient_name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{getConsultationTypeIcon(appointment.consultation_type)} {appointment.consultation_type}</span>
                            <span>📅 {new Date(appointment.appointment_date).toLocaleDateString()}</span>
                            <span>🕐 {appointment.appointment_time}</span>
                            <span>📞 {appointment.patient_phone}</span>
                          </div>
                          {appointment.symptoms && (
                            <p className="text-sm text-gray-600 mt-1">
                              <strong>Symptoms:</strong> {appointment.symptoms}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                        {appointment.status === 'confirmed' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                              className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                              className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}