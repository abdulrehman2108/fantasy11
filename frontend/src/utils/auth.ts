// Authentication utility functions

export interface User {
  id: string
  name: string
  email: string
  wallet: number
  mobile?: string
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('authToken')
}

// Get current user
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  
  const userStr = localStorage.getItem('user')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

// Set user session
export function setUserSession(token: string, user: User): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('authToken', token)
  localStorage.setItem('user', JSON.stringify(user))
}

// Clear user session
export function clearUserSession(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
}

// Get auth token
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('authToken')
}

