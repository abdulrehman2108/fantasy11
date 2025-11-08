'use client'

import { useState } from 'react'
import AuthForm from '@/components/AuthForm'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loginUser } from '@/utils/api'
import { setUserSession } from '@/utils/auth'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (email: string, password: string, mobile?: string) => {
    try {
      setError(null)
      
      // Prepare login data
      const loginData: { email?: string; mobile?: string; password: string } = {
        password,
      }
      
      if (mobile) {
        loginData.mobile = mobile
      } else {
        loginData.email = email
      }
      
      // Call API
      const response = await loginUser(loginData)
      
      // Store token and user data
      if (response.token && response.user) {
        setUserSession(response.token, {
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          wallet: response.user.wallet_balance,
        })
        
        // Redirect to home
        router.push('/home')
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.')
      console.error('Login error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-red-600 mb-2" style={{ fontFamily: 'var(--font-bebas)' }}>
            FANTASY 11
          </h1>
          <p className="text-gray-600">Login to continue</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <AuthForm onSubmit={handleLogin} isLogin={true} />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-red-600 hover:underline">Terms & Conditions</Link>
        </p>
      </div>
    </div>
  )
}

