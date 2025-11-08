'use client'

import { useState, useEffect } from 'react'
import MatchCard from '@/components/MatchCard'
import { useRouter } from 'next/navigation'
import { getMyMatches } from '@/utils/api'

export default function MyMatchesPage() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'live' | 'completed'>('all')
  const [allMatches, setAllMatches] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMyMatches()
  }, [activeFilter])

  const fetchMyMatches = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getMyMatches(activeFilter)
      setAllMatches(response.matches || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load your matches')
      console.error('Error fetching my matches:', err)
    } finally {
      setLoading(false)
    }
  }

  // Mock data - replace with actual API calls
  const mockMatches = [
    { 
      id: 1, 
      team1: 'Mumbai Indians', 
      team2: 'Chennai Super Kings', 
      time: '7:30 PM', 
      date: 'Today', 
      teams: 2, 
      prize: '₹10,000',
      status: 'upcoming',
      myRank: null,
      myPoints: null,
      league: 'T20 League'
    },
    { 
      id: 2, 
      team1: 'Royal Challengers', 
      team2: 'Kolkata Knight Riders', 
      time: '3:30 PM', 
      date: 'Tomorrow', 
      teams: 5, 
      prize: '₹25,000',
      status: 'upcoming',
      myRank: null,
      myPoints: null,
      league: 'T20 League'
    },
    { 
      id: 3, 
      team1: 'Punjab Kings', 
      team2: 'Gujarat Titans', 
      score: 'PBKS: 145/3 (15.2) | GT: 120/5 (12.0)', 
      status: 'live',
      teams: 150,
      prize: '₹50,000',
      myRank: 45,
      myPoints: 245,
      league: 'T20 League'
    },
    { 
      id: 4, 
      team1: 'Delhi Capitals', 
      team2: 'Sunrisers Hyderabad', 
      status: 'completed',
      teams: 200,
      prize: '₹1,00,000',
      myRank: 12,
      myPoints: 385,
      winnings: '₹5,000',
      league: 'T20 League'
    },
  ]

  // Use API data if available, otherwise use mock data for display
  const matchesToDisplay = allMatches.length > 0 ? allMatches : mockMatches
  
  const filteredMatches = activeFilter === 'all' 
    ? matchesToDisplay 
    : matchesToDisplay.filter(m => m.status === activeFilter)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">LIVE</span>
      case 'completed':
        return <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full">COMPLETED</span>
      default:
        return <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">UPCOMING</span>
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-1">My Matches</h1>
          <p className="text-red-100 text-sm">Track your contests</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-lg p-1 shadow-sm overflow-x-auto">
          {(['all', 'upcoming', 'live', 'completed'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-md text-sm font-semibold whitespace-nowrap transition ${
                activeFilter === filter
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Matches List */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading your matches...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchMyMatches}
              className="mt-2 text-red-600 hover:underline text-sm"
            >
              Try Again
            </button>
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">⚽</div>
            <p className="text-gray-500 text-lg mb-2">No matches found</p>
            <p className="text-gray-400 text-sm mb-6">Join a contest to get started!</p>
            <button
              onClick={() => router.push('/home')}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Browse Matches
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                {/* League Badge */}
                {match.league && (
                  <div className="bg-red-600 text-white text-xs font-semibold px-4 py-1">
                    {match.league}
                  </div>
                )}

                <div className="p-4">
                  {/* Match Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-800">{match.team1}</span>
                        <span className="text-gray-400">vs</span>
                        <span className="font-semibold text-gray-800">{match.team2}</span>
                      </div>
                      {match.score && (
                        <p className="text-sm text-gray-600 mb-2">{match.score}</p>
                      )}
                      {match.time && match.date && (
                        <p className="text-xs text-gray-500">{match.date} • {match.time}</p>
                      )}
                    </div>
                    {getStatusBadge(match.status || 'upcoming')}
                  </div>

                  {/* Match Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-600">Teams</p>
                      <p className="font-bold text-gray-900">{match.teams}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Prize Pool</p>
                      <p className="font-bold text-green-600">{match.prize}</p>
                    </div>
                  </div>

                  {/* My Performance */}
                  {(match.myRank || match.myPoints) && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-blue-600 font-semibold">Your Rank</p>
                          <p className="text-lg font-bold text-blue-900">#{match.myRank}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-blue-600 font-semibold">Your Points</p>
                          <p className="text-lg font-bold text-blue-900">{match.myPoints}</p>
                        </div>
                      </div>
                      {match.winnings && (
                        <div className="mt-2 pt-2 border-t border-blue-200">
                          <p className="text-xs text-green-600 font-semibold">Winnings</p>
                          <p className="text-lg font-bold text-green-700">{match.winnings}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => router.push(`/match/${match.id}`)}
                    className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-md"
                  >
                    {match.status === 'live' ? 'View Live' : match.status === 'completed' ? 'View Details' : 'View Team'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

