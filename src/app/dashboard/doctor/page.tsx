'use client'
import { useState } from 'react'

export default function DoctorDashboard() {
  const [currentPatients] = useState([
    { name: 'Aisha', age: '34F', condition: 'Sinusitis - Nasya/Vamana prep', color: 'bg-cyan-400' },
    { name: 'Bilal', age: '58M', condition: 'Osteoarthritis - Basti planned', color: 'bg-yellow-400' },
    { name: 'Chandni', age: '26F', condition: 'Acne/PMS - Virechana prep', color: 'bg-purple-400' },
    { name: 'Deepak', age: '45M', condition: 'Constipation - Basti planned', color: 'bg-pink-400' }
  ])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-black text-white flex flex-col">
        {/* Profile Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
            <div>
              <h3 className="font-semibold">Dr Aryan</h3>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            <a href="/dashboard/doctor" className="flex items-center space-x-3 px-4 py-3 bg-purple-600 rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <span>Dashboard</span>
            </a>
            <button
              onClick={() => alert('Calendar feature coming soon!')}
              className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-800 rounded-lg text-left"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Calendar</span>
            </button>
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
          <a href="/" className="font-display text-xl font-bold">AyurSutra</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search Institutions..."
              className="w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button className="p-2 bg-teal-500 text-white rounded-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.location.href = '/#contact'}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Contact Us
            </button>
            <button
              onClick={() => alert('Profile settings coming soon!')}
              className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center hover:bg-purple-300 transition-colors"
            >
              <span className="text-purple-600 font-semibold">A</span>
            </button>
            <button
              onClick={() => alert('Settings panel coming soon!')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {/* Profile */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Profile</h3>
              <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="font-semibold">Dr Aryan Tiwari</h4>
              <p className="text-sm text-gray-600">32,Mumbai India</p>
              <p className="text-sm text-gray-600">#Specialist in Raktamokshana</p>
            </div>
          </div>

          {/* Active Patients */}
          <div className="bg-green-100 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Active Patients</h3>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">12</div>
          </div>

          {/* My Feedback */}
          <div className="bg-pink-100 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">My Feedback</h3>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Average Rating:</p>
              <div className="flex space-x-1">
                {[1,2,3,4].map(i => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-black text-white p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upcoming Sessions</h3>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">11/03/25</div>
              <div className="text-sm">Upcoming Tuesday</div>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-12 gap-6">
          {/* Current Patients */}
          <div className="col-span-4 bg-black text-white p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-6">Current Patients</h3>
            <div className="space-y-4">
              {currentPatients.map((patient, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${patient.color}`}></div>
                  <div className="flex-1">
                    <div className="font-semibold">{patient.name} ({patient.age})</div>
                    <div className="text-sm text-gray-300">{patient.condition}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learn and Grow */}
          <div className="col-span-4 bg-blue-100 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-6">Learn and Grow</h3>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">6</span>
              </div>
              <p className="font-medium mb-2">Stories Posted</p>
              <div className="flex justify-center space-x-8 mt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-sm">10%</span>
                  </div>
                  <p className="text-xs">Users Reached</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white text-sm">30+</span>
                  </div>
                  <p className="text-xs">Articles reviewed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Checklist */}
          <div className="col-span-4 bg-purple-100 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-6">Daily Checklist</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">Review Aisha&apos;s list, vitals, therapy readiness</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">Supervise Chandni&apos;s Panchakarma sessions, adjust treatments safely</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm">Coordinate Deepak&apos;s ongoing therapies and wellness routines</span>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics and Documentation */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Statistics */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Statistics</h3>
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle cx="64" cy="64" r="50" stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
                    <circle cx="64" cy="64" r="50" stroke="#8b5cf6" strokeWidth="8" fill="transparent"
                           strokeDasharray={`${30 * 3.14159}`} strokeDashoffset={`${(100-30) * 3.14159}`} />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">30%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-sm">Documentation Completed 30%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                  <span className="text-sm">Documentation In Progress 45%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Documentation Pending 25%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="bg-black text-white p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-6">Documentation</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <span className="bg-green-500 text-xs px-2 py-1 rounded">Ongoing</span>
                  <p className="text-sm mt-1">Aarav Sharma Session Record Abhyanga</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <span className="bg-white text-black text-xs px-2 py-1 rounded">●</span>
                  <p className="text-sm mt-1">Kabir Joshi Therapy Documentation Virechana</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span>📄</span>
                  <span className="text-sm">General Documentation Template</span>
                </div>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="mt-6">
          <div className="bg-white rounded-full px-6 py-3 shadow-sm border">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="Start a Conversation..."
                className="flex-1 outline-none"
              />
              <button className="p-2 bg-purple-600 text-white rounded-full">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}