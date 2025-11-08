'use client'

export default function ProfilePage() {
  // Mock user data - replace with actual user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    wallet: '₹500',
    totalWinnings: '₹2,500',
    matchesPlayed: 15,
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="text-center mb-6">
          <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl text-white font-bold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Wallet Balance</p>
            <p className="text-2xl font-bold text-green-600">{user.wallet}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Total Winnings</p>
            <p className="text-2xl font-bold text-blue-600">{user.totalWinnings}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-gray-700">Matches Played</span>
            <span className="font-semibold">{user.matchesPlayed}</span>
          </div>
          <button className="w-full text-left py-3 border-b text-blue-600 font-semibold">
            Edit Profile
          </button>
          <button className="w-full text-left py-3 border-b text-blue-600 font-semibold">
            Payment Methods
          </button>
          <button className="w-full text-left py-3 text-red-600 font-semibold">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

