'use client'
import { useState, useEffect } from 'react'
import { AuthService } from '@/lib/services'

// Image constants from Figma
const imgEllipse = "http://localhost:3845/assets/1e5fa6752e78b629fbf16f4ed8975669958b08c1.png";
const img = "http://localhost:3845/assets/0075ecca3d7add5002886d8bb27f5a9be9e3994d.png";
const img1 = "http://localhost:3845/assets/8a051eff71f9ee15da45a30b90eac60c20943fe4.png";
const img2 = "http://localhost:3845/assets/c450dc16f1f6a226fc5e7eb07d8e2a6cf434a827.svg";

export default function PatientDashboard() {
  const [userName, setUserName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [userLocation, setUserLocation] = useState('')
  const [userAge, setUserAge] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPatientData()

    // Listen for storage changes to update name in real-time
    const handleStorageChange = () => {
      loadPatientData()
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const loadPatientData = async () => {
    try {
      // Try Supabase first
      const patient = await AuthService.getCurrentPatient()
      if (patient) {
        setUserName(patient.first_name || 'User')
        setUserLastName(patient.last_name || '')
        // You can add more fields from Supabase as needed
      } else {
        // Fallback to localStorage
        const patientData = localStorage.getItem('patientData')
        if (patientData) {
          const data = JSON.parse(patientData)
          console.log('Patient data from localStorage:', data) // Debug log
          setUserName(data.firstName || 'User')
          setUserLastName(data.lastName || '')
          setUserLocation(data.country || 'India')
        } else {
          // Final fallback
          setUserName('User')
          setUserLastName('')
          setUserLocation('India')
        }
      }
    } catch (error) {
      console.error('Error loading patient data:', error)
      // Error fallback - check localStorage anyway
      const patientData = localStorage.getItem('patientData')
      if (patientData) {
        try {
          const data = JSON.parse(patientData)
          setUserName(data.firstName || 'User')
          setUserLastName(data.lastName || '')
          setUserLocation(data.country || 'India')
        } catch (parseError) {
          console.error('Error parsing localStorage data:', parseError)
          setUserName('User')
        }
      } else {
        setUserName('User')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Helper to get full name
  const getFullName = () => {
    if (userLastName) {
      return `${userName} ${userLastName}`
    }
    return userName
  }

  const treatments = [
    { name: 'Deepana-Pachana', date: '20 Sept 2025', status: 'completed' },
    { name: 'Snehapana', date: '21 Sept 2025', status: 'completed' },
    { name: 'Snehapana', date: '22 Sept 2025', status: 'in-progress' },
    { name: 'Abhyanga', date: '23 Sept 2025', status: 'pending' }
  ]

  const checklistItems = [
    { task: 'Fix glitch in search functionality', completed: true },
    { task: 'Clean empty values from Employee table', completed: true },
    { task: 'Make MoM for the last dept meeting', completed: false }
  ]

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white flex flex-col">
        {/* Profile Section */}
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src={imgEllipse} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Hii, {userName}!</h3>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-4">
          <div className="space-y-2">
            <a href="/dashboard/patient" className="flex items-center space-x-3 px-4 py-3 bg-white text-black rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <span className="font-medium">Dashboard</span>
            </a>
            <a href="/calendar" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Calendar</span>
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
                if (confirm('Are you sure you want to sign out?')) {
                  window.location.href = '/'
                }
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
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white px-8 py-4 border-b">
          <div className="flex items-center justify-between">
            {/* Search */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Feature"
                  className="w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Treatment Navigation */}
            <div className="flex items-center space-x-6">
              <button className="text-teal-500 font-medium">Vamana</button>
              <button className="text-gray-700 hover:text-teal-500">Raktmoshana</button>
              <button className="text-gray-700 hover:text-teal-500">Nasya</button>
              <button className="text-gray-700 hover:text-teal-500">Basti</button>
              <button className="text-gray-700 hover:text-teal-500">Virechana</button>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/#contact'}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Contact Us
              </button>
              <div className="relative">
                <button
                  onClick={() => alert('You have 1 new notification')}
                  className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center hover:bg-teal-200 transition-colors"
                >
                  <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2L3 7v11a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V7l-7-5z" />
                  </svg>
                </button>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">1</span>
                </div>
              </div>
              <button
                onClick={() => alert('Settings panel coming soon!')}
                className="w-10 h-10 bg-black rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          {/* Top Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {/* Profile */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-teal-500 text-lg font-medium">Profile</h3>
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold">
                  {isLoading ? 'Loading...' : getFullName()}
                </h4>
                <p className="text-sm text-gray-600">32,Mumbai</p>
                <p className="text-sm text-gray-600">{userLocation}</p>
              </div>
            </div>

            {/* Total Streak */}
            <div className="bg-green-100 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Total Streak</h3>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">50 Days</div>
                <p className="text-sm text-gray-600">Longest Streak: 120 Days</p>
              </div>
            </div>

            {/* My Doctor */}
            <div className="bg-teal-500 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">My Doctor</h3>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold">Dr. Aryan Tiwari</h4>
                <p className="text-sm opacity-80">#1 in Technical</p>
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-black text-white p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-green-200 text-lg font-medium">Upcoming Sessions</h3>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">11/03/25</div>
                <div className="text-sm">Upcoming Tuesday</div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            {/* Treatment History */}
            <div className="col-span-4 bg-black text-white p-6 rounded-xl">
              <h3 className="text-green-200 text-xl font-medium mb-6">Treatment History</h3>
              <div className="space-y-4">
                {treatments.map((treatment, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      treatment.status === 'completed' ? 'bg-teal-400' :
                      treatment.status === 'in-progress' ? 'bg-green-400' : 'bg-teal-400'
                    }`}></div>
                    <div className="flex-1">
                      <div className="font-medium">{treatment.name}</div>
                      <div className={`text-sm ${
                        treatment.status === 'completed' ? 'text-teal-300' :
                        treatment.status === 'in-progress' ? 'text-green-300' : 'text-teal-300'
                      }`}>{treatment.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vamana Progress */}
            <div className="col-span-4 bg-blue-400 text-white p-6 rounded-xl">
              <h3 className="text-xl font-medium mb-6">Vamana</h3>
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">6</span>
                  </div>
                </div>
                <p className="font-medium mb-4">Sessions Completed</p>
                <div className="flex justify-center space-x-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-pink-300 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-sm font-bold text-white">10%</span>
                    </div>
                    <p className="text-xs">Progress in Procedure</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white text-sm font-bold">30+</span>
                    </div>
                    <p className="text-xs">Detox Milestones</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Therapy Checklist */}
            <div className="col-span-4 bg-green-100 p-6 rounded-xl">
              <h3 className="text-xl font-medium mb-6">Therapy Checklist</h3>
              <div className="space-y-4">
                {checklistItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm">{item.task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* My Milestones */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-xl font-medium mb-6">My Milestones</h3>
              <div className="flex items-center space-x-8">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle cx="64" cy="64" r="50" stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
                    <circle cx="64" cy="64" r="50" stroke="#10b981" strokeWidth="8" fill="transparent"
                           strokeDasharray={`${10 * 3.14159}`} strokeDashoffset={`${(100-10) * 3.14159}`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">10%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Procedures Completed 10%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">Procedures In Progress 25%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <span className="text-sm">Procedures Pending 65%</span>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="mt-6">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THURS</span>
                  <span>FRI</span>
                  <span>SAT</span>
                  <span>SUN</span>
                </div>
                <div className="h-20 flex items-end justify-between">
                  <div className="w-4 h-8 bg-cyan-400 rounded"></div>
                  <div className="w-4 h-12 bg-cyan-400 rounded"></div>
                  <div className="w-4 h-6 bg-cyan-400 rounded"></div>
                  <div className="w-4 h-16 bg-cyan-400 rounded"></div>
                  <div className="w-4 h-10 bg-cyan-400 rounded"></div>
                  <div className="w-4 h-14 bg-cyan-400 rounded"></div>
                  <div className="w-4 h-12 bg-cyan-400 rounded"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span className="text-cyan-500">• Tasks Completed</span>
                  <span className="text-blue-500">• Time Taken</span>
                </div>
              </div>
            </div>

            {/* Courses */}
            <div className="bg-black text-white p-6 rounded-xl">
              <h3 className="text-xl font-medium mb-6">Courses</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <span className="text-xs bg-green-500 px-2 py-1 rounded">Ongoing</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-8 h-8 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </div>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded">Wishlist</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-xs bg-teal-500 px-2 py-1 rounded">Recommended</span>
                </div>
              </div>

              {/* Chat Input */}
              <div className="bg-white rounded-full px-4 py-3 flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Start a Conversation..."
                  className="flex-1 outline-none text-black"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      alert('Chat feature coming soon!')
                    }
                  }}
                />
                <button
                  onClick={() => alert('Chat feature coming soon!')}
                  className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}