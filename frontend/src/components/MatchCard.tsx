'use client'

import { useRouter } from 'next/navigation'

interface MatchCardProps {
  match: {
    id: number
    team1: string
    team2: string
    time?: string
    date?: string
    score?: string
    status?: string
    teams?: number
    prize?: string
    countdown?: string
    league?: string
  }
  showDetails?: boolean
}

export default function MatchCard({ match, showDetails = false }: MatchCardProps) {
  const router = useRouter()

  const handleJoinContest = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/match/${match.id}/contests`)
  }

  const handleCardClick = () => {
    router.push(`/match/${match.id}`)
  }

  // Get team abbreviations
  const getAbbreviation = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').substring(0, 3).toUpperCase()
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-xl transition-all overflow-hidden"
    >
      {/* League Badge */}
      {match.league && (
        <div className="bg-red-600 text-white text-xs font-semibold px-4 py-1">
          {match.league}
        </div>
      )}

      <div className="p-4">
        {/* Match Info */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                  <span className="text-xs font-bold text-gray-700">{getAbbreviation(match.team1)}</span>
                </div>
                <span className="text-xs font-semibold text-gray-800">{match.team1}</span>
              </div>
              <span className="text-gray-400 font-bold text-lg">VS</span>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                  <span className="text-xs font-bold text-gray-700">{getAbbreviation(match.team2)}</span>
                </div>
                <span className="text-xs font-semibold text-gray-800">{match.team2}</span>
              </div>
            </div>
            
            {match.score && (
              <p className="text-sm text-gray-700 font-medium mt-2">{match.score}</p>
            )}
            
            {match.time && match.date && (
              <div className="flex items-center gap-2 mt-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-gray-600">
                  {match.date} • {match.time}
                </p>
              </div>
            )}

            {match.countdown && (
              <div className="flex items-center gap-2 mt-2">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs font-semibold text-red-600">{match.countdown} left</p>
              </div>
            )}
          </div>
          
          {match.status && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              {match.status}
            </span>
          )}
        </div>

        {showDetails && (
          <div className="flex justify-between items-center pt-3 border-t border-gray-200 mb-3">
            <div className="text-sm">
              <span className="text-gray-600">Teams: </span>
              <span className="font-semibold text-gray-900">{match.teams}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Prize: </span>
              <span className="font-semibold text-green-600">{match.prize}</span>
            </div>
          </div>
        )}

        <button
          onClick={handleJoinContest}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition shadow-md"
        >
          {match.status === 'Live' ? 'View Team' : 'Join Contest'}
        </button>
      </div>
    </div>
  )
}

