'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getCurrentUser, isAuthenticated, clearUserSession } from '@/utils/auth'

interface SideDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)
  const [balance, setBalance] = useState('₹500')

  useEffect(() => {
    if (isAuthenticated()) {
      const currentUser = getCurrentUser()
      setUser(currentUser)
      // In real app, fetch balance from API
    }
  }, [])

  const menuItems = [
    { label: 'My Balance', path: '/wallet', icon: '💰' },
    { label: 'My Info', path: '/profile', icon: '👤' },
    { label: 'Settings', path: '/settings', icon: '⚙️' },
    { label: 'How to Play', path: '/how-to-play', icon: '📘' },
    { label: '24x7 Support', path: '/support', icon: '💬' },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
    onClose()
  }

  const handleLogout = () => {
    clearUserSession()
    router.push('/login')
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Profile Section */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 mb-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">
                  {user?.name || 'Guest User'}
                </h3>
                <p className="text-red-100 text-sm">
                  {user?.email || 'Login to continue'}
                </p>
              </div>
            </div>
            
            {/* Balance */}
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-red-100 text-xs mb-1">Wallet Balance</p>
              <p className="text-2xl font-bold">{balance}</p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Quick Access</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavigation('/home')}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="text-2xl">🏠</span>
                <span className="text-xs font-medium">Home</span>
              </button>
              <button
                onClick={() => handleNavigation('/mymatches')}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="text-2xl">⚽</span>
                <span className="text-xs font-medium">My Matches</span>
              </button>
              <button
                onClick={() => handleNavigation('/leagues')}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="text-2xl">🏆</span>
                <span className="text-xs font-medium">Leagues</span>
              </button>
              <button
                onClick={() => handleNavigation('/profile')}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="text-2xl">👤</span>
                <span className="text-xs font-medium">Profile</span>
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="mb-6">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Menu</h4>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition text-left"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium text-gray-700">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 border-t">
            {isAuthenticated() ? (
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                🚪 Logout
              </button>
            ) : (
              <button
                onClick={() => handleNavigation('/login')}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

