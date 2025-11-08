// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000/api";

// Helper function to get auth token
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('authToken')
}

// Helper function for API requests
async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = getAuthToken()
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Request failed')
    }

    return data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// ==================== AUTH API ====================

export interface LoginData {
  email?: string
  mobile?: string
  password: string
}

export interface SignupData {
  name: string
  email: string
  mobile: string
  password: string
}

export interface AuthResponse {
  message: string
  token: string
  user: {
    id: string
    name: string
    email: string
    mobile: string
    wallet_balance: number
  }
}

export async function loginUser(data: LoginData): Promise<AuthResponse> {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function signupUser(data: SignupData): Promise<AuthResponse> {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function verifyToken(): Promise<{ valid: boolean; user_id: string }> {
  return apiRequest('/auth/verify', {
    method: 'POST',
  })
}

// ==================== USER API ====================

export interface UserProfile {
  id: string
  name: string
  email: string
  mobile: string
  wallet_balance: number
}

export async function getUserProfile(): Promise<{ user: UserProfile }> {
  return apiRequest('/users/profile')
}

export async function updateUserProfile(data: Partial<UserProfile>): Promise<{ message: string }> {
  return apiRequest('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

// ==================== MATCHES API ====================

export interface Match {
  id: string
  team1: string
  team2: string
  match_date: string
  status: 'upcoming' | 'live' | 'completed'
  score?: string
  league?: string
}

export async function getMatches(status?: 'all' | 'upcoming' | 'live' | 'completed'): Promise<{ matches: Match[] }> {
  const query = status ? `?status=${status}` : ''
  return apiRequest(`/matches${query}`)
}

export async function getMatch(matchId: string): Promise<{ match: Match }> {
  return apiRequest(`/matches/${matchId}`)
}

export async function getMyMatches(status?: 'all' | 'upcoming' | 'live' | 'completed'): Promise<{ matches: Match[] }> {
  const query = status ? `?status=${status}` : ''
  return apiRequest(`/matches/my-matches${query}`)
}

// ==================== LEAGUES API ====================

export interface League {
  id: string
  name: string
  prize_pool: number
  entry_fee: number
  max_teams: number
  teams_count: number
  popularity: number
}

export async function getLeagues(
  filter?: 'all' | 'free' | 'paid' | 'popular',
  sort?: 'prize' | 'teams' | 'entry'
): Promise<{ leagues: League[] }> {
  const params = new URLSearchParams()
  if (filter) params.append('filter', filter)
  if (sort) params.append('sort', sort)
  const query = params.toString() ? `?${params.toString()}` : ''
  return apiRequest(`/leagues${query}`)
}

export async function joinLeague(leagueId: string): Promise<{ message: string }> {
  return apiRequest(`/leagues/${leagueId}/join`, {
    method: 'POST',
  })
}

// ==================== WALLET API ====================

export interface Transaction {
  id: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  created_at: string
}

export async function getWalletBalance(): Promise<{ balance: number }> {
  return apiRequest('/wallet/balance')
}

export async function getTransactions(): Promise<{ transactions: Transaction[] }> {
  return apiRequest('/wallet/transactions')
}

export async function addMoney(amount: number): Promise<{ message: string }> {
  return apiRequest('/wallet/add-money', {
    method: 'POST',
    body: JSON.stringify({ amount }),
  })
}

