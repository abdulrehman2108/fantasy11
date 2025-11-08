'use client'

import { useState } from 'react'
import Link from 'next/link'

interface AuthFormProps {
  onSubmit: (email: string, password: string, name?: string, mobile?: string) => void
  isLogin: boolean
}

export default function AuthForm({ onSubmit, isLogin }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'email' | 'mobile'>('email')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await onSubmit(email, password, isLogin ? undefined : name, mobile)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            placeholder="Enter your full name"
          />
        </div>
      )}

      {/* Login Method Toggle */}
      {isLogin && (
        <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              loginMethod === 'email'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('mobile')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              loginMethod === 'mobile'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Mobile
          </button>
        </div>
      )}

      {/* Email or Mobile Input */}
      {isLogin && loginMethod === 'mobile' ? (
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium mb-2 text-gray-700">
            Mobile Number
          </label>
          <input
            id="mobile"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            placeholder="Enter your mobile number"
            pattern="[0-9]{10}"
          />
        </div>
      ) : (
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
            {isLogin ? 'Email / Mobile Number' : 'Email'}
          </label>
          <input
            id="email"
            type={isLogin ? 'text' : 'email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            placeholder={isLogin ? 'Enter email or mobile' : 'Enter your email'}
          />
        </div>
      )}

      {!isLogin && (
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium mb-2 text-gray-700">
            Mobile Number
          </label>
          <input
            id="mobile"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
            placeholder="Enter your mobile number"
            pattern="[0-9]{10}"
          />
        </div>
      )}

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          placeholder="Enter your password"
        />
      </div>

      {isLogin && (
        <div className="text-right">
          <Link href="/forgot-password" className="text-sm text-red-600 hover:underline font-medium">
            Forgot Password?
          </Link>
        </div>
      )}

      {!isLogin && (
        <div className="flex items-start">
          <input
            id="terms"
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            required
            className="mt-1 mr-2"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{' '}
            <Link href="/terms" className="text-red-600 hover:underline">
              Terms & Conditions
            </Link>
          </label>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || (!isLogin && !agreeToTerms)}
        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {loading ? 'Loading...' : isLogin ? 'Login' : 'Create Account'}
      </button>

      {/* Social Login */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-sm font-medium">Google</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="text-sm font-medium">Facebook</span>
        </button>
      </div>

      <div className="text-center text-sm pt-4">
        {isLogin ? (
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-red-600 hover:underline font-semibold">
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-red-600 hover:underline font-semibold">
              Login
            </Link>
          </p>
        )}
      </div>
    </form>
  )
}

