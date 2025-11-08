'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('authToken')
    
    // Redirect after 2 seconds
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        router.push('/home')
      } else {
        router.push('/login')
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animate-pulse">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/50 to-black/50"></div>
      </div>
      
      <div className="text-center z-10 relative">
        {/* Logo Animation */}
        <div className="mb-8 animate-bounce">
          <div className="relative">
            <h1 className="text-7xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              FANTASY
            </h1>
            <div className="flex items-center justify-center gap-2">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-4xl">⚽</span>
              </div>
              <h1 className="text-7xl font-black text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                11
              </h1>
            </div>
          </div>
        </div>
        
        {/* Loading Spinner */}
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
        
        {/* Powered by text */}
        <p className="text-white/80 text-sm mt-6 animate-pulse">
          Powered by Fantasy 11
        </p>
      </div>
    </div>
  )
}

