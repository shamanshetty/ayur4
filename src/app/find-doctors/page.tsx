'use client'
import { useState, useEffect } from 'react'
import { DoctorService } from '@/lib/doctorServices'
import type { Practitioner, Specialization } from '@/lib/supabase'
import Chatbot, { ChatbotButton } from '@/components/Chatbot'

export default function FindDoctors() {
  const [doctors, setDoctors] = useState<Practitioner[]>([])
  const [specializations, setSpecializations] = useState<Specialization[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  // Search filters
  const [filters, setFilters] = useState({
    city: '',
    specialization: '',
    minRating: 0,
    maxPrice: 5000,
    consultationType: '' as 'online' | 'in_person' | '',
    sortBy: 'rating' as 'rating' | 'price' | 'experience' | 'reviews'
  })

  useEffect(() => {
    loadInitialData()
  }, [])

  useEffect(() => {
    searchDoctors()
  }, [filters])

  const loadInitialData = async () => {
    try {
      // Load specializations for filter dropdown
      const specializationsData = await DoctorService.getSpecializations()
      setSpecializations(specializationsData || [])

      // Load initial doctors (featured/top rated)
      const featuredDoctors = await DoctorService.getFeaturedDoctors(12)
      setDoctors(featuredDoctors || [])
    } catch (error) {
      console.error('Error loading initial data:', error)
      // Fallback to sample data for demo
      setDoctors(getSampleDoctors())
      setSpecializations(getSampleSpecializations())
    } finally {
      setIsLoading(false)
    }
  }

  const searchDoctors = async () => {
    try {
      setIsLoading(true)
      const searchFilters = {
        ...filters,
        consultationType: filters.consultationType || undefined,
        limit: 20
      }

      const results = await DoctorService.searchDoctors(searchFilters)
      setDoctors(results || [])
    } catch (error) {
      console.error('Error searching doctors:', error)
      // Keep existing doctors on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      city: '',
      specialization: '',
      minRating: 0,
      maxPrice: 5000,
      consultationType: '',
      sortBy: 'rating'
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ))
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
            <a href="/dashboard/patient" className="text-gray-600 hover:text-gray-900 px-4 py-2">Dashboard</a>
            <a href="/calendar" className="text-gray-600 hover:text-gray-900 px-4 py-2">Calendar</a>
            <a href="/consultation" className="text-gray-600 hover:text-gray-900 px-4 py-2">AI Consultation</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Ayurveda Doctors</h1>
          <p className="text-gray-600">Discover experienced Ayurvedic practitioners and book consultations</p>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear All
                </button>
              </div>

              {/* City Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  placeholder="Enter city name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Specialization Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <select
                  value={filters.specialization}
                  onChange={(e) => handleFilterChange('specialization', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Specializations</option>
                  {specializations.map((spec) => (
                    <option key={spec.id} value={spec.name}>{spec.name}</option>
                  ))}
                </select>
              </div>

              {/* Consultation Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Type</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="consultationType"
                      value=""
                      checked={filters.consultationType === ''}
                      onChange={(e) => handleFilterChange('consultationType', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Both Online & In-person</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="consultationType"
                      value="online"
                      checked={filters.consultationType === 'online'}
                      onChange={(e) => handleFilterChange('consultationType', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Online Only</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="consultationType"
                      value="in_person"
                      checked={filters.consultationType === 'in_person'}
                      onChange={(e) => handleFilterChange('consultationType', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">In-person Only</span>
                  </label>
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                <select
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value={0}>Any Rating</option>
                  <option value={4.5}>4.5+ Stars</option>
                  <option value={4.0}>4.0+ Stars</option>
                  <option value={3.5}>3.5+ Stars</option>
                </select>
              </div>

              {/* Max Price */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Consultation Fee: ₹{filters.maxPrice}
                </label>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="250"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹500</span>
                  <span>₹5000</span>
                </div>
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="price">Lowest Price</option>
                  <option value="experience">Most Experienced</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {isLoading ? 'Searching...' : `${doctors.length} doctors found`}
              </p>
            </div>

            {/* Doctor Cards */}
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                    <div className="flex space-x-4">
                      <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {doctors.map((doctor) => (
                  <div key={doctor.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                    <div className="flex space-x-4">
                      {/* Doctor Avatar */}
                      <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        {doctor.profile_image_url ? (
                          <img
                            src={doctor.profile_image_url}
                            alt={`Dr. ${doctor.first_name} ${doctor.last_name}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <span className="text-white text-xl font-bold">
                            {doctor.first_name.charAt(0)}{doctor.last_name.charAt(0)}
                          </span>
                        )}
                      </div>

                      {/* Doctor Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              Dr. {doctor.first_name} {doctor.last_name}
                            </h3>
                            {doctor.verified && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 ml-2">
                                ✓ Verified
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="flex items-center">
                              {renderStars(doctor.rating)}
                              <span className="ml-1 text-sm text-gray-600">
                                {doctor.rating.toFixed(1)}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {doctor.total_reviews} reviews
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1 mb-3">
                          <p className="text-sm text-gray-600">
                            {doctor.specialization.join(', ')}
                          </p>
                          <p className="text-sm text-gray-500">
                            {doctor.years_of_experience} years experience
                          </p>
                          {doctor.location && (
                            <p className="text-sm text-gray-500 flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              {doctor.location}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {doctor.online_consultation && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                📹 Online
                              </span>
                            )}
                            {doctor.in_person_consultation && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                                🏥 In-person
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">
                              ₹{doctor.consultation_fee}
                            </div>
                            <div className="text-xs text-gray-500">consultation</div>
                          </div>
                        </div>

                        {doctor.bio && (
                          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                            {doctor.bio}
                          </p>
                        )}

                        <div className="flex space-x-3 mt-4">
                          <button
                            onClick={() => window.location.href = `/doctor/${doctor.id}`}
                            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            View Profile
                          </button>
                          <button
                            onClick={() => window.location.href = `/book-appointment/${doctor.id}`}
                            className="flex-1 bg-white text-green-600 border border-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && doctors.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
                <button
                  onClick={clearFilters}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Clear Filters
                </button>
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

// Sample data for fallback
function getSampleDoctors(): Practitioner[] {
  return [
    {
      id: '1',
      email: 'dr.sharma@ayursutra.com',
      first_name: 'Rajesh',
      last_name: 'Sharma',
      specialization: ['Panchakarma Specialist'],
      years_of_experience: 15,
      bio: 'Dr. Rajesh Sharma is a renowned Panchakarma specialist with over 15 years of experience.',
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
    }
  ] as Practitioner[]
}

function getSampleSpecializations(): Specialization[] {
  return [
    { id: '1', name: 'Panchakarma Specialist', created_at: '2024-01-01' },
    { id: '2', name: 'Ayurvedic Physician', created_at: '2024-01-01' },
    { id: '3', name: "Women's Health", created_at: '2024-01-01' }
  ]
}