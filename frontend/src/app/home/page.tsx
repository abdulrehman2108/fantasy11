'use client'

import { useState, useEffect } from 'react'
import MatchCard from '@/components/MatchCard'
import { getMatches } from '@/utils/api'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'live'>('upcoming')
  const [matches, setMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMatches()
  }, [activeTab])

  const fetchMatches = async () => {
    try {
      setLoading(true)
      setError(null)
      const status = activeTab === 'upcoming' ? 'upcoming' : 'live'
      const response = await getMatches(status)
      setMatches(response.matches || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load matches')
      console.error('Error fetching matches:', err)
    } finally {
      setLoading(false)
    }
  }

  // Format match data for MatchCard component
  const formatMatch = (match: any) => {
    const matchDate = match.match_date ? new Date(match.match_date) : null
    return {
      id: match.id,
      team1: match.team1,
      team2: match.team2,
      time: matchDate ? matchDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : undefined,
      date: matchDate ? (matchDate.toDateString() === new Date().toDateString() ? 'Today' : 'Tomorrow') : undefined,
      countdown: matchDate ? calculateCountdown(matchDate) : undefined,
      status: match.status,
      score: match.score,
      league: match.league || 'T20 League'
    }
  }

  const calculateCountdown = (date: Date): string => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    if (diff <= 0) return 'Started'
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}d ${hours % 24}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const displayedMatches = matches.map(formatMatch)

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-1">Welcome Back!</h1>
          <p className="text-red-100 text-sm">Join contests and win big</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-3 px-4 rounded-md font-semibold transition ${
              activeTab === 'upcoming'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Upcoming Matches
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className={`flex-1 py-3 px-4 rounded-md font-semibold transition ${
              activeTab === 'live'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Live Matches
          </button>
        </div>

        {/* Match Cards */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading matches...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchMatches}
              className="mt-2 text-red-600 hover:underline text-sm"
            >
              Try Again
            </button>
          </div>
        ) : displayedMatches.length > 0 ? (
          <div className="space-y-4">
            {displayedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No {activeTab} matches found</p>
          </div>
        )}
      </div>
    </div>
  )
}

