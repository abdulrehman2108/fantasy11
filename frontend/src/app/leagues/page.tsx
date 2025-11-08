'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getLeagues, joinLeague } from '@/utils/api'

export default function LeaguesPage() {
  const router = useRouter()
  const [filter, setFilter] = useState<'all' | 'free' | 'paid' | 'popular'>('all')
  const [sortBy, setSortBy] = useState<'prize' | 'teams' | 'entry'>('prize')
  const [allLeagues, setAllLeagues] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLeagues()
  }, [filter, sortBy])

  const fetchLeagues = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await getLeagues(filter, sortBy)
      setAllLeagues(response.leagues || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load leagues')
      console.error('Error fetching leagues:', err)
    } finally {
      setLoading(false)
    }
  }

  // Mock data - replace with actual API calls
  const mockLeagues = [
    { id: 1, name: 'Mega League', prize: '₹1,00,000', teams: 100, entry: '₹100', type: 'paid', popularity: 95 },
    { id: 2, name: 'Quick League', prize: '₹10,000', teams: 10, entry: '₹50', type: 'paid', popularity: 80 },
    { id: 3, name: 'Free League', prize: '₹1,000', teams: 1000, entry: 'Free', type: 'free', popularity: 100 },
    { id: 4, name: 'Premium League', prize: '₹5,00,000', teams: 500, entry: '₹500', type: 'paid', popularity: 90 },
    { id: 5, name: 'Beginner League', prize: '₹5,000', teams: 50, entry: 'Free', type: 'free', popularity: 85 },
    { id: 6, name: 'Elite League', prize: '₹10,00,000', teams: 1000, entry: '₹1,000', type: 'paid', popularity: 98 },
  ]

  // Format league data for display
  const formatLeague = (league: any) => {
    return {
      id: league.id,
      name: league.name,
      prize: `₹${league.prize_pool.toLocaleString('en-IN')}`,
      teams: league.teams_count,
      entry: league.entry_fee === 0 ? 'Free' : `₹${league.entry_fee}`,
      type: league.entry_fee === 0 ? 'free' : 'paid',
      popularity: league.popularity || 0,
      prize_pool: league.prize_pool,
      entry_fee: league.entry_fee
    }
  }

  // Use API data if available, otherwise use mock data
  const leaguesToDisplay = allLeagues.length > 0 
    ? allLeagues.map(formatLeague)
    : mockLeagues

  const handleJoin = async (leagueId: string) => {
    try {
      await joinLeague(leagueId)
      alert('Successfully joined league!')
      // Refresh leagues
      fetchLeagues()
    } catch (err: any) {
      alert(err.message || 'Failed to join league')
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-1">Leagues</h1>
          <p className="text-red-100 text-sm">Join contests and win big</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="mb-4 space-y-3">
          <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm overflow-x-auto">
            {(['all', 'free', 'paid', 'popular'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-md text-sm font-semibold whitespace-nowrap transition ${
                  filter === f
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'prize' | 'teams' | 'entry')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="prize">Prize Pool (High to Low)</option>
              <option value="teams">Teams (High to Low)</option>
              <option value="entry">Entry Fee (Low to High)</option>
            </select>
          </div>
        </div>

        {/* Leagues List */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading leagues...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchLeagues}
              className="mt-2 text-red-600 hover:underline text-sm"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {leaguesToDisplay.map((league) => (
            <div
              key={league.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition"
            >
              {/* Popular Badge */}
              {league.popularity >= 95 && (
                <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 text-center">
                  🔥 MOST POPULAR
                </div>
              )}

              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold text-gray-900">{league.name}</h2>
                      {league.type === 'free' && (
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                          FREE
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{league.teams.toLocaleString()} Teams</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{league.prize}</p>
                    <p className="text-xs text-gray-500">Prize Pool</p>
                  </div>
                </div>

                {/* League Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Entry Fee</p>
                    <p className="font-bold text-gray-900">{league.entry}</p>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <p className="text-xs text-gray-600">Winners</p>
                    <p className="font-bold text-gray-900">Top 10%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Popularity</p>
                    <p className="font-bold text-gray-900">{league.popularity}%</p>
                  </div>
                </div>

                <button
                  onClick={() => handleJoin(league.id)}
                  className={`w-full py-3 rounded-lg font-bold transition shadow-md ${
                    league.entry === 'Free'
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  Join Contest - {league.entry}
                </button>
              </div>
            </div>
            ))}
          </div>
        )}

        {!loading && !error && leaguesToDisplay.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500">No leagues found</p>
          </div>
        )}
      </div>
    </div>
  )
}

