'use client'
import { useState, useEffect } from 'react'
import Chatbot, { ChatbotButton } from '@/components/Chatbot'

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [userName, setUserName] = useState('Ram')
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const loadAppointments = () => {
      const appointments = [
        { id: 1, title: 'Consultation with Dr. Sharma', date: '2025-03-15', type: 'meeting' },
        { id: 2, title: 'Panchakarma Session', date: '2025-03-18', type: 'treatment' },
        { id: 3, title: 'Follow-up Call', date: '2025-03-22', type: 'call' },
        { id: 4, title: 'Abhyanga Therapy', date: '2025-03-25', type: 'treatment' }
      ]

      const today = new Date().toISOString().split('T')[0]
      const upcomingAppointments = [
        { id: 5, title: 'Video Consultation - Dr. Kumar', date: today, type: 'meeting' },
        { id: 6, title: 'In-person Checkup - Dr. Patel', date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0], type: 'meeting' }
      ]

      setEvents([...appointments, ...upcomingAppointments])
    }

    loadAppointments()
  }, [])

  useEffect(() => {
    const patientData = localStorage.getItem('patientData')
    if (patientData) {
      const data = JSON.parse(patientData)
      if (data.firstName) {
        setUserName(data.firstName)
      }
    }
  }, [])

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7 // Adjust for Monday start

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevDate = new Date(year, month, -startingDayOfWeek + i + 1)
      days.push({
        date: prevDate.getDate(),
        isCurrentMonth: false,
        fullDate: prevDate.toISOString().split('T')[0]
      })
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = new Date(year, month, day)
      days.push({
        date: day,
        isCurrentMonth: true,
        fullDate: fullDate.toISOString().split('T')[0]
      })
    }

    // Add empty cells for remaining days to complete the grid
    const remainingDays = 42 - days.length // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day)
      days.push({
        date: day,
        isCurrentMonth: false,
        fullDate: nextDate.toISOString().split('T')[0]
      })
    }

    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date)
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-400'
      case 'treatment': return 'bg-green-400'
      case 'call': return 'bg-purple-400'
      default: return 'bg-gray-400'
    }
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white flex flex-col">
        {/* Profile Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            <div>
              <h3 className="font-semibold">Hii, {userName}!</h3>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            <a href="/dashboard/patient" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <span>Dashboard</span>
            </a>
            <a href="/calendar" className="flex items-center space-x-3 px-4 py-3 bg-white text-black rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Calendar</span>
            </a>
            <a href="/find-doctors" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Find Doctors</span>
            </a>
            <a href="/discover" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
              </svg>
              <span>Discovery</span>
            </a>
            <a href="/community" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span>Community</span>
            </a>
            <button
              onClick={() => {
                localStorage.removeItem('patientData')
                window.location.href = '/'
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg text-left"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </nav>

        {/* AyurSutra Logo */}
        <div className="p-6 border-t border-gray-700">
          <span className="font-display text-xl font-bold cursor-pointer" onClick={() => window.location.href = '/'}>AyurSutra</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                ←
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                →
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              + Add Event
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 bg-gray-100">
            {daysOfWeek.map((day) => (
              <div key={day} className="p-4 text-center font-medium text-gray-600 border-b">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {days.map((day, index) => {
              const dayEvents = getEventsForDate(day.fullDate)
              return (
                <div
                  key={index}
                  className={`min-h-24 p-2 border-b border-r border-gray-200 ${
                    !day.isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
                  }`}
                >
                  <div className="text-sm font-medium mb-1">{day.date}</div>
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded text-white ${getEventColor(event.type)} truncate`}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white p-4 rounded-lg shadow">
                <div className={`w-4 h-4 rounded-full ${getEventColor(event.type)} mb-2`}></div>
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chatbot */}
      {!isChatbotOpen && <ChatbotButton onClick={() => setIsChatbotOpen(true)} />}
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  )
}