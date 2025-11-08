'use client'

import { usePathname, useRouter } from 'next/navigation'

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  // Hide bottom nav on auth pages and splash screen
  if (pathname === '/login' || pathname === '/signup' || pathname === '/') {
    return null
  }

  const navItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/mymatches', label: 'My Matches', icon: '⚽' },
    { path: '/leagues', label: 'Leagues', icon: '🏆' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ]

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/')

  return (
    <nav className="bg-white border-t-2 border-gray-200 fixed bottom-0 left-0 right-0 z-50 shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition relative ${
                isActive(item.path)
                  ? 'text-red-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className={`text-xs font-medium ${isActive(item.path) ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              {isActive(item.path) && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-red-600 rounded-b-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

