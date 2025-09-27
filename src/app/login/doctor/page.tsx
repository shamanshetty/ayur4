'use client'
import { useState } from 'react'

export default function DoctorLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to doctor dashboard
    window.location.href = '/dashboard/doctor'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <a href="/" className="font-display text-3xl font-bold text-purple-600 hover:text-purple-700 transition-colors">
            AyurSutra
          </a>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Doctor Login</h2>
          <p className="mt-2 text-gray-600">Access your professional dashboard</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter your professional email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-600 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Keep me signed in
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot-password/doctor" className="font-medium text-purple-600 hover:text-purple-700">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Quick access</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-purple-200 rounded-md shadow-sm bg-purple-50 text-sm font-medium text-purple-700 hover:bg-purple-100">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Access with Medical License ID
              </button>

              <div className="text-center">
                <span className="text-xs text-gray-500">
                  Secure login for verified practitioners
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/signup/doctor" className="font-medium text-purple-600 hover:text-purple-700">
            Register as Doctor
          </a>
        </p>

        <p className="mt-4 text-center text-sm text-gray-600">
          Are you a patient?{' '}
          <a href="/login/patient" className="font-medium text-ayur-green hover:text-ayur-green/80">
            Login as Patient
          </a>
        </p>
      </div>
    </div>
  )
}