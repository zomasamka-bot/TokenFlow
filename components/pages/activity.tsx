'use client'

interface Activity {
  id: string
  rightId: string
  rightName: string
  timestamp: Date
  hash: string
  status: 'confirmed' | 'pending'
}

interface ActivityProps {
  activities: Activity[]
  onBack: () => void
}

export default function Activity({ activities, onBack }: ActivityProps) {
  return (
    <div className="container py-12">
      <button
        onClick={onBack}
        className="text-gray-600 hover:text-black mb-8 transition-colors"
      >
        ← Back to Home
      </button>

      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-black mb-8">Execution History</h1>

        {activities.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 mb-4">No executions yet</p>
            <p className="text-sm text-gray-500">
              When you execute a right, it will appear here with full verification details.
            </p>
            <button
              onClick={onBack}
              className="btn btn-secondary mt-6"
            >
              Go Back to Rights
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-black">{activity.rightName}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {activity.timestamp.toLocaleString()}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
                    ✓ Confirmed
                  </span>
                </div>

                <div className="bg-gray-50 rounded p-4 mb-4">
                  <p className="text-xs text-gray-500 mb-1">Proof ID</p>
                  <p className="font-mono text-xs text-black break-all">{activity.id}</p>
                </div>

                <div className="bg-gray-50 rounded p-4">
                  <p className="text-xs text-gray-500 mb-1">Verification Hash</p>
                  <p className="font-mono text-xs text-black break-all">{activity.hash}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
