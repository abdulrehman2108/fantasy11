'use client'

import { useState, useEffect } from 'react'
import SideDrawer from './SideDrawer'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const pathname = usePathname()

  // Hide navbar on auth pages and splash screen
  if (pathname === '/login' || pathname === '/signup' || pathname === '/') {
    return null
  }

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Menu Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-black text-red-600" style={{ fontFamily: 'var(--font-bebas)' }}>
                FANTASY 11
              </h1>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition relative"
                aria-label="Notifications"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  )
}

