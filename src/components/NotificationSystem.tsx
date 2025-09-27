'use client'
import { useState, useEffect } from 'react'

interface Notification {
  id: string
  type: 'appointment' | 'reminder' | 'update'
  title: string
  message: string
  timestamp: string
  read: boolean
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'appointment',
        title: 'Appointment Confirmed',
        message: 'Your appointment with Dr. Sharma has been confirmed for tomorrow at 10:00 AM.',
        timestamp: new Date().toISOString(),
        read: false
      },
      {
        id: '2',
        type: 'reminder',
        title: 'Medication Reminder',
        message: 'Time to take your evening Ayurvedic medicine.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false
      },
      {
        id: '3',
        type: 'update',
        title: 'Treatment Plan Updated',
        message: 'Dr. Patel has updated your Panchakarma treatment plan.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: true
      }
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter(n => !n.read).length)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
    setUnreadCount(0)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return '📅'
      case 'reminder':
        return '⏰'
      case 'update':
        return '📋'
      default:
        return '🔔'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.97 4.757a1.21 1.21 0 0 0-1.94 0C9.03 4.757 9 4.878 9 5v1a7 7 0 1 0 14 0V5c0-.122-.03-.243-.03-.243a1.21 1.21 0 0 0-1.94 0z" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-5 5v-5zM10.97 4.757a1.21 1.21 0 0 0-1.94 0C9.03 4.757 9 4.878 9 5v1a7 7 0 1 0 14 0V5c0-.122-.03-.243-.03-.243a1.21 1.21 0 0 0-1.94 0z" />
                </svg>
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium text-gray-900 ${!notification.read ? 'font-semibold' : ''}`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{formatTimestamp(notification.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  )
}

export function NotificationButton() {
  return <NotificationSystem />
}